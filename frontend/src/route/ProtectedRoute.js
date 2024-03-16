// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        // Redirect to the sign-in page if not logged in
        return <Navigate to="/signin" />;
    }

    return children;
};

export default ProtectedRoute;