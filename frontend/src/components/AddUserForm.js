import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddUserForm() {
    const navigate = useNavigate(); // For navigation after form submission
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        roles: 'student',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Convert roles string to array if not empty, otherwise default to an empty array
        const submitData = {
            ...formData,
            roles: formData.roles ? formData.roles.split(',') : [],
        };

        try {
            const response = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });

            const data = await response.json(); // Parse JSON response

            if (!response.ok) {
                throw new Error(data.message || 'Network response was not ok');
            }

            alert('User added successfully');
            navigate('/students'); // Redirect to the students page or another appropriate page
        } catch (error) {
            console.error('Failed to add user:', error);
            alert(`Error adding user: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>Roles (comma-separated):
                    <input type="text" name="roles" value={formData.roles} onChange={handleChange} placeholder="e.g., admin,user" />
                </label>
            </div>
            <button type="submit">Add User</button>
        </form>
    );
}

export default AddUserForm;
