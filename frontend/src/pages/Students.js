import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Adjust import path as necessary
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import "../App.css";


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
                const response = await axios.get('http://localhost:5001/users/students/mysubjects', {
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
                `http://localhost:5001/users/${studentId}/subjects/marks`,
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
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell className="tablewidth" align='center'><strong>Student Name</strong></TableCell>
                            <TableCell className="tablewidth" align='center'><strong>Email</strong></TableCell>
                            <TableCell className="tablewidth" align='center'><strong>Subject</strong></TableCell>
                            <TableCell className="tablewidth" align='center'><strong>Marks</strong></TableCell>
                            <TableCell className="tablewidth" align='center'><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student, studentIndex) => (
                            student.subjectsStudied.map((subject, subjectIndex) => (
                                <TableRow key={`${student._id}-${subject._id}`}>
                                    {subjectIndex === 0 && (
                                        <>
                                            <TableCell rowSpan={student.subjectsStudied.length} align="center">{student.fullName}</TableCell>
                                            <TableCell rowSpan={student.subjectsStudied.length} align="center">{student.email}</TableCell>
                                        </>
                                    )}
                                    <TableCell align="center">{subject.subjectName}</TableCell>
                                    <TableCell align="center">
                                        {editStudentId?.studentId === student._id && editStudentId?.subjectId === subject._id ? (
                                            <Input type="number" value={newMarks[subject._id]} onChange={(e) => handleMarksChange(subject._id, e.target.value)} />
                                        ) : (
                                            subject.marks
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editStudentId?.studentId === student._id && editStudentId?.subjectId === subject._id ? (
                                            <Button onClick={() => handleSubmit(student._id, subject._id)}>Save</Button>
                                        ) : (
                                            <Button onClick={() => handleEditClick(student._id, subject._id, subject.marks)}>Edit</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                           ))
                        ))}
                    </TableBody>
                </TableContainer>
            ) : (
                <p>Please log in to see this information.</p>
            )}
        </div>
    );
};

export default StudentsByTeacherSubject;
