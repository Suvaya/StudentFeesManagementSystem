const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use(cors());

app.use(bodyParser.json());

const admin = {
    id: 1,
    username: 'admin',
    password: 'password', // Never store passwords like this in a real app
};

const SECRET_KEY = process.env.SECRET_KEY || '653b26a99f03a7686a54633d6519c5df168d4a39435230e9b0a2f51cb3ca79b82f8a6942b2c34b7fdb31ab4b2edc97a4e10e26e989006dc69ffa362cc2b85857';

app.use('/api/auth', authRoutes);

//Check if the server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

//Admin Route
// Login Route
app.post('/admin', (req, res) => {
    const { username, password } = req.body;

    if (username === admin.username && password === admin.password) {
        const token = jwt.sign({ id: admin.id, username: admin.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ auth: true, token });
    } else {
        res.status(401).send('Credentials are incorrect');
    }
});
//Admin Route ends

//show which port the server is running on
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Connect to Database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection established'))
    .catch(err => console.error('MongoDB connection error:', err));

//route for the users
app.use('/users', require('./routes/userRoutes'))