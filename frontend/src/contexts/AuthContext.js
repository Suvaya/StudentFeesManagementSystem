import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState(""); // Add user ID state

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('role');
        const storedUserId = localStorage.getItem('userId'); // Fetch user ID from storage
        setIsLoggedIn(!!token);
        if (token) {
            setUsername(storedUsername);
            setRole(storedRole);
            setUserId(storedUserId); // Set user ID
        }
        setLoading(false);
    }, []);

    const login = (token, username, userRole, userId) => { // Accept userId as an argument
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', userRole);
        localStorage.setItem('userId', userId); // Store user ID
        setIsLoggedIn(true);
        setUsername(username);
        setRole(userRole);
        setUserId(userId); // Update state
        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('userId'); // Remove user ID from storage
        setIsLoggedIn(false);
        setUsername("");
        setRole("");
        setUserId(""); // Clear user ID state
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, loading, login, logout, username, role, userId }}>
            {children}
        </AuthContext.Provider>
    );
};
