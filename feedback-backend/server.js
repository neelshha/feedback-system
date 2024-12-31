const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan"); // For request logging
const feedbackRoutes = require("./routes/feedbackRoutes");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(morgan("dev")); // Log requests for easier debugging
app.use(cors({
  origin: "http://localhost:5137", // Allow requests from your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Restrict allowed HTTP methods
  credentials: true, // Allow cookies or credentials to be sent
}));
app.use(helmet()); // Add security headers to responses
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI) // Removed deprecated options
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit if database connection fails
  });

// Routes
app.use("/api", feedbackRoutes);
app.use("/api/auth", authRoutes);

// Example route
app.get("/", (req, res) => {
  res.send("Feedback Collection System Backend Running");
});

// 404 Error Handling for Undefined Routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Failed to start server: ${err.message}`);
    process.exit(1); // Exit if server fails to start
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});