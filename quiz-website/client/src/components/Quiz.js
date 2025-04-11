import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Quiz.css";

const Quiz = () => {
  const [username, setUsername] = useState(""); // this is the User name
  const [isStarted, setIsStarted] = useState(false); // checking if the quiz has started?
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // this will be Tracking all answers from the user

  const [incorrectAnswersByType, setIncorrectAnswersByType] = useState({
    Phishing: 0,
    Vishing: 0,
    Pretexting: 0,
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quiz");
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleStart = () => {
    if (username.trim() !== "") {
      setIsStarted(true);
    } else {
      alert("Please enter your name to start the quiz.");
    }
  };

  const handleAnswerClick = (answer) => {
    const currentQuestion = questions[currentQuestionIndex]; // Ensure that we are getting get the correct question

    if (!currentQuestion) return; // Safeguarding to maake sure we wont accessing undefined
    
    setUserAnswer(answer);
    setIsAnswered(true);

    // Store answer
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: currentQuestion.question,
        selectedAnswer: answer,
        correctAnswer: currentQuestion.correctAnswer,
        attackType: currentQuestion.type,
      },
    ]);

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    } else {
      // this will be tracking incorrect answers by the attack type
      setIncorrectAnswersByType((prev) => ({
        ...prev,
        [currentQuestion.type]: prev[currentQuestion.type] + 1,
      }));
    }
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setUserAnswer(null);
    setIsAnswered(false);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswer(null);
    setIsAnswered(false);
    setUserAnswers([]);
    setIncorrectAnswersByType({
      Phishing: 0,
      Vishing: 0,
      Pretexting: 0,
    });
    setIsStarted(false);
  };

  const submitResults = async () => {
    try {
      await axios.post("http://localhost:5000/api/submit", {
        username,
        score,
        answers: userAnswers,
      });
      console.log("Results submitted!");
    } catch (error) {
      console.error("Error submitting results:", error);
    }
  };

  // will be Providing feedback based on the incorrect answers by attack type
  const providePersonalizedFeedback = () => {
    let feedback = "Here's some personalized feedback based on your performance:\n\n";
    let links = {
      Phishing: "http://localhost:3000/revision",
      Vishing: "http://localhost:3000/revision",
      Pretexting: "http://localhost:3000/revision",
    };

    let hasStruggles = false;

    for (const [attackType, count] of Object.entries(incorrectAnswersByType)) {
      if (count > 0) {
        hasStruggles = true;
        feedback += `Becasue you have struggled with ${attackType} questions. We recommend reviewing this type of attack to improve your skills.\n`;
        feedback += `This should be able to help you understand more ${attackType} here: ${links[attackType]}\n\n`;
      }
    }

    if (!hasStruggles) {
      feedback += "Great job! You didn't struggle with any attack types.";
    }

    return feedback;
  };

  if (loading) return <p className="loading">Loading quiz...</p>;
  if (questions.length === 0) return <p>No quiz questions available.</p>;

  const currentQuestion = questions[currentQuestionIndex];

  if (!isStarted) {
    return (
      <div className="quiz-container">
        <h1>Welcome to the Cybersecurity Quiz</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", fontSize: "1rem", borderRadius: "5px", marginBottom: "20px" }}
        />
        <br />
        <button className="next-btn" onClick={handleStart}>
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1>Cybersecurity Quiz</h1>
      <p><strong>Player:</strong> {username}</p>

      {currentQuestion.type === "PhishingSMSInteractive" && currentQuestion.isInteractive ? (
        <div className="sms-example">
          <p><strong>SMS Message:</strong></p>
          <p>Dear Customer,</p>
          <p>We noticed suspicious activity on your bank account. Click the link below to confirm your details:</p>
          <button
            className="incorrect-btn"
            onClick={() => handleAnswerClick("Incorrect")}
          >
            Confirm Now
          </button>
          <p>Bank Security Team</p>
        </div>
      ) : currentQuestion.type === "Phishing" && currentQuestion.isInteractive ? (
        <div className="email-example">
          <p><strong>From:</strong> security@bank-alerts.com</p>
          <p><strong>Subject:</strong> Urgent Account Verification Needed!</p>
          <p>Dear Customer,</p>
          <p>We detected suspicious activity on your account.<br />
          Please verify your login immediately to avoid suspension:</p>
          <button
            className="incorrect-btn"
            onClick={() => handleAnswerClick("Incorrect")}
          >
            Verify Now
          </button>
          <p>Thank you,<br />Bank Security Team</p>
        </div>
      ) : currentQuestion.type === "VishingInteractive" && currentQuestion.isInteractive ? (
        <div className="phone-call-example">
          <p><strong>Phone Call:</strong> Incoming call from +1 (800) 555-1234</p>
          <p>Hi, this is Alex from your bank's fraud department. We've noticed unusual activity on your account, and we'd like to confirm your identity. Please press 1 to verify your details.</p>
          <button
            className="incorrect-btn"
            onClick={() => handleAnswerClick("Incorrect")}
          >
            Press 1 to Confirm
          </button>
        </div>
      ) : currentQuestion.type === "PretextingInteractive" && currentQuestion.isInteractive ? (
        <div className="it-support-call-example">
          <p><strong>IT Support Call:</strong> Incoming call from +1 (800) 555-6789</p>
          <p>Hi, this is Mark from your bank's IT support team. We are conducting a routine system upgrade and need to verify your personal information to proceed with the upgrade. Can you please provide your account number and PIN?</p>
          <button
            className="incorrect-btn"
            onClick={() => handleAnswerClick("Incorrect")}
          >
            Provide Information
          </button>
        </div>
      ) : (
        <>
          <h3>{currentQuestion.question}</h3>
          <p><strong>Attack Type:</strong> {currentQuestion.type}</p>
        </>
      )}

      <p className="score">Score: {score}</p>

      <table>
        <tbody>
          <tr>
            {currentQuestion.options.map((option, index) => (
              <td key={index}>
                <button
                  className={`option-btn ${isAnswered ? (userAnswer === option ? (option === currentQuestion.correctAnswer ? 'correct' : 'incorrect') : '') : ''}`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {isAnswered && (
        <div className="explanation">
          <p>
            {userAnswer === currentQuestion.correctAnswer
              ? "Correct! 🎉"
              : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
          </p>
          <p><strong>Explanation:</strong> {currentQuestion.explanation}</p>

          {currentQuestionIndex < questions.length - 1 ? (
            <button className="next-btn" onClick={nextQuestion}>Next Question</button>
          ) : (
            <div>
              <h2>Quiz Completed</h2>
              <p>Your final score is: {score}/{questions.length}</p>
              <pre>{providePersonalizedFeedback()}</pre>
              <button className="next-btn" onClick={() => {
                submitResults();
                restartQuiz();
              }}>
                Submit & Restart
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
