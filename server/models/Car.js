const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  type: { type: String, enum: ['New', 'Used'], required: true },
  images: [{ type: String, required: true }],
  features: [{ type: String }],
  specs: {
    mileage: { type: String },
    fuel: { type: String },
    transmission: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);
