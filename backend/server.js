const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const bikeRoutes = require('./routes/bikes');
const formRoutes = require('./routes/forms');
const contactRoutes = require('./routes/contact');
const sponsorRoutes = require('./routes/sponsor');
const socialRoutes = require('./routes/social');
const authRoutes = require('./routes/auth'); // 👈 new


const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB Connection - Using your existing MongoDB Atlas connection
mongoose.connect('mongodb+srv://abhishek250404abi:6385533286@cluster0.3hxgivl.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Added timeout
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); // Exit process on connection failure
});

// Routes
app.use('/api/bikes', bikeRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: '❌ Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});