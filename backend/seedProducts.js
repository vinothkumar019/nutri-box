const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');
const connectDB = require('./config/db');

dotenv.config();

const items = [
  // --- VEG ITEMS ---
  { name: 'Apple Slices', calories: 95, price: 90, category: 'Fruit', type: 'veg', image: '🍎' },
  { name: 'Almonds (1/4 cup)', calories: 164, price: 70, category: 'Nuts', type: 'veg', image: '🌰' },
  { name: 'Brown Rice', calories: 216, price: 100, category: 'Grain', type: 'veg', image: '🍚' },
  { name: 'Broccoli', calories: 55, price: 80, category: 'Veggies', type: 'veg', image: '🥦' },
  { name: 'Greek Yogurt', calories: 100, price: 80, category: 'Dairy', type: 'veg', image: '🥛' },
  { name: 'Carrot Sticks', calories: 25, price: 60, category: 'Veggies', type: 'veg', image: '🥕' },
  { name: 'Banana', calories: 105, price: 50, category: 'Fruit', type: 'veg', image: '🍌' },
  { name: 'Blueberries', calories: 84, price: 95, category: 'Fruit', type: 'veg', image: '🫐' },
  { name: 'Quinoa', calories: 222, price: 120, category: 'Grain', type: 'veg', image: '🌾' },
  { name: 'Tofu Scramble', calories: 140, price: 130, category: 'Protein', type: 'veg', image: '🌱' },
  { name: 'Lentil Soup', calories: 230, price: 150, category: 'Legume', type: 'veg', image: '🥣' },
  { name: 'Paneer Tikka', calories: 260, price: 180, category: 'Protein', type: 'veg', image: '🧀' },
  { name: 'Vegetable Salad', calories: 120, price: 90, category: 'Salad', type: 'veg', image: '🥗' },
  { name: 'Chickpea Bowl', calories: 300, price: 150, category: 'Legume', type: 'veg', image: '🍲' },

  // --- NON-VEG ITEMS ---
  { name: 'Chicken Breast', calories: 165, price: 150, category: 'Protein', type: 'non-veg', image: '🍗' },
  { name: 'Boiled Egg (2)', calories: 140, price: 70, category: 'Protein', type: 'non-veg', image: '🥚' },
  { name: 'Salmon Fillet', calories: 208, price: 280, category: 'Protein', type: 'non-veg', image: '🐟' },
  { name: 'Turkey Slices', calories: 135, price: 160, category: 'Protein', type: 'non-veg', image: '🥩' },
  { name: 'Prawn Salad', calories: 180, price: 210, category: 'Protein', type: 'non-veg', image: '🍤' },
  { name: 'Grilled Fish', calories: 190, price: 220, category: 'Protein', type: 'non-veg', image: '🐠' },
  { name: 'Chicken Biryani', calories: 340, price: 200, category: 'Main Course', type: 'non-veg', image: '🍛' },
  { name: 'Omelette', calories: 150, price: 80, category: 'Breakfast', type: 'non-veg', image: '🍳' },
  { name: 'Tandoori Chicken', calories: 250, price: 190, category: 'Main Course', type: 'non-veg', image: '🍖' },
  { name: 'Fish Curry', calories: 300, price: 210, category: 'Main Course', type: 'non-veg', image: '🍲' },
];

const seedProducts = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Item.deleteMany();
    await Item.insertMany(items);
    console.log('Seeded items successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding items:', error);
    process.exit(1);
  }
};

seedProducts();
