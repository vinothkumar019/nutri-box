// backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    priceINR: Number
  }],
  subtotalINR: { type: Number, required: true },
  taxINR: { type: Number, required: true },
  totalINR: { type: Number, required: true },
  address: { type: String }, // optional for now
  status: { type: String, default: 'placed' } // placed/processing/delivered
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
