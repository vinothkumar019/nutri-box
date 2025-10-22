const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// ✅ Admin Login Route (simple static login for demo)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.org" && password === "adminserver@1982") {
    return res.json({ success: true, token: "admin-token" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// ✅ Add Food Item
router.post("/add-item", async (req, res) => {
  try {
    const { name, calories, price, image, type } = req.body;

    if (!name || !calories || !price || !type)
      return res.status(400).json({ message: "All fields required" });

    const newItem = new Item({ name, calories, price, image, type });
    await newItem.save();
    res.json({ success: true, message: "Item added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
