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
    courses: [], // Array to store multiple courses
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [internshipId, setInternshipId] = useState(null);
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [courses, setCourses] = useState([]); // State for all available courses
  const [selectedCourseId, setSelectedCourseId] = useState(""); // Temporary state for dropdown selection
  const [reports, setReports] = useState([]); // State for existing reports
  const [editingReportId, setEditingReportId] = useState(null); // Track which report is being edited
  const [viewingReport, setViewingReport] = useState(null); // State to hold the report being viewed
  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle modal

  // Define major-to-courses mapping
  const majorCourses = {
    "Computer Engineering": [
      { id: 1, name: "CSEN 301" },
      { id: 2, name: "CSEN 501" },
      { id: 3, name: "CSEN 502" },
      { id: 4, name: "CSEN 401" },
      { id: 5, name: "CSEN 602" },
      { id: 6, name: "CSEN 604" },
      { id: 7, name: "CSEN 701" },
      { id: 8, name: "CSEN 902" },
      { id: 9, name: "CSEN 1002" },
      { id: 10, name: "CSEN 703" },
    ],
    "Pharmacy": [
      { id: 1, name: "PHAM 875" },
      { id: 2, name: "CLPH 1202" },
      { id: 3, name: "CLPH 301" },
      { id: 4, name: "PHBLP 411" },
    ],
    "default": [
      { id: 1, name: "Introduction to Programming" },
      { id: 2, name: "Data Structures" },
      { id: 3, name: "Algorithms" },
      { id: 4, name: "Database Systems" },
    ],
  };

  // Load internships, fetch major, set courses, and load reports
  useEffect(() => {
    // Load internships from sessionStorage
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

    // Fetch the student's major from sessionStorage
    const savedProfile = sessionStorage.getItem("studentProfile");
    let studentMajor = "default"; // Fallback major
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        studentMajor = parsedProfile.major || "default";
      } catch (e) {
        console.error("Error parsing studentProfile from sessionStorage:", e);
      }
    }

    // Set all available courses based on the student's major
    const courseList = majorCourses[studentMajor] || majorCourses["default"];
    setCourses(courseList);

    // Load existing reports from sessionStorage
    const storedReports = sessionStorage.getItem("studentReports");
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    }
  }, [location]);

  // Update selected internship
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

  const handleCourseSelection = (e) => {
    const courseId = e.target.value;
    setSelectedCourseId(courseId);
  };

  const handleAddCourse = () => {
    if (!selectedCourseId) {
      alert("Please select a course to add.");
      return;
    }

    const selectedCourse = courses.find((course) => course.id === parseInt(selectedCourseId));
    if (selectedCourse && !report.courses.includes(selectedCourse.name)) {
      setReport((prev) => ({
        ...prev,
        courses: [...prev.courses, selectedCourse.name],
      }));
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== parseInt(selectedCourseId))
      );
      setSelectedCourseId("");
    } else if (report.courses.includes(selectedCourse.name)) {
      alert("This course has already been added.");
    }
  };

  const handleRemoveCourse = (courseToRemove) => {
    setReport((prev) => ({
      ...prev,
      courses: prev.courses.filter((course) => course !== courseToRemove),
    }));
    const removedCourse = majorCourses[
      Object.keys(majorCourses).find(
        (major) => majorCourses[major].some((c) => c.name === courseToRemove)
      ) || "default"
    ].find((c) => c.name === courseToRemove);
    if (removedCourse) {
      setCourses((prevCourses) => [...prevCourses, removedCourse].sort((a, b) => a.id - b.id));
    }
  };

  const handleSubmit = () => {
    if (!internshipId || !selectedInternship) {
      alert("Please select an internship before submitting.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newReport = {
        id: Date.now(), // Unique ID based on timestamp
        title: report.title,
        introduction: report.introduction,
        body: report.body,
        courses: report.courses,
        internshipId: internshipId,
      };

      const updatedReports = [...reports, newReport];
      setReports(updatedReports);
      sessionStorage.setItem("studentReports", JSON.stringify(updatedReports));

      // Update reportCreated flag for the selected internship
      const updatedInternships = internships.map((internship) =>
        internship.id === internshipId
          ? { ...internship, reportCreated: true }
          : internship
      );
      setInternships(updatedInternships);
      sessionStorage.setItem("appliedInternships", JSON.stringify(updatedInternships));

      setIsSubmitting(false);
      setReport({ title: "", introduction: "", body: "", courses: [] });
      setInternshipId(null);
      setSelectedInternship(null);
      setSelectedCourseId("");
      const savedProfile = sessionStorage.getItem("studentProfile");
      let studentMajor = "default";
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          studentMajor = parsedProfile.major || "default";
        } catch (e) {
          console.error("Error parsing studentProfile from sessionStorage:", e);
        }
      }
      const courseList = majorCourses[studentMajor] || majorCourses["default"];
      setCourses(courseList);
      alert("Report submitted successfully!");
    }, 1000);
  };

  const handleView = (reportId) => {
    const reportToView = reports.find((r) => r.id === reportId);
    if (reportToView) {
      setViewingReport(reportToView);
      setIsModalOpen(true);
    }
  };

  const handleEdit = (reportId) => {
    const reportToEdit = reports.find((r) => r.id === reportId);
    if (reportToEdit) {
      setReport({
        title: reportToEdit.title,
        introduction: reportToEdit.introduction,
        body: reportToEdit.body,
        courses: reportToEdit.courses,
      });
      setInternshipId(reportToEdit.internshipId);
      setEditingReportId(reportId);
      setCourses(
        majorCourses[
          Object.keys(majorCourses).find(
            (major) =>
              majorCourses[major].some((c) => reportToEdit.courses.includes(c.name))
          ) || "default"
        ].filter((course) => !reportToEdit.courses.includes(course.name))
      );
    }
  };

  const handleUpdate = () => {
    if (!internshipId || !selectedInternship) {
      alert("Please select an internship before updating.");
      return;
    }

    const updatedReport = {
      id: editingReportId,
      title: report.title,
      introduction: report.introduction,
      body: report.body,
      courses: report.courses,
      internshipId: internshipId,
    };

    const updatedReports = reports.map((r) =>
      r.id === editingReportId ? updatedReport : r
    );
    setReports(updatedReports);
    sessionStorage.setItem("studentReports", JSON.stringify(updatedReports));

    setIsSubmitting(false);
    setReport({ title: "", introduction: "", body: "", courses: [] });
    setInternshipId(null);
    setSelectedInternship(null);
    setSelectedCourseId("");
    setEditingReportId(null);
    const savedProfile = sessionStorage.getItem("studentProfile");
    let studentMajor = "default";
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        studentMajor = parsedProfile.major || "default";
      } catch (e) {
        console.error("Error parsing studentProfile from sessionStorage:", e);
      }
    }
    const courseList = majorCourses[studentMajor] || majorCourses["default"];
    setCourses(courseList);
    alert("Report updated successfully!");
  };

  const handleDelete = (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      const updatedReports = reports.filter((r) => r.id !== reportId);
      setReports(updatedReports);
      sessionStorage.setItem("studentReports", JSON.stringify(updatedReports));
      alert("Report deleted successfully!");
    }
  };

  const handleDownloadPDF = (reportId) => {
    const reportToDownload = reports.find((r) => r.id === reportId);
    if (reportToDownload) {
      const pdfContent = `
\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{a4paper, margin=1in}
\\usepackage{enumitem}

\\title{${reportToDownload.title}}
\\author{Student Report}
\\date{}

\\begin{document}

\\maketitle

\\section{Introduction}
${reportToDownload.introduction}

\\section{Body}
${reportToDownload.body}

\\section{Helpful Courses}
\\begin{itemize}
  ${reportToDownload.courses.map((course) => `\\item ${course}`).join("\n  ")}
\\end{itemize}

\\end{document}
      `;
      const blob = new Blob([pdfContent], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${reportToDownload.title.replace(/ /g, "_")}.tex`;
      a.click();
      window.URL.revokeObjectURL(url);
      alert("Download the .tex file and compile it with LaTeX to generate the PDF.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setViewingReport(null);
  };

  return (
    <div style={styles.container}>
      {!isModalOpen && <Header />} {/* Render Header only when modal is closed */}
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

          {/* Reports List */}
          {reports.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>
                Your Reports
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {reports.map((r) => (
                  <li
                    key={r.id}
                    style={{
                      background: "#fff",
                      padding: "1rem",
                      borderRadius: "0.375rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      marginBottom: "1rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "1rem", color: "#1f2937" }}>{r.title}</span>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => handleView(r.id)}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "#3b82f6",
                          color: "#fff",
                          borderRadius: "0.25rem",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                        }}
                        onMouseOver={(e) => (e.target.style.background = "#2563eb")}
                        onMouseOut={(e) => (e.target.style.background = "#3b82f6")}
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(r.id)}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "#10b981",
                          color: "#fff",
                          borderRadius: "0.25rem",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                        }}
                        onMouseOver={(e) => (e.target.style.background = "#059669")}
                        onMouseOut={(e) => (e.target.style.background = "#10b981")}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "#ef4444",
                          color: "#fff",
                          borderRadius: "0.25rem",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                        }}
                        onMouseOver={(e) => (e.target.style.background = "#dc2626")}
                        onMouseOut={(e) => (e.target.style.background = "#ef4444")}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleDownloadPDF(r.id)}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "#8b5cf6",
                          color: "#fff",
                          borderRadius: "0.25rem",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                        }}
                        onMouseOver={(e) => (e.target.style.background = "#7c3aed")}
                        onMouseOut={(e) => (e.target.style.background = "#8b5cf6")}
                      >
                        Download PDF
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

           <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>Add New Report</h3>

          {/* New Report Form */}
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
                  .filter((i) => i.status === "completed")
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

            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="course"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#1f2937",
                  marginBottom: "0.25rem",
                }}
              >
                Select Helpful Course
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <select
                  id="course"
                  name="course"
                  value={selectedCourseId}
                  onChange={handleCourseSelection}
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
                  <option value="">Select a course</option>
                  {courses
                    .filter((course) => !report.courses.includes(course.name))
                    .map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddCourse}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#3b82f6",
                    color: "#fff",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#2563eb")}
                  onMouseOut={(e) => (e.target.style.background = "#3b82f6")}
                >
                  Add
                </button>
              </div>
              {report.courses.length > 0 && (
                <div style={{ marginTop: "0.5rem" }}>
                  <strong style={{ fontSize: "0.875rem", color: "#1f2937" }}>
                    Selected Courses:
                  </strong>
                  <ul style={{ marginTop: "0.25rem", paddingLeft: "1.5rem" }}>
                    {report.courses.map((course, index) => (
                      <li
                        key={index}
                        style={{
                          fontSize: "0.875rem",
                          color: "#1f2937",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {course}
                        <button
                          type="button"
                          onClick={() => handleRemoveCourse(course)}
                          style={{
                            padding: "0.2rem 0.5rem",
                            background: "#ef4444",
                            color: "#fff",
                            borderRadius: "0.25rem",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                          }}
                          onMouseOver={(e) => (e.target.style.background = "#dc2626")}
                          onMouseOut={(e) => (e.target.style.background = "#ef4444")}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              {editingReportId ? (
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#10b981",
                    color: "#fff",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                  onClick={handleUpdate}
                  disabled={isSubmitting}
                  onMouseOver={(e) => !isSubmitting && (e.target.style.background = "#059669")}
                  onMouseOut={(e) => !isSubmitting && (e.target.style.background = "#10b981")}
                >
                  {isSubmitting ? "Updating..." : "Update Report"}
                </button>
              ) : (
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
              )}
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "#ef4444",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={() => setReport({ title: "", introduction: "", body: "", courses: [] })}
                onMouseOver={(e) => (e.target.style.background = "#dc2626")}
                onMouseOut={(e) => (e.target.style.background = "#ef4444")}
              >
                Clear
              </button>
            </div>
          </div>
        </main>

        {/* Modal for Viewing Report */}
        {isModalOpen && viewingReport && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "2rem",
                borderRadius: "0.5rem",
                width: "90%",
                maxWidth: "600px",
                maxHeight: "80vh",
                overflowY: "auto",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#1f2937" }}>
                {viewingReport.title}
              </h2>
              <section>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                  Introduction
                </h3>
                <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: "1rem" }}>
                  {viewingReport.introduction}
                </p>
              </section>
              <section>
                <h3 style={{ fontSize: "1.25rm", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                  Body
                </h3>
                <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: "1rem" }}>
                  {viewingReport.body}
                </p>
              </section>
              <section>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                  Helpful Courses
                </h3>
                <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", color: "#4b5563" }}>
                  {viewingReport.courses.map((course, index) => (
                    <li key={index} style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
                      {course}
                    </li>
                  ))}
                </ul>
              </section>
              <button
                onClick={closeModal}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#ef4444",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  marginTop: "1rem",
                }}
                onMouseOver={(e) => (e.target.style.background = "#dc2626")}
                onMouseOut={(e) => (e.target.style.background = "#ef4444")}
              >
                Close
              </button>
            </div>
          </div>
        )}
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