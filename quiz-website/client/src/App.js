import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz";
import Home from "./pages/Home";

import Revision from "./components/Revision";
import "./App.css";

function App() {
  const [quizData, setQuizData] = useState([]);

  // Fetch quiz data from the backend
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quiz");
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz data", error);
      }
    };
    fetchQuizData();
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz questions={quizData} />} />
          
          <Route path="/revision" element={<Revision />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
