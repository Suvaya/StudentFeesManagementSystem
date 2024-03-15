import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    // Function to check the token and update login status
    const checkLoginStatus = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAdminLoggedIn(true);
        } else {
            setIsAdminLoggedIn(false);
        }
    };

    useEffect(() => {
        // Check login status when the component mounts
        checkLoginStatus();
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAdminLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAdminLoggedIn(false);
    };

    const value = {
        isAdminLoggedIn,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
