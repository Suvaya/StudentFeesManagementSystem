import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const TeachInfo = () => {
    const { userId } = useAuth();
    const [teacherDetails, setTeacherDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeacherDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/role/teacher/${userId}`, {
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

    if (loading) return <div>Loading...</div>;
    if (!teacherDetails) return <div>No teacher details found.</div>;

    return (
        <div>
            <h2>Teacher Details</h2>
            <table>
                <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Subjects Taught</th>
                    <th>Salary</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{teacherDetails.fullName}</td>
                    <td>{teacherDetails.email}</td>
                    <td>{teacherDetails.address}</td>
                    <td>{teacherDetails.phoneNumber}</td>
                    <td>{teacherDetails.subjectsTaught.join(", ")}</td> {/* Assuming subjectsTaught is an array */}
                    <td>${teacherDetails.salary.toLocaleString()}</td> {/* Format salary as a readable string */}
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TeachInfo;
