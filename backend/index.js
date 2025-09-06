import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";
import { createServer } from "http";
import { Server } from "socket.io";

// Load environment variables first
dotenv.config();

// Initialize Express app before creating HTTP server
const app = express();

// Create HTTP server using Express app
const server = createServer(app);

// Setup Socket.IO and allow CORS from frontend
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("New Socket connected:", socket.id);
  // Define socket event handlers here
});

// Middleware setup
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev"));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to the Task Hub API !",
  });
});
app.use("/api-v1", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
