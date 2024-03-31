import React, { useState, useEffect } from 'react';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [editingId, setEditingId] = useState(null); // Holds the ID of the teacher being edited
    const [editFormData, setEditFormData] = useState({ subjectsTaught: [], salary: '' });

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/role/teacher');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchTeachers();
    }, []);

    const handleEditClick = (teacher) => {
        setEditingId(teacher._id);
        setEditFormData({
            subjectsTaught: teacher.subjectsTaught,
            salary: teacher.salary
        });
    };

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({
            ...editFormData,
            [name]: name === 'subjectsTaught' ? value.split(',') : value
        });
    };

    const handleEditFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/users/${editingId}/updateFields`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editFormData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedTeachers = [...teachers];
            const index = teachers.findIndex((teacher) => teacher._id === editingId);
            updatedTeachers[index] = { ...updatedTeachers[index], ...editFormData };
            setTeachers(updatedTeachers);
            setEditingId(null); // Exit editing mode
        } catch (error) {
            console.error('Failed to update teacher:', error);
        }
    };

    return (
        <table>
            <thead>
            <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Subjects Taught</th>
                <th>Salary</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            {teachers.map(teacher => (
                <tr key={teacher._id}>
                    <td>{teacher.fullName}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.address}</td>
                    <td>{teacher.phoneNumber}</td>
                    <td>
                        {editingId === teacher._id ? (
                            <input
                                type="text"
                                name="subjectsTaught"
                                value={editFormData.subjectsTaught.join(',')}
                                onChange={handleEditFormChange}
                            />
                        ) : (
                            teacher.subjectsTaught.join(', ')
                        )}
                    </td>
                    <td>
                        {editingId === teacher._id ? (
                            <input
                                type="number"
                                name="salary"
                                value={editFormData.salary}
                                onChange={handleEditFormChange}
                            />
                        ) : (
                            `$${teacher.salary}`
                        )}
                    </td>
                    <td>
                        {editingId === teacher._id ? (
                            <button onClick={handleEditFormSubmit}>Save</button>
                        ) : (
                            <button onClick={() => handleEditClick(teacher)}>Edit</button>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Teachers;
