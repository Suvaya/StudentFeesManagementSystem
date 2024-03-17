import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditUserForm() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '', // To change the password, the user has to enter a new one
        address: '',
        phoneNumber: '',
        dateJoined: '',
        roles: '', // Assuming a single role for simplification
    });

    useEffect(() => {
        fetch(`http://localhost:5000/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                const formattedDate = data.dateJoined ? new Date(data.dateJoined).toISOString().split('T')[0] : '';
                const primaryRole = data.roles && data.roles.length > 0 ? data.roles[0] : '';
                setFormData({
                    fullName: data.fullName || '',
                    username: data.username,
                    email: data.email,
                    address: data.address || '',
                    phoneNumber: data.phoneNumber || '',
                    dateJoined: formattedDate,
                    roles: primaryRole,
                    // Note: Password is intentionally left blank for security reasons
                });
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, [userId]); // Dependency array ensures this effect runs only once on mount

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitData = {
            ...formData,
            roles: [formData.roles], // Adjust based on backend expectations
            password: formData.password !== '' ? formData.password : undefined, // Only send password if changed
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
            navigate('/users'); // Redirect back to the user list or appropriate page
        } catch (error) {
            console.error('Failed to update user:', error);
            alert(`Error updating user: ${error.message}`);
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
                <label>Password (leave blank if unchanged):
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>Address:
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>Phone Number:
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>Date Joined:
                    <input type="date" name="dateJoined" value={formData.dateJoined} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>Roles:</label>
                <select name="roles" value={formData.roles} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
            </div>
            <button type="submit">Update User</button>
        </form>
    );
}

export default EditUserForm;
