import React, { useState, useEffect } from "react";
import { Mail, User, LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SideBar from "./Components/SideBar";

function AppliedInternships() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [appliedInternships, setAppliedInternships] = useState(() => {
    const saved = sessionStorage.getItem("appliedInternships");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    sessionStorage.setItem(
      "appliedInternships",
      JSON.stringify(appliedInternships)
    );
  }, [appliedInternships]);

  // Mock data (only initialize if sessionStorage is empty)
  useEffect(() => {
    if (
      appliedInternships.length === 0 &&
      !sessionStorage.getItem("appliedInternships")
    ) {
      const mockInternships = [
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
          status: "pending",
          applicationDate: "2025-04-01",
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
        },
      ];
      setAppliedInternships(mockInternships);
    }
  }, []);

  // Filtering logic for Pending and Current/Completed Internships
  const pendingInternships = appliedInternships
    .filter((internship) =>
      ["pending", "finalized", "accepted", "rejected"].includes(
        internship.status
      )
    )
    .filter((internship) => {
      const matchesSearch =
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus
        ? internship.status === filterStatus
        : true;
      const matchesDate = filterDate
        ? filterDate === "recent"
          ? new Date(internship.applicationDate) >=
            new Date(
              appliedInternships
                .map((i) => i.applicationDate)
                .sort()
                .slice(-1)[0]
            )
          : new Date(internship.applicationDate) <=
            new Date(appliedInternships.map((i) => i.applicationDate).sort()[0])
        : true;
      return matchesSearch && matchesStatus && matchesDate;
    });

  const currentAndCompletedInternships = appliedInternships
    .filter((internship) =>
      ["current", "completed"].includes(internship.status)
    )
    .filter((internship) => {
      const matchesSearch =
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus
        ? internship.status === filterStatus
        : true;
      const matchesDate = filterDate
        ? filterDate === "recent"
          ? new Date(internship.startDate || internship.applicationDate) >=
            new Date(
              appliedInternships
                .filter((i) => i.startDate)
                .map((i) => i.startDate)
                .sort()
                .slice(-1)[0] || internship.applicationDate
            )
          : new Date(internship.startDate || internship.applicationDate) <=
            new Date(
              appliedInternships
                .filter((i) => i.startDate)
                .map((i) => i.startDate)
                .sort()[0] || internship.applicationDate
            )
        : true;
      return matchesSearch && matchesStatus && matchesDate;
    });

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h2 style={styles.title}>GUC Internship System</h2>
        <div style={styles.headerButtons}>
          <button style={styles.headerBtn}>
            <Mail size={24} />
          </button>
          <button style={styles.headerBtn} onClick={() => navigate("/student")}>
            <Home size={24} />
          </button>
          <button
            style={styles.headerBtn}
            onClick={() => navigate("/student/Profile")}
          >
            <User size={24} />
          </button>
          <button style={styles.headerBtn} onClick={() => navigate("/")}>
            <LogOut size={24} />
          </button>
        </div>
      </header>

      <div style={styles.layout}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <SideBar
            setActivePage={(page) =>
              navigate(`/student${page === "home" ? "" : "/" + page}`)
            }
          />
        </div>
        {/* Main Content */}
        <main style={{ flex: 1, padding: "1.5rem", overflowY: "auto" }}>
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
              style={styles.filterButtons}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #3b82f6")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
            <select
              onChange={(e) => setFilterStatus(e.target.value)}
              style={styles.filterButtons}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #3b82f6")}
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
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #3b82f6")}
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
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {pendingInternships.map((internship) => (
                  <div
                    key={internship.id}
                    style={{
                      background: "#fff",
                      padding: "1rem",
                      borderRadius: "0.375rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "box-shadow 0.3s, background-color 0.3s",
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 0.75rem",
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                      }}
                    >
                      {internship.title}
                    </h4>
                    <p
                      style={{
                        margin: "0.5rem 0",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                      }}
                    >
                      <strong>Company:</strong> {internship.company}
                    </p>
                    <p
                      style={{
                        margin: "0.5rem 0",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                      }}
                    >
                      <strong>Duration:</strong> {internship.duration}
                    </p>
                    <p
                      style={{
                        margin: "0.5rem 0",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                      }}
                    >
                      <strong>Status:</strong>{" "}
                      {internship.status.charAt(0).toUpperCase() +
                        internship.status.slice(1)}
                    </p>
                    <button
                      style={{
                        padding: "0.5rem 1rem",
                        background: "#6f60fa",
                        color: "#fff",
                        borderRadius: "0.25rem",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        marginTop: "0.75rem",
                      }}
                      onClick={() => setSelectedInternship(internship)}
                      onMouseOver={(e) =>
                        (e.target.style.background = "#2563eb")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.background = "#3b82f6")
                      }
                    >
                      View Details
                    </button>
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
              Current & Completed Internships
            </h3>
            {currentAndCompletedInternships.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {currentAndCompletedInternships.map((internship) => (
                  <div
                    key={internship.id}
                    style={{
                      background: "#fff",
                      padding: "1rem",
                      borderRadius: "0.375rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "box-shadow 0.3s, background-color 0.3s",
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 0.75rem",
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                      }}
                    >
                      {internship.title}
                    </h4>
                    <p
                      style={{
                        margin: "0.5rem 0",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                      }}
                    >
                      <strong>Company:</strong> {internship.company}
                    </p>
                    <p
                      style={{
                        margin: "0.5rem 0",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                      }}
                    >
                      <strong>Duration:</strong> {internship.duration}
                    </p>
                    <p
                      style={{
                        margin: "0.5rem 0",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                      }}
                    >
                      <strong>Status:</strong>{" "}
                      {internship.status.charAt(0).toUpperCase() +
                        internship.status.slice(1)}
                    </p>
                    <button
                      style={{
                        padding: "0.5rem 1rem",
                        background: "#3b82f6",
                        color: "#fff",
                        borderRadius: "0.25rem",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        marginTop: "0.75rem",
                      }}
                      onClick={() => setSelectedInternship(internship)}
                      onMouseOver={(e) =>
                        (e.target.style.background = "#2563eb")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.background = "#3b82f6")
                      }
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#4b5563" }}>
                No current or completed Internships.
              </p>
            )}
          </div>
        </main>
      </div>

      {/* Modal for Internship Details */}
      {selectedInternship && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "#fff",
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
                color: "#1f2937",
                marginBottom: "1rem",
              }}
            >
              {selectedInternship.title}
            </h3>
            <p
              style={{
                color: "#4b5563",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              <strong>Company:</strong> {selectedInternship.company}
            </p>
            <p
              style={{
                color: "#4b5563",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              <strong>Duration:</strong> {selectedInternship.duration}
            </p>
            <p
              style={{
                color: "#4b5563",
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
                color: "#4b5563",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              <strong>Expected Salary:</strong>{" "}
              {selectedInternship.expectedSalary}
            </p>
            <p
              style={{
                color: "#4b5563",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              <strong>Skills Required:</strong>{" "}
              {selectedInternship.skillsRequired}
            </p>
            <p
              style={{
                color: "#4b5563",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              <strong>Description:</strong> {selectedInternship.description}
            </p>
            <p
              style={{
                color: "#4b5563",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              <strong>Status:</strong>{" "}
              {selectedInternship.status.charAt(0).toUpperCase() +
                selectedInternship.status.slice(1)}
            </p>
            {/* Simulate status update for demo */}
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
                setSelectedInternship({
                  ...selectedInternship,
                  status: newStatus,
                });
              }}
              style={{
                padding: "0.5rem",
                borderRadius: "0.25rem",
                marginTop: "1rem",
              }}
            >
              <option value="pending">Pending</option>
              <option value="finalized">Finalized</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="current">Current</option>
              <option value="completed">Completed</option>
            </select>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
                marginTop: "1.5rem",
              }}
            >
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "#ef4444",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedInternship(null)}
                onMouseOver={(e) => (e.target.style.background = "#dc2626")}
                onMouseOut={(e) => (e.target.style.background = "#ef4444")}
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
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f3f4f6",
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
  sidebar: {
    width: "16rem",
    background: "#fff",
    boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 4rem)", // Fill available height minus header
    overflowY: "auto", // Handle overflow if content exceeds height
  },
  sidebarFooter: {
    padding: "1rem",
    borderTop: "1px solid #e5e7eb",
  },
  logoutBtn: {
    width: "100%",
    padding: "0.75rem",
    textAlign: "left",
    color: "#4b5563",
    borderRadius: "0.375rem",
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.875rem",
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
