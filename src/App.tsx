import React, { useState } from 'react';
import './App.css';

interface Question {
  id: number;
  question: string;
  options: { text: string; score: number }[];
}

interface QuizResult {
  score: number;
  classification: string;
  description: string;
  color: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "How often do you post on LinkedIn?",
    options: [
      { text: "Never or rarely", score: 0 },
      { text: "Once a month", score: 1 },
      { text: "Once a week", score: 2 },
      { text: "Multiple times a week", score: 3 },
      { text: "Daily or multiple times daily", score: 4 }
    ]
  },
  {
    id: 2,
    question: "What type of content do you typically share?",
    options: [
      { text: "I don't share content", score: 0 },
      { text: "Industry news and articles", score: 1 },
      { text: "Personal achievements and updates", score: 2 },
      { text: "Motivational quotes and life lessons", score: 3 },
      { text: "Humble brags disguised as inspirational stories", score: 4 }
    ]
  },
  {
    id: 3,
    question: "How do you typically start your LinkedIn posts?",
    options: [
      { text: "I don't post", score: 0 },
      { text: "With a simple statement", score: 1 },
      { text: "With a question to engage audience", score: 2 },
      { text: "With 'Agree?' or 'Thoughts?'", score: 3 },
      { text: "With a dramatic story that may or may not be true", score: 4 }
    ]
  },
  {
    id: 4,
    question: "How many LinkedIn connections do you have?",
    options: [
      { text: "Less than 100", score: 0 },
      { text: "100-500", score: 1 },
      { text: "500-1000", score: 2 },
      { text: "1000-5000", score: 3 },
      { text: "5000+ (LinkedIn influencer status)", score: 4 }
    ]
  },
  {
    id: 5,
    question: "How do you feel about using buzzwords like 'synergy', 'disrupt', 'pivot', and 'game-changer'?",
    options: [
      { text: "I avoid corporate jargon", score: 0 },
      { text: "I use them occasionally when appropriate", score: 1 },
      { text: "They're useful for professional communication", score: 2 },
      { text: "I love using them - they sound professional", score: 3 },
      { text: "My posts are 90% buzzwords and I'm proud of it", score: 4 }
    ]
  }
];

const getQuizResult = (score: number): QuizResult => {
  if (score <= 4) {
    return {
      score,
      classification: "LinkedIn Lurker",
      description: "You're more of a silent observer on LinkedIn. You might check it occasionally but prefer to stay in the background. Nothing wrong with that!",
      color: "bg-blue-100 text-blue-800"
    };
  } else if (score <= 8) {
    return {
      score,
      classification: "Casual Professional",
      description: "You use LinkedIn appropriately for professional networking and occasional updates. You strike a good balance between engagement and authenticity.",
      color: "bg-green-100 text-green-800"
    };
  } else if (score <= 12) {
    return {
      score,
      classification: "Active Networker",
      description: "You're quite active on LinkedIn and enjoy engaging with your professional network. You're building your personal brand but haven't gone overboard yet.",
      color: "bg-yellow-100 text-yellow-800"
    };
  } else if (score <= 16) {
    return {
      score,
      classification: "LinkedIn Enthusiast",
      description: "You're very active on LinkedIn and love sharing content. You might be getting close to 'LinkedIn influencer' territory. Watch out for the buzzword overload!",
      color: "bg-orange-100 text-orange-800"
    };
  } else {
    return {
      score,
      classification: "LinkedIn Warrior",
      description: "Congratulations! You've achieved peak LinkedIn warrior status. Your posts are probably filled with humble brags, motivational quotes, and enough buzzwords to make a corporate consultant blush. You live and breathe LinkedIn!",
      color: "bg-red-100 text-red-800"
    };
  }
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final score
      const totalScore = newAnswers.reduce((sum, answer) => sum + answer, 0);
      const result = getQuizResult(totalScore);
      setQuizResult(result);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setQuizResult(null);
    setQuizStarted(false);
  };

  if (showResult && quizResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
              <p className="text-gray-600">Here are your results:</p>
            </div>

            <div className={`inline-block px-6 py-3 rounded-full text-lg font-semibold mb-4 ${quizResult.color}`}>
              {quizResult.classification}
            </div>

            <div className="mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {quizResult.score}/20
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(quizResult.score / 20) * 100}%` }}
                ></div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {quizResult.description}
            </p>

            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        {!quizStarted ? (
          <div className="text-center">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">LinkedIn Warrior Quiz</h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover how much of a LinkedIn warrior you really are! 
                Answer 5 questions to find out your LinkedIn personality type.
              </p>
            </div>
            <button
              onClick={() => setQuizStarted(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105"
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.score)}
                    className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <span className="text-gray-800 font-medium">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
