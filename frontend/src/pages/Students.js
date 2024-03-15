import React from 'react';
// Import the UserList component
import UserList from '../components/UserList';

const Students = () => {
    return (
        <div>
            <h1>Students Page</h1>
            {/* Include the UserList component */}
            <UserList />
        </div>
    );
};

export default Students;
