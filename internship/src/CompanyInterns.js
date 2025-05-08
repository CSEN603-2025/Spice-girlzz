import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarCompany from './Components/SideBarCompany';

const Interns = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedIntern, setSelectedIntern] = useState(null);

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
      {
        id: 1,
        postId: 1,
        applicantName: 'John Doe',
        email: 'john.doe@example.com',
        resumeLink: 'http://example.com/resume1.pdf',
        coverLetter: 'I am passionate about software development...',
        submittedAt: '2025-05-01',
        status: 'current intern'
      },
      {
        id: 2,
        postId: 1,
        applicantName: 'Jane Smith',
        email: 'jane.smith@example.com',
        resumeLink: 'http://example.com/resume2.pdf',
        coverLetter: 'I have experience with React...',
        submittedAt: '2025-05-02',
        status: 'internship complete'
      },
      {
        id: 3,
        postId: 2,
        applicantName: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        resumeLink: 'http://example.com/resume3.pdf',
        coverLetter: 'I am skilled in data analysis...',
        submittedAt: '2025-05-03',
        status: 'current intern'
      }
    ];
    setInternships(fetchedInternships);
    setApplications(fetchedApplications);
  }, []);

  // Filter interns (applications with "current intern" or "internship complete" status)
  const interns = applications.filter(app => 
    app.status === 'current intern' || app.status === 'internship complete'
  );

  // Filter interns by search term and status
  const filteredInterns = interns.filter(intern => {
    const jobTitle = internships.find(post => post.id === intern.postId)?.title || '';
    const matchesSearch = intern.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus ? intern.status === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Handle intern selection
  const viewInternDetails = (intern) => {
    setSelectedIntern(intern);
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>Interns</h2>
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
        <SideBarCompany activePage="interns" />

        <div style={styles.profileContent}>
          {/* Interns Section */}
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Interns</h3>
            <div style={styles.searchFilter}>
              <input
                type="text"
                placeholder="Search by name or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              <div style={styles.filterGroup}>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={styles.filterSelect}
                >
                  <option value="">All Statuses</option>
                  <option value="current intern">Current Intern</option>
                  <option value="internship complete">Internship Complete</option>
                </select>
              </div>
            </div>
            <div style={styles.internList}>
              {filteredInterns.length === 0 ? (
                <p style={styles.noData}>No interns found.</p>
              ) : (
                filteredInterns.map(intern => (
                  <div key={intern.id} style={styles.internCard}>
                    <p><strong>Name:</strong> {intern.applicantName}</p>
                    <p><strong>Job Title:</strong> {internships.find(post => post.id === intern.postId)?.title}</p>
                    <p><strong>Status:</strong> {intern.status.charAt(0).toUpperCase() + intern.status.slice(1)}</p>
                    <p><strong>Start Date:</strong> {intern.submittedAt}</p>
                    <button
                      onClick={() => viewInternDetails(intern)}
                      style={styles.viewBtn}
                    >
                      View Details
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Intern Details Modal */}
      {selectedIntern && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.sectionTitle}>Intern Details</h3>
            <p><strong>Name:</strong> {selectedIntern.applicantName}</p>
            <p><strong>Email:</strong> {selectedIntern.email}</p>
            <p><strong>Job Title:</strong> {internships.find(post => post.id === selectedIntern.postId)?.title}</p>
            <p><strong>Status:</strong> {selectedIntern.status.charAt(0).toUpperCase() + selectedIntern.status.slice(1)}</p>
            <p><strong>Start Date:</strong> {selectedIntern.submittedAt}</p>
            <button
              onClick={() => setSelectedIntern(null)}
              style={styles.closeBtn}
            >
              Close
            </button>
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
  internList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  internCard: {
    border: '1px solid #eee',
    padding: '1rem',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  viewBtn: {
    backgroundColor: '#a8dadc', // Light teal
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    color: '#1d3557', // Dark blue
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  noData: {
    color: '#666',
    textAlign: 'center',
    fontSize: '1rem'
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
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  closeBtn: {
    backgroundColor: '#457b9d', // Medium blue
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    color: '#fff',
    alignSelf: 'flex-end'
  }
};

export default Interns;