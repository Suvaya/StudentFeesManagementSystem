import React, { useState, useEffect } from 'react';

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
            const response = await fetch('http://localhost:5000/users/role/student');
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
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Subjects Studied</th>
                    <th>Fees</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student) => (
                    <tr key={student._id}>
                        <td>{student.username}</td>
                        <td>{student.fullName}</td>
                        <td>{student.email}</td>
                        <td>{student.phoneNumber}</td>
                        <td>
                            {student.subjectsStudied?.map(subject => (
                                <div key={subject._id}>{subject.subjectName} (Marks: {subject.marks})</div>
                            )) || 'N/A'}
                        </td>
                        <td>{student.fees}</td>
                        <td>
                            <button onClick={() => setEditStudentId(student._id)}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {editStudentId && (
                <div>
                    <h3>Edit Subjects and Fees</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        editSubjectsAndFees(editStudentId);
                    }}>
                        <label>
                            Subjects (comma-separated):
                            <input
                                type="text"
                                value={subjectsInput}
                                onChange={(e) => setSubjectsInput(e.target.value)}
                            />
                        </label>
                        <label>
                            Fees:
                            <input
                                type="number"
                                value={feesInput}
                                onChange={(e) => setFeesInput(e.target.value)}
                            />
                        </label>
                        <button type="submit">Update</button>
                        <button type="button" onClick={() => setEditStudentId(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default People;
