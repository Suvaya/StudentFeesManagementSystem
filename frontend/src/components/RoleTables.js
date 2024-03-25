import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleTables = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [editingTeacherId, setEditingTeacherId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const teacherResponse = await axios.get('http://localhost:5000/users/role/teacher');
                const studentResponse = await axios.get('http://localhost:5000/users/role/student');
                setTeachers(teacherResponse.data.map(teacher => ({ ...teacher, isEditing: false })));
                setStudents(studentResponse.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    const handleEditChange = (teacherId, field, value) => {
        setTeachers(prevTeachers =>
            prevTeachers.map(teacher =>
                teacher._id === teacherId ? { ...teacher, [field]: value } : teacher
            )
        );
    };

    const toggleEdit = (teacherId) => {
        setEditingTeacherId(prevId => (prevId !== teacherId ? teacherId : null));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error}</p>;

    return (
        <div>
            {/* Teachers Table */}
            <h2>Teachers</h2>
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Subjects Taught</th>
                    <th>Salary</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {teachers.map((teacher) => (
                    <tr key={teacher._id}>
                        <td>{teacher.username}</td>
                        <td>{teacher.fullName}</td>
                        <td>{teacher.email}</td>
                        <td>
                            {editingTeacherId === teacher._id ? (
                                <input
                                    type="text"
                                    value={teacher.subjectsTaught.join(', ')}
                                    onChange={(e) => handleEditChange(teacher._id, 'subjectsTaught', e.target.value.split(',').map(s => s.trim()))}
                                />
                            ) : (
                                teacher.subjectsTaught.join(', ')
                            )}
                        </td>
                        <td>
                            {editingTeacherId === teacher._id ? (
                                <input
                                    type="number"
                                    value={teacher.salary}
                                    onChange={(e) => handleEditChange(teacher._id, 'salary', e.target.value)}
                                />
                            ) : (
                                teacher.salary
                            )}
                        </td>
                        <td>
                            <button onClick={() => toggleEdit(teacher._id)}>
                                {editingTeacherId === teacher._id ? 'Save' : 'Edit'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
};

export default RoleTables;