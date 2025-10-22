require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

const app = express();

// ✅ Connect MongoDB
connectDB(process.env.MONGO_URI);

// ✅ Middlewares
app.use(helmet());
app.use(express.json());

// ✅ CORS (allow your frontend origin)
const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({ origin: FRONTEND, credentials: true }));

// ✅ Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes')); // Unified route
app.use('/api/admin', require('./routes/adminRoutes'));

// ✅ Health check
app.get('/api/ping', (req, res) => res.json({ ok: true }));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
