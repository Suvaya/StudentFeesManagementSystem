import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Importing the AuthContext
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import sms from "../images/student.png"; 
import ".//../App.css";

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

    // Function to calculate percentage
    const calculatePercentage = () => {
        if (!studentDetails) return 0;

        let totalMarks = studentDetails.subjectsStudied.reduce((total, subject) => total + subject.marks, 0);
        let totalSubjects = studentDetails.subjectsStudied.length;
        // let percentage = (totalMarks / ((totalSubjects-1) * 100)) * 100;
        let percentage = (totalMarks / (totalSubjects * 100)) * 100;
        return percentage.toFixed(2);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) return <div>Loading...</div>;
    if (!studentDetails) return <div>No student details found.</div>;

    return (
        <div>
            <h1 className='Studtable1'>Dashboard</h1>
            <div className="forname" style={{ position: 'relative' }}>
                <div className="left">
                  <span className="counter2">{formatDate(new Date())}</span>
                  <span className="title1">Welcome Back, {studentDetails.fullName}</span>
                  <span className="link">Always stay updated in your student portal</span>
                </div>
                <img src={sms} alt="Description" className="image-end" />
            </div>

            <div style={{ display: 'flex' }}>
                <div className="widget">
                    <div className="left">
                        <span className="title">Rs.</span>
                        <span className="counter">{studentDetails.fees}</span>
                        <span className="link">Fee:</span>
                    </div>
                </div>
                <div className="widget1">
                    <div className="left">
                        <span className="title">No. of Subject</span>
                        <span className="counter1">{studentDetails.subjectsStudied.length}</span>
                        <span className="link"></span>
                    </div>
                </div>
                <div className="widget1">
                    <div className="left">
                        <span className="title">Percentage</span>
                        <span className="counter">{calculatePercentage()}%</span>
                        <span className="link"></span>
                    </div>
                </div>
            </div>
            <h2 className='Studtable1'><center>Student Details and Marks</center></h2>
            <TableContainer className='Studtable'>
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
                            <TableCell>
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
