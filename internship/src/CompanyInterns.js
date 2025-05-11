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
           <CompanyHeader  />


      <div className="layout">
        <SideBarCompany onHoverChange={setIsSidebarHovered} />
        <div className={`content ${isSidebarHovered && window.innerWidth > 768 ? 'sidebar-expanded' : ''}`}>
          <div className="card">
            <h3 className="section-title">Interns</h3>
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search by name or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
              />
              <div className="filter-group">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="form-select"
                >
                  <option value="">All Statuses</option>
                  <option value="current intern">Current Intern</option>
                  <option value="internship complete">Internship Complete</option>
                </select>
              </div>
            </div>
            <div className="intern-list">
              {filteredInterns.length === 0 ? (
                <p className="no-data">No interns found.</p>
              ) : (
                filteredInterns.map(intern => (
                  <div key={intern.id} className="intern-card">
                    <p><strong>Name:</strong> {intern.applicantName}</p>
                    <p><strong>Job Title:</strong> {internships.find(post => post.id === intern.postId)?.title}</p>
                    <p><strong>Status:</strong> {intern.status.charAt(0).toUpperCase() + intern.status.slice(1)}</p>
                    <p><strong>Start Date:</strong> {intern.submittedAt}</p>
                    <button
                      onClick={() => viewInternDetails(intern)}
                      className="btn btn-light"
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

      {selectedIntern && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="section-title">Intern Details</h3>
            <p><strong>Name:</strong> {selectedIntern.applicantName}</p>
            <p><strong>Email:</strong> {selectedIntern.email}</p>
            <p><strong>Job Title:</strong> {internships.find(post => post.id === selectedIntern.postId)?.title}</p>
            <p><strong>Status:</strong> {selectedIntern.status.charAt(0).toUpperCase() + selectedIntern.status.slice(1)}</p>
            <p><strong>Start Date:</strong> {selectedIntern.submittedAt}</p>
            <button
              onClick={() => setSelectedIntern(null)}
              className="btn btn-danger"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isSidebarOpen && (
        <div className={`mobile-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default Interns;