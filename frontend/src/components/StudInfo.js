import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Importing the AuthContext

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
            <table>
                <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Subjects Studied</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{studentDetails.fullName}</td>
                    <td>{studentDetails.email}</td>
                    <td>{studentDetails.address}</td>
                    <td>{studentDetails.phoneNumber}</td>
                    <td>
                        <ul>
                            {studentDetails.subjectsStudied.map(subject => (
                                <li key={subject._id}>{subject.subjectName} - Marks: {subject.marks}</li>
                            ))}
                        </ul>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default StudInfo;
