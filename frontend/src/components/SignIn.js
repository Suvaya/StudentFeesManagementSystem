import React, { useState } from "react";

const SignIn = () => {
    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    // Define loginError state variable and its updater function setLoginError
    const [loginError, setLoginError] = useState("");

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
                    setLoginError("Login failed. Please check your credentials and try again.");
                }
            } catch (error) {
                console.error('Login request failed', error);
                setLoginError("Error occurred while logging in. Please try again later.");
            }
        }
    };

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        if (!userInput.username) {
            formIsValid = false;
            errors["username"] = "*Please enter your email.";
        } else if (!/^[^@\s]+@gmail\.com$/.test(userInput.username)) {
            formIsValid = false;
            errors["username"] =
                "*Please enter a valid email ending with @gmail.com.";
        }

        if (!userInput.password) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        } else if (!/(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/.test(userInput.password)) {
            formIsValid = false;
            errors["password"] = "*Password must contain at least one lowercase letter, one number, and one special character.";
        }

        setErrors(errors);
        return formIsValid;
    };

    return (
        <div className="signin-page">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h2>Sign In</h2>
                    {/* Form fields remain unchanged */}
                    <button type="submit">Sign In</button>
                </form>
                {/* Display login error if present */}
                {loginError && <div className="error login-error">{loginError}</div>}
            </div>
        </div>
    );
};

export default SignIn;
