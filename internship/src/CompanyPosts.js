import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarCompany from './Components/SideBarCompany';
import { Mail, Home, LogOut, User, Menu } from 'lucide-react';
import './CompanyStyles.css';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [clickedButtons, setClickedButtons] = useState({});

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

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDuration = filter.duration ? internship.duration === filter.duration : true;
    const matchesPaid = filter.isPaid ? internship.isPaid.toString() === filter.isPaid : true;
    return matchesSearch && matchesDuration && matchesPaid;
  });

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
      setInternships(internships.map(internship => internship.id === formData.id ? { ...formData } : internship));
      setIsEditing(false);
    } else {
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

  const handleButtonClick = (buttonId) => {
    setClickedButtons(prev => ({
      ...prev,
      [buttonId]: true
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 0 auto', maxWidth: '50%' }}>
          <button className="header-btn" title="Toggle Sidebar" onClick={toggleSidebar}>
            <Menu size={20} />
          </button>
          <h2 className="header-title">Internship Post Manager</h2>
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
            <span className="notification-badge">1</span>
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
        <div className="sidebar">
          <SideBarCompany setActivePage={(page) => navigate(`/company/${page}`)} />
        </div>
        <div className={`content ${isSidebarOpen && window.innerWidth > 768 ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="card">
            <h3 className="section-title">Create Post</h3>
            <button onClick={openModal} className="btn btn-primary">Create Post</button>
          </div>

          <div className="card">
            <h3 className="section-title">Internship Posts</h3>
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search by title, skills, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
              />
              <div className="filter-group">
                <select
                  value={filter.duration}
                  onChange={(e) => setFilter({ ...filter, duration: e.target.value })}
                  className="form-select"
                >
                  <option value="">All Durations</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                </select>
                <select
                  value={filter.isPaid}
                  onChange={(e) => setFilter({ ...filter, isPaid: e.target.value })}
                  className="form-select"
                >
                  <option value="">All Payment Types</option>
                  <option value="true">Paid</option>
                  <option value="false">Unpaid</option>
                </select>
              </div>
            </div>
            <div className="post-list">
              {filteredInternships.length === 0 ? (
                <p className="no-data">No internship posts found.</p>
              ) : (
                filteredInternships.map(post => (
                  <div key={post.id} className="post-card">
                    <h4 className="post-title">{post.title}</h4>
                    <p><strong>Duration:</strong> {post.duration}</p>
                    <p><strong>Paid:</strong> {post.isPaid ? `Yes (${post.salary})` : 'No'}</p>
                    <p><strong>Skills:</strong> {post.skills}</p>
                    <p><strong>Description:</strong> {post.description}</p>
                    <p><strong>Applications:</strong> {getApplicationCount(post.id)}</p>
                    <div className="job-actions">
                      <button onClick={() => handleEdit(post)} className="btn btn-light">Edit</button>
                      <button onClick={() => handleDelete(post.id)} className="btn btn-danger">Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="section-title">{isEditing ? 'Update Internship Post' : 'Create Internship Post'}</h3>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label className="form-label">Internship Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 3 months"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <input
                    type="checkbox"
                    name="isPaid"
                    checked={formData.isPaid}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  Paid Internship
                </label>
              </div>
              {formData.isPaid && (
                <div className="form-group">
                  <label className="form-label">Expected Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., $20/hour"
                    required
                  />
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Skills Required</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., JavaScript, React"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Internship Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  required
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="submit" className={isEditing ? 'btn btn-primary' : 'btn btn-primary'}>
                  {isEditing ? 'Update' : 'Save'}
                </button>
                <button type="button" onClick={closeModal} className="btn btn-danger">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isSidebarOpen && (
        <div className={`mobile-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default JobPostManager;