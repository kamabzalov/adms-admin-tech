import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';

import Microservices from './components/Microservices';

const App: React.FC = () => {
    return (
        <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden w-100 min-vh-100">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/microservices" element={<Microservices />} />
            </Routes>
        </div>
    );
};

export default App;
