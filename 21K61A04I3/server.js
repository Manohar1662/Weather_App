// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost/weatherApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// MongoDB schema and model
const citySchema = new mongoose.Schema({
  name: String,
  temperature: Number
});

const City = mongoose.model('City', citySchema);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle API requests
app.post('/api/addCity', (req, res) => {
  const { cityName, temperature } = req.body;

  // Save city data to MongoDB
  const city = new City({
    name: cityName,
    temperature: temperature
  });

  city.save((err, savedCity) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving data to MongoDB' });
    }

    console.log('Data saved successfully with ObjectId:', savedCity._id);
    res.status(200).json({ message: 'Data saved successfully', objectId: savedCity._id });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Connected to MongoDB');
});
