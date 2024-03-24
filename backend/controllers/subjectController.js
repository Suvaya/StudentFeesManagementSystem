const Subject = require('../models/Subject');

// Define the handleAsync utility function

const handleAsync = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

exports.getAllSubjects = handleAsync(async (req, res) => {
    const subjects = await Subject.find({});
    res.status(200).json(subjects);
});

exports.addSubject = handleAsync(async (req, res) => {
    const { subjectID, name } = req.body;
    const newSubject = new Subject({ subjectID, name });
    await newSubject.save();
    res.status(201).json({ message: 'Subject added successfully', newSubject });
});

exports.deleteSubjectById = handleAsync(async (req, res) => {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    if (!deletedSubject) {
        return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(204).end(); // No content to send back
});
