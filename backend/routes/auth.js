const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/users');

// 📝 Signup Route
router.post('/signup', async (req, res) => {
  const { name, username, email, password, confirmPassword } = req.body;

  // Basic validation
  if (!name || !username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "❌ All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "❌ Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "❌ Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, email, password: hash });

    await newUser.save();
    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

// 🔐 Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "❌ Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "❌ Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "❌ Invalid credentials" });

    res.status(200).json({ message: "✅ Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

module.exports = router;
