import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import LoginPage from '../pages/LoginPage';
import DelegateRegistration from '../pages/DelegateRegistration';
import ExhibitorEnquiry from '../pages/ExhibitorEnquiry';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/" element={<Navigate to="/delegates" replace />} />
                    <Route path="/delegates" element={<DelegateRegistration />} />
                    <Route path="/enquiries" element={<ExhibitorEnquiry />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
