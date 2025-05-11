import { useState, useEffect } from "react";
import { Bell, Flag, Check, X, Download, Search } from "lucide-react";
import { generateStatisticsReport } from "./pdfGenerator";

import FacultyLayout from './FacultyLayout';
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
    status: "Rejected",
    details: "Week 3 Report: Incomplete analysis.",
    company: "FinTech Solutions",
    supervisor: "Michael Chen",
    startDate: "2025-02-15",
    endDate: "2025-04-15",
  },
  {
    id: 5,
    student: "Emma Brown",
    major: "Engineering",
    status: "Pending",
    details: "Week 1 Report: Initial design phase.",
    company: "EduLearn",
    supervisor: "Sarah Johnson",
    startDate: "2025-03-01",
    endDate: "2025-05-01",
  },
];

const ProfileItem = ({ label, value }) => (
  <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
    <strong>{label}:</strong> {value || "Not provided"}
  </p>
);
const initialReport = {
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

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [majorFilter, setMajorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [reports, setReports] = useState(initialReports);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [clarification, setClarification] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
    const [report] = useState(initialReport);


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
        message: "New report submitted by Alice Johnson",
        time: "10 min ago",
      },
      { id: 2, message: "Report from Bob Smith flagged", time: "1 hour ago" },
    ];
    setNotifications(newNotifications);
  }, []);

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
    setNotifications([
      {
        id: Date.now(),
        message: `Report from ${report.student} marked as ${status}`,
        time: "Just now",
      },
      ...notifications,
    ]);
  };

  const submitClarification = (id) => {
    const report = reports.find((r) => r.id === id);
    setReports((prevReports) =>
      prevReports.map((r) =>
        r.id === id ? { ...r, comments: clarification } : r
      )
    );
    setNotifications([
      {
        id: Date.now(),
        message: `Clarification submitted for ${report.student}'s report`,
        time: "Just now",
      },
      ...notifications,
    ]);
    setClarification("");
    setShowModal(false);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setClarification("");
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
          />
        </div>
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
        >
          <option value="">All Majors</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Data Science">Data Science</option>
        </select>
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
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Flagged">Flagged</option>
          <option value="Rejected">Rejected</option>
          <option value="Accepted">Accepted</option>
        </select>
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
                  onMouseOut={(e) => (e.target.style.background = "none")}
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
                          : { background: "#dbeafe", color: "#1e40af" }),
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
                    <button
                      onClick={() => openModal(report)}
                      style={{ color: "#3b82f6", cursor: "pointer" }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
              notifications.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: "1rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <p style={{ color: "#4b5563" }}>{n.message}</p>
                  <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    {n.time}
                  </p>
                </div>
              ))
            )}
          </div>
          <div style={{ padding: "1rem", borderTop: "1px solid #e5e7eb" }}>
            <button
              onClick={() => setShowNotifications(false)}
              style={{ width: "100%", textAlign: "center", color: "#3b82f6" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
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
          <div style={{ animation: "fadeIn 0.3s", padding: "1.5rem" }}>
            <div
              style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                maxWidth: "20rem",
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
                <ProfileItem label="Major" value={selectedItem.major} />
                <ProfileItem label="Company" value={selectedItem.company} />
                <ProfileItem
                  label="Supervisor"
                  value={selectedItem.supervisor}
                />
                <ProfileItem
                  label="Period"
                  value={`${selectedItem.startDate} to ${selectedItem.endDate}`}
                />
                <ProfileItem label="Status" value={selectedItem.status} />
                <ProfileItem label="Details" value={selectedItem.details} />
                {selectedItem.comments && (
                  <ProfileItem label="Comments" value={selectedItem.comments} />
                )}
              </div>
              {selectedItem.status === "Pending" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                  }}
                >
                  <button
                    onClick={() =>
                      handleReportStatusChange(selectedItem.id, "flagged")
                    }
                    style={{
                      padding: "0.5rem",
                      background: "#f59e0b",
                      color: "#fff",
                      borderRadius: "0.25rem",
                      flex: 1,
                    }}
                  >
                    <Flag size={16} /> Flag
                  </button>
                  <button
                    onClick={() =>
                      handleReportStatusChange(selectedItem.id, "rejected")
                    }
                    style={{
                      padding: "0.5rem",
                      background: "#ef4444",
                      color: "#fff",
                      borderRadius: "0.25rem",
                      flex: 1,
                    }}
                  >
                    <X size={16} /> Reject
                  </button>
                  <button
                    onClick={() =>
                      handleReportStatusChange(selectedItem.id, "accepted")
                    }
                    style={{
                      padding: "0.5rem",
                      background: "#10b981",
                      color: "#fff",
                      borderRadius: "0.25rem",
                      flex: 1,
                    }}
                  >
                    <Check size={16} /> Accept
                  </button>
                </div>
              )}
              {(selectedItem.status === "Flagged" ||
                selectedItem.status === "Rejected") && (
                <div style={{ marginTop: "1rem" }}>
                  <textarea
                    value={clarification}
                    onChange={(e) => setClarification(e.target.value)}
                    placeholder="Enter clarification..."
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.25rem",
                      resize: "vertical",
                    }}
                  />
                  <button
                    onClick={() => submitClarification(selectedItem.id)}
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.5rem 1rem",
                      background: "#3b82f6",
                      color: "#fff",
                      borderRadius: "0.25rem",
                    }}
                  >
                    Submit
                  </button>
                </div>
              )}
              <button
                onClick={() => {
                  generateStatisticsReport(report)
                }}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  background: "#6b7280",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Download size={16} /> PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}

const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);