// POST route to add a quiz question
router.post("/", async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json({ message: "Question added" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to add question", error: err });
  }
});
