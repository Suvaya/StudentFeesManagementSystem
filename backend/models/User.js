const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    password: { // Password field remains but no bcrypt hashing
        type: String,
        required: true
    },
    roles: {
        type: [String],
        enum: ['admin', 'teacher', 'student'],
        default: 'student'
    }
});

// Keep the roles validation logic
userSchema.path('roles').validate(function(roles) {
    const isAdmin = roles.includes('admin');
    const isTeacher = roles.includes('teacher');
    if (isAdmin && !isTeacher) {
        return false;
    }
    return true;
}, 'An admin can be a teacher but not a student.');

module.exports = mongoose.model('User', userSchema);
