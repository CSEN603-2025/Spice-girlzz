import { useState, useEffect } from "react";

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
    email: "alaa.abdelnaser@guc.edu.eg",
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
    avatar: "/api/placeholder/40/40",
    email: "mennatullah.elsabagh@guc.edu.eg",
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
    email: "esraa.ahmed@guc.edu.eg",
    jobInterests: "Web Development",
    previousInternships: "MediHealth (2024)",
    appliedInternships: [
      { companyName: "MediHealth", jobTitle: "Data Analyst Intern" },
    ],
  },
  {
    id: 4,
    name: "Malak Hisham",
    internshipStatus: "Active",
    major: "Data Science",
    semester: "Semester 5",
    avatar: "/api/placeholder/40/40",
    email: "malak.hisham@guc.edu.eg",
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
    email: "mennatullah.shaaban@guc.edu.eg",
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
  reportsPerCycle: { accepted: 10, rejected: 3, flagged: 2 },
  averageReviewTime: "2 days",
  popularCourses: ["CS101", "ENG202", "DS100", "CS301"],
  topCompanies: [
    "TechCorp (Rating: 4.8)",
    "MediHealth (Rating: 4.5)",
    "FinTech Solutions (Rating: 4.3)",
  ],
  internshipCount: {
    TechCorp: 5,
    MediHealth: 3,
    GreenEnergy: 2,
    FinTech: 4,
    EduLearn: 2,
  },
  studentStatsByMajor: {
    "Computer Science": 45,
    Engineering: 38,
    "Data Science": 23,
    Business: 18,
    Design: 12,
  },
};

