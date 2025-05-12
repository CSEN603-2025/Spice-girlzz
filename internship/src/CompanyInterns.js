import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarCompany from './Components/SideBarCompany';
import { Mail, Home, LogOut, User, Menu } from 'lucide-react';
import './CompanyStyles.css';
import CompanyHeader from './CompanyHeader';

const Interns = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
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
      {
        id: 1,
        postId: 1,
        applicantName: 'John Ramzy',
        email: 'john.ramzy@student.guc.edu.eg',
        resumeLink: 'http://example.com/resume1.pdf',
        coverLetter: 'I am passionate about software development...',
        submittedAt: '2025-05-01',
        status: 'current intern'
      },
      {
        id: 2,
        postId: 1,
        applicantName: 'Menna Ibrahim',
        email: 'menna.ibrahimh@student.guc.edu.eg',
        resumeLink: 'http://example.com/resume2.pdf',
        coverLetter: 'I have experience with React...',
        submittedAt: '2025-05-02',
        status: 'internship complete'
      },
      {
        id: 3,
        postId: 2,
        applicantName: 'Alia Mohamed',
        email: 'ala.mohamed@student.guc.edu.eg',
        resumeLink: 'http://example.com/resume3.pdf',
        coverLetter: 'I am skilled in data analysis...',
        submittedAt: '2025-05-03',
        status: 'current intern'
      },
      {
        id: 4,
        postId: 1,
        applicantName: 'Karim Hassan',
        email: 'karim.hassan@student.guc.edu.eg',
        resumeLink: 'http://example.com/resume4.pdf',
        coverLetter: 'Experienced in building web applications...',
        submittedAt: '2025-05-04',
        status: 'current intern'
      },
      {
        id: 5,
        postId: 2,
        applicantName: 'Sara Abdelrahman',
        email: 'sara.abdelrahman@student.guc.edu.eg',
        resumeLink: 'http://example.com/resume5.pdf',
        coverLetter: 'Proficient in Python and data visualization...',
        submittedAt: '2025-05-05',
        status: 'internship complete'
      },
      {
        id: 6,
        postId: 1,
        applicantName: 'Omar Khaled',
        email: 'omar.khaled@student.guc.edu.eg',
        resumeLink: 'http://example.com/resume6.pdf',
        coverLetter: 'Skilled in JavaScript and frontend development...',
        submittedAt: '2025-05-06',
        status: 'current intern'
      }
    ];
    setInternships(fetchedInternships);
    setApplications(fetchedApplications);
  }, []);

  const interns = applications.filter(app => 
    app.status === 'current intern' || app.status === 'internship complete'
  );

  const filteredInterns = interns.filter(intern => {
    const jobTitle = internships.find(post => post.id === intern.postId)?.title || '';
    const matchesSearch = intern.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus ? intern.status === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  const viewInternDetails = (intern) => {
    setSelectedIntern(intern);
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
      <CompanyHeader />

      <div className="layout">
        <SideBarCompany onHoverChange={setIsSidebarHovered} />
        <div className={`content ${isSidebarHovered && window.innerWidth > 768 ? 'sidebar-expanded' : ''}`}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
            Interns
          </h2>

          {/* Search and Filter Inputs */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search by name or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                fontSize: '0.8rem',
                padding: '0.5em 1em',
                backgroundColor: '#e5e7eb',
                color: '#1f2937',
                border: 'none',
                borderRadius: '1150px',
                cursor: 'text',
                width: '300px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.2s ease',
              }}
              onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #2dd4bf')}
              onBlur={(e) => (e.target.style.boxShadow = 'none')}
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                fontSize: '0.8rem',
                padding: '0.5em 1em',
                backgroundColor: '#e5e7eb',
                color: '#1f2937',
                border: 'none',
                borderRadius: '1150px',
                cursor: 'pointer',
                minWidth: '100px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.2s ease',
              }}
              onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #2dd4bf')}
              onBlur={(e) => (e.target.style.boxShadow = 'none')}
            >
              <option value="">All Statuses</option>
              <option value="current intern">Current Intern</option>
              <option value="internship complete">Internship Complete</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('');
              }}
              style={{
                fontSize: '0.8rem',
                padding: '0.5em 1em',
                backgroundColor: '#e5e7eb',
                color: '#1f2937',
                border: 'none',
                borderRadius: '1150px',
                cursor: 'pointer',
                minWidth: '100px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.2s ease',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#d1d5db')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#e5e7eb')}
            >
              Clear Filters
            </button>
          </div>

          {/* Interns Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {filteredInterns.length === 0 ? (
              <p className="no-data">No interns found.</p>
            ) : (
              filteredInterns.map(intern => (
                <div
                  key={intern.id}
                  style={{
                    background: '#fff',
                    padding: '1rem',
                    borderRadius: '0.375rem',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    transition: 'box-shadow 0.3s, background-color 0.3s',
                    cursor: 'pointer',
                    border: '1px solid #2dd4bf',
                  }}
                  onClick={() => viewInternDetails(intern)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.backgroundColor = '#fff';
                  }}
                >
                  <h4 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                    {intern.applicantName}
                  </h4>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#4b5563' }}>
                    <strong>Job Title:</strong> {internships.find(post => post.id === intern.postId)?.title}
                  </p>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#4b5563' }}>
                    <strong>Status:</strong> {intern.status.charAt(0).toUpperCase() + intern.status.slice(1)}
                  </p>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#4b5563' }}>
                    <strong>Start Date:</strong> {intern.submittedAt}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Intern Details Modal */}
      {selectedIntern && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1002,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              maxWidth: '24rem',
              width: '100%',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
              Intern Details
            </h3>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Name:</strong> {selectedIntern.applicantName}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Email:</strong> {selectedIntern.email}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Job Title:</strong> {internships.find(post => post.id === selectedIntern.postId)?.title}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Status:</strong> {selectedIntern.status.charAt(0).toUpperCase() + selectedIntern.status.slice(1)}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Start Date:</strong> {selectedIntern.submittedAt}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Resume:</strong> <a href={selectedIntern.resumeLink} target="_blank" rel="noopener noreferrer">View Resume</a>
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Cover Letter:</strong> {selectedIntern.coverLetter.substring(0, 100)}...
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  background: '#2dd4bf',
                  color: '#fff',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  border: 'none',
                  fontSize: '0.875rem',
                }}
                onClick={() => setSelectedIntern(null)}
                onMouseOver={(e) => (e.target.style.background = '#26a69a')}
                onMouseOut={(e) => (e.target.style.background = '#2dd4bf')}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className={`mobile-overlay ${isSidebarOpen ? 'active' : ''}`}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Interns;