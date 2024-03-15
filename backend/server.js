require('dotenv').config();
const cors = require('cors');

const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

app.use(express.json());

app.use(cors());

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