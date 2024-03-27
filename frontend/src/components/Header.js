import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"; // Update the path according to your file structure

const Header = () => {
    const { isLoggedIn, logout, username, role, userId } = useAuth(); // Assuming role is also provided by useAuth
    console.log("Current user role:", role);
    console.log("Current username:", username);
    console.log("Current UserId:", userId);
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {role === 'admin' && (
                        <>
                            <li><Link to="/users">Users</Link></li>
                            <li><Link to="/teachers">Teachers</Link></li>
                            <li><Link to="/people">People</Link></li>
                            <li><Link to="/add-user">Add User</Link></li>
                        </>
                    )}
                    {role === 'teacher' && (
                        <>
                            <li><Link to="/students">Students</Link></li>
                            <li><Link to="/teachinfo">Profile</Link></li>

                        </>
                    )}
                    {role === 'student' && (
                        <>
                            <li><Link to="/studinfo">Profile</Link></li>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <li>{username}</li>
                            <button onClick={logout}>Logout</button>
                        </>
                    )}
                    {!isLoggedIn && (
                        <li><Link to="/signin">Sign In</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
