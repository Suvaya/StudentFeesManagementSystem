import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Adjust import path as necessary

const StudentsByTeacherSubject = () => {
    const [students, setStudents] = useState([]);
    const [editStudentId, setEditStudentId] = useState(null);
    const [newMarks, setNewMarks] = useState({});
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchStudents = async () => {
            if (!isLoggedIn) return;
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/users/students/mysubjects', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStudents(response.data);
            } catch (error) {
                console.error('Failed to fetch students:', error);
            }
        };
        fetchStudents();
    }, [isLoggedIn]);

    const handleEditClick = (studentId, subjectId, currentMarks) => {
        setEditStudentId({ studentId, subjectId });
        setNewMarks({ [subjectId]: currentMarks });
    };

    const handleMarksChange = (subjectId, marks) => {
        setNewMarks((prevMarks) => ({
            ...prevMarks,
            [subjectId]: marks,
        }));
    };

    const handleSubmit = async (studentId, subjectId) => {
        const subject = students.find(student => student._id === studentId)
            .subjectsStudied.find(subject => subject._id === subjectId);
        const subjectName = subject.subjectName;
        const marks = newMarks[subjectId];

        if (!marks) return;

        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/users/${studentId}/subjects/marks`,
                { subjectName, newMarks: marks },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setStudents((prevStudents) => prevStudents.map((student) =>
                student._id === studentId ? {
                    ...student,
                    subjectsStudied: student.subjectsStudied.map((subject) =>
                        subject._id === subjectId ? { ...subject, marks } : subject
                    ),
                } : student
            ));

            setEditStudentId(null); // Exit edit mode
        } catch (error) {
            console.error('Failed to update marks:', error);
        }
    };

    return (
        <div>
            <h2>Students By Teacher's Subject</h2>
            {isLoggedIn ? (
                <table>
                    <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((student) =>
                        student.subjectsStudied.map((subject, index) => (
                            <tr key={subject._id}>
                                {index === 0 && (
                                    <>
                                        <td rowSpan={student.subjectsStudied.length}>{student.fullName}</td>
                                        <td rowSpan={student.subjectsStudied.length}>{student.email}</td>
                                    </>
                                )}
                                <td>{subject.subjectName}</td>
                                <td>
                                    {editStudentId?.studentId === student._id && editStudentId?.subjectId === subject._id ? (
                                        <input type="number" value={newMarks[subject._id]} onChange={(e) => handleMarksChange(subject._id, e.target.value)} />
                                    ) : (
                                        subject.marks
                                    )}
                                </td>
                                <td>
                                    {editStudentId?.studentId === student._id && editStudentId?.subjectId === subject._id ? (
                                        <button onClick={() => handleSubmit(student._id, subject._id)}>Save</button>
                                    ) : (
                                        <button onClick={() => handleEditClick(student._id, subject._id, subject.marks)}>Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            ) : (
                <p>Please log in to see this information.</p>
            )}
        </div>
    );
};

export default StudentsByTeacherSubject;
