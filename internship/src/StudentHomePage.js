import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Header from "./Components/Header";
import { Mail, User, LogOut, Menu } from "lucide-react";
import AppliedInternships from "./Applied internships";
import UpcomingWorkshops from "./UpcomingWorkshops";

function StudentHomePage({ appliedInternships, setAppliedInternships }) {
  const [activePage, setActivePage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  // Import Inter font
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const availableInternships = [
    {
      id: 1,
      companyName: "SCAD Technologies",
      jobTitle: "Software Engineer",
      duration: "6 months",
      isPaid: "paid",
      expectedSalary: "$2000/month",
      skillsRequired: "JavaScript, React, Node.js",
      description: "Develop cutting-edge software solutions.",
      industry: "Tech",
      status: "available",
    },
    {
      id: 2,
      companyName: "SCAD Systems",
      jobTitle: "Web Developer",
      duration: "3 months",
      isPaid: "unpaid",
      expectedSalary: "$0/month",
      skillsRequired: "HTML, CSS, JavaScript",
      description: "Build responsive web applications.",
      industry: "Tech",
      status: "available",
    },
    {
      id: 3,
      companyName: "SCAD Solutions",
      jobTitle: "Data Analyst",
      duration: "12 months",
      isPaid: "paid",
      expectedSalary: "$2500/month",
      skillsRequired: "Python, SQL, Tableau",
      description: "Analyze data to drive business decisions.",
      industry: "Tech",
      status: "available",
    },
  ];

  const filteredInternships = availableInternships.filter((internship) => {
    const search = searchQuery.toLowerCase();
    const matchesSearch =
      internship.companyName.toLowerCase().includes(search) ||
      internship.jobTitle.toLowerCase().includes(search);
    const matchesIndustry = selectedIndustry
      ? internship.industry === selectedIndustry
      : true;
    const matchesDuration = selectedDuration
      ? internship.duration === selectedDuration
      : true;
    const matchesPaid = isPaid ? internship.isPaid === isPaid : true;
    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });

  const handleSelectInternship = (internship) => {
    setSelectedInternship(internship);
  };

  const handleApply = (internship) => {
    if (appliedInternships.some((app) => app.id === internship.id)) {
      alert("You have already applied to this internship.");
      return;
    }
    setAppliedInternships((prevAppliedInternships) => [
      ...prevAppliedInternships,
      {
        ...internship,
        title: internship.jobTitle,
        company: internship.companyName,
        status: "pending",
        applicationDate: new Date().toISOString().split("T")[0],
      },
    ]);
    alert(`Applied to ${internship.jobTitle} at ${internship.companyName}!`);
    setSelectedInternship(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activePage) {
      case "available":
        return (
          <div
            style={{
              animation: "fadeIn 0.3s",
              minHeight: "calc(100vh - 8rem)",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#4e4f50",
              }}
            >
              Available Internships
            </h2>
            <div
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                gap: "0.8rem",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  flex: "1 1 20rem",
                  minWidth: "15rem",
                }}
              >
                <input
                  type="text"
                  placeholder="Search by job title or company name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 0 2px #647c90")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>
              <select
                onChange={(e) => setSelectedIndustry(e.target.value)}
                style={styles.filterButtons}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #647c90")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              >
                <option value="">Select Industry</option>
                <option value="Tech">Tech</option>
                <option value="Finance">Finance</option>
              </select>
              <select
                onChange={(e) => setSelectedDuration(e.target.value)}
                style={styles.filterButtons}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #647c90")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              >
                <option value="">Select Duration</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="12 months">12 months</option>
              </select>
              <select
                onChange={(e) => setIsPaid(e.target.value)}
                style={styles.filterButtons}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #647c90")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              >
                <option value="">Paid/Unpaid</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedIndustry("");
                  setSelectedDuration("");
                  setIsPaid("");
                }}
                style={styles.filterButtons}
              >
                Clear Filters
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filteredInternships.map((internship) => (
                <div
                  key={internship.id}
                  style={{
                    background: "#e2ded0",
                    padding: "1rem",
                    borderRadius: "0.375rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "box-shadow 0.3s, background-color 0.3s",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSelectInternship(internship)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.backgroundColor = "#d8d4c6";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 2px 4px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.backgroundColor = "#e2ded0";
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 0.75rem",
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#4e4f50",
                    }}
                  >
                    {internship.jobTitle}
                  </h4>
                  <p
                    style={{
                      margin: "0.5rem 0",
                      fontSize: "0.875rem",
                      color: "#746c70",
                    }}
                  >
                    <strong>Company:</strong> {internship.companyName}
                  </p>
                  <p
                    style={{
                      margin: "0.5rem 0",
                      fontSize: "0.875rem",
                      color: "#746c70",
                    }}
                  >
                    <strong>Duration:</strong> {internship.duration}
                  </p>
                  <p
                    style={{
                      margin: "0.75rem 0 0",
                      fontSize: "0.875rem",
                      color: "#746c70",
                      lineHeight: "1.4",
                    }}
                  >
                    {internship.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div style={styles.profileContent}>
            <div style={{ animation: "fadeIn 0.3s" }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  color: "#4e4f50",
                }}
              >
                Welcome
              </h2>
              <div
                style={{
                  background: "#e2ded0",
                  padding: "1.5rem",
                  borderRadius: "0.375rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <p style={{ color: "#746c70" }}>
                  Welcome, Student! Use the sidebar to navigate.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />
      {/* Layout */}
      <div
        style={{
          ...styles.layout,
          marginTop: "4rem",
          minHeight: "calc(100vh - 4rem)",
        }}
      >
        {/* Sidebar */}
        <SideBar setActivePage={setActivePage} isOpen={isSidebarOpen} />

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: "1.5rem",
            overflowY: "auto",
            marginLeft: isSidebarOpen ? "16rem" : "4rem", // Push content
            width: isSidebarOpen ? "calc(100% - 16rem)" : "calc(100% - 4rem)", // Adjust width
            transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
            boxSizing: "border-box",
          }}
        >
          {renderContent()}
        </main>
      </div>

      {/* Overlay for mobile */}
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

      {/* Modal */}
      {selectedInternship && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1002,
          }}
        >
          <div
            style={{
              background: "#e2ded0",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "24rem",
              width: "100%",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#4e4f50",
                marginBottom: "1rem",
              }}
            >
              {selectedInternship.jobTitle}
            </h3>
            <p
              style={{
                color: "#746c70",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              <strong>Company:</strong> {selectedInternship.companyName}
            </p>
            <p
              style={{
                color: "#746c70",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              <strong>Duration:</strong> {selectedInternship.duration}
            </p>
            <p
              style={{
                color: "#746c70",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              <strong>Paid/Unpaid:</strong>{" "}
              {selectedInternship.isPaid.charAt(0).toUpperCase() +
                selectedInternship.isPaid.slice(1)}
            </p>
            <p
              style={{
                color: "#746c70",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              <strong>Expected Salary:</strong>{" "}
              {selectedInternship.expectedSalary}
            </p>
            <p
              style={{
                color: "#746c70",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              <strong>Skills Required:</strong>{" "}
              {selectedInternship.skillsRequired}
            </p>
            <p
              style={{
                color: "#746c70",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              <strong>Description:</strong> {selectedInternship.description}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
                marginTop: "1.5rem",
              }}
            >
              {activePage === "available" && (
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#647c90",
                    color: "#e2ded0",
                    borderRadius: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleApply(selectedInternship)}
                  onMouseOver={(e) => (e.target.style.background = "#4e4f50")}
                  onMouseOut={(e) => (e.target.style.background = "#647c90")}
                >
                  Apply
                </button>
              )}
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "#746c70",
                  color: "#e2ded0",
                  borderRadius: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedInternship(null)}
                onMouseOver={(e) => (e.target.style.background = "#4e4f50")}
                onMouseOut={(e) => (e.target.style.background = "#746c70")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#fff",
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
  profileContent: {
    flex: 1,
    padding: "1.5rem",
    overflowY: "auto",
  },
  filterButtons: {
    fontSize: "0.8rem",
    padding: "0.5em 1em",
    backgroundColor: "#e2ded0",
    color: "#4e4f50",
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
  searchInput: {
    fontSize: "0.8rem",
    padding: "0.5em 1em",
    backgroundColor: "#e2ded0",
    color: "#4e4f50",
    border: "none",
    borderRadius: "1150px",
    cursor: "text",
    textAlign: "left",
    width: "400px",
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
  @media (max-width: 768px) {
    main {
      margin-left: 0 !important; /* Override margin-left on mobile */
    }
  }
`;
document.head.appendChild(styleSheet);

export default StudentHomePage;
