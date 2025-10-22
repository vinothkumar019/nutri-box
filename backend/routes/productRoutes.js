// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const protect = require('../middleware/authMiddleware');

// Get products filtered by user's dietType (uses auth)
router.get('/', protect, async (req, res) => {
  try {
    // req.user is set in authMiddleware
    const diet = req.user?.dietType || 'veg';
    const products = await Product.find({ type: diet }).sort({ name: 1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching products' });
  }
});

module.exports = router;
