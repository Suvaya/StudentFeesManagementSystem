const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // You can change this to any port you prefer

// Database connection
mongoose.connect('mongodb://localhost:27017/schoolDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Define schema
const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ['Student', 'Teacher']
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: function () {
            return this.role === 'Teacher';
        }
    },
    address: {
        type: String,
        required: true
    },
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
