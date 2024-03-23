const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary
require('dotenv').config();

const isAuthenticated = async (req, res, next) => {
    console.log("isAuthenticated middleware called");
    try {
        const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token
        if (!token) {
            throw new Error('No token provided');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        const user = await User.findById(decoded.userId); // Ensure this matches the property used in the token payload
        if (!user) {
            throw new Error('User not found');
        }
        req.user = user; // Attach user to the request object
        next();
    } catch (error) {
        res.status(401).send({ message: 'Please authenticate.' });
    }
};
module.exports = isAuthenticated;
