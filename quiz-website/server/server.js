const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Quiz = require("./models/Quiz");
const resultRoutes = require("./routes/resultRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connection for MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// this register the Routes
app.use("/api", resultRoutes);

// Getting all quiz questions
app.get("/api/quiz", async (req, res) => {
  try {
    const questions = await Quiz.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Inserting Sample Quiz Questions such as Phishing, Vishing, Pretexting
const sampleQuestions = [
  {
    question: "You receive the following suspicious email.",
    options: [
      "Click the link and verify your login.",
      "Ignore the email; it’s clearly a scam.",
      "Call your bank using the official number to verify the issue.",
      "Forward the email to your manager and ask what to do."
    ],
    correctAnswer: "Call your bank using the official number to verify the issue.",
    explanation: "This is a classic phishing attempt. The sender’s email and the fake link are red flags. Always verify with your bank directly.",
    type: "Phishing",
    isInteractive: true,
  }
];

const insertSampleQuestions = async () => {
  try {
    const existing = await Quiz.find();
    if (existing.length === 0) {
      await Quiz.insertMany(sampleQuestions);
      console.log("Sample questions inserted.");
    } else {
      console.log("Quiz already has questions. Skipping insert.");
    }
  } catch (error) {
    console.error("Error inserting sample questions:", error);
  }
};

// Call insert function on server start
insertSampleQuestions();

// Starting the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
