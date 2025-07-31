// routes/contact.js
const express = require('express');
const ContactForm = require('../models/ContactForm');

const router = express.Router();

// ➕ CREATE
router.post('/', async (req, res) => {
  try {
    const contact = new ContactForm(req.body);
    await contact.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const msg = field === 'email' ? 'Email already exists' : 'Phone number already exists';
      return res.status(400).json({ error: msg });
    }
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// 📥 READ ALL
router.get('/', async (req, res) => {
  try {
    const data = await ContactForm.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// 🔍 READ BY ID
router.get('/:id', async (req, res) => {
  try {
    const data = await ContactForm.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entry' });
  }
});

// ✏️ UPDATE
router.put('/:id', async (req, res) => {
  try {
    await ContactForm.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update entry' });
  }
});

// ❌ DELETE
router.delete('/:id', async (req, res) => {
  try {
    await ContactForm.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete entry' });
  }
});

module.exports = router;
