const router = require('express').Router();
const User = require('../models/User');

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

//create user and handle duplicate data
exports.createUser = async (req, res) => {
    try {
        let { username, email, roles } = req.body;

        // If roles is not provided or is not an array, set it to ['student'] by default
        if (!roles || !Array.isArray(roles)) {
            roles = ['student'];
        }

        const newUser = new User({ username, email, roles });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        if (err.code === 11000 && err.keyPattern.email) {
            res.status(400).json({ message: "Email address already exists." });
        } else if (err.code === 11000 && err.keyPattern.username) {
            res.status(400).json({ message: "Username already exists." });
        } else {
            res.status(400).json({ message: err.message });
        }
    }
}

// exports.createUser = async (req, res) => {
//     try {
//         let { username, email, roles } = req.body;
//         // If roles is not provided, set it to 'student' by default
//         // if (!roles) {
//         //     roles = 'student';
//         // }
//         const newUser = new User({ username, email, roles });
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (err) {
//         if (err.code === 11000 && err.keyPattern.email) {
//             res.status(400).json({ message: "Email address already exists." });
//         } else if (err.code === 11000 && err.keyPattern.username) {
//             res.status(400).json({ message: "Username already exists." });
//         } else {
//             res.status(400).json({ message: err.message });
//         }
//     }
// }


// exports.createUser = async(req, res)=>{
//     try{
//         const {username, email, roles} = req.body;
//         const newUser = await User({username, email, roles});
//         newUser.save()
//         res.status(201).json(newUser);
//     }catch(err){
//         res.status(400).json({message: err.message});
//     }
// }

exports.updateUserById = async(req, res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedUser){
            return res.status(404).json({messag:'User not found'});
        }
        res.status(200).json(updatedUser);
    }catch(err){
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
