const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Utility for handling asynchronous controller actions and errors
const handleAsync = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

exports.getAllUsers = handleAsync(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

exports.getUserById = handleAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
});

// Generic function to generate next ID
const generateNextId = async (rolePrefix) => {
    const latestUser = await User.findOne({ roles: { $in: [rolePrefix === 'ST' ? 'student' : 'teacher'] } })
        .sort({ dateJoined: -1 });

    const currentId = latestUser ? parseInt(latestUser.id.slice(2), 10) : 0;
    return `${rolePrefix}${currentId + 1}`;
};

exports.createUser = handleAsync(async (req, res) => {
    let { fullName, username, email, roles, password, address, phoneNumber, dateJoined, studentInfo, teacherInfo } = req.body;
    roles = roles && Array.isArray(roles) ? roles : ['student'];
    const userPayload = { fullName, username, email, roles, password, address, phoneNumber, dateJoined };

    if (roles.includes('student')) {
        userPayload.studentInfo = studentInfo;
        userPayload.studentId = await generateNextId('ST');
    }
    if (roles.includes('teacher')) {
        userPayload.teacherInfo = teacherInfo;
        userPayload.teacherId = await generateNextId('TC');
    }

    const newUser = new User(userPayload);
    await newUser.save();
    res.status(201).json(newUser);
});

exports.updateUserById = handleAsync(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
});

exports.deleteUserById = handleAsync(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).end();
});

exports.getStudentsBySubject = async (req, res) => {
    const subject = req.params.subject;
    const teacherId = req.user._id; // Assuming req.user is populated by isAuthenticated middleware

    try {
        // Ensure the requester is a teacher
        const teacher = await User.findById(teacherId);
        if (!teacher || !teacher.roles.includes('teacher') || !teacher.teacherInfo.subjectsTaught.includes(subject)) {
            return res.status(403).json({ message: "Unauthorized or you do not teach this subject" });
        }

        // Find students studying the requested subject
        const students = await User.find({
            "roles": "student",
            "studentInfo.subjects": { $exists: true, $ne: null },
            $expr: { $gt: [{ $type: "$studentInfo.subjects."+subject }, "missing"] }
        }, { 'fullName': 1, 'studentInfo.subjects': 1 });

        // Filter out students who study the specific subject and their marks
        const studentsStudyingSubject = students.map(student => ({
            fullName: student.fullName,
            marks: student.studentInfo.subjects.get(subject) || "Not enrolled in this subject"
        }));

        res.status(200).json(studentsStudyingSubject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getStudentsByTeacherSubjects = async (req, res) => {
    try {
        // Check if the logged-in user is a teacher
        if (!req.user.roles.includes('teacher')) {
            return res.status(403).json({ message: "Access denied. This action is only allowed for teachers." });
        }

        // Fetch the logged-in teacher's details, specifically the subjects they teach
        const teacher = await User.findById(req.user._id);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        const subjectsTaught = teacher.teacherInfo.subjectsTaught;

        // Find all students that study any of the subjects taught by this teacher
        const students = await User.find({
            roles: "student",
            "studentInfo.subjects": { $in: subjectsTaught }
        });

        // Transform the data to include only relevant information
        const studentsData = students.map(student => {
            const subjectsAndMarks = {};
            subjectsTaught.forEach(subject => {
                if (student.studentInfo.subjects.has(subject)) {
                    subjectsAndMarks[subject] = student.studentInfo.subjects.get(subject);
                }
            });
            return {
                studentId: student._id,
                fullName: student.fullName,
                subjectsAndMarks
            };
        });

        res.status(200).json(studentsData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
