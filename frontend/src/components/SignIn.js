import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    // Define loginError state variable and its updater function setLoginError
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Clear any previous login errors
        setLoginError("");
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/login', { email: userInput.username, password: userInput.password });
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
                {/* Display login error if present */}
                {loginError && <div className="error login-error">{loginError}</div>}
            </div>
        </div>
    );
};

export default SignIn;