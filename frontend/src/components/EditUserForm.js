import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditUserForm() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '', // Note on handling passwords below
        roles: '',
    });

    useEffect(() => {
        fetch(`http://localhost:5000/users/${userId}`)
            .then(response => response.json())
            .then(data => setFormData({
                username: data.username,
                email: data.email,
                roles: data.roles.join(','), // Assuming roles is an array
            }))
            .catch(error => console.error('Error fetching user data:', error));
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Convert roles string to array if not empty
        const submitData = {
            ...formData,
            roles: formData.roles ? formData.roles.split(',') : [],
        };

        try {
            const response = await fetch(`http://localhost:5000/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('User updated successfully');
            navigate('/users'); // Navigate back to the users list
        } catch (error) {
            console.error('Failed to update user:', error);
            alert(`Error updating user: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Roles (comma-separated):
                    <input type="text" name="roles" value={formData.roles} onChange={handleChange} />
                </label>
            </div>
            <button type="submit">Update User</button>
        </form>
    );
}

export default EditUserForm;
