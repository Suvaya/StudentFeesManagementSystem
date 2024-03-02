const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config(); // At the top of your file
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection established'))
    .catch(err => console.error('MongoDB connection error:', err));
