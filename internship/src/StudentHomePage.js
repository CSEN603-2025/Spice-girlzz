import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import "./StudentHomePage.css";
import SideBar from "./Components/SideBar";
import { SiVodafone } from "react-icons/si";
import { SiMeta } from "react-icons/si";
import { FaApple } from "react-icons/fa6";
import { SiSiemens } from "react-icons/si";
import { SiNetflix, SiVisa } from 'react-icons/si';
import { MdOutlinePlayCircle } from "react-icons/md";
import { FaStar } from "react-icons/fa";

function StudentHomePage() {
  const [activePage, setActivePage] = useState("home");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("4rem");
  const [visibleCards, setVisibleCards] = useState(3);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [appliedInternships, setAppliedInternships] = useState(() => {
    const saved = sessionStorage.getItem('appliedInternships');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [filterDuration, setFilterDuration] = useState("");
  const [filterPaid, setFilterPaid] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const storedProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
  const email = (location.state?.email || storedProfile.email || "").toLowerCase();

  // Video mapping by major, matching ProfileStudent.js options
  const videoByMajor = {
    "Computer Science": "/videos/computer-science-internships.mp4",
    "Business": "/videos/business-internships.mp4",
    "Engineering": "/videos/engineering-internships.mp4",
    "Pharmacy": "/videos/pharmacy-internships.mp4",
    "": "/videos/general-internships.mp4", // Fallback for unset major
  };

    const [studentProfile, setStudentProfile] = useState({
    name: "...",
    isFirstLogin: true,
    hasProfile: false,
    major: "",
    jobInterests: [],
    id: "",
  });

  useEffect(() => {
    sessionStorage.setItem('appliedInternships', JSON.stringify(appliedInternships));
  }, [appliedInternships]);

  const allInternships = [
    {
      id: 1,
      title: "PayPal Winter Remote Program 2025",
      company: "PayPal",
      Job: "Networks Engineer",
      location: "Egypt",
      applicants: 2,
      posted: "1 hour ago",
      duration: "6 months",
      isPaid: "paid",
      expectedSalary: "$2000/month",
      skillsRequired: "JavaScript, React",
      description: "Develop payment processing solutions.",
      industry: "FinTech",
      status: "pending",
    },
    {
      id: 2,
      title: "Konecta Summer Internship",
      company: "Konecta",
      Job: "Customer Service",
      location: "Egypt",
      applicants: 10,
      posted: "10 days ago",
      duration: "3 months",
      isPaid: "unpaid",
      expectedSalary: "$0/month",
      skillsRequired: "Customer Support, Communication",
      description: "Assist in customer service operations.",
      industry: "Customer Service",
      status: "finalized",
    },
    {
      id: 3,
      title: "CIB Bank remote Internship",
      company: "CIB",
      Job: "Accountant",
      location: "Cairo, Egypt",
      applicants: 200,
      posted: "2 hours ago",
      duration: "4 months",
      isPaid: "paid",
      expectedSalary: "$1500/month",
      skillsRequired: "Finance, Data Analysis",
      description: "Support banking operations remotely.",
      industry: "Banking",
      status: "rejected",
    },
    {
      id: 4,
      title: "Vodafone Data Internship",
      company: "Vodafone",
      Job: "Data Engineer",
      location: "Cairo, Egypt",
      applicants: 120,
      posted: "1 day ago",
      duration: "6 months",
      isPaid: "paid",
      expectedSalary: "$2500/month",
      skillsRequired: "Python, Data Engineering",
      description: "Build data pipelines for telecom.",
      industry: "Telecom",
      status: "accepted",
    },
    {
      id: 5,
      title: "Nestlé Summer Internship",
      company: "Nestlé",
      Job: "Operations and production management",
      location: "Giza, Egypt",
      applicants: 87,
      posted: "3 days ago",
      duration: "3 months",
      isPaid: "paid",
      expectedSalary: "$1800/month",
      skillsRequired: "Marketing, Supply Chain",
      description: "Support supply chain operations.",
      industry: "FMCG",
      status: "pending",
    },
    {
      id: 6,
      title: "Orange Egypt Tech Internship",
      company: "Orange",
      Job: "Software Engineer",
      location: "Egypt",
      applicants: 43,
      posted: "5 hours ago",
      duration: "5 months",
      isPaid: "paid",
      expectedSalary: "$2200/month",
      skillsRequired: "Networking, Software Development",
      description: "Develop telecom software solutions.",
      industry: "Telecom",
      status: "rejected",
    },
  ];

  const dataAnalysisCompanies = [
    {
      id: 1,
      title: "Schneider Electric",
      company: "Schneider Electric",
      location: "France",
      image: "/imgs/schnieder.png",
      industry: "Energy Management",
      feedback: {
        studentName: "Ahmed Mostafa",
        feedbackText: "Great learning environment with supportive mentors!",
        rating: 4.5,
      },
    },
    {
      id: 2,
      title: "Etisalat",
      company: "Etisalat",
      location: "UAE",
      image: "/imgs/etisalat.png",
      industry: "Telecom",
      feedback: {
        studentName: "Sarah Johnson",
        feedbackText: "Challenging but rewarding experience!",
        rating: 4.0,
      },
    },
    {
      id: 3,
      title: "Toyota",
      company: "Toyota",
      location: "Japan",
      image: "/imgs/toyota.png",
      industry: "Automotive",
      feedback: {
        studentName: "Mohamed Ali",
        feedbackText: "Amazing team and innovative projects!",
        rating: 4.8,
      },
    },
    {
      id: 4,
      title: "Microsoft",
      company: "Microsoft",
      location: "USA",
      image: "/imgs/Microsoft_Logo_512px.png",
      industry: "Technology",
      feedback: {
        studentName: "Emma Brown",
        feedbackText: "Fun and creative workplace!",
        rating: 4.2,
      },
    },
  ];

  const graphicDesignerCompanies = [
    {
      id: 5,
      title: "Adobe",
      company: "Adobe",
      location: "USA",
      image: "/imgs/adobe.png",
      industry: "Software",
      feedback: {
        studentName: "Lisa Carter",
        feedbackText: "Incredible opportunities for creative design!",
        rating: 4.7,
      },
    },
    {
      id: 6,
      title: "Google",
      company: "Google",
      location: "USA",
      image: "/imgs/search.png",
      industry: "Technology",
      feedback: {
        studentName: "Omar Khaled",
        feedbackText: "Innovative and inspiring design culture!",
        rating: 4.9,
      },
    },
    {
      id: 7,
      title: "Pinterest",
      company: "Pinterest",
      location: "USA",
      image: "/imgs/pinterest.png",
      industry: "Social Media",
      feedback: {
        studentName: "Nour Salem",
        feedbackText: "Fun and visually-driven workplace!",
        rating: 4.3,
      },
    },
  ];

  const topInternships = [
    {
      id: 7,
      title: "Vodanation Summer Internship Program 2025",
      company: "Vodafone",
      Job: "Data Analyst",
      location: "Egypt",
      duration: "3 months",
      isPaid: "paid",
      expectedSalary: "$2000/month",
      skillsRequired: "Telecom, Software Development",
      description: "Work on telecom solutions.",
      industry: "Telecom",
      status: "pending",
      applicants: 50,
      posted: "3 days ago",
    },
    {
      id: 8,
      title: "L'Oreal Summer Internship Program 2025",
      company: "L'Oreal",
      Job: "Marketing Agent",
      location: "Egypt",
      duration: "3 months",
      isPaid: "paid",
      expectedSalary: "$1800/month",
      skillsRequired: "Marketing, Branding",
      description: "Support marketing campaigns.",
      industry: "Cosmetics",
      status: "pending",
      applicants: 70,
      posted: "10 days ago",
    },
    {
      id: 9,
      title: "Google Winter Hybrid Internship Program 2025",
      company: "Google",
      Job: "Data and Cloud Engineer",
      location: "USA",
      duration: "6 months",
      isPaid: "paid",
      expectedSalary: "$4000/month",
      skillsRequired: "Software Engineering, Cloud",
      description: "Develop cloud-based solutions.",
      industry: "Tech",
      status: "pending",
      applicants: 200,
      posted: "2 hours ago",
    },
  ];

  const triggerApplyAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  const handleApply = (internship) => {
    if (appliedInternships.some((app) => app.id === internship.id)) {
      triggerApplyAlert(`Already applied to ${internship.title}!`);
      return;
    }
    triggerApplyAlert(`Applied to ${internship.title} at ${internship.company}!`);
    const appliedInternship = {
      id: internship.id,
      title: internship.title,
      company: internship.company,
      duration: internship.duration,
      isPaid: internship.isPaid,
      expectedSalary: internship.expectedSalary,
      skillsRequired: internship.skillsRequired,
      description: internship.description,
      industry: internship.industry,
      status: "pending",
      applicationDate: new Date().toISOString().split('T')[0],
      location: internship.location,
      role: internship.Job || internship.title,
    };
    setAppliedInternships((prevAppliedInternships) => [
      ...prevAppliedInternships,
      appliedInternship,
    ]);
    // Save to internshipApplications for JobProviderDashboard
    const savedApplications = sessionStorage.getItem("internshipApplications");
    const applications = savedApplications ? JSON.parse(savedApplications) : [];
    const newApplication = {
      id: applications.length + 1,
      internshipId: internship.id,
      internshipTitle: internship.title,
      company: internship.company,
      studentId: studentProfile.id || "student_" + Date.now(),
      studentName: studentProfile.name || "Unknown",
      skills: studentProfile.jobInterests.join(', ') || internship.skillsRequired,
      applicationStatus: "pending",
      applicationDate: new Date().toISOString().split('T')[0],
    };
    sessionStorage.setItem(
      "internshipApplications",
      JSON.stringify([...applications, newApplication])
    );
    setSelectedInternship(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadMore = () => {
    setVisibleCards((prev) => Math.min(prev + 3, filteredInternships.length));
  };

  const filterInternships = (items) => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = filterIndustry ? item.industry === filterIndustry : true;
      const matchesDuration = "duration" in item && filterDuration ? item.duration === filterDuration : true;
      const matchesPaid = "isPaid" in item && filterPaid ? item.isPaid === filterPaid : true;
      return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
    });
  };

  // Determine which companies to show based on job interests
  const selectedCompanies = studentProfile.jobInterests.includes("Graphic Design")
    ? graphicDesignerCompanies
    : studentProfile.jobInterests.includes("Data Analysis")
    ? dataAnalysisCompanies
    : [];

  const filteredInternships = filterInternships(allInternships);
  const filteredTopInternships = filterInternships(topInternships);
  const filteredCompanies = filterInternships(selectedCompanies);
  const internshipsToShow = filteredInternships.slice(0, visibleCards);



  useEffect(() => {
    const savedProfile = sessionStorage.getItem("studentProfile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setStudentProfile({
          ...studentProfile,
          ...parsedProfile,
          jobInterests: Array.isArray(parsedProfile.jobInterests) ? parsedProfile.jobInterests : [],
        });
      } catch (e) {
        console.error("Error parsing sessionStorage data:", e);
      }
    }
  }, []);

  const scrollToSection = () => {
    document.getElementById('available').scrollIntoView({ behavior: 'smooth' });
  };

    const scrollToSection2 = () => {
    document.getElementById('suggested').scrollIntoView({ behavior: 'smooth' });
  };

  const handleProfileSetup = () => {
    setStudentProfile({ ...studentProfile, isFirstLogin: false, hasProfile: true });
    navigate("/student/Profile");
  };

  const handleViewAppliedInternships = () => {
    navigate("/applied");
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to render star rating
  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          style={{
            color: i <= Math.floor(rating) ? '#FFD700' : '#D1D5DB',
            fontSize: '0.9rem',
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="container">
      <Header toggleSidebar={toggleSidebar} />
      <div className="layout" style={{ marginTop: "4rem", minHeight: "calc(100vh - 4rem)" }}>
        <SideBar
          setActivePage={(page) =>
            navigate(`/student${page === "home" ? "" : "/" + page}`, { state: { email } })
          }
          isOpen={isSidebarOpen}
          setSidebarWidth={setSidebarWidth}
        />
        <main
          style={{
            flex: 1,
            padding: "1.5rem",
            overflowY: "auto",
            marginLeft: window.innerWidth > 768 ? sidebarWidth : "0",
            width: window.innerWidth > 768 ? `calc(100% - ${sidebarWidth})` : "100%",
            transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
            boxSizing: "border-box",
            backgroundColor: "#f9fafb",
          }}
        >
          <div className="profileContent">
            <div style={{ animation: "fadeIn 0.3s" }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  color: "#1f2937",
                }}
              >
                {studentProfile.hasProfile && studentProfile.name !== "..."
                  ? `Welcome Back, ${studentProfile.name}!`
                  : `Welcome, ...!`}
              </h2>
              <div className="homeBtns">
                <button onClick={scrollToSection} className="actionButton">
                  Browse Internships
                </button>
                <button onClick={scrollToSection2} className="actionButton">
                  Browse Companies
                </button>
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "1.5rem",
                  borderRadius: "0.375rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                {studentProfile.isFirstLogin || !studentProfile.hasProfile ? (
                  <>
                    <p className="prompt-message">
                      Let's get started with your profile setup!
                    </p>
                    <button className="prompt-button" onClick={handleProfileSetup}>
                      Set Up Profile
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
                    </button>
                  </>
                ) : (
                  <>
                    <p className="prompt-message">
                      Explore available internships and start applying!
                    </p>
                    <div
                      style={{
                        marginBottom: "1.5rem",
                        display: "flex",
                        gap: "0.8rem",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Search by job title or company name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="filter-input"
                      />
                      <select
                        value={filterIndustry}
                        onChange={(e) => setFilterIndustry(e.target.value)}
                        className="filter-select"
                      >
                        <option value="">Filter by Industry</option>
                        <option value="FinTech">FinTech</option>
                        <option value="Customer Service">Customer Service</option>
                        <option value="Banking">Banking</option>
                        <option value="Telecom">Telecom</option>
                        <option value="FMCG">FMCG</option>
                        <option value="Cosmetics">Cosmetics</option>
                        <option value="Tech">Tech</option>
                        <option value="Energy Management">Energy Management</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Technology">Technology</option>
                        <option value="Software">Software</option>
                        <option value="Social Media">Social Media</option>
                      </select>
                      <select
                        value={filterDuration}
                        onChange={(e) => setFilterDuration(e.target.value)}
                        className="filter-select"
                      >
                        <option value="">Filter by Duration</option>
                        <option value="3 months">3 months</option>
                        <option value="4 months">4 months</option>
                        <option value="5 months">5 months</option>
                        <option value="6 months">6 months</option>
                      </select>
                      <select
                        value={filterPaid}
                        onChange={(e) => setFilterPaid(e.target.value)}
                        className="filter-select"
                      >
                        <option value="">Filter by Paid/Unpaid</option>
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                      </select>
                      <button
                        className="filter-clear-button"
                        onClick={() => {
                          setSearchQuery("");
                          setFilterIndustry("");
                          setFilterDuration("");
                          setFilterPaid("");
                        }}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <section className="clients-section">
            <div className="client-logos">
              <SiNetflix style={{ color: "#E50914", fontSize: "2.5rem" }} />
              <SiVisa style={{ color: "#1A1F71", fontSize: "4rem" }} />
              <SiVodafone style={{ color: "#E60000", fontSize: "2.5rem" }} />
              <SiMeta style={{ color: "#0668E1", fontSize: "3rem" }} />
              <FaApple style={{ color: "#000000", fontSize: "3rem" }} />
              <SiSiemens style={{ color: "#000000", fontSize: "5.5rem" }} />
            </div>
          </section>
          <section id="available">
          <div className="profileContent">
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",
              }}
            >
              Top Internships Postings!
            </h2>
            <div className="cardHolder">
              {filteredTopInternships.length > 0 ? (
                filteredTopInternships.map((internship) => (
                  <div className="card" key={internship.id}>
                    <div className="card-content">
                      <div className="card-header">
                        <h3 className="program-title">{internship.title}</h3>
                        <div className="company-info">
                          <span className="company-name">{internship.company}</span>
                          <span className="company-location">{internship.location}</span>
                          <span className="post-date">{internship.posted}</span>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="alumni-count">
                          <span className="pin-icon">📌</span>
                          <span>{internship.applicants} students have applied already</span>
                        </div>
                        <button
                          className="actionButton"
                          onClick={() => setSelectedInternship(internship)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#4b5563" }}>No internships match your filters.</p>
              )}
            </div>
          </div>
          <div className="profileContent">
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",
              }}
            >
              Available Internships
            </h2>
            <div className="cardHolder">
              {internshipsToShow.length > 0 ? (
                internshipsToShow.map((internship) => (
                  <div className="card" key={internship.id}>
                    <div className="card-content">
                      <div className="card-header">
                        <h3 className="program-title">{internship.title}</h3>
                        <div className="company-info">
                          <span className="company-name">{internship.company}</span>
                          <span className="company-location">{internship.location}</span>
                          <span className="post-date">{internship.posted}</span>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="alumni-count">
                          <span className="pin-icon">📌</span>
                          <span>{internship.applicants} students have applied already</span>
                        </div>
                        <button
                          className="actionButton"
                          onClick={() => setSelectedInternship(internship)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#4b5563" }}>No internships match your filters.</p>
              )}
            </div>
            {visibleCards < filteredInternships.length && (
              <div className="load-more-btn">
                <button onClick={loadMore}>Load More Internships</button>
              </div>
            )}
            
          </div>
          </section>
          <section id="suggested">
          <div className="profileContent">
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",
              }}
            >
              Suggested Companies
            </h2>
            <div className="cardHolder-company">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <div className="card-company" key={company.id}>
                    <div className="card-content">
                      <div className="card-header-company">
                        <div>
                          <div className="header-company">
                               <h3 className="program-title-company">{company.title}</h3>
                                   <div className={`company-logo-company ${company.title.toLowerCase()}`}>
                                         <img src={company.image} alt={`${company.title} logo`} className="company-logo-img" />
                                     </div>
                           </div>
                          <div className="company-info-company">
                            <span>📍 {company.location}</span>
                          </div>
                          <div className="company-metrics">
                            <div className="metric-column">
                              <div className="metric-item">
                                <strong>GUC Alumni:</strong> {Math.floor(Math.random() * 50 + 10)} interns
                              </div>
                              <div className="metric-item">
                                <strong>Intern Satisfaction:</strong> {Math.floor(Math.random() * 20 + 80)}%
                              </div>
                            </div>
                            <div className="metric-column">
                              <div className="metric-item">
                                <strong>Job Interests:</strong> {studentProfile.jobInterests.join(", ")}
                              </div>
                              <div className="metric-item">
                                <strong>Industry:</strong> {company.industry}
                              </div>
                              
                            </div>
                          </div>
                        </div>
                     
                      </div>
                      
                      {company.feedback && (
                        <div className="feedback-section">
                          <div className="feedback-box">
                            <div className="feedback-header">
                              <div className="student-pic"></div>
                              <div>
                                <span className="student-name">{company.feedback.studentName}</span>
                                <div className="star-rating">
                                  {renderStarRating(company.feedback.rating)}
                                  <span className="rating-text"> ({company.feedback.rating}/5)</span>
                                </div>
                              </div>
                            </div>
                            <p className="feedback-text">{company.feedback.feedbackText}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
               <div className="profile-prompt-card">
  <div className="prompt-content">
    <h3 className="prompt-title">Enhance your profile</h3>
    <p className="prompt-message">
      Add job interests like "Data Analysis" or "Graphic Design" to discover relevant companies and opportunities
    </p>
    <button 
      className="prompt-button" 
      onClick={handleProfileSetup}
      aria-label="Set up your profile"
    >
      Set Up Profile
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  </div>
</div>
              )}
              
            </div>
            
            
          </div>
          </section>
          
        </main>
      </div>
      
      {selectedInternship && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">{selectedInternship.title}</h3>
            <p className="modal-info">
              <strong>Company:</strong> {selectedInternship.company}
            </p>
            <p className="modal-info">
              <strong>Job Title:</strong> {selectedInternship.Job}
            </p>
            <p className="modal-info">
              <strong>Duration:</strong> {selectedInternship.duration}
            </p>
            <p className="modal-info">
              <strong>Paid/Unpaid:</strong>{" "}
              {selectedInternship.isPaid.charAt(0).toUpperCase() +
                selectedInternship.isPaid.slice(1)}
            </p>
            <p className="modal-info">
              <strong>Expected Salary:</strong> {selectedInternship.expectedSalary}
            </p>
            <p className="modal-info">
              <strong>Skills Required:</strong> {selectedInternship.skillsRequired}
            </p>
            <p className="modal-info">
              <strong>Description:</strong> {selectedInternship.description}
            </p>
            <div className="modal-footer">
              {studentProfile.hasProfile && (
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="quickButton"
                  aria-label="Open internship requirements video guide"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MdOutlinePlayCircle
                    style={{
                      marginRight: "8px",
                      color: "#ef4444",
                      fontSize: "1.25rem",
                    }}
                  />
                  <span>Quick Guide: Internship Requirements</span>
                </button>
              )}
              <button
                className="modal-close-button"
                onClick={() => setSelectedInternship(null)}
              >
                Close
              </button>
              <button
                className="modal-button"
                onClick={() => handleApply(selectedInternship)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
      {showVideoModal && (
        <div className="modal-overlay" role="dialog" aria-labelledby="video-modal-title">
          <div className="modal-content">
            <h3 id="video-modal-title" className="modal-title">
              Internship Requirements for {studentProfile.major || "General"}
            </h3>
            <div className="video-container">
              <video
                controls
                src={videoByMajor[studentProfile.major] || videoByMajor[""]}
                style={{ width: "100%", maxHeight: "400px" }}
                onError={() => alert("Failed to load video. Please try again later.")}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="modal-footer">
              <button
                className="modal-close-button"
                onClick={() => setShowVideoModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isSidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: "4rem",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            display: window.innerWidth <= 768 ? "block" : "none",
          }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default StudentHomePage;