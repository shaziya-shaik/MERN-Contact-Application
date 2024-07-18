const router = require('express').Router();
const Contact = require('../models/contact.model');

// GET all contacts
router.get('/', (req, res) => {
  Contact.find()
    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST add a new contact
router.post('/add', (req, res) => {
  const { name, photo, mobile, email, company, title, group } = req.body;
  const newContact = new Contact({ name, photo, mobile, email, company, title, group });

  newContact.save()
    .then(() => res.json('Contact added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET a contact by ID
router.get('/:id', (req, res) => {
  Contact.findById(req.params.id)
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST update a contact by ID
router.post('/update/:id', (req, res) => {
  Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => res.json('Contact updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE a contact by ID
router.delete('/:id', async (req, res) => {
  console.log('get request')
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Search contacts by name
router.get('/search', async (req, res) => {
  const searchQuery = req.query.name;
  if (!searchQuery) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const contacts = await Contact.find({ name: { $regex: searchQuery, $options: 'i' } });
    res.json(contacts);
  } catch (err) {
    res.status(500).json('Error: ' + err);
  }
});


module.exports = router;
