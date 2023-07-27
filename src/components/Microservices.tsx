import React, {useCallback, useEffect, useState} from 'react';
import * as MicroservicesService from './../services/microservices.service';
import {HeaderWrapper} from "./small-components/HeaderWrapper";

interface MCCardProps {
    services: any[];
    onRestartService: (id: number) => void;
}

function MCCard({services, onRestartService}: MCCardProps) {
    return (
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-4'>
            {services &&
                services.map((service, index) => {
                    return (
                        <div key={service.uid} className='card card-custom'>
                            <div className='card-header pt-5'>
                                <h3 className="card-title fw-bold text-dark">{service.name}</h3>
                            </div>
                            <div className='card-body d-flex flex-column justify-content-end pe-0'>
                                <span
                                    className='fs-6 fw-bolder text-gray-800 d-block mb-2'>Service started: {service.started}</span>
                                <span
                                    className='fs-6 fw-bolder text-gray-800 d-block mb-2'>Ipv4: {service.ipv4}</span>
                                <span
                                    className='fs-6 fw-bolder text-gray-800 d-block mb-2'>Port: {service.port}</span>
                            </div>
                            <div className="card-footer">
                                <button className='btn btn-info me-2'>Get Data</button>
                                <button onClick={() => onRestartService(service.index)}
                                        className='btn btn-warning'>Restart
                                </button>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

function Microservices() {
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
                }
            );
        }
    }, [listOfServices]);

    const onRestartService = useCallback((id: number) => {
        const response = MicroservicesService.restartService(id).then((response) => {
            return response.data;
        });
    }, []);

    return (
        <div className='d-flex flex-column flex-root app-root'>
            <div className='app-page flex-column flex-column-fluid'>
                <HeaderWrapper/>
                <div className='app-wrapper flex-column flex-row-fluid'>
                    <div className='app-main flex-column flex-row-fluid'>
                        <div className='d-flex flex-column flex-column-fluid'>
                            <div className='app-content flex-column-fluid py-3 py-lg-6'>
                                <div className='app-container container-fluid'>
                                    <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
                                        <MCCard onRestartService={onRestartService} services={listOfServices}/>
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

export default Microservices;
