import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
    const { isAdminLoggedIn, logout } = useContext(AuthContext); // Destructure logout here

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {isAdminLoggedIn && (
                        <>
                            <li><Link to="/students">Students</Link></li>
                            <li><Link to="/teachers">Teachers</Link></li>
                            <li><Link to="/add-user">Add User</Link></li>
                            {/* Logout Button */}
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                    )}
                    {!isAdminLoggedIn && (
                        <li><Link to="/signin">Sign In</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
