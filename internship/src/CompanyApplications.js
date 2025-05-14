import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarCompany from './Components/SideBarCompany';
import { Mail, Home, LogOut, User, Menu, Download } from 'lucide-react';
import './CompanyStyles.css';
import CompanyHeader from './CompanyHeader';
import { generateStatisticsReport } from "./pdfGeneratorCV";

const initialCV = {
  personalInfo: {
    name: "John Ramzy",
    email: "john.ramzy@student.guc.edu.eg",
    phone: "+1-555-123-4567",
    linkedin: "https://linkedin.com/in/janedoe",
    location: "Cairo, Egypt"
  },
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Example",
      startDate: "2021-09-01",
      endDate: "2025-05-31",
      gpa: 3.8
    }
  ],
  skills: [
    "JavaScript",
    "React",
    "Python",
    "SQL",
    "Data Analysis",
    "Team Collaboration"
  ],
  workExperience: [
    {
      title: "Software Engineering Intern",
      company: "TechCorp",
      location: "Remote",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      responsibilities: [
        "Developed web applications using React and Node.js",
        "Collaborated with a team of 5 to implement new features",
        "Optimized API endpoints for better performance"
      ]
    },
    {
      title: "Data Science Intern",
      company: "MediHealth",
      location: "San Francisco, CA",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      responsibilities: [
        "Analyzed patient data using Python and Pandas",
        "Created data visualizations for stakeholder presentations",
        "Assisted in building predictive models"
      ]
    }
  ],
  projects: [
    {
      name: "Personal Portfolio Website",
      description: "Built a responsive portfolio website using React and Tailwind CSS.",
      technologies: ["React", "Tailwind CSS", "JavaScript"],
      link: "https://janedoe-portfolio.example.com"
    },
    {
      name: "Machine Learning Classifier",
      description: "Developed a model to classify customer feedback using Python and scikit-learn.",
      technologies: ["Python", "scikit-learn", "Pandas"],
      link: ""
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2024-03-15"
    },
    {
      name: "Python for Data Science",
      issuer: "Coursera",
      date: "2023-12-10"
    }
  ]
};

const Applications = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isCoverLetterExpanded, setIsCoverLetterExpanded] = useState(false);
  const [isResumeVisible, setIsResumeVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [clickedButtons, setClickedButtons] = useState({});
    const [CV_content] = useState(initialCV);
  

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

  const filteredApplications = applications.filter(app => {
    const matchesPost = selectedPostId ? app.postId === parseInt(selectedPostId) : true;
    const matchesStatus = selectedStatus ? app.status === selectedStatus : true;
    return matchesPost && matchesStatus;
  });

  const getApplicationCount = () => {
    if (selectedPostId) {
      const count = applications.filter(app => app.postId === parseInt(selectedPostId)).length;
      const postTitle = internships.find(post => post.id === parseInt(selectedPostId))?.title || 'Selected Post';
      return `${count} application${count !== 1 ? 's' : ''} for ${postTitle}`;
    }
    return `${applications.length} application${applications.length !== 1 ? 's' : ''} total`;
  };

  const viewApplicantDetails = (applicant) => {
    setSelectedApplicant(applicant);
    setIsCoverLetterExpanded(false);
    setIsResumeVisible(false);
  };

  const updateStatus = (applicationId, newStatus) => {
    setApplications(applications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
    if (selectedApplicant && selectedApplicant.id === applicationId) {
      setSelectedApplicant({ ...selectedApplicant, status: newStatus });
    }
  };

  const toggleCoverLetter = () => {
    setIsCoverLetterExpanded(!isCoverLetterExpanded);
  };

  const toggleResume = () => {
    setIsResumeVisible(!isResumeVisible);
  };

  const truncateCoverLetter = (text) => {
    const maxLength = 100;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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
            <h3 className="section-title">Applications</h3>
            <div className="filter-group">
              <select
                value={selectedPostId}
                onChange={(e) => setSelectedPostId(e.target.value)}
                className="form-select"
              >
                <option value="">All Internship Posts</option>
                {internships.map(post => (
                  <option key={post.id} value={post.id}>{post.title}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="form-select"
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
            <div><p className="application-count">{getApplicationCount()}</p></div>
            <div className="application-list">
              {filteredApplications.length === 0 ? (
                <p className="no-data">No applications found.</p>
              ) : (
                filteredApplications.map(app => (
                  <div key={app.id} className="application-card">
                    <p><strong>Applicant:</strong> {app.applicantName}</p>
                    <p><strong>Post:</strong> {internships.find(post => post.id === app.postId)?.title}</p>
                    <p><strong>Submitted:</strong> {app.submittedAt}</p>
                    <p><strong>Status:</strong> {app.status.charAt(0).toUpperCase() + app.status.slice(1)}</p>
                    <button
                      onClick={() => viewApplicantDetails(app)}
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

      {selectedApplicant && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="section-title">Applicant Details</h3>
            <p><strong>Name:</strong> {selectedApplicant.applicantName}</p>
            <p><strong>Email:</strong> {selectedApplicant.email}</p>
                       <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>CV:</strong>
              <button
                onClick={() => generateStatisticsReport(CV_content)}
                className="actionButton"
                style={{
                  padding: '0.3rem 0.8rem',
                  fontSize: '0.75rem',
                  marginLeft: '0.5rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  verticalAlign: 'middle',
                }}
              >
                <Download size={14} style={{ marginRight: '0.3rem' }} />
                Download CV
              </button>
            </p>
            {isResumeVisible && (
              <div className="resume-preview">
                <h4 className="resume-title">{selectedApplicant.applicantName}</h4>
                <p><strong>Contact:</strong> {selectedApplicant.resume.contact.email} | {selectedApplicant.resume.contact.phone} | {selectedApplicant.resume.contact.location}</p>
                <h5 className="resume-section">Education</h5>
                {selectedApplicant.resume.education.map((edu, index) => (
                  <div key={index} className="resume-item">
                    <p><strong>{edu.institution}</strong> - {edu.degree} ({edu.dates})</p>
                    <p>{edu.details}</p>
                  </div>
                ))}
                <h5 className="resume-section">Experience</h5>
                {selectedApplicant.resume.experience.map((exp, index) => (
                  <div key={index} className="resume-item">
                    <p><strong>{exp.company}</strong> - {exp.role} ({exp.dates})</p>
                    <ul className="resume-list">
                      {exp.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <h5 className="resume-section">Skills</h5>
                <ul className="resume-list">
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
                className="btn btn-light" style={{width:"130px"}}
              >
                {isCoverLetterExpanded ? 'Read Less' : 'Read More'}
              </button>
            )}
            <p><strong>Submitted:</strong> {selectedApplicant.submittedAt}</p>
            <p><strong>Status:</strong> {selectedApplicant.status.charAt(0).toUpperCase() + selectedApplicant.status.slice(1)}</p>
            <div className="form-group">
              <label className="form-label">Update Status</label>
              <select style={{width:"180px"}}
                value={selectedApplicant.status}
                onChange={(e) => updateStatus(selectedApplicant.id, e.target.value)}
                className="form-select"
              >
                <option value="pending">Pending</option>
                <option value="finalized">Finalized</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="current intern">Current Intern</option>
                <option value="internship complete">Internship Complete</option>
              </select>
            </div>
            <button style={{width:"90px"}}
              onClick={() => setSelectedApplicant(null)}
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

export default Applications;