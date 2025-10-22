const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // hashed
  age: { type: Number },
  gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
  heightCm: { type: Number },
  weightKg: { type: Number },
  goal: { type: String },
  dietType: { type: String, enum: ['veg', 'non-veg'], required: true }, // veg | non-veg
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
