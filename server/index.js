const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/routes');



const data = ["jerome", "bryan", "virgo"];

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URI = process.env.MONGO;

// Test route
app.get("/api/tryserver", (req, res) => {
  res.json({ message: data });
});

// Connect MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/api', userRoutes);

// Start server
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
