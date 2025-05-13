import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf"; // Import jsPDF
import Header from "./Components/Header";
import "./StudentHomePage.css";
import SideBar from "./Components/SideBar";

function EvaluationStudent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("4rem");
  const [evaluation, setEvaluation] = useState({

    body: "",
    courses: [],
    recommend: "",
    recommendReason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [internshipId, setInternshipId] = useState(null);
  const [internshipTitle, setInternshipTitle] = useState(null);
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [evaluations, setEvaluations] = useState([]);
  const [editingEvaluationId, setEditingEvaluationId] = useState(null);
  const [viewingEvaluation, setViewingEvaluation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const storedProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
  const email = (location.state?.email || storedProfile.email || "").toLowerCase();

  const majorCourses = {
    "Computer Engineering": [
      { id: 1, name: "CSEN 301 Data Structures and Algorithms" },
      { id: 2, name: "CSEN 501 Databases 1" },
      { id: 3, name: "CSEN 502 Theory Of Computation" },
      { id: 4, name: "CSEN 401 Computer Programming Lab" },
      { id: 5, name: "CSEN 602 Operating Systems" },
      { id: 6, name: "CSEN 604 Databases 2" },
      { id: 7, name: "CSEN 701 Advanced Computer Lab" },
      { id: 8, name: "CSEN 902 Cloud Computing" },
      { id: 9, name: "CSEN 1002 Compiler" },
      { id: 10, name: "CSEN 703 Microprocessors" },
    ],
    "Pharmacy": [
      { id: 1, name: "PHAM 875 " },
      { id: 2, name: "CLPH 1202 " },
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

   // Mock internships for consistency with AppliedInternships.js
  const mockCurrentCompletedInternships = [
    {
      id: 1,
      title: "Software Engineer",
      company: "SCAD Technologies",
      status: "current",
    },
    {
      id: 2,
      title: "Web Developer",
      company: "SCAD Systems",
      status: "current",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "SCAD Solutions",
      status: "completed",
    },
    {
      id: 4,
      title: "PWC Summer Internship",
      company: "PWC",
      status: "current",
    },
    {
      id: 5,
      title: "Google UI/UX Winter Internship",
      company: "Google",
      status: "completed",
    },
    {
      id: 6,
      title: "Etisalat Hybrid Data Science Internship",
      company: "Etisalat",
      status: "completed",
    },
  ];

  useEffect(() => {
  const storedInternships = sessionStorage.getItem("appliedInternships");
   let parsedInternships = [];
    try {
      const storedInternships = sessionStorage.getItem("appliedInternships");
      if (storedInternships) {
        parsedInternships = JSON.parse(storedInternships);
        // Ensure parsedInternships is an array
        if (!Array.isArray(parsedInternships)) {
          console.error("Parsed internships is not an array:", parsedInternships);
          parsedInternships = [];
        }
      }
    } catch (e) {
      console.error("Error parsing appliedInternships from sessionStorage:", e);
      parsedInternships = [];
    }

    // Merge mock data, prioritizing sessionStorage data for matching IDs
    const mergedInternships = [
      // Include mock internships not in sessionStorage
      ...mockCurrentCompletedInternships.filter(
        (mock) => !parsedInternships.some((stored) => Number(stored.id) === Number(mock.id))
      ),
      // Include all sessionStorage internships
      ...parsedInternships,
    ];
    setInternships(mergedInternships);
 

    const idFromState = location.state?.internshipId;
    if (idFromState) {
      setInternshipId(idFromState);
    }

    const titleFromState = location.state?.internshipTitle;
    if (titleFromState) {
      setInternshipTitle(titleFromState);
    }

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

    const storedEvaluations = sessionStorage.getItem("studentEvaluations");
    if (storedEvaluations) {
      setEvaluations(JSON.parse(storedEvaluations));
    }
  }, [location]);

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
    setEvaluation((prev) => ({ ...prev, [name]: value }));
  };

  const handleInternshipChange = (e) => {
    const id = parseInt(e.target.value);
    setInternshipId(id);
    const internship = internships.find((i) => i.id === id);
    setSelectedInternship(internship || null);
    setInternshipTitle(internship ? internship.title : null);
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
    if (selectedCourse && !evaluation.courses.includes(selectedCourse.name)) {
      setEvaluation((prev) => ({
        ...prev,
        courses: [...prev.courses, selectedCourse.name],
      }));
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== parseInt(selectedCourseId))
      );
      setSelectedCourseId("");
    } else if (evaluation.courses.includes(selectedCourse.name)) {
      alert("This course has already been added.");
    }
  };

  const handleRemoveCourse = (courseToRemove) => {
    setEvaluation((prev) => ({
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
      const newEvaluation = {
        id: Date.now(),
   
        body: evaluation.body,
        courses: evaluation.courses,
        internshipId: internshipId,
        internshipTitle: internshipTitle || selectedInternship.title,
        recommend: evaluation.recommend,
        recommendReason: evaluation.recommend === "yes" ? evaluation.recommendReason : "",
      };

      const updatedEvaluations = [...evaluations, newEvaluation];
      setEvaluations(updatedEvaluations);
      sessionStorage.setItem("studentEvaluations", JSON.stringify(updatedEvaluations));

      const updatedInternships = internships.map((internship) =>
        internship.id === internshipId
          ? { ...internship, evaluationCreated: true }
          : internship
      );
      setInternships(updatedInternships);
      sessionStorage.setItem("appliedInternships", JSON.stringify(updatedInternships));

      setIsSubmitting(false);
      setEvaluation({
    
        body: "",
        courses: [],
        recommend: "",
        recommendReason: "",
      });
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
      alert("Evaluation submitted successfully!");
    }, 1000);
  };

  const handleView = (evaluationId) => {
    const evaluationToView = evaluations.find((r) => r.id === evaluationId);
    if (evaluationToView) {
      setViewingEvaluation(evaluationToView);
      setIsModalOpen(true);
    }
  };

  const handleEdit = (evaluationId) => {
    const evaluationToEdit = evaluations.find((r) => r.id === evaluationId);
    if (evaluationToEdit) {
      setEvaluation({

        body: evaluationToEdit.body,
        courses: evaluationToEdit.courses,
        recommend: evaluationToEdit.recommend || "",
        recommendReason: evaluationToEdit.recommendReason || "",
      });
      setInternshipId(evaluationToEdit.internshipId);
      setInternshipTitle(evaluationToEdit.internshipTitle);
      setEditingEvaluationId(evaluationId);
      setCourses(
        majorCourses[
          Object.keys(majorCourses).find(
            (major) =>
              majorCourses[major].some((c) => evaluationToEdit.courses.includes(c.name))
          ) || "default"
        ].filter((course) => !evaluationToEdit.courses.includes(course.name))
      );
    }
  };

  const handleUpdate = () => {
    if (!internshipId || !selectedInternship) {
      alert("Please select an internship before updating.");
      return;
    }

    const updatedEvaluation = {
      id: editingEvaluationId,
      body: evaluation.body,
      courses: evaluation.courses,
      internshipId: internshipId,
      internshipTitle: internshipTitle || selectedInternship.title,
      recommend: evaluation.recommend,
      recommendReason: evaluation.recommend === "yes" ? evaluation.recommendReason : "",
    };

    const updatedEvaluations = evaluations.map((r) =>
      r.id === editingEvaluationId ? updatedEvaluation : r
    );
    setEvaluations(updatedEvaluations);
    sessionStorage.setItem("studentEvaluations", JSON.stringify(updatedEvaluations));

    setIsSubmitting(false);
    setEvaluation({
 
      body: "",
      courses: [],
      recommend: "",
      recommendReason: "",
    });
    setInternshipId(null);
    setSelectedInternship(null);
    setSelectedCourseId("");
    setEditingEvaluationId(null);
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
    alert("Evaluation updated successfully!");
  };

  const handleDelete = (evaluationId) => {
    if (window.confirm("Are you sure you want to delete this evaluation?")) {
      const updatedEvaluations = evaluations.filter((r) => r.id !== evaluationId);
      setEvaluations(updatedEvaluations);
      sessionStorage.setItem("studentEvaluations", JSON.stringify(updatedEvaluations));
      alert("Evaluation deleted successfully!");
    }
  };

  const handleDownloadPDF = (evaluationId) => {
  const evaluationToDownload = evaluations.find((r) => r.id === evaluationId);
  if (evaluationToDownload) {
    const doc = new jsPDF();
    
    // Set document properties
    doc.setProperties({
      title: `${evaluationToDownload.title} Evaluation`,
      subject: 'Internship Evaluation Report',
      author: 'GUC Internship System',
      creator: 'GUC Internship System'
    });

    // Add logo or header
    doc.setFontSize(20);
    doc.setTextColor(40, 157, 143); // #2a9d8f color
    doc.text('German University in Cairo', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text('Internship Evaluation Report', 105, 30, { align: 'center' });

    // Add horizontal line
    doc.setDrawColor(40, 157, 143);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);


    const introductionLines = doc.splitTextToSize(
      evaluationToDownload.introduction, 
      170
    );
    doc.text(introductionLines, 20, 80);

    // Body Section
    let yPosition = 80 + introductionLines.length * 7;
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.setTextColor(40, 157, 143);
    doc.text('Evaluation Details', 20, yPosition);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    yPosition += 10;
    const bodyLines = doc.splitTextToSize(evaluationToDownload.body, 170);
    doc.text(bodyLines, 20, yPosition);

    // Helpful Courses Section
    yPosition += bodyLines.length * 7 + 10;
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.setTextColor(40, 157, 143);
    doc.text('Helpful Courses', 20, yPosition);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    yPosition += 10;
    
    evaluationToDownload.courses.forEach((course, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`• ${course}`, 25, yPosition);
      yPosition += 7;
    });

    // Recommendation Section
    yPosition += 10;
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.setTextColor(40, 157, 143);
    doc.text('Recommendation', 20, yPosition);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    yPosition += 10;
    
    doc.text(
      `Would you recommend this internship? ${evaluationToDownload.recommend === "yes" ? "Yes" : "No"}`,
      20,
      yPosition
    );
    
    if (evaluationToDownload.recommend === "yes" && evaluationToDownload.recommendReason) {
      yPosition += 10;
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text('Reason:', 20, yPosition);
      yPosition += 7;
      const reasonLines = doc.splitTextToSize(evaluationToDownload.recommendReason, 170);
      doc.text(reasonLines, 25, yPosition);
    }

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        105,
        287,
        { align: 'center' }
      );
      doc.text(
        'GUC Internship System - Confidential',
        105,
        292,
        { align: 'center' }
      );
    }

    // Save the PDF with a proper filename
    const fileName = `${evaluationToDownload.title.replace(/[^a-zA-Z0-9]/g, '_')}_Evaluation.pdf`;
    doc.save(fileName);
  }
};
  const closeModal = () => {
    setIsModalOpen(false);
    setViewingEvaluation(null);
  };

  return (
    <div style={styles.container}>
      {!isModalOpen && <Header />}
      <div style={{ ...styles.layout, marginTop: "4rem", minHeight: "calc(100vh - 4rem)" }}>
        <div style={styles.sidebar}>
          <SideBar
   setActivePage={(page) =>
            navigate(`/student${page === "home" ? "" : "/" + page}`, { state: { email } })
          }                 isOpen={isSidebarOpen}
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


          {evaluations.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>
                Your Evaluations
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {evaluations.map((r) => (
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
                    <span style={{ fontSize: "1rem", color: "#1f2937" }}>{r.internshipTitle}</span>
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

          <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>
            Add New Evaluation
          </h3>

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
                  .filter((i) => i.status === "completed" && !i.evaluationCreated)
                  .map((internship) => (
                    <option key={internship.id} value={internship.id}>
                      {internship.title} - {internship.company}
                    </option>
                  ))}
              </select>
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
                value={evaluation.body}
                onChange={handleInputChange}
                placeholder="Write the body of the evaluation"
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
                    .filter((course) => !evaluation.courses.includes(course.name))
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
              {evaluation.courses.length > 0 && (
                <div style={{ marginTop: "0.5rem" }}>
                  <strong style={{ fontSize: "0.875rem", color: "#1f2937" }}>
                    Selected Courses:
                  </strong>
                  <ul style={{ marginTop: "0.25rem", paddingLeft: "1.5rem" }}>
                    {evaluation.courses.map((course, index) => (
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

            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="recommend"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#1f2937",
                  marginBottom: "0.25rem",
                }}
              >
                Would you recommend this internship?
              </label>
              <select
                id="recommend"
                name="recommend"
                value={evaluation.recommend}
                onChange={handleInputChange}
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
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {evaluation.recommend === "yes" && (
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="recommendReason"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#1f2937",
                    marginBottom: "0.25rem",
                  }}
                >
                  Reason for Recommendation
                </label>
                <textarea
                  id="recommendReason"
                  name="recommendReason"
                  value={evaluation.recommendReason}
                  onChange={handleInputChange}
                  placeholder="Why would you recommend this internship?"
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
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              {editingEvaluationId ? (
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
                  {isSubmitting ? "Updating..." : "Update Evaluation"}
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
                  {isSubmitting ? "Submitting..." : "Submit Evaluation"}
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
                onClick={() =>
                  setEvaluation({
                                
                    body: "",
                    courses: [],
                    recommend: "",
                    recommendReason: "",
                  })
                }
                onMouseOver={(e) => (e.target.style.background = "#dc2626")}
                onMouseOut={(e) => (e.target.style.background = "#ef4444")}
              >
                Clear
              </button>
            </div>
          </div>
        </main>

        {isModalOpen && viewingEvaluation && (
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
              <section>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                  Body
                </h3>
                <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: "1rem" }}>
                  {viewingEvaluation.body}
                </p>
              </section>
              <section>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                  Helpful Courses
                </h3>
                <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", color: "#4b5563" }}>
                  {viewingEvaluation.courses.map((course, index) => (
                    <li key={index} style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
                      {course}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                  Recommendation
                </h3>
                <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: "1rem" }}>
                  Would you recommend this internship?{" "}
                  {viewingEvaluation.recommend === "yes" ? "Yes" : "No"}
                  {viewingEvaluation.recommend === "yes" && viewingEvaluation.recommendReason && (
                    <>
                      <br />
                      <strong>Reason:</strong> {viewingEvaluation.recommendReason}
                    </>
                  )}
                </p>
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

export default EvaluationStudent;