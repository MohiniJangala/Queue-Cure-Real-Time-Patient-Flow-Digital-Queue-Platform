const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const patientRoutes = require("./routes/patientRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const queueRoutes = require("./routes/queueRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Create Socket.IO Server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  },
});

// Export io so controllers can use it later
app.set("io", io);

// Socket Connection
io.on("connection", (socket) => {
  console.log("Client Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client Disconnected:", socket.id);
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api/dashboard", dashboardRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("QueueCure Backend Running");
});

const PORT = process.env.PORT || 5000;

// IMPORTANT: use server.listen instead of app.listen
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
