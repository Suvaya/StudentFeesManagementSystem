import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('role');
        setIsLoggedIn(!!token);
        if (token) {
            setUsername(storedUsername);
            setRole(storedRole);
        }
        setLoading(false); // Set loading to false after check
    }, []);

    const login = (token, username, userRole) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', userRole);
        setIsLoggedIn(true);
        setUsername(username);
        setRole(userRole);
        setLoading(false); // Ensure loading is false
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        setUsername("");
        setRole("");
        setLoading(false); // Ensure loading is false
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, loading, login, logout, username, role }}>
            {children}
        </AuthContext.Provider>
    );
};
