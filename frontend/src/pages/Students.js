import React from 'react';
import UserList from "../components/UserList";
// Import the UserList component

const Students = () => {
    return (
        <div>
            <h1>Students Page</h1>
            {/* Include the UserList component */}
            <UserList role="student" />
        </div>
    );
};

export default Students;
