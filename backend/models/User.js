const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    roles: [{ type: String, enum: ['teacher', 'student'], required: true }],
    // Optional fields for teachers
    subjectsTaught: [{ type: String }],
    salary: Number,
    // Optional fields for students
    subjectsStudied: [{ subjectName: String, marks: Number }],
    fees: Number
});

module.exports = mongoose.model('User', userSchema);
