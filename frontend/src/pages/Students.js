import React, { useState, useEffect } from 'react';

const StudentsList = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                // Retrieve the token from localStorage
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('No token available');
                }

                const response = await fetch('http://localhost:5000/users/students', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Use the retrieved token
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch students data');
                }

                const data = await response.json();
                setStudents(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchStudents();

        // Cleanup function
        return () => {
            // Any cleanup code (if necessary)
        };
    }, []); // Empty dependency array to run effect only once when component mounts

    return (
        <div>
            <h2>Students List</h2>
            {error && <p>Error: {error}</p>}
            <ul>
                {students.map(student => (
                    <li key={student._id}>
                        Name: {student.name}, Email: {student.email} {/* Assuming students have name and email properties */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentsList;
