import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Header from "./Components/Header";
import "./StudentHomePage.css";

function Report() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("4rem");
  const [report, setReport] = useState({
    title: "",
    introduction: "",
    body: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [internshipId, setInternshipId] = useState(null);
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);

  // Load internships from sessionStorage and extract internshipId
  useEffect(() => {
    const storedInternships = sessionStorage.getItem("appliedInternships");
    if (storedInternships) {
      const parsedInternships = JSON.parse(storedInternships);
      setInternships(parsedInternships);
    }

    // Extract internshipId from location state or URL
    const idFromState = location.state?.internshipId;
    if (idFromState) {
      setInternshipId(idFromState);
    }
  }, [location]);

  // Update selected internship when internshipId or internships change
  useEffect(() => {
    if (internshipId && internships.length > 0) {
      const internship = internships.find((i) => i.id === internshipId);
      setSelectedInternship(internship || null);
    }
  }, [internshipId, internships]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport((prev) => ({ ...prev, [name]: value }));
  };

  const handleInternshipChange = (e) => {
    const id = parseInt(e.target.value);
    setInternshipId(id);
    const internship = internships.find((i) => i.id === id);
    setSelectedInternship(internship || null);
  };

  const handleSubmit = () => {
    if (!internshipId || !selectedInternship) {
      alert("Please select an internship before submitting.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Report submitted:", report);

      // Update reportCreated flag for the selected internship
      const updatedInternships = internships.map((internship) =>
        internship.id === internshipId
          ? { ...internship, reportCreated: true }
          : internship
      );
      setInternships(updatedInternships);
      sessionStorage.setItem("appliedInternships", JSON.stringify(updatedInternships));

      setIsSubmitting(false);
      setReport({ title: "", introduction: "", body: "" });
      setInternshipId(null);
      setSelectedInternship(null);
      alert("Report submitted successfully!");
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={{ ...styles.layout, marginTop: "4rem", minHeight: "calc(100vh - 4rem)" }}>
        <div style={styles.sidebar}>
          <SideBar
            setActivePage={(page) => navigate(`/student${page === "home" ? "" : "/" + page}`)}
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
            Internship Reports
          </h2>

          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "0.375rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="internship"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#1f2937",
                  marginBottom: "0.25rem",
                }}
              >
                Select an Internship
              </label>
              <select
                id="internship"
                value={internshipId || ""}
                onChange={handleInternshipChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.25rem",
                  fontSize: "0.875rem",
                }}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2a9d8f")}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              >
                <option value="">Select an internship</option>
                {internships
                  .filter((i) => i.status === "completed" && !i.reportCreated)
                  .map((internship) => (
                    <option key={internship.id} value={internship.id}>
                      {internship.title} - {internship.company}
                    </option>
                  ))}
              </select>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="title"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#1f2937",
                  marginBottom: "0.25rem",
                }}
              >
                Report Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={report.title}
                onChange={handleInputChange}
                placeholder="Enter report title"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.25rem",
                  fontSize: "0.875rem",
                }}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2a9d8f")}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="introduction"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#1f2937",
                  marginBottom: "0.25rem",
                }}
              >
                Introduction
              </label>
              <textarea
                id="introduction"
                name="introduction"
                value={report.introduction}
                onChange={handleInputChange}
                placeholder="Write the introduction"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.25rem",
                  fontSize: "0.875rem",
                  minHeight: "100px",
                }}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2a9d8f")}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="body"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#1f2937",
                  marginBottom: "0.25rem",
                }}
              >
                Body
              </label>
              <textarea
                id="body"
                name="body"
                value={report.body}
                onChange={handleInputChange}
                placeholder="Write the body of the report"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.25rem",
                  fontSize: "0.875rem",
                  minHeight: "200px",
                }}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2a9d8f")}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "#2a9d8f",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                  opacity: isSubmitting ? 0.6 : 1,
                }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                onMouseOver={(e) => !isSubmitting && (e.target.style.background = "#21867a")}
                onMouseOut={(e) => !isSubmitting && (e.target.style.background = "#2a9d8f")}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </button>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "#ef4444",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={() => setReport({ title: "", introduction: "", body: "" })}
                onMouseOver={(e) => (e.target.style.background = "#dc2626")}
                onMouseOut={(e) => (e.target.style.background = "#ef4444")}
              >
                Clear
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
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
  layout: {
    display: "flex",
    flex: 1,
  },
  sidebar: {
    position: "fixed",
    top: "4rem",
    left: 0,
    height: "calc(100vh - 4rem)",
  },
};

export default Report;