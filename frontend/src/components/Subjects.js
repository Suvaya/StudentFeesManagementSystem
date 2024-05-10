import React, { useState, useEffect } from 'react';

function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [subjectName, setSubjectName] = useState('');

    // Fetch all subjects on component mount
    useEffect(() => {
        fetch('http://localhost:5000/users/subjects')
            .then(response => response.json())
            .then(data => setSubjects(data))
            .catch(error => console.error('Error fetching subjects:', error));
    }, []); // The empty array ensures this effect runs once on mount

    // Handle adding a new subject
    const addSubject = (e) => {
        e.preventDefault(); // Prevent form from submitting traditionally
        fetch('http://localhost:5000/users/subjects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: subjectName }),
        })
            .then(response => response.json())
            .then(data => {
                setSubjects([...subjects, data.newSubject]);
                setSubjectName(''); // Reset the input field
            })
            .catch(error => console.error('Error adding subject:', error));
    };

    return (
        <div>
            <h2>Add a New Subject</h2>
            <form onSubmit={addSubject}>
                <label>
                    Subject Name:
                    <input
                        type="text"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                    />
                </label>
                <button type="submit">Add Subject</button>
            </form>

            <h2>All Subjects</h2>
            <ul>
                {subjects.map(subject => (
                    <li key={subject._id}>{subject.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Subjects;
