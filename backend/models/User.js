const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email:{
        type: String,
        required: true,
        unique:true,
        validate: {
            validator: function(value) {
                // Custom validation logic (e.g., regex pattern)
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }

    },
    roles:{
        type:[String],
        enum:['admin', 'teacher', 'student'],
        default:'student'
    }
});

//validation logic to ensure an admin can also be a teacher
userSchema.path('roles').validate(function(roles) {
    // Check if 'admin' role is present
    const isAdmin = roles.includes('admin');
    // Check if 'teacher' role is present
    const isTeacher = roles.includes('teacher');
    // If admin role is present, teacher role should also be present
    if (isAdmin && !isTeacher) {
        return false;
    }
    return true;
}, 'An admin can be a teacher but not a student.');

module.exports = mongoose.model('User', userSchema);