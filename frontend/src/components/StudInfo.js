import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Importing the AuthContext
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StudInfo = () => {
    const { userId } = useAuth(); // Destructure to get userId from AuthContext
    const [studentDetails, setStudentDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5001/users/role/student/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Assuming you're using Bearer token for authentication
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch student details');
                }

                const data = await response.json();
                setStudentDetails(data);
            } catch (error) {
                console.error('Error fetching student details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchStudentDetails();
        }
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (!studentDetails) return <div>No student details found.</div>;

    return (
        <div>
            <h2>Student Details</h2>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tables" align="center"><strong>Full Name</strong></TableCell>
                            <TableCell className="tables" align="center"><strong>Email</strong></TableCell>
                            <TableCell className="tables" align="center"><strong>Address</strong></TableCell>
                            <TableCell className="tables" align="center"><strong>Phone Number</strong></TableCell>
                            <TableCell className="tables" align="center"><strong>Subjects Studied</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">{studentDetails.fullName}</TableCell>
                            <TableCell align="center">{studentDetails.email}</TableCell>
                            <TableCell align="center">{studentDetails.address}</TableCell>
                            <TableCell align="center">{studentDetails.phoneNumber}</TableCell>
                            <TableCell align="center">
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {studentDetails.subjectsStudied.map(subject => (
                                    <li key={subject._id}>{subject.subjectName} - Marks: {subject.marks}</li>
                                ))}
                            </ul>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default StudInfo;
