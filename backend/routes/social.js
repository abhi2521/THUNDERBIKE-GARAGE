const express = require('express');
const SocialForm = require('../models/socialForm');

const router = express.Router();

// ➕ CREATE (Submit form)
router.post('/', async (req, res) => {
  try {
    const form = new SocialForm(req.body);
    await form.save();
    res.status(201).json({ message: 'Information submitted successfully' });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const msg = field === 'email' ? 'Email already exists' : 'Phone number already exists';
      return res.status(400).json({ error: msg });
    }
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// 📥 READ ALL (Get all entries)
router.get('/', async (req, res) => {
  try {
    const data = await SocialForm.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// 🔍 READ BY ID (Get one entry by ID)
router.get('/:id', async (req, res) => {
  try {
    const data = await SocialForm.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entry' });
  }
});

// ✏️ UPDATE (Edit one by ID)
router.put('/:id', async (req, res) => {
  try {
    await SocialForm.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update entry' });
  }
});

// ❌ DELETE (Delete one by ID)
router.delete('/:id', async (req, res) => {
  try {
    await SocialForm.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete entry' });
  }
});

module.exports = router;
