/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useQueryResponseLoading } from 'common/core/QueryResponseProvider';
import { useQueryRequest } from 'common/core/QueryRequestProvider';
import { UsersListType, UsersType } from 'common/interfaces/UserData';
import { LOC_STORAGE_USER_STATE } from 'common/app-consts';
import { getTotalUsersRecords } from 'components/dashboard/users/user.service';
import { Form } from 'react-bootstrap';
import { RecordsPerPageSteps, VisiblePageCount } from 'common/settings/settings';

interface UsersListPaginationProps {
    list: UsersListType;
}

const updatePageNumbers = (length: number): number[] => {
    return Array.from({ length }, (_, index) => index);
};

export const UsersListPagination = ({ list }: UsersListPaginationProps) => {
    const { state, updateState } = useQueryRequest();
    const [currentPage, setCurrentPage] = useState<number>(state.currentpage);
    const isLoading = useQueryResponseLoading(list);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const storedState = JSON.parse(localStorage.getItem(LOC_STORAGE_USER_STATE) || '{}');

        updateState({ ...state, ...storedState });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        localStorage.setItem(LOC_STORAGE_USER_STATE, JSON.stringify(state));
    }, [state]);

    useEffect(() => {
        const updateStateFromLocalStorage = () => {
            const storedState = JSON.parse(localStorage.getItem(LOC_STORAGE_USER_STATE) || '{}');
            updateState({ ...state, ...storedState });
        };

        const totalList = list === UsersType.ACTIVE ? 'list' : 'listdeleted';
        getTotalUsersRecords(totalList).then(({ total }) => {
            setTotalRecords(total);
            const calculatedTotalPages = Math.ceil(total / state.count);
            setTotalPages(calculatedTotalPages);
            const pages = updatePageNumbers(calculatedTotalPages);
            setPageNumbers(pages);

            const updatedCurrentPage = Math.min(state.currentpage, calculatedTotalPages - 1);
            setCurrentPage(updatedCurrentPage);
            updateState({ ...state, currentpage: updatedCurrentPage });

            updateStateFromLocalStorage();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list, state.count, state.currentpage]);

    const handleSetCurrentPage = (currentpage: number): void => {
        setCurrentPage(currentpage);

        localStorage.setItem(
            LOC_STORAGE_USER_STATE,
            JSON.stringify({
                ...JSON.parse(localStorage.getItem(LOC_STORAGE_USER_STATE) || '{}'),
                currentpage,
            })
        );

        updateState({ ...state, currentpage });
    };

    const handleChangeRecordsPerPage = (count: number): void => {
        handleSetCurrentPage(0);

        localStorage.setItem(
            LOC_STORAGE_USER_STATE,
            JSON.stringify({
                ...JSON.parse(localStorage.getItem(LOC_STORAGE_USER_STATE) || '{}'),
                count,
            })
        );

        updateState({ ...state, count });
    };

    return (
        <div className='w-100 py-6 col-sm-12 col-md-7 d-flex align-items-center justify-content-center'>
            <div id='kt_table_users_paginate'>
                <ul className='pagination'>
                    <li
                        className={clsx('page-item first', {
                            disabled: isLoading || currentPage === 0,
                        })}
                    >
                        <a href='#' className='page-link' onClick={() => handleSetCurrentPage(0)}>
                            <i className='ki-outline ki-double-left fs-4'></i>
                        </a>
                    </li>
                    <li
                        className={clsx('page-item previous me-6', {
                            disabled: isLoading || currentPage === 0,
                        })}
                    >
                        <a
                            href='#'
                            className='page-link'
                            onClick={() => handleSetCurrentPage(currentPage - 1)}
                        >
                            <i className='ki-outline ki-left fs-4'></i>
                        </a>
                    </li>

                    {pageNumbers &&
                        pageNumbers.map((pageNumber) => {
                            if (
                                currentPage + VisiblePageCount > pageNumber &&
                                currentPage - VisiblePageCount < pageNumber
                            ) {
                                return (
                                    <li
                                        key={pageNumber}
                                        className={clsx('page-item', {
                                            disabled: isLoading,
                                            active: pageNumber === currentPage,
                                        })}
                                    >
                                        <a
                                            href='#'
                                            className='page-link'
                                            onClick={() => handleSetCurrentPage(pageNumber)}
                                        >
                                            {pageNumber + 1}
                                        </a>
                                    </li>
                                );
                            } else return null;
                        })}

                    <li
                        className={clsx('page-item next ms-6', {
                            disabled:
                                isLoading ||
                                currentPage === totalPages - 1 ||
                                currentPage > totalPages,
                        })}
                    >
                        <a
                            href='#'
                            className='page-link'
                            onClick={() => handleSetCurrentPage(currentPage + 1)}
                        >
                            <i className='ki-outline ki-right fs-4'></i>
                        </a>
                    </li>
                    <li
                        className={clsx('page-item last', {
                            disabled:
                                isLoading ||
                                currentPage === totalPages - 1 ||
                                currentPage > totalPages,
                        })}
                    >
                        <a
                            href='#'
                            className='page-link'
                            onClick={() => handleSetCurrentPage(totalPages - 1)}
                        >
                            <i className='ki-outline ki-double-right fs-4'></i>
                        </a>
                    </li>
                </ul>
                <div className='mt-4 text-center fs-5'>
                    <label className='d-flex w-100 align-items-center gap-4 justify-content-center '>
                        <span className='text-nowrap'>Records per page</span>
                        <Form.Select
                            aria-label='records per page'
                            className='w-50'
                            value={state.count}
                            onChange={(event) =>
                                handleChangeRecordsPerPage(Number(event.target.value))
                            }
                        >
                            {RecordsPerPageSteps.map((value) => {
                                return (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </label>
                    <div className='mt-4 text-center fs-5'>Total records: {totalRecords}</div>
                </div>
            </div>
        </div>
    );
};
