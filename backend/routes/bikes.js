const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Bike = require('../models/bike');

const router = express.Router();

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `bike-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

// Upload route
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  res.json({
    imagePath: req.file.filename,
    message: 'Image uploaded successfully'
  });
});

// Create new bike
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.filename;

    if (!title || !description || !image) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newBike = new Bike({ title, description, image });
    console.log(newBike)

    await newBike.save();
    res.status(201).json(newBike);
  } catch (err) {
    console.log('Error creating bike:', err);

    res.status(500).json({ error: 'Failed to create bike' });
  }

});

// Get all bikes
router.get('/', async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bikes' });
  }
});

// Get bike by ID
router.get('/:id', async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ error: 'Bike not found' });

    res.json(bike);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bike' });
  }
});

// Update bike
router.put('/:id', async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const updatedBike = await Bike.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true }
    );
    res.json(updatedBike);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update bike' });
  }
});

// Delete bike
router.delete('/:id', async (req, res) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);
    if (!bike) return res.status(404).json({ error: 'Bike not found' });

    // Delete the image file
    const imagePath = path.join(__dirname, '../uploads', bike.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.json({ message: 'Bike deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete bike' });
  }
});

module.exports = router;
