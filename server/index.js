import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Route imports
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import Message from "./models/Message.js";
import { restoreMessagesFromFile } from "./utils/messageBackup.js";

import path from "path";
import { fileURLToPath } from "url";

// ES modules __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // Fallback to * for easy local dev/portfolio use
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});
app.use("/api", limiter);

// Body parser wrapped with limit to prevent large payloads
app.use(express.json({ limit: "10kb" })); 

import { MongoMemoryServer } from "mongodb-memory-server";

// MongoDB Connection Logic
const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    // Use in-memory if no URI provided or if it's the broken one
    if (!mongoUri || mongoUri.includes("rq6m9ix")) {
      console.log("Using MongoDB In-Memory Server...");
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      
      // Cleanup hook for graceful shutdown
      process.on('SIGINT', async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
        process.exit(0);
      });
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");

    // Restore saved messages into in-memory database
    await restoreMessagesFromFile(Message);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// API Routes
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start Server
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
