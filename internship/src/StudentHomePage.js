import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Header from "./Components/Header";
import { Mail, User, LogOut, Menu } from "lucide-react";
import AppliedInternships from "./Applied internships";
import "./StudentHomePage.css";
import { SiVodafone } from "react-icons/si";
import { SiMeta } from "react-icons/si";
import { FaApple } from "react-icons/fa6";
import { SiSiemens } from "react-icons/si";
import { SiNetflix, SiVisa } from 'react-icons/si';

function StudentHomePage({ appliedInternships, setAppliedInternships }) {
  const [activePage, setActivePage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("4rem");
  const [visibleCards, setVisibleCards] = useState(3);
  const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const allInternships = [
    {
      title: "PayPal Winter Remote Program 2025",
      company: "PayPal",
      location: "Egypt",
      applicants: 2,
      posted: "1 hour ago"
    },
    {
      title: "Konecta Summer Internship",
      company: "Konecta",
      location: "Egypt",
      applicants: 10,
      posted: "10 days ago"
    },
    {
      title: "CIB Bank remote Internship",
      company: "CIB",
      location: "Cairo, Egypt",
      applicants: 200,
      posted: "2 hours ago"
    },
    {
      title: "Vodafone Data Internship",
      company: "Vodafone",
      location: "Cairo, Egypt",
      applicants: 120,
      posted: "1 day ago"
    },
    {
      title: "Nestlé Summer Internship",
      company: "Nestlé",
      location: "Giza, Egypt",
      applicants: 87,
      posted: "3 days ago"
    },
    {
      title: "Orange Egypt Tech Internship",
      company: "Orange",
      location: "Egypt",
      applicants: 43,
      posted: "5 hours ago"
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
    triggerApplyAlert(`Applied to ${internship.jobTitle} at ${internship.companyName}!`);
    const appliedInternship = {
      id: internship.id,
      title: internship.jobTitle,
      company: internship.companyName,
      duration: internship.duration,
      isPaid: internship.isPaid,
      expectedSalary: internship.expectedSalary,
      skillsRequired: internship.skillsRequired,
      description: internship.description,
      industry: internship.industry,
      status: 'pending',
      applicationDate: new Date().toISOString().split('T')[0],
    };
    setAppliedInternships((prevAppliedInternships) => [
      ...prevAppliedInternships,
      appliedInternship,
    ]);
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
    setVisibleCards((prev) => Math.min(prev + 3, allInternships.length));
  };

  const internshipsToShow = allInternships.slice(0, visibleCards);

  const [studentProfile, setStudentProfile] = useState({
    name: "...",
    isFirstLogin: true,
    hasProfile: false,
  });

  useEffect(() => {
    const savedProfile = sessionStorage.getItem("studentProfile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setStudentProfile(parsedProfile);
      } catch (e) {
        console.error("Error parsing sessionStorage data:", e);
      }
    }
  }, []);

  const scrollToSection = () => {
    document.getElementById('available').scrollIntoView({ behavior: 'smooth' });
  }

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

  return (
    
    <div className="container">
      <Header toggleSidebar={toggleSidebar} />
      <div className="layout" style={{ marginTop: "4rem", minHeight: "calc(100vh - 4rem)" }}>
        <SideBar
          setActivePage={setActivePage}
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
                    <p style={{ color: "#746c70", marginBottom: "1rem" }}>
                      Let's get started with your profile setup!
                    </p>
                    <button className="actionButton" onClick={handleProfileSetup}>
                      Set up your profile!
                    </button>
                  </>
                ) : (
                  <>
                    <p style={{ color: "#746c70", marginBottom: "1rem" }}>
                      Explore available internships and start applying!
                    </p>
                    <button onClick={scrollToSection} className="actionButton">
                      Browse Internships
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <section className="clients-section">
            <div className="client-logos">
              <SiNetflix style={{ color: "#E50914", fontSize: "2rem" }} />
              <SiVisa style={{ color: "#1A1F71", fontSize: "2rem" }} />
              <SiVodafone style={{ color: "#E60000", fontSize: "2rem" }} />
              <SiMeta style={{ color: "#0668E1", fontSize: "2rem" }} />
              <FaApple style={{ color: "#000000", fontSize: "2rem" }} />
              <SiSiemens style={{ color: "#000000", fontSize: "4rem" }} />
            </div>
          </section>
          <div className="profileContent">
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#1f2937" }}>
              Top Internships Postings!
            </h2>
            <div className="cardHolder">
              <div className="card">
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="program-title">Vodanation Summer Internship Program 2025</h3>
                    <div className="company-info">
                      <span className="company-name">Vodafone</span>
                      <span className="company-location">Egypt</span>
                      <span className="post-date">3 days ago</span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="alumni-count">
                      <span className="pin-icon">📌</span>
                      <span>50 students have applied already</span>
                    </div>
                    <button className="actionButton">View Details</button>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="program buys-title">L'Oreal Summer Internship Program 2025</h3>
                    <div className="company-info">
                      <span className="company-name">L'Oreal</span>
                      <span className="company-location">Egypt</span>
                      <span className="post-date">10 days ago</span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="alumni-count">
                      <span className="pin-icon">📌</span>
                      <span>70 students have applied already</span>
                    </div>
                    <button className="actionButton">View Details</button>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="program-title">Google Winter Hybrid Internship Program 2025</h3>
                    <div className="company-info">
                      <span className="company-name">Google</span>
                      <span className="company-location">USA</span>
                      <span className="post-date">2 hours ago</span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="alumni-count">
                      <span className="pin-icon">📌</span>
                      <span>200 students have applied already</span>
                    </div>
                    <button className="actionButton">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profileContent">
              <section id="available">
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#1f2937" }}>
              Available Internships
            </h2>
            <div className="cardHolder">
              {internshipsToShow.map((internship, index) => (
                <div className="card" key={index}>
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
                      <button className="actionButton">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {visibleCards < allInternships.length && (
              <div className="load-more-btn">
                <button onClick={loadMore}>Load More Internships</button>
              </div>
            )}
            </section>
          </div>
          
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
            <p className="modal-info">
              <strong>Status:</strong>{" "}
              {selectedInternship.status.charAt(0).toUpperCase() +
                selectedInternship.status.slice(1)}
            </p>
            {["pending", "finalized", "accepted", "rejected"].includes(selectedInternship.status) ? (
              <p className="modal-status-message">
                Status cannot be changed for pending applications.
              </p>
            ) : (
              <select
                value={selectedInternship.status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  setAppliedInternships((prev) =>
                    prev.map((internship) =>
                      internship.id === selectedInternship.id
                        ? { ...internship, status: newStatus }
                        : internship
                    )
                  );
                  setSelectedInternship({ ...selectedInternship, status: newStatus });
                }}
                className="modal-status-select"
              >
                <option value="current">Current</option>
                <option value="completed">Completed</option>
              </select>
            )}

            <div className="modal-footer">
              <button
                className="modal-close-button"
                onClick={() => setSelectedInternship(null)}
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