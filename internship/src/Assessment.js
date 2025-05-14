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
    },
  ]);
  const [completedAssessments, setCompletedAssessments] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    console.log('Assessment component mounted');
  }, []);

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
  };

  const completeQuiz = () => {
    if (selectedQuiz) {
      // Generate a random score between 60% and 100%
      const score = `${Math.floor(Math.random() * 41) + 60}%`;
      const completedQuiz = { ...selectedQuiz, score };
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
            padding: '1.5rem',
            overflowY: 'auto',
            marginLeft: window.innerWidth > 768 ? sidebarWidth : '0',
            boxSizing: 'border-box',
            backgroundColor: '#f9fafb',
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
              padding: '2rem',
              borderRadius: '0.5rem',
              width: '90%',
              maxWidth: '500px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
              {selectedQuiz.title}
            </h3>
            <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}><strong>Type:</strong> {selectedQuiz.type}</p>
            <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}><strong>Duration:</strong> {selectedQuiz.duration}</p>
            <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}><strong>Level:</strong> {selectedQuiz.level}</p>
            <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}><strong>Questions:</strong> {selectedQuiz.questions}</p>
            <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}><strong>Passing Score:</strong> {selectedQuiz.passingScore}</p>
            <p style={{ color: '#4b5563', marginBottom: '1rem' }}><strong>Description:</strong> {selectedQuiz.description}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              {!isQuizStarted ? (
                <>
                  <button
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#2563eb',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontWeight: '500',
                    }}
                    onClick={startQuiz}
                  >
                    Start
                  </button>
                  <button
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#e5e7eb',
                      color: '#4b5563',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontWeight: '500',
                    }}
                    onClick={closeQuizPopup}
                  >
                    Close
                  </button>
                </>
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
                  }}
                  onClick={completeQuiz}
                >
                  Complete
                </button>
              )}
            </div>
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