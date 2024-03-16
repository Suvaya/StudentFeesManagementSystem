import React from 'react';
// Import the UserList component
import UserList from "../components/UserList";
const Teachers = () => {
    return (
        <div>
            <h1>Teachers Page</h1>
            {/* Include the UserList component */}
            <UserList role="teacher" />
        </div>
    );
};

export default Teachers;
