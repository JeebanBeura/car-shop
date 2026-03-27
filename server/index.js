const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const carRoutes = require('./routes/cars');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`[DEBUG] ${new Date().toISOString()} - ${req.method} ${req.originalUrl || req.url}`);
  next();
});

// Health Check
app.all('/api/health', (req, res) => res.json({ status: 'ok', method: req.method }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/cars', carRoutes);

// Catch-all for debug
app.use((req, res) => {
  console.log(`[DEBUG] 404 - ${req.method} ${req.url}`);
  res.status(404).json({ message: `Not Found - ${req.method} ${req.url}` });
});

// Database connection
const PORT = process.env.PORT || 5005;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/car-shop';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
