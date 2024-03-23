import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Students() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/users/students')
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the student data:", error);
            });
    }, []);

    return (
        <div>
            <h2>Student Details</h2>
            {students.map(student => (
                <div key={student._id}>
                    <h3>{student.fullName}</h3>
                    <p>Email: {student.email}</p>
                    <p>Address: {student.address}</p>
                    {student.studentInfo && student.studentInfo.subjects && 'Physics' in student.studentInfo.subjects ? (
                        <>
                            <h4>Physics Marks</h4>
                            <p>Physics: {student.studentInfo.subjects['Physics']}</p>
                        </>
                    ) : null}
                </div>
            ))}
        </div>
    );
}

export default Students;
