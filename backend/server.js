const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5001;

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use(cors());

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

//Check if the server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});


//show which port the server is running on
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Connect to Database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection established'))
    .catch(err => console.error('MongoDB connection error:', err));

//route for the users
app.use('/users', require('./routes/userRoutes'))