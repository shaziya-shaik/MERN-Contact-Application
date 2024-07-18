// models/contact.model.js

const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String },
  mobile: { type: Number },
  email: { type: String },
  company: { type: String },
  title: { type: String },
  group: { type: String },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
