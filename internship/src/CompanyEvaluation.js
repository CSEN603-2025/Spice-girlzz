import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarCompany from './Components/SideBarCompany';

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

  // Simulated API calls
  useEffect(() => {
    // Fetch students who completed internships
    const fetchedStudents = [
      { id: 1, name: 'John Ramzy', program: 'Computer Science', internship: 'Software Developer' },
      { id: 2, name: 'Menna Ibrahim', program: 'Data Science', internship: 'Data Analyst' }
    ];
    setStudents(fetchedStudents);

    // Fetch existing evaluations
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
      // Update evaluation
      setEvaluations(evaluations.map(evaluate => 
        eval.id === formData.id ? { 
          ...formData, 
          studentName: students.find(s => s.id == formData.studentId)?.name || 'Unknown'
        } : eval
      ));
    } else {
      // Create new evaluation
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
    setEvaluations(evaluations.filter(evaluate => eval.id !== id));
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

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>Student Evaluations</h2>
        <div>
          <button style={styles.navBtn} onClick={() => navigate('/company')}>🏠 Home</button>
          <button style={styles.navBtn} onClick={() => navigate('/company/profile')}>👤 Profile</button>
          <button style={styles.navBtn} onClick={() => navigate('/company/mail')}>📧 Mail</button>
          <button style={styles.navBtn} onClick={() => navigate('/')}>🚪 Logout</button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <SideBarCompany activePage="evaluations" />
        
        <div style={styles.contentContainer}>
          {/* Evaluation Form */}
          <div style={styles.formCard}>
            <h3 style={styles.sectionTitle}>
              {isEditing ? 'Update Evaluation' : 'Create New Evaluation'}
            </h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Student</label>
                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  style={styles.input}
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

              <div style={styles.formGroup}>
                <label style={styles.label}>Rating (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Strengths</label>
                <textarea
                  name="strengths"
                  value={formData.strengths}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Areas for Improvement</label>
                <textarea
                  name="areasForImprovement"
                  value={formData.areasForImprovement}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Would you recommend this student?</label>
                <select
                  name="recommendation"
                  value={formData.recommendation}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                >
                  <option value="yes">Yes, highly recommend</option>
                  <option value="maybe">Yes, with reservations</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Additional Comments</label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.formActions}>
                <button type="submit" style={styles.submitBtn}>
                  {isEditing ? 'Update Evaluation' : 'Create Evaluation'}
                </button>
                {isEditing && (
                  <button type="button" onClick={resetForm} style={styles.cancelBtn}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Evaluations List */}
          <div style={styles.listCard}>
            <h3 style={styles.sectionTitle}>Completed Evaluations</h3>
            {evaluations.length === 0 ? (
              <p style={styles.noData}>No evaluations found.</p>
            ) : (
              evaluations.map(evaluation => (
                <div key={evaluation.id} style={styles.evaluationCard}>
                  <div style={styles.evaluationHeader}>
                    <h4 style={styles.evaluationTitle}>
                      {evaluation.studentName}
                      <span style={styles.rating}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} style={i < evaluation.rating ? styles.starFilled : styles.starEmpty}>
                            ★
                          </span>
                        ))}
                      </span>
                    </h4>
                    <span style={styles.evaluationDate}>{evaluation.date}</span>
                  </div>
                  
                  <div style={styles.evaluationDetails}>
                    <div style={styles.detailRow}>
                      <strong>Strengths:</strong> {evaluation.strengths}
                    </div>
                    <div style={styles.detailRow}>
                      <strong>Areas for Improvement:</strong> {evaluation.areasForImprovement}
                    </div>
                    <div style={styles.detailRow}>
                      <strong>Recommendation:</strong> {
                        evaluation.recommendation === 'yes' ? 'Highly recommended' :
                        evaluation.recommendation === 'maybe' ? 'Recommended with reservations' : 'Not recommended'
                      }
                    </div>
                    {evaluation.comments && (
                      <div style={styles.detailRow}>
                        <strong>Comments:</strong> {evaluation.comments}
                      </div>
                    )}
                  </div>

                  <div style={styles.evaluationActions}>
                    <button 
                      onClick={() => handleEdit(evaluation)}
                      style={styles.editBtn}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(evaluation.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles (using your existing color scheme)
const styles = {
  container: { 
    fontFamily: 'Segoe UI, sans-serif', 
    backgroundColor: '#f7f9fc', 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  navbar: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '1rem 2rem', 
    backgroundColor: '#1d3557', 
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  title: { margin: 0 },
  navBtn: { 
    backgroundColor: '#457b9d', 
    border: 'none', 
    borderRadius: '5px', 
    padding: '0.5rem 1rem', 
    color: '#fff', 
    cursor: 'pointer', 
    marginLeft: '10px',
    position: 'relative'
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  contentContainer: {
    flex: 1,
    padding: '2rem',
    marginLeft: '240px',
    overflowY: 'auto'
  },
  formCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    marginBottom: '2rem'
  },
  listCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: '#1d3557',
    marginBottom: '1.5rem',
    borderBottom: '2px solid #a8dadc',
    paddingBottom: '0.5rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    color: '#1d3557',
    fontWeight: '500',
    fontSize: '1rem'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #a8dadc',
    borderRadius: '4px',
    fontSize: '1rem',
    backgroundColor: '#f1faee'
  },
  textarea: {
    padding: '0.75rem',
    border: '1px solid #a8dadc',
    borderRadius: '4px',
    minHeight: '100px',
    fontSize: '1rem',
    backgroundColor: '#f1faee',
    resize: 'vertical'
  },
  formActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  submitBtn: {
    backgroundColor: '#457b9d',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#3a6a85'
    }
  },
  cancelBtn: {
    backgroundColor: '#a8dadc',
    color: '#1d3557',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#97c9cb'
    }
  },
  noData: {
    color: '#647c90',
    textAlign: 'center',
    fontSize: '1.1rem',
    padding: '2rem'
  },
  evaluationCard: {
    backgroundColor: '#f1faee',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    borderLeft: '4px solid #457b9d'
  },
  evaluationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  evaluationTitle: {
    fontSize: '1.3rem',
    color: '#1d3557',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  evaluationDate: {
    color: '#647c90',
    fontSize: '0.9rem'
  },
  evaluationDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    color: '#1d3557'
  },
  detailRow: {
    lineHeight: '1.5'
  },
  evaluationActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  editBtn: {
    backgroundColor: '#a8dadc',
    color: '#1d3557',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#97c9cb'
    }
  },
  deleteBtn: {
    backgroundColor: '#e63946',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#d1323f'
    }
  },
  rating: {
    display: 'flex',
    gap: '0.25rem'
  },
  starFilled: {
    color: '#f4a261'
  },
  starEmpty: {
    color: '#ccc'
  }
};

export default EvaluationManager;