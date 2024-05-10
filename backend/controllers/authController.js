const User = require('../models/User'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');

// Ensure sensitive values like JWT_SECRET are stored securely using environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZmYzUxNzFjNGI0MjM0Yzc5Y2I0NGEiLCJyb2xlcyI6WyJ0ZWFjaGVyIl0sImlhdCI6MTcxMTUxMTEwNSwiZXhwIjoxNzExNTk3NTA1fQ.LMCfHfua8fq5XIHOjcmF7Tskz_C28ptB7aD9mtWI8QI';

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Here, you should ideally hash the incoming password and compare it with the hashed password in the database.
        if (password !== user.password) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, roles: user.roles },
            JWT_SECRET,
            { expiresIn: '24h' } // Token expires in 24 hours
        );

        // Modify the response here to include the user's role
        res.json({ message1: "Login successful", token, username: user.username, role: user.roles, userId: user._id});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};