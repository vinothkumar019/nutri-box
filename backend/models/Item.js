const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number },
  price: { type: Number, required: true },
  category: { type: String },
  type: { type: String, enum: ['veg', 'non-veg'], required: true },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
