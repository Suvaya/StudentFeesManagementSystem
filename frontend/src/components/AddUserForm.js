import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddUserForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: '',
        dateJoined: '',
        roles: 'student', // Default role
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
        // Since roles is a single choice from the dropdown, wrap it in an array for consistency with the backend expectation
        const submitData = {
            ...formData,
            roles: [formData.roles],
            dateJoined: formData.dateJoined ? new Date(formData.dateJoined).toISOString() : undefined,
        };

        try {
            const response = await fetch('http://localhost:5001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Network response was not ok');
            }

            alert('User added successfully');
            navigate('/users');
        } catch (error) {
            console.error('Failed to add user:', error);
            alert(`Error adding user: ${error.message}`);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Full Name:
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </label>
            </div>
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
                <label>Address:
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>Phone Number:
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>Date Joined:
                    <input type="date" name="dateJoined" value={formData.dateJoined} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>Roles:
                    <select name="roles" value={formData.roles} onChange={handleChange}>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </label>
            </div>
            <button type="submit">Add User</button>
        </form>
    );
}

export default AddUserForm;
