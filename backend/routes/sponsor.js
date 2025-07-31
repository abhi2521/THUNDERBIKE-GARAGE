const express = require('express');
const router = express.Router();
const Sponsor = require('../models/SponsorForm.js');

// 🔹 CREATE
router.post('/', async (req, res) => {
  console.log("📥 Sponsor POST request received:", req.body);
  try {
    const { firstName, lastName, email, phone, company, interest, message } = req.body;

    const existing = await Sponsor.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(400).json({
        message: existing.email === email ? 'Email already exists' : 'Phone already exists'
      });
    }

    
    const newSponsor = new Sponsor({ firstName, lastName, email, phone, company, interest, message });
    const saved = await newSponsor.save();
    res.status(201).json({ message: 'Sponsor form submitted', data: saved });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 🔹 READ ALL
router.get('/', async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ createdAt: -1 });
    res.json({ message: 'All sponsors', data: sponsors });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sponsors', error: err.message });
  }
});

// 🔹 READ ONE
router.get('/:id', async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) return res.status(404).json({ message: 'Sponsor not found' });
    res.json({ message: 'Sponsor found', data: sponsor });
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID', error: err.message });
  }
});

// 🔹 UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Sponsor not found' });
    res.json({ message: 'Sponsor updated', data: updated });
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
});

// 🔹 DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Sponsor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Sponsor not found' });
    res.json({ message: 'Sponsor deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});

module.exports = router;
