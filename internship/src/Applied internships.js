import React, { useState, useEffect } from "react";
import { Mail, User, LogOut, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import "./StudentHomePage.css";
import SideBar from "./Components/SideBar";
import "./StudentHomePage.css";

function AppliedInternships() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("4rem");
  const [appliedInternships, setAppliedInternships] = useState(() => {
    const saved = sessionStorage.getItem('appliedInternships');
    return saved ? JSON.parse(saved) : [];
  });

  const storedProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
  const email = (location.state?.email || storedProfile.email || "").toLowerCase();

  const mockCurrentCompletedInternships = [
    {
      id: 1,
      title: "Software Engineer",
      company: "SCAD Technologies",
      duration: "6 months",
      isPaid: "paid",
      expectedSalary: "$2000/month",
      skillsRequired: "JavaScript, React, Node.js",
      description: "Develop cutting-edge software solutions.",
      industry: "Tech",
      status: "current",
      applicationDate: "2025-04-01",
      location: "Remote",
      role: "Software Engineer",
    },
    {
      id: 2,
      title: "Web Developer",
      company: "SCAD Systems",
      duration: "3 months",
      isPaid: "unpaid",
      expectedSalary: "$0/month",
      skillsRequired: "HTML, CSS, JavaScript",
      description: "Build responsive web applications.",
      industry: "Tech",
      status: "current",
      applicationDate: "2025-03-01",
      startDate: "2025-04-15",
      location: "Remote",
      role: "Web Developer",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "SCAD Solutions",
      duration: "12 months",
      isPaid: "paid",
      expectedSalary: "$2500/month",
      skillsRequired: "Python, SQL, Tableau",
      description: "Analyze data to drive business decisions.",
      industry: "Tech",
      status: "completed",
      applicationDate: "2024-12-01",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      location: "Remote",
      role: "Data Analyst",
    },
    {
      id: 4,
      title: "PWC Summer Internship",
      company: "PWC",
      duration: "3 months",
      isPaid: "paid",
      expectedSalary: "$3000/month",
      skillsRequired: "AI, Machine Learning",
      description: "Work on applied AI projects.",
      industry: "Consulting",
      status: "current",
      applicationDate: "2025-01-01",
      startDate: "2025-02-01",
      location: "Cairo, Egypt",
      role: "Applied AI Intern",
    },
    {
      id: 5,
      title: "Google UI/UX Winter Internship",
      company: "Google",
      duration: "6 months",
      isPaid: "paid",
      expectedSalary: "$4000/month",
      skillsRequired: "UI/UX, Figma",
      description: "Design user interfaces for web applications.",
      industry: "Tech",
      status: "completed",
      applicationDate: "2023-09-01",
      startDate: "2023-10-01",
      endDate: "2024-03-31",
      location: "USA",
      role: "UX/UI Designer",
    },
    {
      id: 6,
      title: "Etisalat Hybrid Data Science Internship",
      company: "Etisalat",
      duration: "6 months",
      isPaid: "paid",
      expectedSalary: "$2500/month",
      skillsRequired: "Python, Data Engineering",
      description: "Build data pipelines and analytics solutions.",
      industry: "Telecom",
      status: "completed",
      applicationDate: "2024-09-01",
      startDate: "2024-10-01",
      endDate: "2025-03-31",
      location: "Cairo, Egypt",
      role: "Data Engineer",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    sessionStorage.setItem("appliedInternships", JSON.stringify(appliedInternships));
  }, [appliedInternships]);

  // Common filtering function
  const filterInternships = (internships) => {
    const filtered = internships.filter((internship) => {
      const matchesSearch =
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus ? internship.status === filterStatus : true;
      const matchesDate = filterDate
        ? filterDate === "recent"
          ? new Date(internship.applicationDate) >=
            new Date(
              internships
                .map((i) => i.applicationDate)
                .sort()
                .slice(-1)[0]
            )
          : new Date(internship.applicationDate) <=
            new Date(internships.map((i) => i.applicationDate).sort()[0])
        : true;
      return matchesSearch && matchesStatus && matchesDate;
    });
    return filtered;
  };

  // Filtering logic for Pending Internships (from sessionStorage)
  const pendingInternships = filterInternships(
    appliedInternships.filter((internship) =>
      ["pending", "finalized", "accepted", "rejected"].includes(internship.status)
    )
  );

  // Filtering logic for Current/Completed Internships (from mock data)
  const currentCompletedInternships = filterInternships(mockCurrentCompletedInternships);

  // Check if an evaluation exists for a given internship
  const hasEvaluation = (internshipId) => {
    const storedEvaluations = sessionStorage.getItem("studentEvaluations");
    if (storedEvaluations) {
      const evaluations = JSON.parse(storedEvaluations);
      return evaluations.some((e) => e.internshipId === internshipId);
    }
    return false;
  };

  // Handle navigation to report page
  const handleCreateReport = (internship) => {
    navigate("/student/report", {
      state: { email, internshipId: internship.id },
    });
    setSelectedInternship(null);
  };

  // Handle navigation to evaluation page
  const handleCreateEvaluation = (internship) => {
    navigate("/student/evaluation", {
      state: { email, internshipId: internship.id, internshipTitle: internship.title },
    });
    setSelectedInternship(null);
  };

  return (
    <>
    <div style={styles.container}>
      <Header />
      <div style={{ ...styles.layout, marginTop: "4rem", minHeight: "calc(100vh - 4rem)" }}>
        <div style={styles.sidebar}>
          <SideBar
            setActivePage={(page) =>
              navigate(`/student${page === "home" ? "" : "/" + page}`, { state: { email } })
            }
            isOpen={isSidebarOpen}
            setSidebarWidth={setSidebarWidth}
          />
        </div>
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
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              color: "#1f2937",
            }}
          >
            My Internships
          </h2>

          {/* Search and Filter Inputs */}
          <div
            style={{
              marginBottom: "1.5rem",
              display: "flex",
              gap: "0.8rem",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Search by job title or company name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ ...styles.filterButtons, width: "18rem" }}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2a9d8f")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
            <select
              onChange={(e) => setFilterStatus(e.target.value)}
              style={styles.filterButtons}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2a9d8f")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            >
              <option value="">Filter by Status</option>
              <option value="pending">Pending</option>
              <option value="finalized">Finalized</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="current">Current</option>
              <option value="completed">Completed</option>
            </select>
            <select
              onChange={(e) => setFilterDate(e.target.value)}
              style={styles.filterButtons}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2a9d8f")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            >
              <option value="">Filter by Date</option>
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest</option>
            </select>
            <button
              style={styles.filterButtons}
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("");
                setFilterDate("");
              }}
            >
              Clear Filters
            </button>
          </div>

          {/* Pending Applications Section */}
          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "0.375rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#1f2937",
              }}
            >
              Pending Applications
            </h3>
            {pendingInternships.length > 0 ? (
              <div className="cardHolder">
                {pendingInternships.map((internship) => (
                  <div className="card" key={internship.id}>
                    <div className="card-header">
                      <h3 className="program-title">{internship.title}</h3>
                      <div className="company-info">
                        <span className="company-name">{internship.company}</span>
                        <span className="company-location">
                          {internship.location || "Location not specified"}
                        </span>
                        <span className="company-location">{internship.role || internship.title}</span>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="alumni-count">
                        <span className="pin-icon">📌</span>
                        <span className="status">{internship.status}</span>
                      </div>
                      <button
                        className="actionButton"
                        onClick={() => setSelectedInternship(internship)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#4b5563" }}>No pending applications.</p>
            )}
          </div>

          {/* Current & Completed Internships Section */}
          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "0.375rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#1f2937",
              }}
            >
              My Internships
            </h3>
            {currentCompletedInternships.length > 0 ? (
              <div className="cardHolder">
                {currentCompletedInternships.map((internship) => (
                  <div className="card" key={internship.id}>
                    <div className="card-header">
                      <h3 className="program-title">{internship.title}</h3>
                      <div className="company-info">
                        <span className="company-name">{internship.company}</span>
                        <span className="company-location">
                          {internship.location || "Location not specified"}
                        </span>
                        <span className="company-location">{internship.role || internship.title}</span>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="alumni-count">
                        <span className="pin-icon">📌</span>
                        <span className="post-date">
                          {internship.startDate
                            ? `${new Date(internship.startDate).toLocaleString("default", {
                                month: "short",
                                year: "numeric",
                              })} - ${internship.status === "current" ? "Present" : new Date(internship.startDate).toLocaleString("default", {
                                month: "short",
                                year: "numeric",
                              })}`
                            : "Dates not specified"}
                        </span>
                      </div>
                      <button
                        className="actionButton"
                        onClick={() => setSelectedInternship(internship)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#4b5563" }}>No current or completed internships.</p>
            )}
          </div>
        </main>
      </div>

      {/* Modal for Internship Details */}
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
            <div className="modal-footer">
              {selectedInternship.status === "completed" && (
                <>
                  <button
                    className="actionButton"
                    onClick={() => handleCreateReport(selectedInternship)}
            
                  >
                    Create Report
                  </button>
                  <button
                    className="actionButton"
                    onClick={() => handleCreateEvaluation(selectedInternship)}
                    disabled={hasEvaluation(selectedInternship.id)}
            
                  >
                    {hasEvaluation(selectedInternship.id) ? "Evaluation Created" : "Create Evaluation"}
                  </button>
                </>
              )}
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
    </div>
    </>
  );
}

const styles = {
  container: {
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#F3F4F6",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "linear-gradient(#fff)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "0.75rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#000",
    margin: 0,
    letterSpacing: "-0.015em",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  },
  headerButtons: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  headerBtn: {
    padding: "0.5rem",
    color: "#000",
    background: "transparent",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  layout: {
    display: "flex",
    flex: 1,
  },
  filterButtons: {
    fontSize: "0.8rem",
    padding: "0.5em 1em",
    backgroundColor: "#e5e7eb",
    color: "#1f2937",
    border: "none",
    borderRadius: "1150px",
    cursor: "pointer",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    minWidth: "100px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.2s ease",
  },
};

// Animation keyframes
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);

export default AppliedInternships;