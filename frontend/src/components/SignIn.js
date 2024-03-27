import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext"; // Update the path according to your file structure

const SignIn = () => {
    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    // Use the login function from the AuthContext
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/login', { email: userInput.username, password: userInput.password });
                const { token, role, username, userId } = response.data;

                // Store the token in localStorage or any other secure storage
                localStorage.setItem('token', token);

                // Use the login function from the AuthContext instead of directly interacting with localStorage
                login(token, username, role, userId);

                // Route based on role
                let targetRoute = '/';
                window.location.href = targetRoute;
            } catch (error) {
                console.error('Login error', error.response.data);
                setLoginError("Login failed. Please check your credentials and try again.");
            }
        }
    };

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        if (!userInput.username) {
            formIsValid = false;
            errors["username"] = "*Please enter your email.";
        }

        if (!userInput.password) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        setErrors(errors);
        return formIsValid;
    };

    return (
        <div className="signin-page">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h2>Sign In</h2>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="username"
                            value={userInput.username}
                            onChange={handleChange}
                            required
                        />
                        {errors.username && <div className="error">{errors.username}</div>}
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={userInput.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>
                    <button type="submit">Sign In</button>
                </form>
                {loginError && <div className="error login-error">{loginError}</div>}
            </div>
        </div>
    );
};

export default SignIn;
