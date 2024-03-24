import React, { useState, useEffect } from 'react';

const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users') // Adjust this URL to your actual API endpoint if needed
            .then(response => response.json())
            .then(data => {
                const filteredStudents = data.filter(user => user.roles.includes('student')).map(user => ({
                    fullName: user.fullName,
                    address: user.address,
                    email: user.email,
                    subjects: user.studentInfo.subjects.map(subject => ({
                        name: subject.subject.name, // Assuming 'name' is a property of the subject
                        marks: subject.marks
                    }))
                }));
                setStudents(filteredStudents);
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
            });
    }, []); // The empty array ensures this effect runs only once after the initial render

    return (
        <div>
            <h2>Students List</h2>
            {students.length > 0 ? (
                <ul>
                    {students.map((student, index) => (
                        <li key={index}>
                            <h3>{student.fullName}</h3>
                            <p>Address: {student.address}</p>
                            <p>Email: {student.email}</p>
                            <h4>Subjects</h4>
                            <ul>
                                {student.subjects.map((subject, subjectIndex) => (
                                    <li key={subjectIndex}>{subject.name}: {subject.marks} marks</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No students found.</p>
            )}
        </div>
    );
};

export default Students;
