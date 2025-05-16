import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import "./StudentHomePage.css";
import { jsPDF } from "jspdf";


function Report() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("4rem");
  const [report, setReport] = useState({
    title: "",
    introduction: "",
    body: "",
    courses: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [internshipId, setInternshipId] = useState(null);
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [reports, setReports] = useState([]);
  const [editingReportId, setEditingReportId] = useState(null);
  const [viewingReport, setViewingReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isAppealModalOpen, setIsAppealModalOpen] = useState(false);
  const [appealMessage, setAppealMessage] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const storedProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
  const email = (location.state?.email || storedProfile.email || "").toLowerCase();

const predefinedReports = [
  {
    id: 1,
    title: "Valeo Summer internship",
    introduction: "I had the pleasure of spending my last summer in Valeo...",
    body: "through this internship i learnt various skilled such as...",
    courses: ["CSEN 301: Data structures and algorithms", "CSEN 501: DataBases 1"],
    status: "rejected",
    internshipTitle: "Valeo Summer internship",
    internshipCompany: "Valeo",
    comments: [
      {
        facultyName: "Dr. Smith",
        date: "2023-05-15",
        comment: "The report lacks sufficient detail about the technical skills acquired.",
        role: "Faculty Advisor"
      }
    ]
  },
  {
    id: 2,
    title: "Orange Summer internship for future Engineers",
    introduction: "I had the pleasure of spending my last summer in Orange...",
    body: "through this internship i learnt various skilled such as...",
    courses: ["CSEN 301: Data structures and algorithms", "CSEN 501: DataBases 1"],
    status: "flagged",
    internshipTitle: "Orange Summer internship for future Engineers",
    internshipCompany: "Orange",
    comments: [
      {
        facultyName: "Dr. Wael",
        date: "2023-05-15",
        comment: "The report lacks sufficient detail about the technical skills acquired.",
        role: "Faculty Advisor"
      }
    ]
  }
];
   
  

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

  // Load internships, fetch major, set courses, and load reports
  useEffect(() => {
    // Load internships from sessionStorage and merge with mock data
    const storedInternships = sessionStorage.getItem("appliedInternships");
    let parsedInternships = [];
    if (storedInternships) {
      parsedInternships = JSON.parse(storedInternships);
    }
    // Merge mock data, prioritizing sessionStorage data for matching IDs
    const mergedInternships = [
      ...mockCurrentCompletedInternships.filter(
        (mock) => !parsedInternships.some((stored) => stored.id === mock.id)
      ),
      ...parsedInternships,
    ];
    setInternships(mergedInternships);

    // Extract internshipId from location state
    const idFromState = location.state?.internshipId;
    if (idFromState) {
      setInternshipId(idFromState);
    }

    // Fetch the student's major from sessionStorage
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

    // Set all available courses based on the student's major
    const courseList = majorCourses[studentMajor] || majorCourses["default"];
    setCourses(courseList);

    // Load existing reports from sessionStorage
   const storedReports = sessionStorage.getItem("studentReports");
  
   let uniqueReports = [];
  if (storedReports) {
    // Merge stored reports with predefined reports
    const parsedReports = JSON.parse(storedReports);
    const allReports = [...predefinedReports, ...parsedReports];
    uniqueReports = [
      ...parsedReports,
      ...predefinedReports.filter(
        (predefined) => !parsedReports.some((stored) => stored.id === predefined.id)
      ),
    ];
    
    // Remove duplicates by ID
   
    
    setReports(uniqueReports);
    sessionStorage.setItem("studentReports", JSON.stringify(uniqueReports));
  } else {
    // First load - use predefined reports
   uniqueReports = [...predefinedReports];
  }
  setReports(uniqueReports);
  sessionStorage.setItem("studentReports", JSON.stringify(uniqueReports));
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
        id: Date.now(),
        title: report.title,
        introduction: report.introduction,
        body: report.body,
        courses: Array.isArray(report.courses) ? report.courses : [report.courses],
        internshipId: internshipId,
        internshipTitle: selectedInternship.title,
        internshipCompany: selectedInternship.company,
        status: "pending"
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
      showSuccessToast("Report submitted successfully!");
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
      setSelectedInternship(internships.find(i => i.id === reportToEdit.internshipId) || null);
      
      // Reset courses list based on major
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
      setCourses(courseList.filter(course => !reportToEdit.courses.includes(course.name)));
    }
  };

  const handleUpdate = () => {
    if (!editingReportId) {
      alert("No report selected for editing.");
      return;
    }

    // Find the original report to preserve its data
    const originalReport = reports.find(r => r.id === editingReportId);
    if (!originalReport) {
      alert("Report not found.");
      return;
    }

    const updatedReport = {
      id: editingReportId,
      title: report.title,
      introduction: report.introduction,
      body: report.body,
      courses: report.courses,
      internshipId: internshipId,
      internshipTitle: selectedInternship?.title || originalReport.internshipTitle,
      internshipCompany: selectedInternship?.company || originalReport.internshipCompany,
      status: originalReport.status || "pending",
      comments: originalReport.comments || []
    };

    // Update the reports state
    const updatedReports = reports.map((r) =>
      r.id === editingReportId ? updatedReport : r
    );
    setReports(updatedReports);
    
    // Update session storage
    sessionStorage.setItem("studentReports", JSON.stringify(updatedReports));

    // Reset form and state
    setReport({ title: "", introduction: "", body: "", courses: [] });
    setInternshipId(null);
    setSelectedInternship(null);
    setSelectedCourseId("");
    setEditingReportId(null);
    
    // Reset courses list
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

    showSuccessToast("Report updated successfully!");
  };

  const handleDelete = (reportId) => {
    if (window.confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
      const updatedReports = reports.filter((r) => r.id !== reportId);
      setReports(updatedReports);
      sessionStorage.setItem("studentReports", JSON.stringify(updatedReports));
      showSuccessToast("Report deleted successfully!");
    }
  };

  const handleDownloadPDF = (reportId) => {
    const reportToDownload = reports.find((r) => r.id === reportId);
    if (reportToDownload) {
      // Create a PDF using jsPDF
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text(reportToDownload.title, 20, 20);
      
      // Add introduction
      doc.setFontSize(12);
      doc.text("Introduction:", 20, 40);
      doc.setFontSize(10);
      const introLines = doc.splitTextToSize(reportToDownload.introduction, 170);
      doc.text(introLines, 20, 50);
      
      // Add body
      doc.setFontSize(12);
      doc.text("Body:", 20, 70);
      doc.setFontSize(10);
      const bodyLines = doc.splitTextToSize(reportToDownload.body, 170);
      doc.text(bodyLines, 20, 80);
      
      // Add courses
      doc.setFontSize(12);
      doc.text("Helpful Courses:", 20, 120);
      doc.setFontSize(10);
      reportToDownload.courses.forEach((course, index) => {
        doc.text(`• ${course}`, 20, 130 + (index * 10));
      });
      
      // Save the PDF
      doc.save(`${reportToDownload.title.replace(/ /g, "_")}.pdf`);
    }
  };

  const handleAppeal = (reportId) => {
    const reportToAppeal = reports.find((r) => r.id === reportId);
    if (reportToAppeal) {
      setViewingReport(reportToAppeal);
      setIsAppealModalOpen(true);
    }
  };

  const handleAppealSubmit = () => {
    if (!appealMessage.trim()) {
      alert("Please enter an appeal message");
      return;
    }
    
    setIsAppealModalOpen(false);
    setAppealMessage("");
    showSuccessToast("Appeal submitted successfully!");
  };

  const closeAppealModal = () => {
    setIsAppealModalOpen(false);
    setAppealMessage("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setViewingReport(null);
  };

  const handleViewComments = (e, report) => {
    e.stopPropagation();
    setViewingReport(report);
    setIsCommentsModalOpen(true);
  };

  const closeCommentsModal = () => {
    setIsCommentsModalOpen(false);
    setViewingReport(null);
  };

  const showSuccessToast = (message) => {
    setShowSuccessNotification(true);
    setSuccessMessage(message);
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 3000);
  };

  return (
    <div className="containerReports">
      {!isModalOpen && <Header />}
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
          <div style={{ display: "flex", gap: "2rem" }}>
            {/* Reports List Section */}
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>
                Your Reports
              </h3>
              {reports.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {reports.map((r) => (
                    <li
                      key={r.id}
                      style={{
                        background: "#fff",
                        padding: "1.25rem",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        marginBottom: "1.5rem",
                        position: "relative",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onClick={() => handleView(r.id)}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <span style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937" }}>
                              {r.internshipTitle}
                            </span>
                            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                              {r.internshipCompany}
                            </span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <span
                                style={{
                                  padding: "0.375rem 0.75rem",
                                  borderRadius: "9999px",
                                  fontSize: "0.75rem",
                                  fontWeight: "500",
                                  backgroundColor: r.status === "accepted" ? "#FFD700" : 
                                                r.status === "rejected" ? "#fd5e5e" : 
                                                r.status === "flagged" ? "#fd5e5e" : "#2a9d8f",
                                  color: r.status === "accepted" ? "#000" : "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.375rem",
                                }}
                              >
                                {r.status === "flagged" && (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                    <line x1="4" y1="15" x2="4" y2="21"></line>
                                  </svg>
                                )}
                                {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                              </span>
                              {(r.status === "rejected" || r.status === "flagged") && (
                                <button
                                  onClick={(e) => handleViewComments(e, r)}
                                  style={{
                                    padding: "0.375rem 0.75rem",
                                    background: "#2a9d8f",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "9999px",
                                    cursor: "pointer",
                                    fontSize: "0.75rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.375rem",
                                    fontWeight: "500",
                                  }}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                  </svg>
                                  See Why
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div style={{ position: "relative" }}>
                          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                            {(r.status === "rejected" || r.status === "flagged") && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAppeal(r.id);
                                }}
                                style={{
                                 padding: "0.375rem 0.75rem",
                                    background: "#fd5e5e",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "9999px",
                                    cursor: "pointer",
                                    fontSize: "0.75rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.375rem",
                                    fontWeight: "500",
                                }}
                                title="Submit an appeal for this report"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                                Appeal
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(r.id);
                              }}
                              style={{
                                padding: "0.375rem 0.75rem",
                                
                                color: "#A9A9A9",
                                border: "none",
                                borderRadius: "0.375rem",
                                cursor: "pointer",
                                fontSize: "0.875rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.375rem",
                                position: "relative",
                              }}
                              title="Edit this report"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                              
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadPDF(r.id);
                              }}
                              style={{
                                padding: "0.375rem 0.75rem",
                                
                                color: "#A9A9A9",
                                border: "none",
                                borderRadius: "0.375rem",
                                cursor: "pointer",
                                fontSize: "0.875rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.375rem",
                                position: "relative",
                              }}
                              title="Download report as PDF"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                              </svg>
                              
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
                                  handleDelete(r.id);
                                }
                              }}
                              style={{
                                padding: "0.375rem 0.75rem",
                               
                                color: "#A9A9A9",
                                border: "none",
                                borderRadius: "0.375rem",
                                cursor: "pointer",
                                fontSize: "0.875rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.375rem",
                                position: "relative",
                              }}
                              title="Delete this report"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                              
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ 
                  background: "#fff", 
                  padding: "2rem", 
                  borderRadius: "0.375rem", 
                  textAlign: "center",
                  color: "#6b7280"
                }}>
                  No reports yet
                </div>
              )}
            </div>

            {/* New Report Form Section */}
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>
                {editingReportId ? "Edit Report" : "Add New Report"}
              </h3>
              <div
                style={{
                  background: "#fff",
                  padding: "1.5rem",
                  borderRadius: "0.375rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  position: "sticky",
                  top: "2rem"
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
                    placeholder="e.g., Quarterly Report – Summer 2023"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                    }}
                    onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2a9d8f")}
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                  <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                    Enter a descriptive title for your report
                  </p>
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
                    placeholder="Write a brief introduction about your internship experience..."
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      minHeight: "100px",
                      resize: "vertical",
                    }}
                    onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2a9d8f")}
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                  <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                    Provide an overview of your internship and what you hope to achieve
                  </p>
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
                    placeholder="Describe your internship experience in detail..."
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      minHeight: "200px",
                      resize: "vertical",
                    }}
                    onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2a9d8f")}
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                  <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                    Include details about your responsibilities, achievements, and lessons learned
                  </p>
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
                      className="appeal"
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
                             className="modal-close-button"
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
                    >
                      {isSubmitting ? "Updating..." : "Update Report"}
                    </button>
                  ) : (
                    <button
                     className="actionButton"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Report"}
                    </button>
                  )}
                  <button
                    className="clear"
                    onClick={() => {
                      setReport({ title: "", introduction: "", body: "", courses: [] });
                      setEditingReportId(null);
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
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
                padding: "1.5rem",
                borderRadius: "0.5rem",
                width: "90%",
                maxWidth: "600px",
                maxHeight: "80vh",
                overflowY: "auto",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                borderLeft: "4px solid #2a9d8f",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", margin: 0 }}>
                    {viewingReport.internshipTitle}
                  </h2>
                  <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {viewingReport.title}
                  </span>
                  <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {viewingReport.internshipCompany}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "9999px",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      backgroundColor: viewingReport.status === "accepted" ? "#FFD700" : 
                                    viewingReport.status === "rejected" ? "#fd5e5e" : 
                                    viewingReport.status === "flagged" ? "#fd5e5e" : "#2a9d8f",
                      color: viewingReport.status === "accepted" ? "#000" : 
                            viewingReport.status === "rejected" ? "#fff" : 
                            viewingReport.status === "flagged" ? "#fff" : "#fff",
                    }}
                  >
                    {viewingReport.status.charAt(0).toUpperCase() + viewingReport.status.slice(1)}
                  </span>
                  <button
                    onClick={closeModal}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#9ca3af",
                      cursor: "pointer",
                      padding: "0.25rem",
                      borderRadius: "50%",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "1rem" }}>
                <section style={{ marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                    Introduction
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.5 }}>
                    {viewingReport.introduction}
                  </p>
                </section>

                <section style={{ marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                    Body
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.5 }}>
                    {viewingReport.body}
                  </p>
                </section>

                <section style={{ marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                    Helpful Courses
                  </h3>
                  <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", color: "#4b5563" }}>
                    {Array.isArray(viewingReport.courses) ? (
                      viewingReport.courses.map((course, index) => (
                        <li key={index} style={{ fontSize: "0.875rem", marginBottom: "0.25rem", lineHeight: 1.5 }}>
                          {course}
                        </li>
                      ))
                    ) : (
                      <li style={{ fontSize: "0.875rem", marginBottom: "0.25rem", lineHeight: 1.5 }}>
                        {viewingReport.courses}
                      </li>
                    )}
                  </ul>
                </section>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "2rem" }}>
                  <button
                    onClick={() => handleDownloadPDF(viewingReport.id)}
                    className="download"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comments Modal */}
        {isCommentsModalOpen && viewingReport && (
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
                padding: "1.5rem",
                borderRadius: "0.5rem",
                width: "90%",
                maxWidth: "500px",
                maxHeight: "80vh",
                overflowY: "auto",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                borderLeft: "4px solid #2a9d8f",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", margin: 0 }}>
                    Faculty Comments
                  </h2>
                  <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {viewingReport.internshipTitle} - {viewingReport.internshipCompany}
                  </span>
                </div>
                <button
                  onClick={closeCommentsModal}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#9ca3af",
                    cursor: "pointer",
                    padding: "0.25rem",
                    borderRadius: "50%",
                    transition: "all 0.2s ease",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {viewingReport.comments.map((comment, index) => (
                  <div
                    key={index}
                    style={{
                      background: "#f8fafc",
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ 
                          width: "32px", 
                          height: "32px", 
                          borderRadius: "50%", 
                          background: "#2a9d8f",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "0.875rem",
                          fontWeight: "600"
                        }}>
                          {comment.facultyName.charAt(0)}
                        </div>
                        <div>
                          <span style={{ fontWeight: "600", color: "#1f2937", fontSize: "0.875rem" }}>
                            {comment.facultyName}
                          </span>
                          <span style={{ marginLeft: "0.5rem", color: "#6b7280", fontSize: "0.75rem" }}>
                            {comment.role}
                          </span>
                        </div>
                      </div>
                      <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>{comment.date}</span>
                    </div>
                    <p style={{ color: "#4b5563", fontSize: "0.875rem", lineHeight: 1.5, margin: 0 }}>
                      {comment.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Appeal Modal */}
        {isAppealModalOpen && viewingReport && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
             
              zIndex: 1002,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "320px",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "flex-start",
                padding: "0.875rem 1rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                background: "white",
                borderLeft: "4px solid #3b82f6",
                width: "100%",
               
              }}
            >
              <div style={{ marginRight: "0.75rem", marginTop: "0.125rem", flexShrink: 0, color: "#3b82f6" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
                  <h4 style={{ fontWeight: "600", fontSize: "0.875rem", margin: 0, color: "#1f2937" }}>
                    Submit Appeal
                  </h4>
                  <span style={{ fontSize: "0.6875rem", color: "#6b7280" }}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "#4b5563", margin: "0.5rem 0", lineHeight: 1.4 }}>
                  Please explain why you believe this report should be reconsidered
                </p>
                <textarea
                  value={appealMessage}
                  onChange={(e) => setAppealMessage(e.target.value)}
                  placeholder="Enter your appeal message here..."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    minHeight: "100px",
                    resize: "vertical",
                    marginTop: "0.5rem",
                    marginBottom: "0.75rem",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                  <button
                    onClick={closeAppealModal}
                    style={{
                      padding: "0.5rem 0.75rem",
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Cancel
                  </button>
                  <button
                    onClick={handleAppealSubmit}
                    style={{
                      padding: "0.5rem 0.75rem",
                      background: "#3b82f6",
                      color: "#fff",
                      border: "none",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Send Appeal
                  </button>
                </div>
              </div>
              <button 
                onClick={closeAppealModal}
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  background: "none",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  padding: "0.25rem",
                  borderRadius: "50%",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Success Notification */}
        {showSuccessNotification && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1002,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "320px",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "flex-start",
                padding: "0.875rem 1rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                background: "white",
                borderLeft: "4px solid #2a9d8f",
                width: "100%",
                animation: "slideIn 0.3s ease-out forwards",
              }}
            >
              <div style={{ marginRight: "0.75rem", marginTop: "0.125rem", flexShrink: 0, color: "#2a9d8f" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
                  <h4 style={{ fontWeight: "600", fontSize: "0.875rem", margin: 0, color: "#1f2937" }}>
                    {successMessage}
                  </h4>
                  <span style={{ fontSize: "0.6875rem", color: "#6b7280" }}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowSuccessNotification(false)}
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  background: "none",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  padding: "0.25rem",
                  borderRadius: "50%",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
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