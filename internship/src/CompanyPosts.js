import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarCompany from './Components/SideBarCompany';
import { Mail, Home, LogOut, User, Menu } from 'lucide-react';
import './CompanyStyles.css';
import './StudentHomePage.css'; // Import StudentHomePage CSS for card styling
import CompanyHeader from './CompanyHeader';

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
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  useEffect(() => {
    const fetchedInternships = [
      {
        id: 1,
        title: 'Software Engineering Intern',
        duration: '3 months',
        isPaid: true,
        salary: '$20/hour',
        skills: 'JavaScript, React, Node.js',
        description: 'Develop web applications.',
        company: 'TechCorp',
        location: 'Remote',
        posted: '1 day ago',
        applicants: 15
      },
      {
        id: 2,
        title: 'Data Science Intern',
        duration: '6 months',
        isPaid: false,
        salary: '',
        skills: 'Python, Pandas, SQL',
        description: 'Analyze data and build models.',
        company: 'DataCorp',
        location: 'New York, NY',
        posted: '2 days ago',
        applicants: 8
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
      const newInternship = { ...formData, id: internships.length + 1, company: 'Your Company', location: 'Remote', posted: 'Just now', applicants: 0 };
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

  const openDetailsModal = (internship) => {
    setSelectedInternship(internship);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedInternship(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container">
      <CompanyHeader />
      <div className="layout">
        <SideBarCompany onHoverChange={setIsSidebarHovered} />
        <div className={`content ${isSidebarHovered && window.innerWidth > 768 ? 'sidebar-expanded' : ''}`}>
          <div className="card">
            <h3 className="section-title">Create New Internship Post</h3>
            <div className="form-preview">
              <div className="preview-field">
                <label>Title:</label>
                <div className="preview-value">Software Engineering Intern</div>
              </div>
              <div className="preview-field">
                <label>Duration:</label>
                <div className="preview-value">3 months</div>
              </div>
              <div className="preview-field">
                <label>Payment:</label>
                <div className="preview-value">Paid ($20/hour)</div>
              </div>
              <button 
                onClick={openModal} 
                className="btn btn-primary create-post-btn"
              >
                + Create New Post
              </button>
            </div>
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
            <div className="cardHolder" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {filteredInternships.length === 0 ? (
                <p className="no-data">No internship posts found.</p>
              ) : (
                filteredInternships.map(post => (
                  <div
                    key={post.id}
                    className="card"
                    style={{
                      width: '400px',
                      minHeight: '300px',
                      padding: '1.5rem',
                      margin: '20px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div
                      className="card-content"
                      style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    >
                      <div>
                        <div className="card-header">
                          <h3 className="program-title">{post.title}</h3>
                          <div className="company-info">
                            <span className="company-name">{post.company}</span>
                            <span className="company-location">{post.location}</span>
                            <span className="post-date">{post.posted}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                          <div className="alumni-count">
                            <span className="pin-icon">📌</span>
                            <span>{post.applicants} students have applied already</span>
                          </div>
                          <button
                            onClick={() => openDetailsModal(post)}
                            className="actionButton"
                            style={{ padding: '8px 16px' }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                      <div className="card-footer" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                        <div
                          className="job-actions"
                          style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}
                        >
                          <button
                            onClick={() => handleEdit(post)}
                            className="btn btn-light"
                            style={{ width: '100px', padding: '8px' }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="btn btn-danger"
                            style={{ width: '100px', padding: '8px' }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
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

      {showDetailsModal && selectedInternship && (
        <div className="modal-overlay" role="dialog" aria-labelledby="modal-title">
          <div className="modal-content">
            <h3 id="modal-title" className="modal-title">{selectedInternship.title}</h3>
            <p className="modal-info">
              <strong>Company:</strong> {selectedInternship.company}
            </p>
            <p className="modal-info">
              <strong>Location:</strong> {selectedInternship.location}
            </p>
            <p className="modal-info">
              <strong>Duration:</strong> {selectedInternship.duration}
            </p>
            <p className="modal-info">
              <strong>Paid/Unpaid:</strong> {selectedInternship.isPaid ? `Paid (${selectedInternship.salary})` : 'Unpaid'}
            </p>
            <p className="modal-info">
              <strong>Skills Required:</strong> {selectedInternship.skills}
            </p>
            <p className="modal-info">
              <strong>Description:</strong> {selectedInternship.description}
            </p>
            <p className="modal-info">
              <strong>Posted:</strong> {selectedInternship.posted}
            </p>
            <p className="modal-info">
              <strong>Applicants:</strong> {selectedInternship.applicants}
            </p>
            <div className="modal-footer">
              <button
                className="modal-close-button"
                onClick={closeDetailsModal}
              >
                Close
              </button>
            </div>
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