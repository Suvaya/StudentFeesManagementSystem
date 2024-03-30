import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import "../App.css";

const People = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editStudentId, setEditStudentId] = useState(null); // Tracks which student is being edited
    const [subjectsInput, setSubjectsInput] = useState(''); // User input for subjects
    const [feesInput, setFeesInput] = useState(''); // User input for fees

    const fetchStudents = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5001/users/role/student');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            setStudents(Array.isArray(data) ? data : [data]);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents(); // Initial fetch on mount
    }, []);

    const editSubjectsAndFees = async (studentId) => {
        const subjects = subjectsInput.split(',').map(subject => subject.trim()); // Assuming subjects are comma-separated
        const fees = parseInt(feesInput);
        try {
            const response = await fetch(`http://localhost:5001/users/${studentId}/studsubjects`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subjects, fees }),
            });

            if (!response.ok) {
                throw new Error('Failed to update student data.');
            }
            // After successful update, fetch students data again to refresh the component
            await fetchStudents();
        } catch (error) {
            console.error('Failed to update:', error);
        } finally {
            setEditStudentId(null); // Close the form
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <TableContainer className='peopletable'>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tables" align="center"><strong>Username</strong></TableCell>
                            <TableCell className="tables" align="center"><strong>Full Name</strong></TableCell>
                            <TableCell className="tables" align="center"><strong>Email</strong></TableCell>
                            <TableCell className="tables" align="center"><strong>Phone Number</strong></TableCell>
                            <TableCell className="tables" align="center"><strong>Subjects Studied</strong></TableCell>
                            <TableCell className="tables" align="center"><strong>Fees</strong></TableCell>
                            <TableCell className="tables" align="center"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student._id}>
                                <TableCell align="center">{student.username}</TableCell>
                                <TableCell align="center">{student.fullName}</TableCell>
                                <TableCell align="center">{student.email}</TableCell>
                                <TableCell align="center">{student.phoneNumber}</TableCell>
                                <TableCell align="center">
                                    {student.subjectsStudied?.map(subject => (
                                        <div key={subject._id}>{subject.subjectName} (Marks: {subject.marks})</div>
                                    )) || 'N/A'}
                                </TableCell>
                                <TableCell align="center">{student.fees}</TableCell>
                                <TableCell align="center">
                                    <button onClick={() => setEditStudentId(student._id)}>Edit</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {editStudentId && (
                <div className="edit-form">
                    <h3>Edit Subjects and Fees</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        editSubjectsAndFees(editStudentId);
                    }}>
                        <div className="form-group">
                            <label htmlFor="subjects">Subjects (comma-separated):</label>
                            <input
                                id="subjects"
                                type="text"
                                value={subjectsInput}
                                onChange={(e) => setSubjectsInput(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fees">Fees:</label>
                            <input
                                id="fees"
                                type="number"
                                value={feesInput}
                                onChange={(e) => setFeesInput(e.target.value)}
                            />
                        </div>
                        <div className="buttons">
                            <button type="submit">Update</button>
                            <button type="button" onClick={() => setEditStudentId(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

        </>
    );
};

export default People;
