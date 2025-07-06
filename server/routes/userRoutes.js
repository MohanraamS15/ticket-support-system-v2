const express = require("express");
const router = express.Router();

// ✅ Import controllers
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");

// ✅ Import middleware
const { protect } = require("../middleware/authMiddleware");

// ✅ Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Protected Route (token required in header)
router.get("/profile", protect, getUserProfile);

module.exports = router;
