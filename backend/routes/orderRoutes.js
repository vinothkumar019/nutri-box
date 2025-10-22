// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const Product = require('../models/Product');

/**
 * POST /api/orders
 * Body: { items: [{ productId }], address?: string }
 * Items must be between 6 and 9.
 * Tax: 5% GST
 */
router.post('/', protect, async (req, res) => {
  try {
    const { items, address } = req.body;
    if (!Array.isArray(items) || items.length < 6 || items.length > 9) {
      return res.status(400).json({ message: 'Select minimum 6 and maximum 9 items' });
    }

    // fetch products to get up-to-date price
    const productIds = items.map(i => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== items.length) {
      return res.status(400).json({ message: 'Some selected products not found' });
    }

    const orderItems = products.map(p => ({
      product: p._id,
      name: p.name,
      priceINR: p.priceINR
    }));

    const subtotal = orderItems.reduce((s, it) => s + it.priceINR, 0);
    const tax = +(subtotal * 0.05).toFixed(2); // 5% GST
    const total = +(subtotal + tax).toFixed(2);

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      subtotalINR: subtotal,
      taxINR: tax,
      totalINR: total,
      address
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error placing order' });
  }
});

// Optional: get orders for user
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
});

module.exports = router;
