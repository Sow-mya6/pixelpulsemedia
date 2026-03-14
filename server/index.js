import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 🔹 Message Schema
const messageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

// 🔹 Test Route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// 🔹 Contact API (Store Message)
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    await Message.create({ name, email, message });
    res.status(200).json({ message: "Message stored successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to store message" });
  }
});
// 🔹 Admin API – NO PASSWORD
app.get("/api/admin/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

  

// 🔹 Start Server
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
