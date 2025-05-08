import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarCompany from './Components/SideBarCompany';

const Applications = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isCoverLetterExpanded, setIsCoverLetterExpanded] = useState(false);
  const [isResumeVisible, setIsResumeVisible] = useState(false);

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
        resume: {
          contact: {
            email: 'john.doe@example.com',
            phone: '(123) 456-7890',
            location: 'San Francisco, CA'
          },
          education: [
            {
              institution: 'University of California, Berkeley',
              degree: 'B.S. in Computer Science',
              dates: 'Expected May 2025',
              details: 'Relevant Coursework: Web Development, Algorithms, Data Structures; GPA: 3.8/4.0'
            }
          ],
          experience: [
            {
              company: 'Tech Startup',
              role: 'Software Development Intern',
              dates: 'June 2024 -- August 2024',
              details: [
                'Developed a task management web application using JavaScript and React.',
                'Collaborated with a team to integrate Node.js backend APIs.',
                'Improved application performance by optimizing front-end components.'
              ]
            },
            {
              company: 'Open Source Contributor',
              role: 'Developer',
              dates: 'January 2024 -- Present',
              details: [
                'Contributed to JavaScript libraries, focusing on React-based UI components.',
                'Wrote documentation and unit tests to ensure code reliability.'
              ]
            }
          ],
          skills: [
            'Programming Languages: JavaScript, HTML, CSS',
            'Frameworks/Tools: React, Node.js, Git',
            'Other: Agile Development, Team Collaboration'
          ]
        },
        coverLetter: 'I am passionate about software development and have extensive experience in JavaScript and React. My projects include building a web application for task management and contributing to open-source libraries. I am eager to contribute to your team and learn from industry experts.',
        submittedAt: '2025-05-01',
        status: 'pending'
      },
      {
        id: 2,
        postId: 1,
        applicantName: 'Jane Smith',
        email: 'jane.smith@example.com',
        resume: {
          contact: {
            email: 'jane.smith@example.com',
            phone: '(234) 567-8901',
            location: 'New York, NY'
          },
          education: [
            {
              institution: 'New York University',
              degree: 'B.S. in Computer Science',
              dates: 'Expected May 2025',
              details: 'Relevant Coursework: Full-Stack Development, Database Systems; GPA: 3.9/4.0'
            }
          ],
          experience: [
            {
              company: 'Web Solutions Inc.',
              role: 'Software Engineering Intern',
              dates: 'June 2024 -- August 2024',
              details: [
                'Developed a user authentication system using React and Node.js.',
                'Implemented secure API endpoints for user data management.',
                'Conducted code reviews to ensure adherence to best practices.'
              ]
            },
            {
              company: 'Freelance Developer',
              role: 'Web Developer',
              dates: 'March 2024 -- Present',
              details: [
                'Built responsive websites for small businesses using React.',
                'Integrated third-party APIs for payment processing and analytics.'
              ]
            }
          ],
          skills: [
            'Programming Languages: JavaScript, TypeScript',
            'Frameworks/Tools: React, Node.js, Express, Git',
            'Other: RESTful APIs, Unit Testing'
          ]
        },
        coverLetter: 'I have experience with React and Node.js, having worked on multiple full-stack projects. My recent internship involved developing a user authentication system, and I am excited to bring my skills to your innovative company.',
        submittedAt: '2025-05-02',
        status: 'accepted'
      },
      {
        id: 3,
        postId: 2,
        applicantName: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        resume: {
          contact: {
            email: 'alice.johnson@example.com',
            phone: '(345) 678-9012',
            location: 'Chicago, IL'
          },
          education: [
            {
              institution: 'University of Chicago',
              degree: 'B.S. in Data Science',
              dates: 'Expected May 2025',
              details: 'Relevant Coursework: Machine Learning, Statistical Analysis, Database Systems; GPA: 3.7/4.0'
            }
          ],
          experience: [
            {
              company: 'Data Analytics Corp.',
              role: 'Data Science Intern',
              dates: 'June 2024 -- August 2024',
              details: [
                'Built predictive models for customer churn using Python and Pandas.',
                'Queried large datasets with SQL to generate business insights.',
                'Presented findings to stakeholders using data visualization tools.'
              ]
            },
            {
              company: 'Academic Research Assistant',
              role: 'Data Analyst',
              dates: 'January 2024 -- Present',
              details: [
                'Analyzed experimental data using Python and statistical methods.',
                'Contributed to published research on predictive modeling.'
              ]
            }
          ],
          skills: [
            'Programming Languages: Python, SQL',
            'Libraries/Tools: Pandas, NumPy, Scikit-learn, Git',
            'Other: Data Visualization, Statistical Analysis'
          ]
        },
        coverLetter: 'I am skilled in data analysis with Python, Pandas, and SQL. My academic projects include building predictive models for customer churn, and I am enthusiastic about applying my data science knowledge to real-world challenges at your organization.',
        submittedAt: '2025-05-03',
        status: 'current intern'
      }
    ];
    setInternships(fetchedInternships);
    setApplications(fetchedApplications);
  }, []);

  // Filter applications by post and status
  const filteredApplications = applications.filter(app => {
    const matchesPost = selectedPostId ? app.postId === parseInt(selectedPostId) : true;
    const matchesStatus = selectedStatus ? app.status === selectedStatus : true;
    return matchesPost && matchesStatus;
  });

  // Calculate application count
  const getApplicationCount = () => {
    if (selectedPostId) {
      const count = applications.filter(app => app.postId === parseInt(selectedPostId)).length;
      const postTitle = internships.find(post => post.id === parseInt(selectedPostId))?.title || 'Selected Post';
      return `${count} application${count !== 1 ? 's' : ''} for ${postTitle}`;
    }
    return `${applications.length} application${applications.length !== 1 ? 's' : ''} total`;
  };

  // Handle applicant selection
  const viewApplicantDetails = (applicant) => {
    setSelectedApplicant(applicant);
    setIsCoverLetterExpanded(false);
    setIsResumeVisible(false); // Reset resume visibility when opening modal
  };

  // Update application status
  const updateStatus = (applicationId, newStatus) => {
    setApplications(applications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
    if (selectedApplicant && selectedApplicant.id === applicationId) {
      setSelectedApplicant({ ...selectedApplicant, status: newStatus });
    }
  };

  // Toggle cover letter expansion
  const toggleCoverLetter = () => {
    setIsCoverLetterExpanded(!isCoverLetterExpanded);
  };

  // Toggle resume visibility
  const toggleResume = () => {
    setIsResumeVisible(!isResumeVisible);
  };

  // Truncate cover letter for preview
  const truncateCoverLetter = (text) => {
    const maxLength = 100;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>Applications Manager</h2>
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
        <SideBarCompany activePage="applications" />

        <div style={styles.profileContent}>
          {/* Applications Section */}
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Applications</h3>
            <div style={styles.filterGroup}>
              <select
                value={selectedPostId}
                onChange={(e) => setSelectedPostId(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="">All Internship Posts</option>
                {internships.map(post => (
                  <option key={post.id} value={post.id}>{post.title}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="finalized">Finalized</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="current intern">Current Intern</option>
                <option value="internship complete">Internship Complete</option>
              </select>
            </div>
            <p style={styles.applicationCount}>{getApplicationCount()}</p>
            <div style={styles.applicationList}>
              {filteredApplications.length === 0 ? (
                <p style={styles.noData}>No applications found.</p>
              ) : (
                filteredApplications.map(app => (
                  <div key={app.id} style={styles.applicationCard}>
                    <p><strong>Applicant:</strong> {app.applicantName}</p>
                    <p><strong>Post:</strong> {internships.find(post => post.id === app.postId)?.title}</p>
                    <p><strong>Submitted:</strong> {app.submittedAt}</p>
                    <p><strong>Status:</strong> {app.status.charAt(0).toUpperCase() + app.status.slice(1)}</p>
                    <button
                      onClick={() => viewApplicantDetails(app)}
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

      {/* Applicant Details Modal */}
      {selectedApplicant && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.sectionTitle}>Applicant Details</h3>
            <p><strong>Name:</strong> {selectedApplicant.applicantName}</p>
            <p><strong>Email:</strong> {selectedApplicant.email}</p>
            <p><strong>Resume:</strong> 
              <button onClick={toggleResume} style={styles.toggleBtn}>
                {isResumeVisible ? 'Hide Resume' : 'View Resume'}
              </button>
            </p>
            {isResumeVisible && (
              <div style={styles.resumePreview}>
                <h4 style={styles.resumeTitle}>{selectedApplicant.applicantName}</h4>
                <p><strong>Contact:</strong> {selectedApplicant.resume.contact.email} | {selectedApplicant.resume.contact.phone} | {selectedApplicant.resume.contact.location}</p>
                <h5 style={styles.resumeSection}>Education</h5>
                {selectedApplicant.resume.education.map((edu, index) => (
                  <div key={index}>
                    <p><strong>{edu.institution}</strong> - {edu.degree} ({edu.dates})</p>
                    <p>{edu.details}</p>
                  </div>
                ))}
                <h5 style={styles.resumeSection}>Experience</h5>
                {selectedApplicant.resume.experience.map((exp, index) => (
                  <div key={index}>
                    <p><strong>{exp.company}</strong> - {exp.role} ({exp.dates})</p>
                    <ul style={styles.resumeList}>
                      {exp.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <h5 style={styles.resumeSection}>Skills</h5>
                <ul style={styles.resumeList}>
                  {selectedApplicant.resume.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
            <p><strong>Cover Letter:</strong> {isCoverLetterExpanded ? selectedApplicant.coverLetter : truncateCoverLetter(selectedApplicant.coverLetter)}</p>
            {selectedApplicant.coverLetter.length > 100 && (
              <button
                onClick={toggleCoverLetter}
                style={styles.toggleBtn}
              >
                {isCoverLetterExpanded ? 'Read Less' : 'Read More'}
              </button>
            )}
            <p><strong>Submitted:</strong> {selectedApplicant.submittedAt}</p>
            <p><strong>Status:</strong> {selectedApplicant.status.charAt(0).toUpperCase() + selectedApplicant.status.slice(1)}</p>
            <div style={styles.formGroup}>
              <label style={styles.detailLabel}>Update Status</label>
              <select
                value={selectedApplicant.status}
                onChange={(e) => updateStatus(selectedApplicant.id, e.target.value)}
                style={styles.filterSelect}
              >
                <option value="pending">Pending</option>
                <option value="finalized">Finalized</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="current intern">Current Intern</option>
                <option value="internship complete">Internship Complete</option>
              </select>
            </div>
            <button
              onClick={() => setSelectedApplicant(null)}
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
  filterGroup: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  },
  filterSelect: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    color: '#333',
    backgroundColor: '#fff'
  },
  applicationCount: {
    color: '#666',
    fontSize: '1rem',
    marginBottom: '1rem'
  },
  applicationList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  applicationCard: {
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
    gap: '1rem',
    maxHeight: '80vh',
    overflowY: 'auto'
  },
  closeBtn: {
    backgroundColor: '#457b9d', // Medium blue
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    color: '#fff',
    alignSelf: 'flex-end'
  },
  link: {
    color: '#457b9d', // Medium blue
    textDecoration: 'none'
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
  toggleBtn: {
    backgroundColor: '#a8dadc', // Light teal
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    color: '#1d3557', // Dark blue
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  resumePreview: {
    border: '1px solid #eee',
    padding: '1rem',
    backgroundColor: '#f7f9fc',
    borderRadius: '5px'
  },
  resumeTitle: {
    fontSize: '1.2rem',
    color: '#1d3557',
    marginBottom: '0.5rem',
    textAlign: 'center'
  },
  resumeSection: {
    fontSize: '1rem',
    color: '#1d3557',
    marginTop: '0.5rem',
    marginBottom: '0.3rem'
  },
  resumeList: {
    margin: 0,
    paddingLeft: '1.5rem'
  }
};

export default Applications;