import Message from "../models/Message.js";

// @desc    Get all messages
// @route   GET /api/admin/messages
// @access  Private
export const getMessages = async (req, res, next) => {
  // Simple basic authentication checking a secret header (or query param)
  const secret = req.headers["x-admin-secret"] || req.query.secret;
  
  const expectedSecret = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;

  if (!expectedSecret) {
      console.warn("WARNING: ADMIN_SECRET or ADMIN_PASSWORD is not set in environment variables");
  }

  // Check secret if defined. If it's not defined, allow access for ease of testing during dev. In prod, you'd strictly deny.
  if (expectedSecret && secret !== expectedSecret) {
    return res.status(401).json({ message: "Unauthorized. Invalid Admin Password." });
  }

  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    next(error); // Pass to global error handler
  }
};
