const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    dateJoined: {
        type: Date
    },
    roles: {
        type: [String],
        enum: ['admin', 'teacher', 'student'],
        default: ['student']
    },
    studentInfo: {
        subjects: Schema.Types.Mixed, // Object with subject as key and marks as value
        fees: Number
    },
    teacherInfo: {
        subjectsTaught: [String], // Array of subjects the teacher teaches
        salary: Number
    },
});

module.exports = mongoose.model('User', userSchema);