// contact-manager-backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Contacts', {
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

// Routes
const contactsRouter = require('./routes/contacts');
app.use('/contacts', contactsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
