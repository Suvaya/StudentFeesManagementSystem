import React from 'react';
import UserList from "../components/UserList";
// Import the UserList component

const Users = () => {
    return (
        <div>
            <UserList role="student" />
            <UserList role="teacher" />
        </div>
    );
};

export default Users;
