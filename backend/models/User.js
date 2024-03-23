const mongoose = require('mongoose');
const { Schema } = mongoose;

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Student and Teacher Info Subschemas
const studentInfoSchema = new Schema({
    subjects: { type: Map, of: Number },
    fees: Number
}, { _id: false });

const teacherInfoSchema = new Schema({
    subjectsTaught: [String],
    salary: Number
}, { _id: false });

// User Schema
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true, match: emailRegex },
    password: { type: String, required: true },
    address: String,
    phoneNumber: String,
    dateJoined: Date,
    roles: { type: [String], enum: ['admin', 'teacher', 'student'], default: ['student'] },
    studentInfo: studentInfoSchema,
    teacherInfo: teacherInfoSchema
});

module.exports = mongoose.model('User', userSchema);
