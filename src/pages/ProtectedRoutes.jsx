import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {

    // Checking for the token in localStorage
    const token = localStorage.getItem('token');

    if (!token) {
        toast.error('You must be logged in to access this page.');
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;

