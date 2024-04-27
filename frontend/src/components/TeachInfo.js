import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import sms from "../images/student.png"; 

// const apiUrl = process.env.REACT_APP_API_URL;

const TeachInfo = () => {
    const { userId } = useAuth();
    const [teacherDetails, setTeacherDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeacherDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5001/users/role/teacher/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch teacher details');
                }

                const data = await response.json();
                setTeacherDetails(data);
            } catch (error) {
                console.error('Error fetching teacher details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchTeacherDetails();
        }
    }, [userId]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) return <div>Loading...</div>;
    if (!teacherDetails) return <div>No teacher details found.</div>;

    return (
        <div>
            <h1 className='Studtable1'>Dashboard</h1>
            <div className="forname" style={{ position: 'relative' }}>
                <div className="left">
                  <span className="counter2">{formatDate(new Date())}</span>
                  <span className="link">Track Your Students' Progress</span>
                  <span className="title1">Welcome, {teacherDetails.fullName}</span>
                </div>
                <img src={sms} alt="Description" className="image-end" />
            </div>
            <div style={{ display: 'flex' }}>
                <div className="widget">
                    <div className="left">
                        <span className="title">Total Revenue</span>
                        <span className="counter">${teacherDetails.salary.toLocaleString()}</span>
                    </div>
                </div>
                <div className="widget1">
                    <div className="left">
                        <span className="title">Number of Subject</span>
                        <span className="counter1">{teacherDetails.subjectsTaught.length}</span>
                    </div>
                </div>
                <div className="widget1">
                    <div className="left">
                        <span className="title">Notice</span>
                        <span className="counter1"></span>
                    </div>
                </div>
            </div>
            <h2 align="center" className='Teachtable'>Teacher Details</h2>
             <TableContainer className='Teachtable'>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="tables" align="center"><strong>Full name</strong></TableCell>
                      <TableCell className="tables" align="center"><strong>Email</strong></TableCell>
                      <TableCell className="tables" align="center"><strong>Address</strong></TableCell>
                      <TableCell className="tables" align="center"><strong>Phone Number</strong></TableCell>
                      <TableCell className="tables" align="center"><strong>Subjects Taught</strong></TableCell>
                      <TableCell className="tables" align="center"><strong>Salary</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                        <TableCell align="center">{teacherDetails.fullName}</TableCell>
                        <TableCell align="center">{teacherDetails.email}</TableCell>
                        <TableCell align="center">{teacherDetails.address}</TableCell>
                        <TableCell align="center">{teacherDetails.phoneNumber}</TableCell>
                        <TableCell align="center">{teacherDetails.subjectsTaught.join(", ")}</TableCell> {/* Assuming subjectsTaught is an array */}
                        <TableCell align="center">${teacherDetails.salary.toLocaleString()}</TableCell> {/*Format salary as a readable string*/}
                  </TableBody>
                </Table>
             </TableContainer>
        </div>
    );
};

export default TeachInfo;
