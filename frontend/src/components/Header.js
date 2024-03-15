import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/signin'); // Redirect user to the sign-in page after logout
    };

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/students">Students</Link></li>
                            <li><Link to="/add-user">Add User</Link></li>
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <li><Link to="/signin">Sign In</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;