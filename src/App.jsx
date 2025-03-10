import React, { useState, useCallback, useEffect } from "react";
import yes from "../assets/yes.mp4";
import no from "../assets/no.mp4";
import defaultVideo from "./videos/yes.mp4"; // Your default background video

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
];

const speakText = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
};

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [videoSrc, setVideoSrc] = useState(defaultVideo);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (!quizCompleted) {
      speakText(questions[currentQuestion].question);
    }
  }, [currentQuestion, quizCompleted]);

  const handleAnswer = useCallback((option) => {
    const correct = option === questions[currentQuestion].answer;
    setVideoSrc(correct ? yes : no);

    // Speak feedback
    speakText(correct ? "Correct answer!" : "Wrong answer!");

    setTimeout(() => {
      setVideoSrc(defaultVideo); // Revert to default video
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizCompleted(true);
        speakText("Quiz completed! Well done.");
      }
    }, 3000);
  }, [currentQuestion]);

  return (
    <div className="relative w-full h-screen flex items-center bg-gray-100">
      {/* Background Video (always visible) */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoSrc}
        autoPlay
        // loop
        muted
      />

      {!quizCompleted ? (
        <div className="relative z-10 p-6 border rounded-lg shadow-md w-96 bg-white bg-opacity-90 text-center ml-10">
          <h1 className="text-2xl font-bold mb-4">Quiz Time!</h1>
          <h2 className="mb-4 text-lg font-semibold">
            {questions[currentQuestion].question}
          </h2>
          <div className="flex flex-col gap-2">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 p-6 border rounded-lg shadow-md w-96 bg-white bg-opacity-90 text-center ml-10">
          <h1 className="text-3xl font-bold text-green-600">Quiz Completed!</h1>
          <p className="text-lg mt-2">Great job! 🎉</p>
        </div>
      )}
    </div>
  );
};

export default App;

// import React, { useState, useCallback, useEffect } from "react";
// import yes from "./videos/yes.mp4";
// import no from "./videos/no.mp4";

// const questions = [
//   {
//     question: "What is the capital of France?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     answer: "Paris",
//   },
//   {
//     question: "Which planet is known as the Red Planet?",
//     options: ["Earth", "Mars", "Jupiter", "Venus"],
//     answer: "Mars",
//   },
// ];

// const speakText = (text) => {
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = "en-US";
//   utterance.rate = 1;
//   speechSynthesis.speak(utterance);
// };

// const App = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [showVideo, setShowVideo] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);

//   // Speak question when component mounts or question changes
//   useEffect(() => {
//     if (!quizCompleted) {
//       speakText(questions[currentQuestion].question);
//     }
//   }, [currentQuestion, quizCompleted]);

//   const handleAnswer = useCallback((option) => {
//     const correct = option === questions[currentQuestion].answer;
//     setIsCorrect(correct);
//     setShowVideo(true);

//     // Speak feedback
//     if (correct) {
//       speakText("Correct answer!");
//     } else {
//       speakText("Wrong answer!");
//     }

//     setTimeout(() => {
//       setShowVideo(false);
//       if (currentQuestion < questions.length - 1) {
//         setCurrentQuestion(currentQuestion + 1);
//       } else {
//         setQuizCompleted(true);
//         speakText("Quiz completed! Well done.");
//       }
//     }, 3000);
//   }, [currentQuestion]);

//   return (
//     <div className="relative w-full h-screen flex items-center bg-gray-100">
//       {showVideo && (
//         <video
//           className="absolute top-0 left-0 w-full h-full object-cover"
//           src={isCorrect ? yes : no}
//           autoPlay
//           onEnded={() => setShowVideo(false)}
//         />
//       )}

//       {!quizCompleted ? (
//         <div className="relative z-10 p-6 border rounded-lg shadow-md w-96 bg-white bg-opacity-90 text-center ml-10">
//           <h1 className="text-2xl font-bold mb-4">Quiz Time!</h1>
//           <h2 className="mb-4 text-lg font-semibold">
//             {questions[currentQuestion].question}
//           </h2>
//           <div className="flex flex-col gap-2">
//             {questions[currentQuestion].options.map((option) => (
//               <button
//                 key={option}
//                 onClick={() => handleAnswer(option)}
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="relative z-10 p-6 border rounded-lg shadow-md w-96 bg-white bg-opacity-90 text-center ml-10">
//           <h1 className="text-3xl font-bold text-green-600">Quiz Completed!</h1>
//           <p className="text-lg mt-2">Great job! 🎉</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
