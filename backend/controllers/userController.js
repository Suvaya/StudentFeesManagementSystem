const User = require('../models/User'); // Adjust the path as necessary

const userController = {
    // Create a new user
    createUser: async (req, res) => {
        try {
            const { subjectsTaught, salary, subjectsStudied, fees, ...userCreationFields } = req.body;
            const user = new User(userCreationFields);
            const savedUser = await user.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },


    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a single user by id
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update a user by id
    updateUserById: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete a user by id
    deleteUserById: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User successfully deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getTeachers: async (req, res) => {
        try {
            const teachers = await User.find({ roles: 'teacher' });
            res.json(teachers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // New method to get all students
    getStudents: async (req, res) => {
        try {
            const students = await User.find({ roles: 'student' });
            res.json(students);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
// Update specific fields of a user based on their role
    updateUserFields: async (req, res) => {
        try {
            const { id } = req.params; // Extract user ID from the request parameters
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Determine the user role
            if (user.roles.includes('teacher')) {
                // Only update subjectsTaught and salary for teachers
                const { subjectsTaught, salary } = req.body;
                user.subjectsTaught = subjectsTaught || user.subjectsTaught;
                user.salary = salary || user.salary;
            } else if (user.roles.includes('student')) {
                // Only update subjectsStudied and fees for students
                const { subjectsStudied, fees } = req.body;
                user.subjectsStudied = subjectsStudied || user.subjectsStudied;
                user.fees = fees || user.fees;
            } else {
                // If the user has neither role or an unsupported role
                return res.status(400).json({ message: 'Invalid user role for this operation' });
            }

            const updatedUser = await user.save();
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getStudentsByTeacherSubject: async (req, res) => {
        try {
            // Ensure the user is a teacher
            if (!req.user.roles.includes('teacher')) {
                return res.status(403).json({ message: 'Access denied.' });
            }

            // Fetch students whose studied subjects match any of the teacher's subjects
            const students = await User.find({
                roles: 'student',
                'subjectsStudied.subjectName': { $in: req.user.subjectsTaught }
            });

            // Filter each student's studied subjects to only include those taught by the teacher
            const filteredStudents = students.map(student => {
                const filteredSubjects = student.subjectsStudied.filter(subject =>
                    req.user.subjectsTaught.includes(subject.subjectName)
                );
                // Return the student with the filtered subjects
                return {
                    ...student.toObject(), // Convert mongoose document to a plain object
                    subjectsStudied: filteredSubjects
                };
            });

            res.status(200).json(filteredStudents);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },



};


module.exports = userController;
