import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";  // Make sure your CSS file is applied

const Home = () => {
  const navigate = useNavigate();

  // Function to start the quiz
  const startQuiz = () => {
    navigate("/quiz");  // Redirect to the quiz page when the button is clicked
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to the Social Engineering Attacks Quiz!</h1>
        <p>We will be learning to spot phishing, vishing, and pretexting attacks in banking.</p>
      </div>

      <div className="intro-section">
        <h2>Now you are wondering why you should Learn Cybersecurity?</h2>
        <p>
          Cybersecurity is crucial in today's digital world, especially when it comes to banking. With the rise of social engineering attacks like phishing, vishing, and pretexting, it's more important than ever to know how to spot these scams before it's too late.
        </p>
      </div>

      <div className="cta-section">
        <button className="start-btn" onClick={startQuiz}>Start the Quiz</button>
      </div>
    </div>
  );
};

export default Home;
