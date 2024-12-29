const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username must be unique
  password: { type: String, required: true }, // Password (hashed)
  createdAt: { type: Date, default: Date.now }, // Timestamp for user creation
});

// Export the User model
module.exports = mongoose.model("User", userSchema);