import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MicroserviceCard } from 'components/dashboard/microservices/MicroserviceCard';
import { Microservices } from 'components/dashboard/microservices/Microservices';
import { UserCard } from 'components/dashboard/users/UserCard';
import { Login } from 'components/Login';
import { MenuComponent } from '_metronic/assets/ts/components';
import { Users } from 'components/dashboard/users/Users';
import { PrivateRouter } from 'router/privateRouter';
import { useAuthInterceptor } from 'common/auth.interceptor';
import { DataImport } from 'components/dashboard/common/DataImport';
import { TemplatesReports } from 'components/dashboard/common/TemplatesReports';
import { TemplatesPrinted } from 'components/dashboard/common/TemplatesPrinted';

export function MasterInit() {
    const pluginsInitialization = () => {
        setTimeout(() => {
            MenuComponent.bootstrap();
        }, 1500);
    };

    useEffect(() => {
        pluginsInitialization();
    }, []);

    return <></>;
}

const Content = () => {
    useAuthInterceptor();
    return (
        <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
            <MasterInit />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/dashboard' element={<PrivateRouter />}>
                    <Route path='' element={<Microservices />} />
                    <Route path='microservices/:uid' element={<MicroserviceCard />} />
                    <Route path='users' element={<Users />} />
                    <Route path='data-import' element={<DataImport />} />
                    <Route path='template-reports' element={<TemplatesReports />} />
                    <Route path='template-printed' element={<TemplatesPrinted />} />
                    <Route path='user/:id' element={<UserCard />} />
                </Route>
            </Routes>
        </div>
    );
};

export default Content;
