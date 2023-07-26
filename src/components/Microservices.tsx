import React, { useCallback, useEffect, useState } from 'react';
import * as MicroservicesService from './../services/microservices.service';
import { Card } from './small-components/CardComponent';
import { HeaderWrapper } from "./small-components/HeaderWrapper";

interface MCCardProps {
    services: any[];
    onRestartSerice: (id: number) => void;
}

function MCCard({ services, onRestartSerice }: MCCardProps) {
    return (
        <div>
            {services &&
                services.map((service, index) => {
                    return (
                        <Card
                            key={index}
                            name={service.name}
                            description={'Service started: ' + service.started}
                            ipv4={'Ipv4: ' + service.ipv4}
                            port={'Port: ' + service.port}
                            index={service.index}
                            uid={service.uid}
                            onRestartSerice={onRestartSerice}
                        />
                    );
                })}
        </div>
    );
}

const Microservices: React.FC = () => {
    const [listOfServices, setListOfServices] = useState<any[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    useEffect(() => {
        if (!loaded) {
            const microservices = MicroservicesService.listServices().then(
                (response) => {
                    setListOfServices(response.data);
                    setLoaded(true);
                    return response.data;
                },
                (error) => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    //setLoading(false);
                    //setMessage(resMessage);
                }
            );
        }
    }, [listOfServices]);

    const onRestartSerice = useCallback((id: number) => {
        const response = MicroservicesService.restartService(id).then((response) => {
            return response.data;
        });
    }, []);

    return (
        <div className='d-flex flex-column flex-root app-root'>
            <div className='app-page flex-column flex-column-fluid'>
                <HeaderWrapper />
                <div className='app-wrapper flex-column flex-row-fluid'>
                    <div className='app-main flex-column flex-row-fluid'>
                        <div className='d-flex flex-column flex-column-fluid'>
                            <div className='app-content flex-column-fluid py-3 py-lg-6'>
                                <div className='app-container container-fluid'>
                                    <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
                                        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                                            <div className='card card-flush'>
                                                <div className='card-header pt-5'>
                                                    <div className="card-title d-flex flex-column"><span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">357</span><span
                                                        className="text-gray-400 pt-1 fw-semibold fs-6">Professionals</span></div>
                                                </div>
                                                <div className="card-body d-flex flex-column justify-content-end pe-0">
                                                    <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">Today’s Heroes</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                                            <div className='card card-flush'>
                                                <div className='card-header pt-5'>
                                                    <div className="card-title d-flex flex-column"><span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">357</span><span
                                                        className="text-gray-400 pt-1 fw-semibold fs-6">Professionals</span></div>
                                                </div>
                                                <div className="card-body d-flex flex-column justify-content-end pe-0">
                                                    <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">Today’s Heroes</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                                            <div className='card card-flush'>
                                                <div className='card-header pt-5'>
                                                    <div className="card-title d-flex flex-column"><span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">357</span><span
                                                        className="text-gray-400 pt-1 fw-semibold fs-6">Professionals</span></div>
                                                </div>
                                                <div className="card-body d-flex flex-column justify-content-end pe-0">
                                                    <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">Today’s Heroes</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                                            <div className='card card-flush'>
                                                <div className='card-header pt-5'>
                                                    <div className="card-title d-flex flex-column"><span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">357</span><span
                                                        className="text-gray-400 pt-1 fw-semibold fs-6">Professionals</span></div>
                                                </div>
                                                <div className="card-body d-flex flex-column justify-content-end pe-0">
                                                    <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">Today’s Heroes</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                                            <div className='card card-flush'>
                                                <div className='card-header pt-5'>
                                                    <div className="card-title d-flex flex-column"><span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">357</span><span
                                                        className="text-gray-400 pt-1 fw-semibold fs-6">Professionals</span></div>
                                                </div>
                                                <div className="card-body d-flex flex-column justify-content-end pe-0">
                                                    <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">Today’s Heroes</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                                            <div className='card card-flush'>
                                                <div className='card-header pt-5'>
                                                    <div className="card-title d-flex flex-column"><span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">357</span><span
                                                        className="text-gray-400 pt-1 fw-semibold fs-6">Professionals</span></div>
                                                </div>
                                                <div className="card-body d-flex flex-column justify-content-end pe-0">
                                                    <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">Today’s Heroes</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                                            <div className='card card-flush'>
                                                <div className='card-header pt-5'>
                                                    <div className="card-title d-flex flex-column"><span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">357</span><span
                                                        className="text-gray-400 pt-1 fw-semibold fs-6">Professionals</span></div>
                                                </div>
                                                <div className="card-body d-flex flex-column justify-content-end pe-0">
                                                    <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">Today’s Heroes</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                                            <div className='card card-flush'>
                                                <div className='card-header pt-5'>
                                                    <div className="card-title d-flex flex-column"><span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">357</span><span
                                                        className="text-gray-400 pt-1 fw-semibold fs-6">Professionals</span></div>
                                                </div>
                                                <div className="card-body d-flex flex-column justify-content-end pe-0">
                                                    <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">Today’s Heroes</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                                            <div className='card card-flush'>
                                                <div className='card-header pt-5'>
                                                    <div className="card-title d-flex flex-column"><span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">357</span><span
                                                        className="text-gray-400 pt-1 fw-semibold fs-6">Professionals</span></div>
                                                </div>
                                                <div className="card-body d-flex flex-column justify-content-end pe-0">
                                                    <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">Today’s Heroes</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                                            <div className='card card-flush'>
                                                <div className='card-header pt-5'>
                                                    <div className="card-title d-flex flex-column"><span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">357</span><span
                                                        className="text-gray-400 pt-1 fw-semibold fs-6">Professionals</span></div>
                                                </div>
                                                <div className="card-body d-flex flex-column justify-content-end pe-0">
                                                    <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">Today’s Heroes</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<MCCard onRestartSerice={onRestartSerice} services={listOfServices} />*/}
            </div>
        </div>
    );
};

export default Microservices;
