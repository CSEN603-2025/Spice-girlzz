import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './Components/SideBar';
import Header from './Components/Header';
import './StudentHomePage.css';
import { Timer, CalendarPlus2, ChartNoAxesColumn } from "lucide-react";

function Assessment() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('4rem');
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [activeAssessments, setActiveAssessments] = useState([
    {
      id: 1,
      duration: '15 min.',
      taken: '50',
      level: 'Intermediate',
      type: 'Technical MCQ',
      title: 'Frontend Fundamentals Quiz (React + JS)',
      postDate: '24 days ago',
      description: 'Test your knowledge of React and JavaScript fundamentals, including components, state management, and ES6+ syntax.',
      questions: 20,
      passingScore: '70%',
      timeInMinutes: 15,
      questionsList: [
        {
          id: 1,
          question: "What is the correct way to create a React component?",
          options: [
            "function MyComponent() { return <div>Hello</div> }",
            "class MyComponent extends React.Component { render() { return <div>Hello</div> } }",
            "const MyComponent = () => { return <div>Hello</div> }",
            "All of the above"
          ],
          correctAnswer: 3
        },
        {
          id: 2,
          question: "Which hook is used to manage state in functional components?",
          options: [
            "useState",
            "useEffect",
            "useContext",
            "useReducer"
          ],
          correctAnswer: 0
        },
        {
          id: 3,
          question: "What is the purpose of useEffect hook?",
          options: [
            "To handle side effects in functional components",
            "To manage component state",
            "To create new components",
            "To handle routing"
          ],
          correctAnswer: 0
        },
        {
          id: 4,
          question: "Which of the following is NOT a valid way to update state in React?",
          options: [
            "setState(newValue)",
            "this.state.value = newValue",
            "useState(newValue)",
            "dispatch({ type: 'UPDATE', payload: newValue })"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "What is the correct way to pass props to a component?",
          options: [
            "<Component props={value} />",
            "<Component value={props} />",
            "<Component {value} />",
            "<Component value={value} />"
          ],
          correctAnswer: 3
        }
      ]
    },
    {
      id: 2,
      duration: '20 min.',
      taken: '5',
      level: 'Advanced',
      type: 'Coding Challenge',
      title: 'JavaScript Problem Solving - Arrays & Functions',
      postDate: '2 hours ago',
      description: 'Solve complex problems using arrays and functions, focusing on algorithmic thinking and optimization.',
      questions: 5,
      passingScore: '80%',
      timeInMinutes: 20,
      questionsList: [
        {
          id: 1,
          question: "Write a function that finds the sum of all even numbers in an array.",
          options: [
            "const sumEven = arr => arr.filter(n => n % 2 === 0).reduce((a, b) => a + b, 0)",
            "const sumEven = arr => arr.reduce((a, b) => a + (b % 2 === 0 ? b : 0), 0)",
            "const sumEven = arr => arr.map(n => n % 2 === 0 ? n : 0).reduce((a, b) => a + b)",
            "All of the above"
          ],
          correctAnswer: 3
        },
        {
          id: 2,
          question: "Which method is used to remove the last element from an array?",
          options: [
            "array.pop()",
            "array.remove()",
            "array.delete()",
            "array.splice(-1)"
          ],
          correctAnswer: 0
        },
        {
          id: 3,
          question: "What is the output of [1, 2, 3].map(x => x * 2)?",
          options: [
            "[2, 4, 6]",
            "[1, 2, 3, 1, 2, 3]",
            "[1, 2, 3]",
            "Error"
          ],
          correctAnswer: 0
        },
        {
          id: 4,
          question: "Which array method is used to create a new array with all elements that pass a test?",
          options: [
            "filter()",
            "map()",
            "reduce()",
            "forEach()"
          ],
          correctAnswer: 0
        },
        {
          id: 5,
          question: "What is the correct way to merge two arrays in JavaScript?",
          options: [
            "array1 + array2",
            "array1.concat(array2)",
            "array1.merge(array2)",
            "array1.join(array2)"
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 3,
      duration: '5 min.',
      taken: '5',
      level: 'Beginner',
      type: 'Technical MCQ',
      title: 'Git & Version Control Basics',
      postDate: '5 mins ago',
      description: 'Assess your understanding of Git commands, branching, and version control concepts.',
      questions: 10,
      passingScore: '60%',
      questionsList:[],
    },
    {
      id: 4,
      duration: '30 min.',
      taken: '5',
      level: 'Advanced',
      type: 'Technical MCQ',
      title: 'Computer Design Concepts',
      postDate: '33 mins ago',
      description: 'Evaluate your knowledge of computer architecture and design principles.',
      questions: 25,
      passingScore: '75%',
      questionsList:[],
    },
    {
      id: 5,
      duration: '60 min.',
      taken: '10',
      level: 'Advanced',
      type: 'Aptitude & Logic MCQ',
      title: 'Logical Reasoning and Analytical Thinking Test',
      postDate: 'a month ago',
      description: 'Challenge your logical reasoning and analytical skills with complex problem-solving questions.',
      questions: 30,
      passingScore: '85%',
      questionsList:[]
    },
  ]);
  const [completedAssessments, setCompletedAssessments] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    console.log('Assessment component mounted');
  }, []);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      completeQuiz();
    }
  }, [timeLeft]);

  const openQuizPopup = (quiz) => {
    setSelectedQuiz(quiz);
    setIsQuizStarted(false);
  };

  const closeQuizPopup = () => {
    setSelectedQuiz(null);
    setIsQuizStarted(false);
  };

  const startQuiz = () => {
    setIsQuizStarted(true);
    setCurrentQuestion(0);
    setUserAnswers({});
    setTimeLeft(selectedQuiz.timeInMinutes * 60);
  };

  const handleAnswer = (questionId, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < selectedQuiz.questionsList.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    selectedQuiz.questionsList.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return Math.round((correctAnswers / selectedQuiz.questionsList.length) * 100);
  };

  const completeQuiz = () => {
    if (selectedQuiz) {
      const score = calculateScore();
      const completedQuiz = { ...selectedQuiz, score: `${score}%` };

      // Update sessionStorage with assessment details
      const storedProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
      const updatedProfile = {
        ...storedProfile,
        assessments: [
          ...(Array.isArray(storedProfile.assessments) ? storedProfile.assessments : []),
          { title: selectedQuiz.title, score: `${score}%` }
        ]
      };
      sessionStorage.setItem('studentProfile', JSON.stringify(updatedProfile));

      // Update local state
      setCompletedAssessments([...completedAssessments, completedQuiz]);
      setActiveAssessments(activeAssessments.filter((quiz) => quiz.id !== selectedQuiz.id));
      closeQuizPopup();
    }
  };

  if (error) {
    return (
      <div className="container">
        <Header toggleSidebar={toggleSidebar} />
        <div className="layout" style={{ marginTop: '4rem', minHeight: 'calc(100vh - 4rem)' }}>
          <SideBar
            setActivePage={(page) => navigate(`/student${page === 'home' ? '' : '/' + page}`)}
            isOpen={isSidebarOpen}
            setSidebarWidth={setSidebarWidth}
          />
          <main style={{ flex: 1, padding: '1.5rem', backgroundColor: '#f9fafb' }}>
            <div className="profileContent">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Error</h2>
              <p style={{ color: '#ef4444' }}>An error occurred: {error.message}</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header toggleSidebar={toggleSidebar} />
      <div className="layout" style={{ marginTop: '4rem', minHeight: 'calc(100vh - 4rem)' }}>
        <SideBar
          setActivePage={(page) => {
            console.log('Navigating to page:', page);
            navigate(`/student${page === 'home' ? '' : '/' + page}`);
          }}
          isOpen={isSidebarOpen}
          setSidebarWidth={setSidebarWidth}
        />
        <main
          style={{
            flex: 1,
            padding: "1.5rem",
            overflowY: "auto",
            marginLeft: window.innerWidth > 768 ? sidebarWidth : "0",
            width: window.innerWidth > 768 ? `calc(100% - ${sidebarWidth})` : "100%",
            transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
            boxSizing: "border-box",
            backgroundColor: "#f9fafb",
          }}
        >
          <div className="profileContent">
            {/* Active Quizzes Section */}
            <div
              style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '2rem',
              }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#1f2937',
                }}
              >
                Active Assessments
              </h3>
              {activeAssessments.length === 0 ? (
                <p style={{ color: '#4b5563' }}>No Assessments to show.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {activeAssessments.map((quiz) => (
                    <div
                      key={quiz.id}
                      style={{
                        padding: '1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.375rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{quiz.title}</h4>
                        <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }} className="company-info">
                          {quiz.type}
                        </h4>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                          <span className="meta-icon">
                            <Timer size={20} />
                          </span>
                          <span>{quiz.duration}</span>
                          <span>•</span>
                          <span className="meta-icon">
                            <CalendarPlus2 size={20} />
                          </span>
                          <span>{quiz.postDate}</span>
                          <span>•</span>
                          <span className="meta-icon">
                            <ChartNoAxesColumn size={20} />
                          </span>
                          <span
                            style={{
                              color:
                                quiz.level === 'Advanced'
                                  ? '#9333ea'
                                  : quiz.level === 'Intermediate'
                                  ? '#2563eb'
                                  : '#16a34a',
                              fontWeight: '500',
                            }}
                          >
                            {quiz.level}
                          </span>
                        </div>
                      </div>
                      <button
                        className="actionButton"
                        onClick={() => openQuizPopup(quiz)}
                      >
                        Take Assessment
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed Quizzes Section */}
            <div
              style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '2rem',
              }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#1f2937',
                }}
              >
                Completed Assessments
              </h3>
              {completedAssessments.length === 0 ? (
                <p style={{ color: '#4b5563' }}>No completed Assessments to show.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {completedAssessments.map((quiz) => (
                    <div
                      key={quiz.id}
                      style={{
                        padding: '1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.375rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        opacity: '0.7',
                      }}
                    >
                      <div>
                        <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{quiz.title}</h4>
                        <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }} className="company-info">
                          {quiz.type}
                        </h4>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                          <span className="meta-icon">
                            <Timer size={20} />
                          </span>
                          <span>{quiz.duration}</span>
                          <span>•</span>
                          <span className="meta-icon">
                            <CalendarPlus2 size={20} />
                          </span>
                          <span>{quiz.postDate}</span>
                          <span>•</span>
                          <span className="meta-icon">
                            <ChartNoAxesColumn size={20} />
                          </span>
                          <span
                            style={{
                              color:
                                quiz.level === 'Advanced'
                                  ? '#9333ea'
                                  : quiz.level === 'Intermediate'
                                  ? '#2563eb'
                                  : '#16a34a',
                              fontWeight: '500',
                            }}
                          >
                            {quiz.level}
                          </span>
                          <span>•</span>
                          <span style={{ color: '#4b5563', fontWeight: '500' }}>
                            Score: {quiz.score}
                          </span>
                        </div>
                      </div>
                      <button
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#e5e7eb',
                          color: '#4b5563',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'not-allowed',
                          fontWeight: '500',
                        }}
                        disabled
                      >
                        Completed
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Quiz Details Popup */}
      {selectedQuiz && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderLeft: '4px solid #2a9d8f',
            }}
          >
            {!isQuizStarted ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                      {selectedQuiz.title}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span
                        style={{
                          padding: '0.375rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor: '#2a9d8f',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                        }}
                      >
                        {selectedQuiz.type}
                      </span>
                      <span
                        style={{
                          padding: '0.375rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor: selectedQuiz.level === 'Advanced' ? '#9333ea' : selectedQuiz.level === 'Intermediate' ? '#2563eb' : '#16a34a',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                        }}
                      >
                        {selectedQuiz.level}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={closeQuizPopup}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#9ca3af',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      borderRadius: '50%',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4b5563' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>Duration: {selectedQuiz.duration}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4b5563' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <span>Questions: {selectedQuiz.questions}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4b5563' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span>Passing Score: {selectedQuiz.passingScore}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                    {selectedQuiz.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#e5e7eb',
                        color: '#4b5563',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                      onClick={closeQuizPopup}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      Close
                    </button>
                    <button
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#2a9d8f',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                      onClick={startQuiz}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      Start Assessment
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                      Question {currentQuestion + 1} of {selectedQuiz.questionsList.length}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span
                        style={{
                          padding: '0.375rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor: '#2a9d8f',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                        }}
                      >
                        {selectedQuiz.type}
                      </span>
                    </div>
                  </div>
                  <div style={{ 
                    padding: '0.5rem 1rem', 
                    backgroundColor: '#f3f4f6', 
                    borderRadius: '0.375rem',
                    color: '#4b5563',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                  <div style={{ marginBottom: '2rem' }}>
                    <p style={{ fontSize: '1.125rem', color: '#1f2937', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                      {selectedQuiz.questionsList[currentQuestion].question}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {selectedQuiz.questionsList[currentQuestion].options.map((option, index) => (
                        <label
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '1rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            backgroundColor: userAnswers[selectedQuiz.questionsList[currentQuestion].id] === index ? '#f3f4f6' : '#fff',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              backgroundColor: '#f9fafb',
                            }
                          }}
                        >
                          <input
                            type="radio"
                            name={`question-${selectedQuiz.questionsList[currentQuestion].id}`}
                            checked={userAnswers[selectedQuiz.questionsList[currentQuestion].id] === index}
                            onChange={() => handleAnswer(selectedQuiz.questionsList[currentQuestion].id, index)}
                            style={{ marginRight: '0.75rem' }}
                          />
                          <span style={{ fontSize: '0.875rem', color: '#1f2937' }}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <button
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#e5e7eb',
                        color: '#4b5563',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: currentQuestion > 0 ? 'pointer' : 'not-allowed',
                        opacity: currentQuestion > 0 ? 1 : 0.5,
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                      </svg>
                      Previous
                    </button>
                    {currentQuestion < selectedQuiz.questionsList.length - 1 ? (
                      <button
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#2a9d8f',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                        onClick={handleNextQuestion}
                      >
                        Next
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    ) : (
                      <button
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#16a34a',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                        onClick={completeQuiz}
                      >
                        Submit
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isSidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '4rem',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: window.innerWidth <= 768 ? 'block' : 'none',
          }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Assessment;