const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/e-commerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

// Create a schema for the form data
const UserDataSchema = new mongoose.Schema({
    name: String,
    email: String,
});

// Create a model for the form data
const UserData = mongoose.model('User', UserDataSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submissions

app.post('/submit-form', (req, res) => {
    const newFormData = new UserData({
        name: req.body.name,
        email: req.body.email,
    });

    newFormData.save().then(() => {
      console.log('Data:', newFormData); 
        res.send('Data saved to MongoDB!');
    }).catch(err => {
        res.status(500).send('Failed to save data');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