export default function SCADStaffDashboard() {
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
                  }}
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 0 2px #3b82f6")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>
              <div style={{ flex: "0 0 auto" }}>
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
                    maxWidth: "12rem",
                    fontSize: "0.875rem",
                  }}
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 0 2px #3b82f6")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                >
                  <option value="">All Industries</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Energy">Energy</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
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
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            {filteredCompanies.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem" }}>
                <p style={{ color: "#6b7280" }}>
                  No companies match your search criteria.
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
                          Name
                        </th>
                        <th
                          style={{
                            padding: "1rem",
                            textAlign: "left",
                            color: "#1f2937",
                          }}
                        >
                          Industry
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
                      {filteredCompanies.map((company) => (
                        <tr
                          key={company.id}
                          style={{
                            background: "none",
                            transition: "background-color 0.3s",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.background = "#f9fafb")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.background = "none")
                          }
                        >
                          <td
                            style={{
                              padding: "1rem",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            {company.name}
                          </td>
                          <td
                            style={{
                              padding: "1rem",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            {company.industry}
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
                                ...(company.status === "Accepted"
                                  ? { background: "#d1fae5", color: "#065f46" }
                                  : company.status === "Rejected"
                                  ? { background: "#fee2e2", color: "#991b1b" }
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
                            }}
                          >
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button
                                onClick={() => openModal("companies", company)}
                                style={{ color: "#3b82f6", cursor: "pointer" }}
                                onMouseOver={(e) =>
                                  (e.target.style.color = "#2563eb")
                                }
                                onMouseOut={(e) =>
                                  (e.target.style.color = "#3b82f6")
                                }
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
                                      color: "#10b981",
                                      cursor: "pointer",
                                    }}
                                    onMouseOver={(e) =>
                                      (e.target.style.color = "#059669")
                                    }
                                    onMouseOut={(e) =>
                                      (e.target.style.color = "#10b981")
                                    }
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleCompanyAction(company.id, "reject")
                                    }
                                    style={{
                                      color: "#ef4444",
                                      cursor: "pointer",
                                    }}
                                    onMouseOver={(e) =>
                                      (e.target.style.color = "#dc2626")
                                    }
                                    onMouseOut={(e) =>
                                      (e.target.style.color = "#ef4444")
                                    }
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              <button
                                style={{
                                  color: "#6b7280",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                onMouseOver={(e) =>
                                  (e.target.style.color = "#4b5563")
                                }
                                onMouseOut={(e) =>
                                  (e.target.style.color = "#6b7280")
                                }
                              >
                                <Download
                                  size={16}
                                  style={{ marginRight: "0.25rem" }}
                                />{" "}
                                PDF
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

      case "students":
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
                  gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    style={{
                      background: "#fff",
                      padding: "1rem",
                      borderRadius: "0.375rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "box-shadow 0.3s",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.boxShadow =
                        "0 4px 6px rgba(0, 0, 0, 0.1)")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.boxShadow =
                        "0 2px 4px rgba(0, 0, 0, 0.1)")
                    }
                    onClick={() => openModal("profile", student)}
                  >
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
                          width: "5rem",
                          height: "5rem",
                          borderRadius: "9999px",
                          marginRight: "1rem",
                        }}
                      />
                      <div>
                        <h3 style={{ fontWeight: "bold", color: "#1f2937" }}>
                          {student.name}
                        </h3>
                        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                          {student.major}
                        </p>
                      </div>
                    </div>
                    <div style={{ marginBottom: "0.75rem" }}>
                      <span
                        style={{
                          padding: "0.25rem 0.5rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
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
                    <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>
                      {student.profile}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "profile":
        return (
          <div style={{ animation: "fadeIn 0.3s", padding: "1.5rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",
              }}
            >
              Student Profile: {selectedItem.name}
            </h2>
            <div
              style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "0.375rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "40rem", // Fixed width for consistency
                margin: "0 auto", // Center the container
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <img
                  src={selectedItem.avatar}
                  alt={selectedItem.name}
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
                  {selectedItem.name}
                </h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                  {selectedItem.major} - {selectedItem.semester}
                </p>
              </div>
              <div style={{ display: "grid", gap: "1rem" }}>
                <ProfileItem label="Email" value={selectedItem.email} />
                <ProfileItem
                  label="Job Interests"
                  value={selectedItem.jobInterests}
                />
                <ProfileItem
                  label="Previous Internships"
                  value={selectedItem.previousInternships}
                />
                <ProfileItem label="Major" value={selectedItem.major} />
              </div>

              <button
                onClick={() => setShowModal(false)}
                style={{
                  marginTop: "1.5rem",
                  paddingLeft: "2000rem",
                  padding: "0.5rem 1rem",
                  background: "#4E4F50",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.background = "#746C70")}
                onMouseOut={(e) => (e.target.style.background = "#4E4F50")}
              >
                Close
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
            >
              <button
                onClick={() => {
                  handleReportStatusChange(selectedItem.id, "flagged");
                  closeModal();
                }}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#f59e0b",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.background = "#d97706")}
                onMouseOut={(e) => (e.target.style.background = "#f59e0b")}
              >
                <Flag size={16} style={{ marginRight: "0.5rem" }} /> Flag
              </button>
              <button
                onClick={() => {
                  handleReportStatusChange(selectedItem.id, "rejected");
                  closeModal();
                }}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#ef4444",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.background = "#dc2626")}
                onMouseOut={(e) => (e.target.style.background = "#ef4444")}
              >
                <X size={16} style={{ marginRight: "0.5rem" }} /> Reject
              </button>
              <button
                onClick={() => {
                  handleReportStatusChange(selectedItem.id, "accepted");
                  closeModal();
                }}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#10b981",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.background = "#059669")}
                onMouseOut={(e) => (e.target.style.background = "#10b981")}
              >
                <Check size={16} style={{ marginRight: "0.5rem" }} /> Accept
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
              Set Internship Cycle
            </h2>
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
                  flexWrap: "wrap",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ flex: "0 0 auto" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                      color: "#1f2937",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Start Date
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
                  />
                </div>
                <div style={{ flex: "0 0 auto" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                      color: "#1f2937",
                      marginBottom: "0.5rem",
                    }}
                  >
                    End Date
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
                  />
                </div>
              </div>
              {(startDateFilter || endDateFilter) && (
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    background: "#f3f4f6",
                    borderRadius: "0.375rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#1f2937",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Current Cycle
                  </h3>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>
                    <strong>Start:</strong> {startDateFilter || "Not set"}
                  </p>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>
                    <strong>End:</strong> {endDateFilter || "Not set"}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      case "companies":
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
                  }}
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 0 2px #3b82f6")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>
              <div style={{ flex: "0 0 auto" }}>
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
                    maxWidth: "12rem",
                    fontSize: "0.875rem",
                  }}
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 0 2px #3b82f6")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                >
                  <option value="">All Industries</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Energy">Energy</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
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
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            {filteredCompanies.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem" }}>
                <p style={{ color: "#6b7280" }}>
                  No companies match your search criteria.
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
                          Name
                        </th>
                        <th
                          style={{
                            padding: "1rem",
                            textAlign: "left",
                            color: "#1f2937",
                          }}
                        >
                          Industry
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
                      {filteredCompanies.map((company) => (
                        <tr
                          key={company.id}
                          style={{
                            background: "none",
                            transition: "background-color 0.3s",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.background = "#f9fafb")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.background = "none")
                          }
                        >
                          <td
                            style={{
                              padding: "1rem",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            {company.name}
                          </td>
                          <td
                            style={{
                              padding: "1rem",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            {company.industry}
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
                                ...(company.status === "Accepted"
                                  ? { background: "#d1fae5", color: "#065f46" }
                                  : company.status === "Rejected"
                                  ? { background: "#fee2e2", color: "#991b1b" }
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
                            }}
                          >
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button
                                onClick={() => openModal("company", company)}
                                style={{ color: "#3b82f6", cursor: "pointer" }}
                                onMouseOver={(e) =>
                                  (e.target.style.color = "#2563eb")
                                }
                                onMouseOut={(e) =>
                                  (e.target.style.color = "#3b82f6")
                                }
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
                                      color: "#10b981",
                                      cursor: "pointer",
                                    }}
                                    onMouseOver={(e) =>
                                      (e.target.style.color = "#059669")
                                    }
                                    onMouseOut={(e) =>
                                      (e.target.style.color = "#10b981")
                                    }
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleCompanyAction(company.id, "reject")
                                    }
                                    style={{
                                      color: "#ef4444",
                                      cursor: "pointer",
                                    }}
                                    onMouseOver={(e) =>
                                      (e.target.style.color = "#dc2626")
                                    }
                                    onMouseOut={(e) =>
                                      (e.target.style.color = "#ef4444")
                                    }
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              <button
                                style={{
                                  color: "#6b7280",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                onMouseOver={(e) =>
                                  (e.target.style.color = "#4b5563")
                                }
                                onMouseOut={(e) =>
                                  (e.target.style.color = "#6b7280")
                                }
                              >
                                <Download
                                  size={16}
                                  style={{ marginRight: "0.25rem" }}
                                />{" "}
                                PDF
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
      case "students":
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
                  gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    style={{
                      background: "#fff",
                      padding: "1rem",
                      borderRadius: "0.375rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                    }}
                    onClick={() => openModal("profile", student)}
                  >
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
                          width: "5rem",
                          height: "5rem",
                          borderRadius: "9999px",
                          marginRight: "1rem",
                        }}
                      />
                      <div>
                        <h3 style={{ fontWeight: "bold", color: "#1f2937" }}>
                          {student.name}
                        </h3>
                        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                          {student.major}
                        </p>
                      </div>
                    </div>
                    <div style={{ marginBottom: "0.75rem" }}>
                      <span
                        style={{
                          padding: "0.25rem 0.5rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
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
                    <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>
                      {student.profile}
                    </p>
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
                          onMouseOver={(e) =>
                            (e.target.style.background = "#f9fafb")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.background = "none")
                          }
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
                                onClick={() => openModal("report", report)}
                                style={{ color: "#3b82f6", cursor: "pointer" }}
                                onMouseOver={(e) =>
                                  (e.target.style.color = "#2563eb")
                                }
                                onMouseOut={(e) =>
                                  (e.target.style.color = "#3b82f6")
                                }
                              >
                                View Details
                              </button>
                              {report.status === "Pending" && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleReportStatusChange(
                                        report.id,
                                        "flagged"
                                      )
                                    }
                                    style={{
                                      color: "#f59e0b",
                                      cursor: "pointer",
                                    }}
                                    onMouseOver={(e) =>
                                      (e.target.style.color = "#d97706")
                                    }
                                    onMouseOut={(e) =>
                                      (e.target.style.color = "#f59e0b")
                                    }
                                  >
                                    Flag
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleReportStatusChange(
                                        report.id,
                                        "rejected"
                                      )
                                    }
                                    style={{
                                      color: "#ef4444",
                                      cursor: "pointer",
                                    }}
                                    onMouseOver={(e) =>
                                      (e.target.style.color = "#dc2626")
                                    }
                                    onMouseOut={(e) =>
                                      (e.target.style.color = "#ef4444")
                                    }
                                  >
                                    Reject
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleReportStatusChange(
                                        report.id,
                                        "accepted"
                                      )
                                    }
                                    style={{
                                      color: "#10b981",
                                      cursor: "pointer",
                                    }}
                                    onMouseOver={(e) =>
                                      (e.target.style.color = "#059669")
                                    }
                                    onMouseOut={(e) =>
                                      (e.target.style.color = "#10b981")
                                    }
                                  >
                                    Accept
                                  </button>
                                </>
                              )}
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
          <div style={{ animation: "fadeIn 0.3s" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",
              }}
            >
              Real-Time Statistics
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
                gap: "1.5rem",
              }}
            >
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
                  Reports This Cycle
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "0.3rem",
                    padding: "0 0.25rem",
                  }}
                >
                  <div
                    style={{
                      background: "#d1fae5",
                      borderRadius: "0.375rem",
                      padding: "0.75rem",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#065f46",
                      }}
                    >
                      {statistics.reportsPerCycle.accepted}
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "#065f46" }}>
                      Accepted
                    </p>
                  </div>
                  <div
                    style={{
                      background: "#fee2e2",
                      borderRadius: "0.375rem",
                      padding: "0.75rem",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#991b1b",
                      }}
                    >
                      {statistics.reportsPerCycle.rejected}
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "#991b1b" }}>
                      Rejected
                    </p>
                  </div>
                  <div
                    style={{
                      background: "#fefcbf",
                      borderRadius: "0.375rem",
                      padding: "0.75rem",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#975a16",
                      }}
                    >
                      {statistics.reportsPerCycle.flagged}
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "#975a16" }}>
                      Flagged
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "1.7rem",
                  borderRadius: "0.375rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontWeight: "bold",
                    color: "#1f2937",
                    marginBottom: "0.75rem",
                  }}
                >
                  Performance Metrics
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#6b7280" }}>
                      Average Review Time:
                    </span>
                    <span style={{ fontWeight: "bold", color: "#3b82f6" }}>
                      {statistics.averageReviewTime}
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      background: "#e5e7eb",
                      borderRadius: "9999px",
                      height: "0.625rem",
                    }}
                  >
                    <div
                      style={{
                        background: "#3b82f6",
                        height: "0.625rem",
                        borderRadius: "9999px",
                        width: "70%",
                      }}
                    ></div>
                  </div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      marginTop: "0.25rem",
                    }}
                  >
                    70% faster than last cycle
                  </p>
                </div>
              </div>
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
                    fontWeight: "bold",
                    color: "#1f2937",
                    marginBottom: "0.75rem",
                  }}
                >
                  Popular Courses
                </h3>
                <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
                  {statistics.popularCourses.map((course, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          width: "0.5rem",
                          height: "0.5rem",
                          background: "#3b82f6",
                          borderRadius: "50%",
                          marginRight: "0.5rem",
                        }}
                      ></span>
                      <span style={{ color: "#4b5563" }}>{course}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
                    fontWeight: "bold",
                    color: "#1f2937",
                    marginBottom: "0.75rem",
                  }}
                >
                  Top Rated Companies
                </h3>
                <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
                  {statistics.topCompanies.map((company, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          width: "0.5rem",
                          height: "0.5rem",
                          background:
                            index === 0
                              ? "#10b981"
                              : index === 1
                              ? "#3b82f6"
                              : "#a855f7",
                          borderRadius: "50%",
                          marginRight: "0.5rem",
                        }}
                      ></span>
                      <span style={{ color: "#4b5563" }}>{company}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
                    fontWeight: "bold",
                    color: "#1f2937",
                    marginBottom: "0.75rem",
                  }}
                >
                  Internship Count by Company
                </h3>
                <div style={{ gap: "0.5rem" }}>
                  {Object.entries(statistics.internshipCount).map(
                    ([company, count], index) => (
                      <div key={index}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "0.25rem",
                          }}
                        >
                          <span style={{ color: "#4b5563" }}>{company}</span>
                          <span
                            style={{ color: "#4b5563", fontWeight: "bold" }}
                          >
                            {count}
                          </span>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            background: "#e5e7eb",
                            borderRadius: "9999px",
                            height: "0.5rem",
                          }}
                        >
                          <div
                            style={{
                              background: "#3b82f6",
                              height: "0.5rem",
                              borderRadius: "9999px",
                              width: `${(count / 5) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
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
                    fontWeight: "bold",
                    color: "#1f2937",
                    marginBottom: "0.75rem",
                  }}
                >
                  Student Distribution by Major
                </h3>
                <div style={{ gap: "0.5rem" }}>
                  {Object.entries(statistics.studentStatsByMajor).map(
                    ([major, count], index) => (
                      <div key={index}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "0.25rem",
                          }}
                        >
                          <span style={{ color: "#4b5563" }}>{major}</span>
                          <span
                            style={{ color: "#4b5563", fontWeight: "bold" }}
                          >
                            {count}
                          </span>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            background: "#e5e7eb",
                            borderRadius: "9999px",
                            height: "0.5rem",
                          }}
                        >
                          <div
                            style={{
                              background:
                                index % 4 === 0
                                  ? "#3b82f6"
                                  : index % 4 === 1
                                  ? "#10b981"
                                  : index % 4 === 2
                                  ? "#a855f7"
                                  : "#f59e0b",
                              height: "0.5rem",
                              borderRadius: "9999px",
                              width: `${(count / 45) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
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
      <div
        style={{
          width: "16rem",
          background: "#fff",
          boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "1rem", borderBottom: "1px solid #e5e7eb" }}>
          <h1
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937" }}
          >
            SCAD Staff Dashboard
          </h1>
        </div>
        <nav style={{ flex: 1, padding: "1rem" }}>
          <ul
            style={{ listStyle: "none", padding: 0, margin: 0, gap: "0.5rem" }}
          >
            <li>
              <button
                onClick={() => setActivePage("cycle")}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  display: "flex",
                  alignItems: "center",
                  color: activePage === "cycle" ? "#2563eb" : "#4b5563",
                  background: activePage === "cycle" ? "#dbeafe" : "none",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background =
                    activePage === "cycle" ? "#dbeafe" : "#f3f4f6")
                }
                onMouseOut={(e) =>
                  (e.target.style.background =
                    activePage === "cycle" ? "#dbeafe" : "none")
                }
              >
                <User size={20} style={{ marginRight: "0.75rem" }} /> Cycle
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("statistics")}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  display: "flex",
                  alignItems: "center",
                  color: activePage === "statistics" ? "#2563eb" : "#4b5563",
                  background: activePage === "statistics" ? "#dbeafe" : "none",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background =
                    activePage === "statistics" ? "#dbeafe" : "#f3f4f6")
                }
                onMouseOut={(e) =>
                  (e.target.style.background =
                    activePage === "statistics" ? "#dbeafe" : "none")
                }
              >
                <User size={20} style={{ marginRight: "0.75rem" }} /> Statistics
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("companies")}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  display: "flex",
                  alignItems: "center",
                  color: activePage === "companies" ? "#2563eb" : "#4b5563",
                  background: activePage === "companies" ? "#dbeafe" : "none",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background =
                    activePage === "companies" ? "#dbeafe" : "#f3f4f6")
                }
                onMouseOut={(e) =>
                  (e.target.style.background =
                    activePage === "companies" ? "#dbeafe" : "none")
                }
              >
                <User size={20} style={{ marginRight: "0.75rem" }} /> Companies
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("students")}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  display: "flex",
                  alignItems: "center",
                  color: activePage === "students" ? "#2563eb" : "#4b5563",
                  background: activePage === "students" ? "#dbeafe" : "none",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background =
                    activePage === "students" ? "#dbeafe" : "#f3f4f6")
                }
                onMouseOut={(e) =>
                  (e.target.style.background =
                    activePage === "students" ? "#dbeafe" : "none")
                }
              >
                <User size={20} style={{ marginRight: "0.75rem" }} /> Students
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("reports")}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  display: "flex",
                  alignItems: "center",
                  color: activePage === "reports" ? "#2563eb" : "#4b5563",
                  background: activePage === "reports" ? "#dbeafe" : "none",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background =
                    activePage === "reports" ? "#dbeafe" : "#f3f4f6")
                }
                onMouseOut={(e) =>
                  (e.target.style.background =
                    activePage === "reports" ? "#dbeafe" : "none")
                }
              >
                <User size={20} style={{ marginRight: "0.75rem" }} /> Reports
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("video-calls")}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  display: "flex",
                  alignItems: "center",
                  color: activePage === "video-calls" ? "#2563eb" : "#4b5563",
                  background: activePage === "video-calls" ? "#dbeafe" : "none",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background =
                    activePage === "video-calls" ? "#dbeafe" : "#f3f4f6")
                }
                onMouseOut={(e) =>
                  (e.target.style.background =
                    activePage === "video-calls" ? "#dbeafe" : "none")
                }
              >
                <Phone size={20} style={{ marginRight: "0.75rem" }} /> Video
                Calls
              </button>
            </li>
          </ul>
        </nav>
        <div style={{ padding: "1rem", borderTop: "1px solid #e5e7eb" }}>
          <button
            style={{
              width: "100%",
              padding: "0.75rem",
              textAlign: "left",
              color: "#4b5563",
              borderRadius: "0.375rem",
              display: "flex",
              alignItems: "center",
            }}
            onMouseOver={(e) => (e.target.style.background = "#f3f4f6")}
            onMouseOut={(e) => (e.target.style.background = "none")}
          >
            <LogOut size={20} style={{ marginRight: "0.75rem" }} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#1f2937",
              }}
            >
              {activePage.charAt(0).toUpperCase() +
                activePage.slice(1).replace("-", " ")}
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                position: "relative",
                padding: "0.5rem",
                color: "#4b5563",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.color = "#1f2937")}
              onMouseOut={(e) => (e.target.style.color = "#4b5563")}
            >
              <Bell size={24} />
              {notifications.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "1rem",
                    height: "1rem",
                    background: "#ef4444",
                    color: "#fff",
                    fontSize: "0.75rem",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {notifications.length}
                </span>
              )}
            </button>
            <button
              style={{ padding: "0.5rem", color: "#4b5563", cursor: "pointer" }}
              onMouseOver={(e) => (e.target.style.color = "#1f2937")}
              onMouseOut={(e) => (e.target.style.color = "#4b5563")}
            >
              <Mail size={24} />
            </button>
            <button
              style={{ padding: "0.5rem", color: "#4b5563", cursor: "pointer" }}
              onMouseOver={(e) => (e.target.style.color = "#1f2937")}
              onMouseOut={(e) => (e.target.style.color = "#4b5563")}
            >
              <User size={24} />
            </button>
          </div>
        </header>

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
        <main style={{ flex: 1, padding: "1.5rem", overflowY: "auto" }}>
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
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
