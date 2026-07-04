import express from "express";
import { storeMessage } from "../controllers/contactController.js";
import { body } from "express-validator";

const router = express.Router();

// Validation Middleware Array
const validateMessage = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 50 }).withMessage("Name cannot exceed 50 characters"),
  body("email").trim().isEmail().withMessage("Must be a valid email address").normalizeEmail(),
  body("message").trim().notEmpty().withMessage("Message is required").isLength({ max: 1000 }).withMessage("Message cannot exceed 1000 characters"),
];

router.post("/", validateMessage, storeMessage);

export default router;
