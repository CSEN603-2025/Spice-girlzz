import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarCompany from './Components/SideBarCompany';
import { Mail, Home, LogOut, User, Menu } from 'lucide-react';
import './CompanyStyles.css';

const EvaluationManager = () => {
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    studentId: '',
    rating: 5,
    strengths: '',
    areasForImprovement: '',
    recommendation: 'yes',
    comments: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [clickedButtons, setClickedButtons] = useState({});
  const [mails, setMails] = useState([
    {
      id: 3,
      from: 'InternHub',
      subject: 'New Application Received - Software Engineering Intern',
      body: 'You have received a new application for your Software Engineering Intern position from John Doe. Click here to view the application details.',
      date: new Date().toISOString().split('T')[0],
      read: false,
      type: 'application'
    },
    {
      id: 2,
      from: 'InternHub',
      subject: 'Welcome to InternHub Platform',
      body: 'Thank you for registering your company with us. We look forward to working with you.',
      date: '2023-06-10',
      read: true,
      type: 'system'
    },
    {
      id: 1,
      from: 'scadoffice@guc.edu.eg',
      subject: 'Your application has been accepted!',
      body: 'Congratulations! We are pleased to inform you that your application has been accepted.',
      date: '2023-06-15',
      read: false,
      type: 'system'
    }
  ]);

  useEffect(() => {
    const fetchedStudents = [
      { id: 1, name: 'John Ramzy', program: 'Computer Science', internship: 'Software Developer' },
      { id: 2, name: 'Menna Ibrahim', program: 'Data Science', internship: 'Data Analyst' }
    ];
    setStudents(fetchedStudents);

    const fetchedEvaluations = [
      {
        id: 1,
        studentId: 1,
        studentName: 'John Ramzy',
        rating: 4,
        strengths: 'Excellent problem-solving skills, quick learner',
        areasForImprovement: 'Could improve documentation skills',
        recommendation: 'yes',
        comments: 'Would happily hire again',
        date: '2023-05-15'
      }
    ];
    setEvaluations(fetchedEvaluations);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEvaluations(evaluations.map(evaluation => 
        evaluation.id === formData.id ? { 
          ...formData, 
          studentName: students.find(s => s.id == formData.studentId)?.name || 'Unknown'
        } : evaluation
      ));
    } else {
      const newEvaluation = {
        ...formData,
        id: evaluations.length + 1,
        studentName: students.find(s => s.id == formData.studentId)?.name || 'Unknown',
        date: new Date().toISOString().split('T')[0]
      };
      setEvaluations([...evaluations, newEvaluation]);
    }
    resetForm();
  };

  const handleEdit = (evaluation) => {
    setFormData(evaluation);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setEvaluations(evaluations.filter(evaluation => evaluation.id !== id));
  };

  const resetForm = () => {
    setFormData({
      id: null,
      studentId: '',
      rating: 5,
      strengths: '',
      areasForImprovement: '',
      recommendation: 'yes',
      comments: ''
    });
    setIsEditing(false);
  };

  const handleButtonClick = (buttonId) => {
    setClickedButtons(prev => ({
      ...prev,
      [buttonId]: true
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const unreadApplicationCount = mails.filter(mail => 
    mail.type === 'application' && !mail.read
  ).length;

  return (
    <div className="container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 0 auto', maxWidth: '50%' }}>
          <button className="header-btn" title="Toggle Sidebar" onClick={toggleSidebar}>
            <Menu size={20} />
          </button>
          <h2 className="header-title">Student Evaluations</h2>
        </div>
        <div className="header-buttons">
          <button
            className={`header-btn ${clickedButtons['headerMail'] ? 'clicked' : ''}`}
            title="Messages"
            onClick={() => {
              handleButtonClick('headerMail');
              navigate('/company/mail');
            }}
          >
            <Mail size={20} />
            {unreadApplicationCount > 0 && (
              <span className="notification-badge">{unreadApplicationCount}</span>
            )}
          </button>
          <button
            className={`header-btn ${clickedButtons['headerProfile'] ? 'clicked' : ''}`}
            title="Profile"
            onClick={() => {
              handleButtonClick('headerProfile');
              navigate('/company/profile');
            }}
          >
            <User size={20} />
          </button>
          <button
            className={`header-btn ${clickedButtons['headerHome'] ? 'clicked' : ''}`}
            title="Home"
            onClick={() => {
              handleButtonClick('headerHome');
              navigate('/company');
            }}
          >
            <Home size={20} />
          </button>
          <button
            className={`header-btn ${clickedButtons['headerLogout'] ? 'clicked' : ''}`}
            title="Logout"
            onClick={() => {
              handleButtonClick('headerLogout');
              navigate('/');
            }}
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="layout">
        <SideBarCompany onHoverChange={setIsSidebarHovered} />
        <div className={`content ${isSidebarHovered && window.innerWidth > 768 ? 'sidebar-expanded' : ''}`}>
          <div className="card">
            <h3 className="section-title">{isEditing ? 'Update Evaluation' : 'Create New Evaluation'}</h3>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label className="form-label">Student</label>
                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select a student</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.internship}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Rating (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Strengths</label>
                <textarea
                  name="strengths"
                  value={formData.strengths}
                  onChange={handleInputChange}
                  className="form-textarea"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Areas for Improvement</label>
                <textarea
                  name="areasForImprovement"
                  value={formData.areasForImprovement}
                  onChange={handleInputChange}
                  className="form-textarea"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Would you recommend this student?</label>
                <select
                  name="recommendation"
                  value={formData.recommendation}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="yes">Yes, highly recommend</option>
                  <option value="maybe">Yes, with reservations</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Additional Comments</label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  className="form-textarea"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Update Evaluation' : 'Create Evaluation'}
                </button>
                {isEditing && (
                  <button type="button" onClick={resetForm} className="btn btn-danger">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="card">
            <h3 className="section-title">Completed Evaluations</h3>
            {evaluations.length === 0 ? (
              <p className="no-data">No evaluations found.</p>
            ) : (
              <div className="evaluation-list">
                {evaluations.map(evaluation => (
                  <div key={evaluation.id} className="evaluation-card">
                    <div className="evaluation-header">
                      <h4 className="evaluation-title">
                        {evaluation.studentName}
                        <span className="rating">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < evaluation.rating ? 'star-filled' : 'star-empty'}>
                              ★
                            </span>
                          ))}
                        </span>
                      </h4>
                      <span className="evaluation-date">{evaluation.date}</span>
                    </div>
                    <div className="evaluation-details">
                      <div className="detail-row">
                        <strong>Strengths:</strong> {evaluation.strengths}
                      </div>
                      <div className="detail-row">
                        <strong>Areas for Improvement:</strong> {evaluation.areasForImprovement}
                      </div>
                      <div className="detail-row">
                        <strong>Recommendation:</strong> {
                          evaluation.recommendation === 'yes' ? 'Highly recommended' :
                          evaluation.recommendation === 'maybe' ? 'Recommended with reservations' : 'Not recommended'
                        }
                      </div>
                      {evaluation.comments && (
                        <div className="detail-row">
                          <strong>Comments:</strong> {evaluation.comments}
                        </div>
                      )}
                    </div>
                    <div className="evaluation-actions">
                      <button onClick={() => handleEdit(evaluation)} className="btn btn-light">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(evaluation.id)} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className={`mobile-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default EvaluationManager;