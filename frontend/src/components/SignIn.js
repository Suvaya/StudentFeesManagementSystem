import React, { useState } from "react";

const SignIn = () => {
    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState(""); // Added state for login errors

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('backend/routes/userRoutes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userInput),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Login successful', data);
                    // Handle successful login here (e.g., redirect, store auth token)
                } else {
                    console.error('Login failed', data);
                    setLoginError("Login failed. Please check your credentials and try again."); // Now correctly updates the loginError state
                }
            } catch (error) {
                console.error('Login request failed', error);
                setLoginError("Error occurred while logging in. Please try again later."); // Now correctly updates the loginError state
            }
        }
    };

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        // Add your validation logic here

        setErrors(errors);
        return formIsValid;
    };

    return (
        <div className="signin-page">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h2>Sign In</h2>
                    {loginError && <div className="error">{loginError}</div>}
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={userInput.username}
                            onChange={handleChange}
                        />
                        <div className="error">{errors.username}</div>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={userInput.password}
                            onChange={handleChange}
                        />
                        <div className="error">{errors.password}</div>
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>

        </div>
    );
};

export default SignIn;
