const Ticket = require("../models/ticketModel");

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const ticket = await Ticket.create({
    user: req.user._id, // 🔐 from JWT middleware
    title,
    description,
  });

  res.status(201).json(ticket);
};

const getTickets = async (req, res) => {
  const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(tickets);
};


const getTicketById = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  // Check if the ticket belongs to the logged-in user
  if (ticket.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  res.status(200).json(ticket);
};


const updateTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  // Check if this ticket belongs to the logged-in user
  if (ticket.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  // Update fields
  ticket.title = req.body.title || ticket.title;
  ticket.description = req.body.description || ticket.description;
  ticket.status = req.body.status || ticket.status;

  const updatedTicket = await ticket.save();

  res.status(200).json(updatedTicket);
};

const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  if (ticket.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized to delete this ticket" });
  }

  await ticket.deleteOne();

  res.status(200).json({ message: "Ticket deleted successfully" });
};


module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket, // ✅ Must be here
};
