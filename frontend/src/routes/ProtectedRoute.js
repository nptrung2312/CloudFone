import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const session = sessionStorage.getItem('account');
    return session ? children : <Navigate to="/" />;
};

export default ProtectedRoute;