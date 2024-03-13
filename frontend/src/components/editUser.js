// frontend/src/components/userUpdate.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserUpdate = ({ userId }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${userId}`, userData);
      console.log('User updated successfully');
      // You can redirect the user or show a success message here
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error appropriately, e.g., show error message to user
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Update</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email || ''}
            onChange={handleInputChange}
          />
        </div>
        {/* Add more input fields for other user properties */}
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UserUpdate;
