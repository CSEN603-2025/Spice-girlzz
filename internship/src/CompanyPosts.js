import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarCompany from './Components/SideBarCompany';

const JobPostManager = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ duration: '', isPaid: '' });
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    duration: '',
    isPaid: false,
    salary: '',
    skills: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Simulated API call to fetch internships and applications
  useEffect(() => {
    const fetchedInternships = [
      {
        id: 1,
        title: 'Software Engineering Intern',
        duration: '3 months',
        isPaid: true,
        salary: '$20/hour',
        skills: 'JavaScript, React, Node.js',
        description: 'Develop web applications.'
      },
      {
        id: 2,
        title: 'Data Science Intern',
        duration: '6 months',
        isPaid: false,
        salary: '',
        skills: 'Python, Pandas, SQL',
        description: 'Analyze data and build models.'
      }
    ];
    const fetchedApplications = [
      { id: 1, postId: 1, applicantName: 'John Doe', email: 'john.doe@example.com', resumeLink: 'http://example.com/resume1.pdf', coverLetter: 'I am passionate about software development...', submittedAt: '2025-05-01' },
      { id: 2, postId: 1, applicantName: 'Jane Smith', email: 'jane.smith@example.com', resumeLink: 'http://example.com/resume2.pdf', coverLetter: 'I have experience with React...', submittedAt: '2025-05-02' },
      { id: 3, postId: 2, applicantName: 'Alice Johnson', email: 'alice.johnson@example.com', resumeLink: 'http://example.com/resume3.pdf', coverLetter: 'I am skilled in data analysis...', submittedAt: '2025-05-03' }
    ];
    setInternships(fetchedInternships);
    setApplications(fetchedApplications);
  }, []);

  // Filter and search internships
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDuration = filter.duration ? internship.duration === filter.duration : true;
    const matchesPaid = filter.isPaid ? internship.isPaid.toString() === filter.isPaid : true;
    return matchesSearch && matchesDuration && matchesPaid;
  });

  // Get application count per post
  const getApplicationCount = (postId) => {
    return applications.filter(app => app.postId === postId).length;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update internship
      setInternships(internships.map(internship => internship.id === formData.id ? { ...formData } : internship));
      setIsEditing(false);
    } else {
      // Create new internship
      const newInternship = { ...formData, id: internships.length + 1 };
      setInternships([...internships, newInternship]);
    }
    closeModal();
  };

  const handleEdit = (internship) => {
    setFormData(internship);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setInternships(internships.filter(internship => internship.id !== id));
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      id: null,
      title: '',
      duration: '',
      isPaid: false,
      salary: '',
      skills: '',
      description: ''
    });
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>Internship Post Manager</h2>
        <div>
          <button 
            style={styles.navBtn} 
            onClick={() => navigate('/company')}
          >
            🏠 Home
          </button>
          <button 
            style={styles.navBtn} 
            onClick={() => navigate('/company/profile')}
          >
            👤 Profile
          </button>
          <button 
            style={styles.navBtn} 
            onClick={() => navigate('/company/mail')}
          >
            📧 Mail
            <span style={styles.notificationBadge}>1</span>
          </button>
          <button style={styles.navBtn} onClick={() => navigate('/')}>🚪 Logout</button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <SideBarCompany activePage="job-posts" />

        <div style={styles.profileContent}>
          {/* Create Post Section */}
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Create Post</h3>
            <button onClick={openModal} style={styles.submitBtn}>Create Post</button>
          </div>

          {/* Internship Posts Section */}
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Internship Posts</h3>
            <div style={styles.searchFilter}>
              <input
                type="text"
                placeholder="Search by title, skills, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              <div style={styles.filterGroup}>
                <select
                  value={filter.duration}
                  onChange={(e) => setFilter({ ...filter, duration: e.target.value })}
                  style={styles.filterSelect}
                >
                  <option value="">All Durations</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                </select>
                <select
                  value={filter.isPaid}
                  onChange={(e) => setFilter({ ...filter, isPaid: e.target.value })}
                  style={styles.filterSelect}
                >
                  <option value="">All Payment Types</option>
                  <option value="true">Paid</option>
                  <option value="false">Unpaid</option>
                </select>
              </div>
            </div>
            <div style={styles.postList}>
              {filteredInternships.length === 0 ? (
                <p style={styles.noData}>No internship posts found.</p>
              ) : (
                filteredInternships.map(post => (
                  <div key={post.id} style={styles.postCard}>
                    <h4 style={styles.postTitle}>{post.title}</h4>
                    <p><strong>Duration:</strong> {post.duration}</p>
                    <p><strong>Paid:</strong> {post.isPaid ? `Yes (${post.salary})` : 'No'}</p>
                    <p><strong>Skills:</strong> {post.skills}</p>
                    <p><strong>Description:</strong> {post.description}</p>
                    <p><strong>Applications:</strong> {getApplicationCount(post.id)}</p>
                    <div style={styles.jobActions}>
                      <button onClick={() => handleEdit(post)} style={styles.editBtn}>Edit</button>
                      <button onClick={() => handleDelete(post.id)} style={styles.deleteBtn}>Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Internship Post Modal */}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.sectionTitle}>{isEditing ? 'Update Internship Post' : 'Create Internship Post'}</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.detailLabel}>Internship Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  style={styles.inputField}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.detailLabel}>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  style={styles.inputField}
                  placeholder="e.g., 3 months"
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.detailLabel}>
                  <input
                    type="checkbox"
                    name="isPaid"
                    checked={formData.isPaid}
                    onChange={handleInputChange}
                    style={styles.checkbox}
                  />
                  Paid Internship
                </label>
              </div>
              {formData.isPaid && (
                <div style={styles.formGroup}>
                  <label style={styles.detailLabel}>Expected Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    style={styles.inputField}
                    placeholder="e.g., $20/hour"
                    required
                  />
                </div>
              )}
              <div style={styles.formGroup}>
                <label style={styles.detailLabel}>Skills Required</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  style={styles.inputField}
                  placeholder="e.g., JavaScript, React"
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.detailLabel}>Internship Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={styles.textArea}
                  required
                ></textarea>
              </div>
              <div style={styles.formActions}>
                <button type="submit" style={isEditing ? styles.saveBtn : styles.submitBtn}>
                  {isEditing ? 'Update' : 'Save'}
                </button>
                <button type="button" onClick={closeModal} style={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f7f9fc', // Light blue-gray background
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1d3557', // Dark blue
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  title: {
    margin: 0
  },
  navBtn: {
    backgroundColor: '#457b9d', // Medium blue
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    color: '#fff',
    cursor: 'pointer',
    marginLeft: '10px',
    position: 'relative'
  },
  notificationBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#e63946', // Red
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '12px'
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    overflow: 'auto'
  },
  profileContent: {
    flex: 1,
    padding: '2rem',
    marginLeft: '240px',
    overflowY: 'auto',
    height: 'calc(100vh - 64px)' // Adjust based on navbar height
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.3rem',
    color: '#1d3557', // Dark blue
    marginBottom: '1rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '0.5rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  detailLabel: {
    display: 'block',
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '0.3rem'
  },
  inputField: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    color: '#333'
  },
  textArea: {
    width: '100%',
    minHeight: '120px',
    padding: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontFamily: 'inherit',
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#333'
  },
  checkbox: {
    marginRight: '0.5rem'
  },
  formActions: {
    display: 'flex',
    gap: '1rem'
  },
  submitBtn: {
    backgroundColor: '#a8dadc', // Light teal
    border: 'none',
    borderRadius: '5px',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#1d3557', // Dark blue
    fontSize: '1rem'
  },
  saveBtn: {
    backgroundColor: '#2a9d8f', // Teal
    border: 'none',
    borderRadius: '5px',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'white',
    fontSize: '1rem'
  },
  cancelBtn: {
    backgroundColor: '#457b9d', // Medium blue
    border: 'none',
    borderRadius: '5px',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '1rem'
  },
  searchFilter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1rem'
  },
  searchInput: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    color: '#333'
  },
  filterGroup: {
    display: 'flex',
    gap: '1rem'
  },
  filterSelect: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    color: '#333',
    backgroundColor: '#fff'
  },
  postList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  postCard: {
    border: '1px solid #eee',
    padding: '1rem',
    borderRadius: '5px'
  },
  postTitle: {
    fontSize: '1.2rem',
    color: '#1d3557', // Dark blue
    marginBottom: '0.5rem'
  },
  noData: {
    color: '#666',
    textAlign: 'center',
    fontSize: '1rem'
  },
  jobActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  editBtn: {
    backgroundColor: '#a8dadc', // Light teal
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    color: '#1d3557', // Dark blue
    fontWeight: 'bold'
  },
  deleteBtn: {
    backgroundColor: '#e63946', // Red
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    color: '#fff'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }
};

export default JobPostManager;