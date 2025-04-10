const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  answers: [
    {
      question: String,
      selectedAnswer: String,
      correctAnswer: String,
    }
  ],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Result", resultSchema);
