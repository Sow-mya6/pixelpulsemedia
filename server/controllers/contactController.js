import Message from "../models/Message.js";
import { validationResult } from "express-validator";
import { saveMessagesToFile } from "../utils/messageBackup.js";

// @desc    Store contact message
// @route   POST /api/contact
// @access  Public
export const storeMessage = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation Error", errors: errors.array() });
  }

  try {
    const { name, email, message } = req.body;
    await Message.create({ name, email, message });

    // Backup messages to disk so they survive server restarts
    await saveMessagesToFile(Message);

    res.status(201).json({ message: "Message stored successfully" });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};
