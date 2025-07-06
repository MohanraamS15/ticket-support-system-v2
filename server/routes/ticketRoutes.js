const express = require("express");
const router = express.Router();

// ✅ Import middleware
const { protect } = require("../middleware/authMiddleware");

// ✅ Import controller functions
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket, // ✅ Add this
} = require("../controllers/ticketController");

// ✅ Routes
router.get("/", protect, getTickets);               // Get all tickets (for logged-in user)
router.post("/", protect, createTicket);            // Create new ticket
router.get("/:id", protect, getTicketById);         // Get single ticket by ID
router.put("/:id", protect, updateTicket);          // Update ticket by ID
router.delete("/:id", protect, deleteTicket);       // Delete ticket by ID

module.exports = router;
