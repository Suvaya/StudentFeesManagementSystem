const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async(req, res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message: err.message});
    }

};

exports.getUserById = async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }

};

exports.createUser = async (req, res) => {
    try {
        let { fullName, username, email, roles, password, address, phoneNumber, dateJoined, studentInfo, teacherInfo } = req.body;

        if (!roles || !Array.isArray(roles)) {
            roles = ['student'];
        }

        const userPayload = { fullName, username, email, roles, password, address, phoneNumber, dateJoined };

        // Handle conditional content based on role
        if (roles.includes('student')) {
            userPayload.studentInfo = studentInfo;
        } else if (roles.includes('teacher')) {
            userPayload.teacherInfo = teacherInfo;
        }

        const newUser = new User(userPayload);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        // Error handling remains unchanged
    }
}
exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    let { roles, studentInfo, teacherInfo, ...updateData } = req.body;

    try {
        // Find the existing user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update role-specific information based on the current role(s)
        if (user.roles.includes('student') && studentInfo) {
            updateData.studentInfo = studentInfo;
        } else if (user.roles.includes('teacher') && teacherInfo) {
            updateData.teacherInfo = teacherInfo;
        }

        // Update the user with new data
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

