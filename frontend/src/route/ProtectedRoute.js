// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        // Optionally, provide feedback to the user that the app is loading
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/signin" />;
    }

    return children;
};

export default ProtectedRoute;
