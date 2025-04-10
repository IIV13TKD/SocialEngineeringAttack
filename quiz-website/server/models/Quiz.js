const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],  // Array of options for the question
    required: true,
  },
  correctAnswer: {
    type: String,  // The correct answer
    required: true,
  },
  explanation: {
    type: String,  // Explanation for the correct answer
    required: true,
  },
  type: {
    type: String,  // Type of attack (Phishing, Vishing, Pretexting)
    required: true,
  },
  isInteractive: { 
    type: Boolean,  // Flag to determine if it's an interactive phishing question
    default: false 
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
