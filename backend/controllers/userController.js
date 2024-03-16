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
        let { fullName, username, email, roles, password, address, phoneNumber, dateJoined } = req.body;

        if (!roles || !Array.isArray(roles)) {
            roles = ['student'];
        }

        // Convert dateJoined to a proper Date object
        dateJoined = new Date(dateJoined);

        const newUser = new User({ fullName, username, email, roles, password, address, phoneNumber, dateJoined });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        if (err.code === 11000) {
            let message = "Duplicate field error.";
            if (err.keyPattern.email) message = "Email address already exists.";
            if (err.keyPattern.username) message = "Username already exists.";
            res.status(400).json({ message });
        } else {
            res.status(400).json({ message: err.message });
        }
    }
}

exports.updateUserById = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
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