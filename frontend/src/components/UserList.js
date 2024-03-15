import React, { useState, useEffect } from 'react';

import {Link, useNavigate} from "react-router-dom";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Function stubs for edit and delete actions
    const handleEdit = (userId) => {
        navigate(`/edit-user/${userId}`); // Redirects to the edit form
    };

    const handleDelete = (userId) => {
        // Confirm before deleting
        if (window.confirm("Are you sure you want to delete this user?")) {
            fetch(`http://localhost:5000/users/${userId}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // Refresh the list of users or remove the user from state
                    setUsers(users.filter(user => user._id !== userId));
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                    // Optionally, update the UI to show an error message
                });
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>User List</h2>
            <table>
                <thead>
                <tr>
                    <th>S.N.</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => handleEdit(user._id)}>Edit</button>
                            <button onClick={() => handleDelete(user._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
