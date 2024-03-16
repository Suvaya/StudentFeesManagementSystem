import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState(""); // Initialize role state

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('role'); // Retrieve role from localStorage
        setIsLoggedIn(!!token);
        if (token) {
            setUsername(storedUsername);
            setRole(storedRole); // Set role if token exists
        }
    }, []);

    const login = (token, username, userRole) => { // Include userRole parameter
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', userRole); // Store role in localStorage
        setIsLoggedIn(true);
        setUsername(username);
        setRole(userRole); // Update role state
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role'); // Clear role from localStorage
        setIsLoggedIn(false);
        setUsername("");
        setRole(""); // Reset role state
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, username, role }}>
            {children}
        </AuthContext.Provider>
    );
};
