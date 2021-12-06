/*libs*/
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ auth, isLoginPage }) => {
    if (isLoginPage) {
        return auth ? <Navigate to="/" /> : <Outlet />;
    } else {
        return auth ? <Outlet /> : <Navigate to="/login" />;
    }
}

export default PrivateRoute;