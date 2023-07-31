import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import {
    getServiceAlerts,
    getServiceAudit,
    getServiceById,
    getServiceCounters,
    getServiceLogs,
    Microservice,
} from './service'
import clsx from 'clsx'
import { ActionStatus } from '../../../common/models'

export function MicroserviceCard() {
    const { uid } = useParams()
    const [tab, setTab] = useState('State')
    const [logs, setLogs] = useState<ActionStatus | null>(null)
    const [audit, setAudit] = useState<ActionStatus | null>(null)
    const [alerts, setAlerts] = useState<ActionStatus | null>(null)
    const [counters, setCounters] = useState<ActionStatus | null>(null)
    const [microserviceData, setMicroservice] = useState<Microservice | null>(null)

    useEffect(() => {
        if (uid) {
            getServiceById(uid).then((response) => {
                if (response) {
                    setMicroservice(response)
                }
            })
            getServiceLogs(uid).then((response) => {
                if (response) {
                    setLogs(response)
                }
            })
            getServiceAudit(uid).then((response) => {
                if (response) {
                    setAudit(response)
                }
            })
            getServiceAlerts(uid).then((response) => {
                if (response) {
                    setAlerts(response)
                }
            })
            getServiceCounters(uid).then((response) => {
                if (response) {
                    setCounters(response)
                }
            })
        }
    }, [uid])
    return (
        <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
            <div className='col-12'>
                <div className='card card-custom mb-5'>
                    <div className='card-header'>
                        <h3 className='card-title fw-bolder text-dark'>{microserviceData?.name}</h3>
                    </div>
                    <div className='card-body d-flex flex-column justify-content-end pb-0'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === 'State',
                                    })}
                                    onClick={() => setTab('State')}
                                    role='tab'
                                >
                                    State
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === 'Logs',
                                    })}
                                    onClick={() => setTab('Logs')}
                                    role='tab'
                                >
                                    Logs
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === 'Audit',
                                    })}
                                    onClick={() => setTab('Audit')}
                                    role='tab'
                                >
                                    Audit
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === 'Alerts',
                                    })}
                                    onClick={() => setTab('Alerts')}
                                    role='tab'
                                >
                                    Alerts
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'Counters',
                                    })}
                                    onClick={() => setTab('Counters')}
                                    role='tab'
                                >
                                    Counters
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='card card-custom'>
                    <div className='card-body'>
                        <div className='tab-content' id='myTabContent'>
                            <div
                                className={clsx('tab-pane', { active: tab === 'State' })}
                                id='kt_tab_pane_1'
                                role='tabpanel'
                            >
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                            Heartbit
                                        </span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.heartbit}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                            Index
                                        </span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.index}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                            IP address
                                        </span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.ipv4}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                            Port
                                        </span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.port}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                            Started
                                        </span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.started}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                            Status
                                        </span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.status}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                            Type
                                        </span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.type}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                            Type i
                                        </span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.type_i}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                            UID
                                        </span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.uid}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                            Version
                                        </span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.version}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'Logs' })}
                                id='kt_tab_pane_2'
                                role='tabpanel'
                            >
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                            Status
                                        </span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {logs?.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'Audit' })}
                                id='kt_tab_pane_3'
                                role='tabpanel'
                            >
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                            Status
                                        </span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {audit?.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'Alerts' })}
                                id='kt_tab_pane_3'
                                role='tabpanel'
                            >
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                            Status
                                        </span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {alerts?.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'Counters' })}
                                id='kt_tab_pane_3'
                                role='tabpanel'
                            >
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                            Status
                                        </span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {counters?.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
