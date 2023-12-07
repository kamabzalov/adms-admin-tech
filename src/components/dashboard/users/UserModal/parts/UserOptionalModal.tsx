import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { getUserLocations, setUserOptionalData } from 'components/dashboard/users/user.service';
import { deepEqual } from 'components/dashboard/helpers/common';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { AxiosError } from 'axios';
import { renamedKeys } from 'common/app-consts';
import { Status } from 'common/interfaces/ActionStatus';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import clsx from 'clsx';

type Optional = Record<string, string | number>[];

interface UserOptionalModalProps {
    onClose: () => void;
    useruid: string;
    username: string;
}

const hiddenKeys: readonly ['locationuid', ...string[]] = ['locationuid', 'useruid', 'index'];
const disabledKeys: readonly string[] = ['useruid', 'created', 'updated'];

const [locationuid] = hiddenKeys;
export const UserOptionalModal = ({
    onClose,
    useruid,
    username,
}: UserOptionalModalProps): JSX.Element => {
    const [optional, setOptional] = useState<Optional>([]);
    const [initialUserOptional, setInitialUserOptional] = useState<
        Record<string, string | number>[]
    >([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [locationKeys, setLocationKeys] = useState<string[]>([]);

    const { handleShowToast } = useToast();

    const UserOptionalSchema = Yup.object().shape({
        locEmail1: Yup.string().email('Please enter valid email address'),
        locEmail2: Yup.string().email('Please enter valid email address'),
        locPhone1: Yup.string().matches(/^[\d-]{10,16}$/, {
            message: 'Please enter a valid number with only digits/dashes.',
            excludeEmptyString: false,
        }),
        locPhone2: Yup.string().matches(/^[\d-]{10,16}$/, {
            message: 'Please enter a valid number with only digits/dashes.',
            excludeEmptyString: false,
        }),
        locZIP: Yup.string().matches(/^\d{5}$/, 'Please enter a valid 5-digit ZIP'),
    });

    const userOptionalValidateFields = Object.keys(UserOptionalSchema.fields);

    useEffect(() => {
        const isEqual = deepEqual(initialUserOptional, optional);
        if (!isEqual && !isLoading) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [optional, initialUserOptional, isLoading]);

    const handleChangeUserOptional = useCallback(
        (event: ChangeEvent<HTMLInputElement>, index: number) => {
            const { name, value } = event.target;
            optional[index][name] = value;

            setOptional([...optional]);
        },
        [optional]
    );

    const handleSetUserOptional = async (): Promise<void> => {
        setIsLoading(true);
        if (useruid) {
            const filteredOptional = optional.map((item, index) => {
                const filteredItem = { ...item };
                disabledKeys.forEach((key) => {
                    delete filteredItem[key];
                });
                filteredItem[locationuid] = locationKeys[index];

                return filteredItem;
            });
            const newOptional = { locations: filteredOptional };
            try {
                const response = await setUserOptionalData(useruid, newOptional);
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${username}</strong> optional data successfully saved`,
                        type: 'success',
                    });
                    onClose();
                }
            } catch (err) {
                const { message } = err as Error | AxiosError;
                handleShowToast({ message, type: 'danger' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (!optional) {
        return <></>;
    }

    return (
        <>
            {optional.map((option: any, index: number) => (
                <Formik
                    initialValues={option}
                    onSubmit={handleSetUserOptional}
                    validationSchema={UserOptionalSchema}
                >
                    {({ errors, touched }) => (
                        <Form>
                            {(Object.entries(option) as [string, string | number][]).map(
                                ([setting]) => {
                                    const settingName = renamedKeys[setting] || setting;
                                    return (
                                        <div className='fv-row mb-4' key={setting}>
                                            <div className='row'>
                                                <div className='col-6 d-flex align-items-center'>
                                                    <label
                                                        htmlFor={setting}
                                                        className='fs-6 fw-bolder text-dark'
                                                    >
                                                        {settingName}
                                                        {touched[setting] && errors[setting] && (
                                                            <div className='fv-plugins-message-container position-absolute'>
                                                                <div className='fv-help-block'>
                                                                    <span role='alert'>
                                                                        {String(errors[setting])}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </label>
                                                </div>
                                                <div className='col-6 d-flex align-items-center'>
                                                    <Field
                                                        key={setting}
                                                        autoComplete='off'
                                                        disabled={disabledKeys.includes(setting)}
                                                        className={clsx(
                                                            'form-control bg-transparent',
                                                            userOptionalValidateFields.includes(
                                                                setting
                                                            ) && {
                                                                ...{
                                                                    'border-danger':
                                                                        touched[setting] &&
                                                                        errors[setting],
                                                                },
                                                                ...{
                                                                    'border-secondary':
                                                                        touched[setting] &&
                                                                        !errors[setting],
                                                                },
                                                            }
                                                        )}
                                                        name={setting}
                                                        onChange={(
                                                            event: ChangeEvent<HTMLInputElement>
                                                        ) => handleChangeUserOptional(event, index)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                            <div className='text-center mb-0'>
                                <PrimaryButton
                                    icon='check'
                                    disabled={isButtonDisabled || !!Object.keys(errors).length}
                                    type='submit'
                                >
                                    Save {username} optional data
                                </PrimaryButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            ))}
        </>
    );
};
