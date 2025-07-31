const express = require('express');
const mongoose = require('mongoose');
const Car = require('../models/car.js'); 

const app = express();
const PORT = 3001;

app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect('mongodb+srv://abhishek250404abi:6385533286@cluster0.3hxgivl.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* === CREATE === */
app.post('/cars', async (req, res) => {
  try {
    const car = new Car(req.body);
    const saved = await car.save();
    res.status(201).json({ message: "✅ Car added successfully", car: saved });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      res.status(400).json({ message: messages.join(', ') });
    } else {
      res.status(500).json({ message: "❌ Something went wrong", error: err.message });
    }
  }
});

/* === READ ALL === */
app.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json({ message: "✅ All cars fetched", cars });
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching cars", error: err.message });
  }
});

/* === READ ONE === */
app.get('/cars/:id', async (req, res) => {
  try {
    const car =
     await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "❌ Car not found" });
    res.json({ message: "✅ Car found", car });
  } catch (err) {
    res.status(400).json({ message: "❌ Invalid car ID", error: err.message });
  }
});

/* === UPDATE === */
app.put('/cars/:id', async (req, res) => {
  try {
    const updated = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "❌ Cannot update, car not found" });
    res.json({ message: "✅ Car updated", car: updated });
  } catch (err) {
    res.status(400).json({ message: "❌ Update failed", error: err.message });
  }
});

/* === DELETE === */
app.delete('/cars/:id', async (req, res) => {
  try {
    const deleted = await Car.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "❌ Cannot delete, car not found" });
    res.json({ message: "✅ Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "❌ Delete failed", error: err.message });
  }
});

/* === 404 Fallback === */
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

/* === Start Server === */
app.listen(PORT, () => {
  console.log(`🚗 Car server running at http://localhost:${PORT}`);
});
