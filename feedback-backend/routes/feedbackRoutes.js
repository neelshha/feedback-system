const express = require("express");
const Feedback = require("../models/Feedback"); // Corrected relative path to the model

const router = express.Router();

// Create Feedback
router.post("/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body); // Create a new feedback entry
    await feedback.save(); // Save feedback to the database
    res.status(201).send(feedback); // Send back the created feedback
  } catch (err) {
    res.status(400).send({ error: err.message }); // Handle validation or database errors
  }
});

// Get All Feedback
router.get("/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find(); // Fetch all feedback from the database
    res.status(200).send(feedback); // Send back the feedback array
  } catch (err) {
    res.status(500).send({ error: err.message }); // Handle server errors
  }
});

module.exports = router; // Export the router to be used in server.js