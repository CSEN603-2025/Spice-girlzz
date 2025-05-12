import { useState, useEffect } from "react";
import SideBar from "./Components/ScadSideBar";
import Header from "./Components/Header";
import ManageCompanies from "./SCADDahboardCompanies";
import { useNavigate } from "react-router-dom";
import { generateStatisticsReport } from "./pdfGenerator.js";
import "./StudentHomePage.css";
import "./SCADDashboardAlaa.css";

import {
  Bell,
  Mail,
  User,
  LogOut,
  Search,
  Download,
  Flag,
  Check,
  X,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Phone,
  PhoneOff,
  Menu,
} from "lucide-react";

// Dummy Data
// Helper Component

const ProfileItem = ({ label, value }) => (
  <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
    <strong>{label}:</strong> {value || "Not provided"}
  </p>
);
const initialCompanies = [
  {
    id: 1,
    name: "TechCorp",
    industry: "Technology",
    status: "Pending",
    details: "A leading tech firm specializing in AI.",
  },
  {
    id: 2,
    name: "MediHealth",
    industry: "Healthcare",
    status: "Pending",
    details: "Innovative healthcare solutions provider.",
  },
  {
    id: 3,
    name: "GreenEnergy",
    industry: "Energy",
    status: "Pending",
    details: "Sustainable energy solutions company.",
  },
  {
    id: 4,
    name: "FinTech Solutions",
    industry: "Finance",
    status: "Pending",
    details: "Modern financial technology solutions.",
  },
  {
    id: 5,
    name: "EduLearn",
    industry: "Education",
    status: "Pending",
    details: "Educational technology and learning solutions.",
  },
];

const initialStudents = [
  {
    id: 1,
    name: "Alaa Abdelnaser",
    internshipStatus: "Active",
    major: "Computer Science",
    semester: "Semester 5",
    avatar: "/imgs/Alaa.jpg",
    email: "alaa.abdelnaser@student.guc.edu.eg",
    jobInterests: "Software Development",
    previousInternships: "TechCorp (2024)",
    appliedInternships: [
      { companyName: "TechCorp", jobTitle: "Software Intern" },
    ],
  },
  {
    id: 2,
    name: "Mennatullah El Sabagh",
    internshipStatus: "Pending",
    major: "Engineering",
    semester: "Semester 3",
    avatar: "/imgs/Menna.jpeg",
    email: "mennatullah.elsabagh@student.guc.edu.eg",
    jobInterests: "Mechanical Design",
    previousInternships: "None",
    appliedInternships: [],
  },
  {
    id: 3,
    name: "Esraa Ahmed",
    internshipStatus: "Completed",
    major: "Computer Science",
    semester: "Semester 7",
    avatar: "/imgs/esraa.jpg",
    email: "esraa.ahmed@student.guc.edu.eg",
    jobInterests: "Web Development",
    previousInternships: "MediHealth (2024)",
    appliedInternships: [
      { companyName: "MediHealth", jobTitle: "Data Analyst Intern" },
    ],
  },
  {
    id: 4,
    name: "Malak Hisham Sallam",
    internshipStatus: "Active",
    major: "Data Science",
    semester: "Semester 5",
    avatar: "/imgs/Malak.jpeg",
    email: "malak.hisham@student.guc.edu.eg",
    jobInterests: "Data Analysis",
    previousInternships: "DataSync (2023)",
    appliedInternships: [],
  },
  {
    id: 5,
    name: "Mennatullah Shaaban",
    internshipStatus: "Pending",
    major: "Engineering",
    semester: "Semester 3",
    avatar: "/imgs/mennatullah-shaaban.jpg",
    email: "mennatullah.shaaban@student.guc.edu.eg",
    jobInterests: "Civil Engineering",
    previousInternships: "None",
    appliedInternships: [
      { companyName: "BuildCorp", jobTitle: "Civil Intern" },
    ],
  },
];

const initialReports = [
  {
    id: 1,
    student: "Alice Johnson",
    major: "Computer Science",
    status: "Pending",
    details: "Week 1 Report: Developed API endpoints.",
    company: "TechCorp",
    supervisor: "John Doe",
    startDate: "2025-01-01",
    endDate: "2025-03-01",
  },
  {
    id: 2,
    student: "Bob Smith",
    major: "Engineering",
    status: "Flagged",
    details: "Week 2 Report: Missing documentation.",
    company: "GreenEnergy",
    supervisor: "Jane Roe",
    startDate: "2025-02-01",
    endDate: "2025-04-01",
    comments: "Needs more detail on project scope.",
  },
  {
    id: 3,
    student: "Clara Davis",
    major: "Computer Science",
    status: "Accepted",
    details: "Final Report: Successfully deployed app.",
    company: "MediHealth",
    supervisor: "Emily Stone",
    startDate: "2025-01-15",
    endDate: "2025-03-15",
  },
  {
    id: 4,
    student: "David Wilson",
    major: "Data Science",
    status: "Pending",
    details: "Week 3 Report: Completed data analysis phase.",
    company: "FinTech Solutions",
    supervisor: "Michael Chen",
    startDate: "2025-02-15",
    endDate: "2025-04-15",
  },
  {
    id: 5,
    student: "Emma Brown",
    major: "Engineering",
    status: "Rejected",
    details: "Week 1 Report: Incomplete tasks.",
    company: "EduLearn",
    supervisor: "Sarah Johnson",
    startDate: "2025-03-01",
    endDate: "2025-05-01",
    comments: "Report does not meet minimum requirements.",
  },
];

