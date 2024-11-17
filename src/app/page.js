"use client"
import React, { useState } from "react";

// Quiz data with images and correct answers
const quizData = [
  { 
    id: 1, 
    flag: "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg", 
    options: ["India", "USA", "France", "Brazil"], 
    answer: "India" 
  },
  { 
    id: 2, 
    flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", 
    options: ["Canada", "USA", "Russia", "Italy"], 
    answer: "USA" 
  },
  { 
    id: 3, 
    flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg", 
    options: ["Germany", "France", "Japan", "China"], 
    answer: "France" 
  },
  { 
    id: 4, 
    flag: "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg", 
    options: ["Argentina", "Brazil", "Portugal", "Spain"], 
    answer: "Brazil" 
  },
  { 
    id: 5, 
    flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", 
    options: ["South Korea", "Japan", "Thailand", "Vietnam"], 
    answer: "Japan" 
  },
];

function App() {
  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [shuffledData, setShuffledData] = useState(shuffleOptions(quizData)); // Shuffle options on start

  // Shuffle function to randomize answer options
  function shuffleOptions(data) {
    return data.map(question => {
      const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5); // Shuffle options
      return {
        ...question,
        options: shuffledOptions,
      };
    });
  }

  // Handle answer selection
  const handleAnswer = (selectedOption) => {
    // Set the selected answer and immediately highlight the answer
    setUserAnswer(selectedOption);

    // Check if the selected answer is correct
    const isCorrect = selectedOption === shuffledData[currentQuestionIndex].answer;

    // If the answer is correct, increment the score
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Set the correct answer so that we can highlight it
    setCorrectAnswer(shuffledData[currentQuestionIndex].answer);

    // Move to the next question or finish the quiz if it's the last one
    const nextQuestion = currentQuestionIndex + 1;

    // After a small delay to allow the UI to update, proceed
    if (nextQuestion < shuffledData.length) {
      setTimeout(() => {
        setCurrentQuestionIndex(nextQuestion);
        setUserAnswer(null);
        setCorrectAnswer(null);
      }, 1000); // Wait 1 second before going to next question
    } else {
      setIsQuizOver(true); // End the quiz if it's the last question
    }
  };

  const resetQuiz = () => {
    setShuffledData(shuffleOptions(quizData)); // Shuffle answers when restarting the quiz
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizOver(false);
    setUserAnswer(null);
    setCorrectAnswer(null);
  };

  // Progress bar calculation
  const progress = ((currentQuestionIndex + 1) / shuffledData.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-6">Guess the Flag Quiz</h1>

      {/* Progress Bar */}
      {!isQuizOver && (
        <div className="w-full max-w-md bg-gray-300 rounded-full h-2.5 mb-4">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {isQuizOver ? (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Quiz Over!</h2>
          <p className="text-lg">Your Score: {score}/{shuffledData.length}</p>
          <button
            onClick={resetQuiz}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <img
            src={shuffledData[currentQuestionIndex].flag}
            alt="Flag"
            className="mb-4 w-48 h-32 object-contain mx-auto"
          />
          <div className="grid grid-cols-2 gap-4">
            {shuffledData[currentQuestionIndex].options.map((option, index) => {
              // Check if the user selected the answer
              const isSelected = userAnswer === option;
              const isCorrectOption = correctAnswer === option;
              const isIncorrect = isSelected && !isCorrectOption;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`
                    ${isSelected && isCorrectOption ? "bg-green-500" : ""}
                    ${isSelected && isIncorrect ? "bg-red-500" : ""}
                    ${!isSelected && isCorrectOption ? "bg-green-500" : ""}
                    ${!isSelected && !isCorrectOption ? "bg-white" : ""}
                    text-black font-medium py-2 px-4 rounded shadow
                    ${userAnswer === null ? "hover:bg-gray-200 transition" : ""}
                  `}
                  disabled={userAnswer !== null} // Disable buttons after answering
                >
                  {option}
                </button>
              );
            })}
          </div>
          <p className="text-sm">
            Question {currentQuestionIndex + 1} of {shuffledData.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
