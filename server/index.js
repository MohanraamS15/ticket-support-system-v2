// server/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middlewares
app.use(cors()); // Allows frontend to access backend APIs
app.use(express.json()); // Parses incoming JSON requests

// Routes
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

app.use("/api/users", userRoutes);     // User Auth routes
app.use("/api/tickets", ticketRoutes); // Ticket CRUD routes

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Ticket Support System Backend Running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
