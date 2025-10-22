const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// ✅ Fetch items (supports ?type=veg, ?type=non-veg, ?type=all)
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    let filter = {};

    if (type && type !== 'all') {
      filter.type = type.toLowerCase(); // Ensure lowercase match
    }

    const items = await Item.find(filter).sort({ name: 1 });
    res.json(items);
  } catch (err) {
    console.error('❌ Error fetching items:', err);
    res.status(500).json({ message: 'Server error fetching items' });
  }
});

module.exports = router;
