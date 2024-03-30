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
        <form className="user-form" onSubmit={handleSubmit}>
    <div className="form-group">
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
    </div>
    <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
    </div>
    <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
    </div>
    <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
    </div>
    <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
    </div>
    <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
    </div>
    <div className="form-group">
        <label htmlFor="dateJoined">Date Joined:</label>
        <input type="date" id="dateJoined" name="dateJoined" value={formData.dateJoined} onChange={handleChange} />
    </div>
    <div className="form-group">
        <label htmlFor="roles">Roles:</label>
        <select id="roles" name="roles" value={formData.roles} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
        </select>
    </div>
    <button className="add-user-button" type="submit">Add User</button>
</form>


    );
}

export default AddUserForm;
