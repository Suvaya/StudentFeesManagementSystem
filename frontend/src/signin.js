// src/SignIn.js
import React, { useState } from "react";

const SignIn = () => {
    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted", userInput);
            // Implement your submit logic here, e.g., making an API call
        }
    };

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        // Email validation: Check if the email is provided and ends with "@gmail.com"
        if (!userInput.username) {
            formIsValid = false;
            errors["username"] = "*Please enter your email.";
        } else if (!/^[^@\s]+@gmail\.com$/.test(userInput.username)) {
            formIsValid = false;
            errors["username"] =
                "*Please enter a valid email ending with @gmail.com.";
        }

        // Password validation: Check if the password is provided and contains at least one lowercase letter
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
        <div className="login-form">
            
            <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
                <div >
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
    );
};

export default SignIn;
