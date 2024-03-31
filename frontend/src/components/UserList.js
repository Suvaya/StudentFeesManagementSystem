import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

function UserList({ role }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5001/users')
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

    const handleEdit = (userId) => {
        navigate(`/edit-user/${userId}`);
    };

    const handleDelete = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            fetch(`http://localhost:5001/users/${userId}`, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    setUsers(users.filter(user => user._id !== userId));
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className='usertab'><h2>{role.charAt(0).toUpperCase() + role.slice(1)} List</h2></div>
            <TableContainer className="usertab">
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='userstable'>S.N.</TableCell>
                            <TableCell className='userstable'>Username</TableCell>
                            <TableCell className='userstable'>Email</TableCell>
                            <TableCell className='userstable'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.filter(user => user.role === role || (Array.isArray(user.roles) && user.roles.includes(role))).map((user, index) => (
                            <TableRow key={user._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(user._id)}>Edit</Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(user._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default UserList;
