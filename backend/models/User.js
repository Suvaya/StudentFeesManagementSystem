const mongoose = require('mongoose');

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
    teacherInfo: {
        subjectsTaught: [String],
        salary: Number
    },

    // Add student-specific fields
    studentInfo: {
        subjectsStudied: [String],
        fees: Number,
        marksObtained: Number
    }
});

module.exports = mongoose.model('User', userSchema);