const initialStatistics = {
  reportsPerCycle: { accepted: 12, rejected: 4, flagged: 3, pending: 5 },
  averageReviewTime: "3 days",
  popularCourses: [
    { name: "CS101", reports: 15 },
    { name: "ENG202", reports: 12 },
    { name: "DS100", reports: 8 },
  ],
  topCompanies: [
    { name: "TechCorp", rating: 4.7, reports: 6 },
    { name: "MediHealth", rating: 4.6, reports: 4 },
    { name: "FinTech Solutions", rating: 4.4, reports: 5 },
  ],
  internshipCount: {
    TechCorp: 6,
    MediHealth: 4,
    GreenEnergy: 2,
    FinTech: 5,
    EduLearn: 3,
  },
  performanceMetrics: {
    facultyAverage: 3.2,
    departmentAverage: 2.8,
    universityAverage: 2.5,
  },
};

export default function SCADStaffDashboard() {
  const toggleSidebar = () => {
    setSidebarWidth(sidebarWidth === "16rem" ? "4rem" : "16rem");
  };
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("statistics");
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [majorFilter, setMajorFilter] = useState("");
  const [callStatus, setCallStatus] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [companies, setCompanies] = useState(initialCompanies);
  const [students, setStudents] = useState(initialStudents);
  const [reports, setReports] = useState(initialReports);
  const [statistics, setStatistics] = useState(initialStatistics);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState("4rem"); // Default width (collapsed)

  const downloadPDF = (companyName) => {
    const fileName = `${companyName.replace(/\s+/g, "_")}.pdf`;
    const link = document.createElement("a");
    link.href = `/pdfs/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (industryFilter ? company.industry === industryFilter : true)
  );

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? student.internshipStatus === statusFilter : true) &&
      (majorFilter ? student.major === majorFilter : true)
  );

  const filteredReports = reports.filter(
    (report) =>
      report.student.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (majorFilter ? report.major === majorFilter : true) &&
      (statusFilter ? report.status === statusFilter : true)
  );

  useEffect(() => {
    const newNotifications = [
      {
        id: 1,
        type: "report",
        message: "New report submitted by Alice Johnson",
        time: "5 minutes ago",
      },
      {
        id: 2,
        type: "company",
        message: "TechCorp has updated their profile",
        time: "1 hour ago",
      },
      {
        id: 3,
        type: "student",
        message: "Bob Smith requested a meeting",
        time: "2 hours ago",
      },
      {
        id: 4,
        type: "system",
        message: "System maintenance scheduled for tomorrow",
        time: "3 hours ago",
      },
    ];
    setNotifications(newNotifications);

    const timer = setTimeout(() => {
      const incomingCall = window.confirm(
        "Incoming call from Alice Johnson. Accept?"
      );
      if (incomingCall) {
        setCallStatus("ongoing");
        setActivePage("video-calls");
        addNotification("Call started with Alice Johnson");
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const addNotification = (message, type = "system") => {
    const newNotification = {
      id: notifications.length + 1,
      type,
      message,
      time: "Just now",
    };
    setNotifications([newNotification, ...notifications]);
  };

  const handleCompanyAction = (id, action) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === id
          ? {
              ...company,
              status: action === "accept" ? "Accepted" : "Rejected",
            }
          : company
      )
    );
    const company = companies.find((c) => c.id === id);
    addNotification(
      `Company ${company.name} has been ${
        action === "accept" ? "accepted" : "rejected"
      }`,
      "company"
    );
  };

  const handleReportStatusChange = (id, status) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id
          ? {
              ...report,
              status: status.charAt(0).toUpperCase() + status.slice(1),
            }
          : report
      )
    );
    const report = reports.find((r) => r.id === id);
    addNotification(
      `Report from ${report.student} has been marked as ${status}`,
      "report"
    );
  };

  const handleCallAction = (action) => {
    if (action === "accept") {
      setCallStatus("ongoing");
      addNotification("Call accepted with Alice Johnson", "call");
    } else if (action === "reject") {
      setCallStatus(null);
      addNotification("Call rejected", "call");
    } else if (action === "leave") {
      setCallStatus(null);
      addNotification("Call ended", "call");
    }
  };

  const openModal = (type, item) => {
    setSelectedItem(item);
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };
  const renderModalContent = () => {
    if (!selectedItem) return null;

    switch (modalType) {
      case "companies":
        return (
          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "20rem",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                Company Details: {selectedItem.name}
              </h3>
              <button
                onClick={closeModal}
                style={{ color: "#6b7280", cursor: "pointer" }}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Industry:</strong> {selectedItem.industry}
              </p>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Status:</strong> {selectedItem.status}
              </p>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Details:</strong> {selectedItem.details}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
              }}
            >
              <button
                onClick={() => downloadPDF(selectedItem.name)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#3b82f6",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.background = "#2563eb")}
                onMouseOut={(e) => (e.target.style.background = "#3b82f6")}
              >
                <Download size={16} style={{ marginRight: "0.5rem" }} />{" "}
                Download
              </button>
            </div>
          </div>
        );
      case "report":
        return (
          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "20rem",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                Report from {selectedItem.student}
              </h3>
              <button
                onClick={closeModal}
                style={{ color: "#6b7280", cursor: "pointer" }}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Major:</strong> {selectedItem.major}
              </p>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Company:</strong> {selectedItem.company}
              </p>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Supervisor:</strong> {selectedItem.supervisor}
              </p>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Period:</strong> {selectedItem.startDate} to{" "}
                {selectedItem.endDate}
              </p>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Status:</strong> {selectedItem.status}
              </p>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Details:</strong> {selectedItem.details}
              </p>
              {selectedItem.comments && (
                <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                  <strong>Comments:</strong> {selectedItem.comments}
                </p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
              }}
            ></div>
          </div>
        );
      case "profile":
        return (
          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "25rem",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                Student Profile: {selectedItem.name}
              </h3>
              <img
                src={selectedItem.avatar}
                alt={selectedItem.name}
                style={{
                  width: "4rem", // Slightly larger for wider card
                  height: "4rem",
                  borderRadius: "9999px",
                  marginRight: "1rem",
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Major:</strong> {selectedItem.major}
              </p>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Semester:</strong> {selectedItem.semester}
              </p>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Email:</strong> {selectedItem.email}
              </p>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Internship Status:</strong>{" "}
                {selectedItem.internshipStatus}
              </p>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Job Interests:</strong> {selectedItem.jobInterests}
              </p>
              <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
                <strong>Previous Internships:</strong>{" "}
                {selectedItem.previousInternships || "None"}
              </p>
              <h4
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginTop: "0.5rem",
                  marginBottom: "0.25rem",
                }}
              >
                Applied Internships
              </h4>
              {selectedItem.appliedInternships &&
              selectedItem.appliedInternships.length > 0 ? (
                selectedItem.appliedInternships.map((internship, index) => (
                  <p
                    key={index}
                    style={{ color: "#4b5563", marginBottom: "0.25rem" }}
                  >
                    <strong>Company:</strong> {internship.companyName} -{" "}
                    <strong>Job Title:</strong> {internship.jobTitle}
                  </p>
                ))
              ) : (
                <p style={{ color: "#6b7280", marginBottom: "0.25rem" }}>
                  No applied internships yet.
                </p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#1f2937",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.background = "#111827")}
                onMouseOut={(e) => (e.target.style.background = "#1f2937")}
              >
                Close
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "cycle":
        return (
          <div style={{ animation: "fadeIn 0.3s" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",
              }}
            >
              Set Your Internship Cycle
            </h2>
            <div
              style={{
                background: "#fff",
                padding: "2rem",
                borderRadius: "0.5rem",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                width: "70%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "2rem",
                  marginBottom: "1.5rem",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ flex: "0 0 auto" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#2a9d8f",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Select Cycle Start Date
                  </label>
                  <input
                    type="date"
                    value={startDateFilter}
                    onChange={(e) => {
                      setStartDateFilter(e.target.value);
                      addNotification(
                        `Internship cycle start date set to ${e.target.value}`,
                        "cycle"
                      );
                    }}
                    style={{
                      padding: "0.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      outline: "none",
                      minWidth: "12rem",
                      width: "12rem",
                      fontSize: "0.9rem",
                    }}
                    onFocus={(e) =>
                      (e.target.style.boxShadow = "0 0 0 2px #2a9d8f")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                </div>
                <div style={{ flex: "0 0 auto" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#2a9d8f",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Select Cycle End Date
                  </label>
                  <input
                    type="date"
                    value={endDateFilter}
                    onChange={(e) => {
                      setEndDateFilter(e.target.value);
                      addNotification(
                        `Internship cycle end date set to ${e.target.value}`,
                        "cycle"
                      );
                    }}
                    style={{
                      padding: "0.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      outline: "none",
                      minWidth: "12rem",
                      width: "12rem",
                      fontSize: "0.9rem",
                    }}
                    onFocus={(e) =>
                      (e.target.style.boxShadow = "0 0 0 2px #2a9d8f")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                </div>
              </div>
              {(startDateFilter || endDateFilter) && (
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    background: "#e0f7f4",
                    borderRadius: "0.5rem",
                    borderLeft: "5px solid #2a9d8f",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "#1f2937",
                      marginBottom: "0.5rem",
                    }}
                  >
                    📌 Your Current Internship Cycle
                  </h3>
                  <p style={{ color: "#4b5563", fontSize: "0.95rem" }}>
                    <strong>Start:</strong> {startDateFilter || "Not set"}
                  </p>
                  <p style={{ color: "#4b5563", fontSize: "0.95rem" }}>
                    <strong>End:</strong> {endDateFilter || "Not set"}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case "companies":
        const handleCompanyAction = (id, action) => {
          setCompanies((prevCompanies) =>
            prevCompanies.map((company) =>
              company.id === id
                ? {
                    ...company,
                    status: action === "accept" ? "Accepted" : "Rejected",
                  }
                : company
            )
          );
          const company = companies.find((c) => c.id === id);
          addNotification(
            `Company ${company.name} has been ${
              action === "accept" ? "accepted" : "rejected"
            }`,
            "company"
          );
        };

        return (
          <div style={{ animation: "fadeIn 0.3s" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",
              }}
            >
              Manage Companies
            </h2>
            <div
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  position: "relative",
                  flex: "1 1 20rem",
                  minWidth: "15rem",
                }}
              >
                <Search
                  style={{
                    position: "absolute",
                    left: "0.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                    pointerEvents: "none", // Prevent Search icon from interfering
                  }}
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search by company name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: "0.4rem 0.4rem 0.4rem 2rem",
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    outline: "none",
                    boxSizing: "border-box",
                    fontSize: "0.875rem",
                    transition: "border-color 0.3s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                style={{
                  padding: "0.4rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  outline: "none",
                  minWidth: "12rem",
                  width: "12rem",
                  fontSize: "0.875rem",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              >
                <option value="">All Industries</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Energy">Energy</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            {companies.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem" }}>
                <p style={{ color: "#6b7280" }}>No companies found.</p>
              </div>
            ) : (
              <div
                style={{
                  background: "#fff",
                  borderRadius: "0.375rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <div style={{ overflowX: "auto", maxWidth: "100%" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      tableLayout: "fixed",
                    }}
                  >
                    <thead>
                      <tr style={{ background: "#f3f4f6" }}>
                        <th
                          style={{
                            padding: "1rem",
                            textAlign: "left",
                            color: "#1f2937",
                            width: "25%",
                          }}
                        >
                          Name
                        </th>
                        <th
                          style={{
                            padding: "1rem",
                            textAlign: "left",
                            color: "#1f2937",
                            width: "25%",
                          }}
                        >
                          Industry
                        </th>
                        <th
                          style={{
                            padding: "1rem",
                            textAlign: "left",
                            color: "#1f2937",
                            width: "20%",
                          }}
                        >
                          Status
                        </th>
                        <th
                          style={{
                            padding: "1rem",
                            textAlign: "left",
                            color: "#1f2937",
                            width: "30%",
                          }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {companies
                        .filter(
                          (company) =>
                            company.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) &&
                            (industryFilter
                              ? company.industry === industryFilter
                              : true)
                        )
                        .map((company) => (
                          <tr
                            key={company.id}
                            style={{
                              background: "none",
                              transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "#f9fafb")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            <td
                              style={{
                                padding: "1rem",
                                borderBottom: "1px solid #e5e7eb",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {company.name}
                            </td>
                            <td
                              style={{
                                padding: "1rem",
                                borderBottom: "1px solid #e5e7eb",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {company.industry}
                            </td>
                            <td
                              style={{
                                padding: "1rem",
                                borderBottom: "1px solid #e5e7eb",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <span
                                style={{
                                  padding: "0.25rem 0.5rem",
                                  borderRadius: "9999px",
                                  fontSize: "0.75rem",
                                  ...(company.status === "Accepted"
                                    ? {
                                        background: "#d1fae5",
                                        color: "#065f46",
                                      }
                                    : company.status === "Rejected"
                                    ? {
                                        background: "#fee2e2",
                                        color: "#991b1b",
                                      }
                                    : {
                                        background: "#fefcbf",
                                        color: "#975a16",
                                      }),
                                }}
                              >
                                {company.status}
                              </span>
                            </td>
                            <td
                              style={{
                                padding: "1rem",
                                borderBottom: "1px solid #e5e7eb",
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "center",
                                minWidth: "0",
                              }}
                            >
                              <button
                                className="actionButton"
                                onClick={() => openModal("companies", company)}
                              >
                                View Details
                              </button>
                              {company.status === "Pending" && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleCompanyAction(company.id, "accept")
                                    }
                                    style={{
                                      padding: "0.5rem 0.75rem",
                                      background: "#10b981",
                                      color: "#fff",
                                      border: "none",
                                      borderRadius: "0.375rem",
                                      cursor: "pointer",
                                      transition: "background-color 0.3s ease",
                                      whiteSpace: "nowrap",
                                      minWidth: "5rem",
                                      textAlign: "center",
                                    }}
                                    onMouseOver={(e) =>
                                      (e.target.style.background = "#059669")
                                    }
                                    onMouseOut={(e) =>
                                      (e.target.style.background = "#10b981")
                                    }
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleCompanyAction(company.id, "reject")
                                    }
                                    style={{
                                      padding: "0.5rem 0.75rem",
                                      background: "#ef4444",
                                      color: "#fff",
                                      border: "none",
                                      borderRadius: "0.375rem",
                                      cursor: "pointer",
                                      transition: "background-color 0.3s ease",
                                      whiteSpace: "nowrap",
                                      minWidth: "5rem",
                                      textAlign: "center",
                                    }}
                                    onMouseOver={(e) =>
                                      (e.target.style.background = "#dc2626")
                                    }
                                    onMouseOut={(e) =>
                                      (e.target.style.background = "#ef4444")
                                    }
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
      case "students":
        return (
          <div className="container" style={{ animation: "fadeIn 0.3s" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",
              }}
            >
              Manage Students
            </h2>
            <div
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  position: "relative",
                  flex: "1 1 20rem",
                  minWidth: "15rem",
                }}
              >
                <Search
                  style={{
                    position: "absolute",
                    left: "0.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search by student name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="headerBtn"
                  style={{
                    padding: "0.4rem 0.4rem 0.4rem 2rem",
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    outline: "none",
                    boxSizing: "border-box",
                    fontSize: "0.875rem",
                  }}
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 0 2px #3b82f6")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="headerBtn"
                style={{
                  padding: "0.4rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  outline: "none",
                  minWidth: "12rem",
                  width: "12rem",
                  fontSize: "0.875rem",
                }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #3b82f6")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <select
                value={majorFilter}
                onChange={(e) => setMajorFilter(e.target.value)}
                className="headerBtn"
                style={{
                  padding: "0.4rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  outline: "none",
                  minWidth: "12rem",
                  width: "12rem",
                  fontSize: "0.875rem",
                }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #3b82f6")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              >
                <option value="">All Majors</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
            {filteredStudents.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem" }}>
                <p style={{ color: "#6b7280" }}>
                  No students match your search criteria.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", // Two cards per row
                  gap: "20px",
                  padding: "10px",
                  maxWidth: "1600px",
                  margin: "0 auto",
                }}
              >
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    style={{
                      maxWidth: "320px", // Wider card
                      background: "white",
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      padding: "20px",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      Object.assign(e.currentTarget.style, {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                      })
                    }
                    onMouseOut={(e) =>
                      Object.assign(e.currentTarget.style, {
                        transform: "translateY(0)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      })
                    }
                  >
                    <div className="card-header">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <img
                          src={student.avatar}
                          alt={student.name}
                          style={{
                            width: "4rem", // Slightly larger for wider card
                            height: "4rem",
                            borderRadius: "9999px",
                            marginRight: "1rem",
                          }}
                        />
                        <div>
                          <h3
                            className="program-title"
                            style={{ fontSize: "1.1rem" }}
                          >
                            {student.name}
                          </h3>
                          <p
                            className="company-info"
                            style={{ color: "#636e72", fontSize: "0.85rem" }}
                          >
                            {student.major}
                          </p>
                        </div>
                      </div>
                      <div style={{ marginBottom: "0.75rem" }}>
                        <span
                          className="status"
                          style={{
                            padding: "0.25rem 0.5rem",
                            borderRadius: "9999px",
                            fontSize: "0.7rem",
                            ...(student.internshipStatus === "Active"
                              ? { background: "#d1fae5", color: "#065f46" }
                              : student.internshipStatus === "Completed"
                              ? { background: "#dbeafe", color: "#1e40af" }
                              : { background: "#fefcbf", color: "#975a16" }),
                          }}
                        >
                          {student.internshipStatus}
                        </span>
                      </div>
                    </div>
                    <p
                      className="company-info"
                      style={{ color: "#4b5563", fontSize: "0.8rem" }}
                    >
                      {student.details || "No additional details provided"}
                    </p>
                    <button
                      onClick={() => openModal("profile", student)}
                      style={{
                        marginTop: "0.75rem",
                        width: "40%",
                        backgroundColor: "#2a9d8f",
                        color: "#fff",
                        padding: "0.5rem 1rem",
                        border: "none",
                        borderRadius: "0.375rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "0.875rem",
                        transition: "all 0.4s ease",
                      }}
                      onMouseOver={(e) =>
                        Object.assign(e.currentTarget.style, {
                          backgroundColor: "#30b3a3",
                          transform: "scale(1.02)",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        })
                      }
                      onMouseOut={(e) =>
                        Object.assign(e.currentTarget.style, {
                          backgroundColor: "#2a9d8f",
                          transform: "scale(1)",
                          boxShadow: "none",
                        })
                      }
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "profile":
        const currentStudent =
          filteredStudents.find((student) => student.id === selectedItem.id) ||
          selectedItem;

        return (
          <div style={{ animation: "fadeIn 0.3s", padding: "1.5rem" }}>
            <div
              style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "0.375rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                maxWidth: "40rem",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
                <img
                  src={currentStudent.avatar}
                  alt={currentStudent.name}
                  style={{
                    width: "10rem",
                    height: "10rem",
                    borderRadius: "9999px",
                    marginBottom: "1rem",
                  }}
                />

                <h3
                  style={{
                    fontWeight: "bold",
                    color: "#1f2937",
                    marginBottom: "0.5rem",
                  }}
                >
                  {currentStudent.name}
                </h3>
                <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                  <ProfileItem
                    label="Semester"
                    value={currentStudent.semester}
                  />
                  <ProfileItem label="Major" value={currentStudent.major} />
                </div>
              </div>

              <div style={{ display: "grid", gap: "1rem" }}>
                <ProfileItem label="Email" value={currentStudent.email} />
                <ProfileItem
                  label="Job Interests"
                  value={currentStudent.jobInterests}
                />
                <ProfileItem
                  label="Previous Internships"
                  value={currentStudent.previousInternships}
                />
                <h3
                  style={{
                    fontWeight: "bold",
                    color: "#1f2937",
                    marginTop: "1rem",
                  }}
                >
                  Applied Internships
                </h3>
                <div style={{ marginTop: "0.5rem" }}>
                  {currentStudent.appliedInternships &&
                  currentStudent.appliedInternships.length > 0 ? (
                    currentStudent.appliedInternships.map(
                      (internship, index) => (
                        <div key={index} style={{ marginBottom: "0.75rem" }}>
                          <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>
                            <strong>Company:</strong> {internship.companyName} -{" "}
                            <strong>Job Title:</strong> {internship.jobTitle}
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                      No applied internships yet.
                    </p>
                  )}
                </div>
              </div>

              {/* Close Button Container */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "2rem",
                }}
              >
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    background: "#1f2937",
                    color: "#fff",
                    padding: "0.5rem 1.25rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#111827")}
                  onMouseOut={(e) => (e.target.style.background = "#1f2937")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );

      case "reports":
        return (
          <div style={{ animation: "fadeIn 0.3s" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",
              }}
            >
              Manage Reports
            </h2>
            <div
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  position: "relative",
                  flex: "1 1 20rem",
                  minWidth: "15rem",
                }}
              >
                <Search
                  style={{
                    position: "absolute",
                    left: "0.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search by student name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: "0.4rem 0.4rem 0.4rem 2rem",
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    outline: "none",
                    boxSizing: "border-box",
                    fontSize: "0.875rem",
                  }}
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 0 2px #3b82f6")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>
              <div style={{ flex: "0 0 auto" }}>
                <select
                  value={majorFilter}
                  onChange={(e) => setMajorFilter(e.target.value)}
                  style={{
                    padding: "0.4rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    outline: "none",
                    minWidth: "12rem",
                    width: "12rem",
                    maxWidth: "12rem",
                    fontSize: "0.875rem",
                  }}
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 0 2px #3b82f6")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                >
                  <option value="">All Majors</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>
              <div style={{ flex: "0 0 auto" }}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: "0.4rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    outline: "none",
                    minWidth: "12rem",
                    width: "12rem",
                    maxWidth: "12rem",
                    fontSize: "0.875rem",
                  }}
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 0 2px #3b82f6")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Flagged">Flagged</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Accepted">Accepted</option>
                </select>
              </div>
            </div>
            {filteredReports.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem" }}>
                <p style={{ color: "#6b7280" }}>
                  No reports match your search criteria.
                </p>
              </div>
            ) : (
              <div
                style={{
                  background: "#fff",
                  borderRadius: "0.375rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f3f4f6" }}>
                        <th
                          style={{
                            padding: "1rem",
                            textAlign: "left",
                            color: "#1f2937",
                          }}
                        >
                          Student
                        </th>
                        <th
                          style={{
                            padding: "1rem",
                            textAlign: "left",
                            color: "#1f2937",
                          }}
                        >
                          Company
                        </th>
                        <th
                          style={{
                            padding: "1rem",
                            textAlign: "left",
                            color: "#1f2937",
                          }}
                        >
                          Major
                        </th>
                        <th
                          style={{
                            padding: "1rem",
                            textAlign: "left",
                            color: "#1f2937",
                          }}
                        >
                          Status
                        </th>
                        <th
                          style={{
                            padding: "1rem",
                            textAlign: "left",
                            color: "#1f2937",
                          }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.map((report) => (
                        <tr
                          key={report.id}
                          style={{
                            background: "none",
                            transition: "background-color 0.3s",
                          }}
                        >
                          <td
                            style={{
                              padding: "1rem",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            {report.student}
                          </td>
                          <td
                            style={{
                              padding: "1rem",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            {report.company}
                          </td>
                          <td
                            style={{
                              padding: "1rem",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            {report.major}
                          </td>
                          <td
                            style={{
                              padding: "1rem",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            <span
                              style={{
                                padding: "0.25rem 0.5rem",
                                borderRadius: "9999px",
                                fontSize: "0.75rem",
                                ...(report.status === "Accepted"
                                  ? { background: "#d1fae5", color: "#065f46" }
                                  : report.status === "Rejected"
                                  ? { background: "#fee2e2", color: "#991b1b" }
                                  : report.status === "Flagged"
                                  ? { background: "#fefcbf", color: "#975a16" }
                                  : {
                                      background: "#dbeafe",
                                      color: "#1e40af",
                                    }),
                              }}
                            >
                              {report.status}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: "1rem",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button
                                className="actionButton"
                                onClick={() => openModal("report", report)}
                              >
                                View Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );

      case "statistics":
        return (
          <div
            style={{ maxWidth: "100%", animation: "fadeIn 0.3s" }}
            className={`container faculty-page ${
              sidebarWidth === "16rem" ? "sidebar-open" : ""
            }`}
          >
            <h2 className="title">Real-Time Statistics</h2>
            <div className="cardHolder">
              {/* Reports This Cycle */}
              <div className="card">
                <div className="card-header">
                  <h3 className="program-title">Reports This Cycle</h3>
                </div>
                <div className="reports-grid">
                  <div className="report-box accepted">
                    <p className="report-count">
                      {statistics.reportsPerCycle?.accepted || 0}
                    </p>
                    <p className="report-label">Accepted</p>
                  </div>
                  <div className="report-box rejected">
                    <p className="report-count">
                      {statistics.reportsPerCycle?.rejected || 0}
                    </p>
                    <p className="report-label">Rejected</p>
                  </div>
                  <div className="report-box flagged">
                    <p className="report-count">
                      {statistics.reportsPerCycle?.flagged || 0}
                    </p>
                    <p className="report-label">Flagged</p>
                  </div>
                  <div className="report-box pending">
                    <p className="report-count">
                      {statistics.reportsPerCycle?.pending || 0}
                    </p>
                    <p className="report-label">Pending</p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="card">
                <div className="card-header">
                  <h3 className="program-title">Performance Metrics</h3>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Average Review Time:</span>
                  <span className="metric-value">
                    {statistics.averageReviewTime || "N/A"}
                  </span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                {statistics.performanceMetrics && (
                  <>
                    <div className="metric-row">
                      <span className="metric-label">Faculty Average:</span>
                      <span className="metric-value">
                        {statistics.performanceMetrics.facultyAverage || "N/A"}
                      </span>
                    </div>
                    <div className="metric-row">
                      <span className="metric-label">Department Average:</span>
                      <span className="metric-value">
                        {statistics.performanceMetrics.departmentAverage ||
                          "N/A"}
                      </span>
                    </div>
                    <div className="metric-row">
                      <span className="metric-label">University Average:</span>
                      <span className="metric-value">
                        {statistics.performanceMetrics.universityAverage ||
                          "N/A"}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Popular Courses */}
              <div className="card">
                <div className="card-header">
                  <h3 className="program-title">Popular Courses</h3>
                </div>
                <ul className="list">
                  {(statistics.popularCourses || []).map((course, index) => (
                    <li key={index} className="list-item">
                      <span className="list-bullet"></span>
                      <span>
                        {typeof course === "string" ? course : course.name}{" "}
                        (Reports:{" "}
                        {typeof course === "string"
                          ? "N/A"
                          : course.reports || 0}
                        )
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Rated Companies */}
              <div className="card">
                <div className="card-header">
                  <h3 className="program-title">Top Rated Companies</h3>
                </div>
                <ul className="list">
                  {(statistics.topCompanies || []).map((company, index) => (
                    <li key={index} className="list-item">
                      <span
                        className="list-bullet"
                        style={{
                          background: index === 0 ? "#10b981" : "#2a9d8f",
                        }}
                      ></span>
                      <span>
                        {typeof company === "string"
                          ? company
                          : company.name || "N/A"}{" "}
                        (Rating:{" "}
                        {typeof company === "string"
                          ? "N/A"
                          : company.rating || 0}
                        , Reports:{" "}
                        {typeof company === "string"
                          ? "N/A"
                          : company.reports || 0}
                        )
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Internship Count by Company */}
              <div className="card">
                <div className="card-header">
                  <h3 className="program-title">Internship Count by Company</h3>
                </div>
                {statistics.internshipCount &&
                  Object.entries(statistics.internshipCount).map(
                    ([company, count], index) => (
                      <div key={index} className="company-row">
                        <div className="company-info">
                          <span className="company-name">{company}</span>
                          <span className="company-count">{count}</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${(count / 6) * 100}%` }} // 6 is the max count in internshipCount
                          ></div>
                        </div>
                      </div>
                    )
                  )}
              </div>

              {/* Student Distribution by Major */}
              <div className="card">
                <div className="card-header">
                  <h3 className="program-title">
                    Student Distribution by Major
                  </h3>
                </div>
                {statistics.studentStatsByMajor &&
                  Object.entries(statistics.studentStatsByMajor).map(
                    ([major, count], index) => (
                      <div key={index} className="company-row">
                        <div className="company-info">
                          <span className="company-name">{major}</span>
                          <span className="company-count">{count}</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${(count / 45) * 100}%`, // 45 is the max count in studentStatsByMajor
                              background:
                                index % 4 === 0
                                  ? "#3b82f6"
                                  : index % 4 === 1
                                  ? "#10b981"
                                  : index % 4 === 2
                                  ? "#a855f7"
                                  : "#f59e0b",
                            }}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>

            {/* Generate Report Button */}
            <div className="report-button-container">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => generateStatisticsReport(statistics)}
                  className="actionButton"
                >
                  <Download size={18} style={{ marginRight: "0.5rem" }} />
                  Generate Comprehensive Report
                </button>
              </div>

              <p className="report-description">
                This will generate a PDF with all current statistics.
              </p>
            </div>
          </div>
        );
      case "video-calls":
        return (
          <div style={{ animation: "fadeIn 0.3s" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",
              }}
            >
              Video Call
            </h2>
            {callStatus === "ongoing" ? (
              <div
                style={{
                  background: "#fff",
                  padding: "1.5rem",
                  borderRadius: "0.375rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "16rem",
                      background: "#e5e7eb",
                      borderRadius: "0.375rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <p style={{ color: "#6b7280" }}>Video Feed (Simulated)</p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      style={{
                        padding: "0.75rem",
                        borderRadius: "9999px",
                        background: isMuted ? "#ef4444" : "#4b5563",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.background = isMuted
                          ? "#dc2626"
                          : "#374151")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.background = isMuted
                          ? "#ef4444"
                          : "#4b5563")
                      }
                    >
                      {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>
                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      style={{
                        padding: "0.75rem",
                        borderRadius: "9999px",
                        background: isVideoOn ? "#4b5563" : "#ef4444",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.background = isVideoOn
                          ? "#374151"
                          : "#dc2626")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.background = isVideoOn
                          ? "#4b5563"
                          : "#ef4444")
                      }
                    >
                      {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
                    </button>
                    <button
                      onClick={() => setIsScreenSharing(!isScreenSharing)}
                      style={{
                        padding: "0.75rem",
                        borderRadius: "9999px",
                        background: isScreenSharing ? "#3b82f6" : "#4b5563",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.background = isScreenSharing
                          ? "#2563eb"
                          : "#374151")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.background = isScreenSharing
                          ? "#3b82f6"
                          : "#4b5563")
                      }
                    >
                      <Monitor size={24} />
                    </button>
                    <button
                      onClick={() => handleCallAction("leave")}
                      style={{
                        padding: "0.75rem",
                        borderRadius: "9999px",
                        background: "#ef4444",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.background = "#dc2626")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.background = "#ef4444")
                      }
                    >
                      <PhoneOff size={24} />
                    </button>
                  </div>
                </div>
                <p style={{ color: "#1f2937", textAlign: "center" }}>
                  Call with Alice Johnson
                </p>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "3rem" }}>
                <p style={{ color: "#6b7280" }}>
                  No active call. Start a call from the student profile.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f3f4f6" }}>
      {/* Sidebar */}
      {/* Sidebar */}
      <SideBar
        setActivePage={setActivePage}
        activePage={activePage}
        onWidthChange={setSidebarWidth}
      />
      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header edited */}
        <Header toggleSidebar={toggleSidebar} />
        {/* Notification Panel */}
        {showNotifications && (
          <div
            style={{
              position: "absolute",
              top: "4rem",
              right: "1rem",
              width: "20rem",
              background: "#fff",
              borderRadius: "0.375rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 50,
            }}
          >
            <div style={{ padding: "1rem", borderBottom: "1px solid #e5e7eb" }}>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                Notifications
              </h3>
            </div>
            <div style={{ maxHeight: "24rem", overflowY: "auto" }}>
              {notifications.length === 0 ? (
                <p
                  style={{
                    padding: "1rem",
                    color: "#6b7280",
                    textAlign: "center",
                  }}
                >
                  No notifications
                </p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    style={{
                      padding: "1rem",
                      borderBottom: "1px solid #e5e7eb",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#f3f4f6")}
                    onMouseOut={(e) => (e.target.style.background = "none")}
                  >
                    <p style={{ color: "#4b5563" }}>{notification.message}</p>
                    <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                      {notification.time}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div style={{ padding: "1rem", borderTop: "1px solid #e5e7eb" }}>
              <button
                onClick={() => setShowNotifications(false)}
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "#3b82f6",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.color = "#2563eb")}
                onMouseOut={(e) => (e.target.style.color = "#3b82f6")}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main
          style={{
            flex: 1,
            padding: "1.5rem",
            overflowY: "auto",
            marginTop: "4rem", // Account for the header height
          }}
        >
          {renderContent()}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
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
          {renderModalContent()}
        </div>
      )}
    </div>
  );
}

// Animation keyframes
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
