// routes/forms.js
const express = require('express');
const Form = require('../models/form');

const router = express.Router();

// ➕ CREATE
router.post('/', async (req, res) => {
  try {
    const {
      firstName, lastName, email, phone,
      degree, city, pincode, date, message
    } = req.body;

    // Check duplicates
    const existing = await Form.findOne({
      $or: [{ email }, { phone }]
    });

    if (existing) {
      return res.status(400).json({
        message: existing.email === email
          ? "Email already exists"
          : "Phone number already exists"
      });
    }

    const form = new Form({
      firstName, lastName, email, phone,
      degree, city, pincode, date, message
    });

    const saved = await form.save();
    res.status(201).json({ message: "Form submitted", data: saved });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 📥 READ ALL
router.get('/', async (req, res) => {
  try {
    const data = await Form.find();
    res.json({ message: "All form data", data });
  } catch (err) {
    res.status(500).json({ message: "Error fetching form data", error: err.message });
  }
});

// 🔍 READ ONE
router.get('/:id', async (req, res) => {
  try {
    const entry = await Form.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Entry found", entry });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID", error: err.message });
  }
});

// ✏️ UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Updated successfully", updated });
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});

// ❌ DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Form.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

module.exports = router;
