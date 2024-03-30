import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [editingId, setEditingId] = useState(null); // Holds the ID of the teacher being edited
    const [editFormData, setEditFormData] = useState({ subjectsTaught: [], salary: '' });

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch('http://localhost:5001/users/role/teacher');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchTeachers();
    }, []);

    const handleEditClick = (teacher) => {
        setEditingId(teacher._id);
        setEditFormData({
            subjectsTaught: teacher.subjectsTaught,
            salary: teacher.salary
        });
    };

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({
            ...editFormData,
            [name]: name === 'subjectsTaught' ? value.split(',') : value
        });
    };

    const handleEditFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5001/users/${editingId}/updateFields`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editFormData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedTeachers = [...teachers];
            const index = teachers.findIndex((teacher) => teacher._id === editingId);
            updatedTeachers[index] = { ...updatedTeachers[index], ...editFormData };
            setTeachers(updatedTeachers);
            setEditingId(null); // Exit editing mode
        } catch (error) {
            console.error('Failed to update teacher:', error);
        }
    };

    return (
        <TableContainer className='Teachertable'>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Full Name</TableCell>
                        <TableCell align='center'>Email</TableCell>
                        <TableCell align='center'>Address</TableCell>
                        <TableCell align='center'>Phone Number</TableCell>
                        <TableCell align='center'>Subjects Taught</TableCell>
                        <TableCell align='center'>Salary</TableCell>
                        <TableCell align='center'>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teachers.map((teacher) => (
                        <TableRow key={teacher._id}>
                            <TableCell align='center'>{teacher.fullName}</TableCell>
                            <TableCell align='center'>{teacher.email}</TableCell>
                            <TableCell align='center'>{teacher.address}</TableCell>
                            <TableCell align='center'>{teacher.phoneNumber}</TableCell>
                            <TableCell align='center'>
                                {editingId === teacher._id ? (
                                    <Input
                                        type="text"
                                        name="subjectsTaught"
                                        value={editFormData.subjectsTaught.join(',')}
                                        onChange={handleEditFormChange}
                                    />
                                ) : (
                                    teacher.subjectsTaught.join(', ')
                               )}
                            </TableCell>
                            <TableCell align='center'>
                                {editingId === teacher._id ? (
                                    <Input
                                        type="number"
                                        name="salary"
                                        value={editFormData.salary}
                                        onChange={handleEditFormChange}
                                    />
                                ) : (
                                    `$${teacher.salary}`
                                )}
                            </TableCell>
                            <TableCell align='center'>
                                {editingId === teacher._id ? (
                                    <Button variant="contained" color="primary" onClick={handleEditFormSubmit}>Save</Button>
                                ) : (
                                    <Button variant="contained" color="primary" onClick={() => handleEditClick(teacher)}>Edit</Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Teachers;
