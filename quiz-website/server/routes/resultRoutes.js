const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

router.post("/submit", async (req, res) => {
  try {
    const { username, score, answers } = req.body;
    const result = new Result({ username, score, answers });
    await result.save();
    res.status(201).json({ message: "Result saved successfully" });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
