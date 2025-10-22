// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  priceINR: { type: Number, required: true },
  calories: { type: Number },
  protein: { type: Number },
  carbs: { type: Number },
  fat: { type: Number },
  type: { type: String, enum: ['veg', 'non-veg'], required: true },
  image: { type: String } 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
