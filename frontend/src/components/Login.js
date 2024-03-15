import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, role } = response.data;

            // Save the token in localStorage or cookies as per your requirement
            localStorage.setItem('token', token);

            // Route based on role
            if (role.includes('teacher')) {
                navigate('/teachers');
            } else {
                navigate('/students');
            }
        } catch (error) {
            console.error('Login error', error.response.data);
            // Handle login error (e.g., show an error message)
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LogIn;
