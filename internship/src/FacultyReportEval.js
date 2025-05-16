import { useState, useEffect } from "react";
import ManageCompanies from "./SCADDahboardCompanies";
import { useNavigate } from "react-router-dom";
import { generateStatisticsReport } from "./pdfGenerator.js";
import "./StudentHomePage.css";
import "./SCADDashboardAlaa.css";
import { FaPaperPlane } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import { FaIndustry } from "react-icons/fa";
import {
  Settings,
  Building,
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

const initialReports = [
  {
    id: 1,
    student: "Malak Hisham",
    major: "BI",
    status: "Accepted",
    details: "Week 1 Report: Developed API endpoints.",
    company: "BusinessIL",
    supervisor: "John Doe",
    startDate: "2025-04-19",
    endDate: "2025-05-01",
    internshipTitle: "API Developer Intern",
    introduction: "Started API development phase for internal tools.",
    body: "Worked on creating RESTful endpoints using Node.js and Express. Integrated with the company database using Sequelize ORM. Ensured endpoint security through JWT authentication and middleware validation. Collaborated with front-end developers to test endpoints using Postman and implemented error handling for edge cases.",
    helpfulCourse: "Web Technologies",
    strengths: "Strong backend development skills, secure API integration, collaboration across teams, and good use of Express/Sequelize.",
    improvementAreas: "Could include more performance benchmarks and scalability planning.",
    recommendation: "Yes, highly recommend",
    additionalComments: "Excellent foundation for a backend developer; shows strong potential for leadership in technical teams.",
  },
  {
    id: 2,
    student: "Esraa Ahmed",
    major: "Applied Arts",
    status: "Flagged",
    details: "Week 2 Report: Missing documentation.",
    company: "ArtHouse",
    supervisor: "Jane Roe",
    startDate: "2025-09-23",
    endDate: "2025-10-01",
    internshipTitle: "Design Intern",
    introduction: "Continued design concept exploration for ad campaigns.",
    body: "Worked on initial sketches and digital mockups using Illustrator and Photoshop. Focused on aligning visuals with client brand identity. Participated in creative meetings and reviewed feedback from senior designers. However, final documentation including design rationale, color palette justification, and asset specifications was not submitted.",
    helpfulCourse: "Visual Communication",
    strengths: "Creative ideation, visual design alignment with brand identity, and initiative in concept development.",
    improvementAreas: "Final documentation was missing; needs better time and file management for professional delivery.",
    recommendation: "Yes, with reservations",
    additionalComments: "Creative potential is high, but future success depends on attention to documentation and deadlines.",
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
    internshipTitle: "Software Development Intern",
    introduction: "Completed development and deployment of patient portal app.",
    body: "Handled front-end in React and styled components using Material UI. Developed back-end APIs with Django REST Framework. Implemented secure login and password recovery. Deployed the app on AWS EC2 with S3 storage and Route 53 for DNS. Configured monitoring and logging with CloudWatch, and wrote user documentation for hospital staff.",
    helpfulCourse: "Software Engineering",
    strengths: "Full-stack capability, AWS deployment skills, secure login system implementation, and excellent documentation.",
    improvementAreas: "Could explore unit testing and automation frameworks more deeply.",
    recommendation: "Yes, highly recommend",
    additionalComments: "A well-rounded intern who delivered production-ready work with confidence and autonomy.",
  },
  {
    id: 4,
    student: "Mennatullah El Sabagh",
    major: "Data Science",
    status: "Pending",
    details: "Week 3 Report: Completed data analysis phase.",
    company: "FinTech Solutions",
    supervisor: "Michael Chen",
    startDate: "2025-02-15",
    endDate: "2025-04-15",
    internshipTitle: "Data Science Intern",
    introduction: "Initiated advanced data analytics for customer segmentation.",
    body: "Used Python and Pandas to clean and preprocess over 50,000 transaction records. Engineered features such as spending frequency and average basket size. Applied k-means clustering to identify customer segments. Visualized data using Power BI dashboards and presented key insights to stakeholders including churn risk and upselling opportunities.",
    helpfulCourse: "Data Mining",
    strengths: "Strong command of Python and data analysis techniques, impactful data storytelling using Power BI.",
    improvementAreas: "Should improve communication of model limitations and data assumptions.",
    recommendation: "Yes, highly recommend",
    additionalComments: "Very capable in data analytics; would thrive in fast-paced environments needing quick insights.",
  },
  {
    id: 5,
    student: "Mennatullah Shaaban",
    major: "Pharmacy",
    status: "Rejected",
    details: "Week 1 Report: Incomplete tasks.",
    company: "Pharma",
    supervisor: "Sarah Johnson",
    startDate: "2025-03-01",
    endDate: "2025-05-01",
    internshipTitle: "Pharmacy Intern",
    introduction: "Introduced to clinical pharmacy operations.",
    body: "Shadowed senior pharmacists during patient consultations and prescription verifications. Participated in medication reconciliation and learned about drug interactions. However, the intern missed several mandatory training modules, including those on inventory system usage and reporting protocols. Tasks were left incomplete, affecting assessment.",
    helpfulCourse: "Clinical Pharmacy",
    strengths: "Initial interest in pharmacy operations and willingness to shadow experienced staff.",
    improvementAreas: "Several tasks left incomplete; training modules missed; needs discipline and follow-through.",
    recommendation: "No",
    additionalComments: "Encouraged to revisit commitment and engagement practices before taking on similar roles.",
  },
  {
    id: 6,
    student: "Emma Brown",
    major: "Engineering",
    status: "Rejected",
    details: "Week 1 Report: Incomplete tasks.",
    company: "EduLearn",
    supervisor: "Sarah Johnson",
    startDate: "2025-03-01",
    endDate: "2025-05-01",
    internshipTitle: "Engineering Intern",
    introduction: "Began orientation and software training.",
    body: "Participated in software training sessions covering simulation tools and CAD software. Attended team briefings and observed ongoing projects in educational robotics. However, failed to complete the simulation setup assignment due to late submissions and lack of engagement. Feedback from mentor indicated minimal contribution to group discussions.",
    helpfulCourse: "Introduction to Engineering Systems",
    strengths: "Engaged in orientation and software tools training, showed potential in technical discussions.",
    improvementAreas: "Missed deliverables, poor time management, low interaction during team activities.",
    recommendation: "No",
    additionalComments: "Should build consistency and demonstrate stronger ownership of assigned tasks.",
  },
  {
    id: 7,
    student: "Alaa Abdelnaser",
    major: "Computer Science",
    status: "Pending",
    details: "Week 1 Report: Developed API endpoints.",
    company: "TechCorp",
    supervisor: "John Doe",
    startDate: "2025-01-01",
    endDate: "2025-03-01",
    internshipTitle: "Software Engineering Intern",
    introduction: "Started working on backend development tasks.",
    body: "Implemented secure login and session management APIs using Express and JWT. Added route protection and middleware for authentication. Participated in code reviews and resolved several bugs identified by QA team. Also contributed to CI/CD pipeline setup using GitHub Actions for automated deployment.",
    helpfulCourse: "Advanced Programming",
    strengths: "Secure backend API development, CI/CD setup, proactive debugging, and team collaboration.",
    improvementAreas: "Could expand documentation for future maintainability and onboarding.",
    recommendation: "Yes, highly recommend",
    additionalComments: "Strong backend engineer profile; excellent performance and adaptability.",
  },
  {
    id: 8,
    student: "Bob Smith",
    major: "Engineering",
    status: "Flagged",
    details: "Week 2 Report: Missing documentation.",
    company: "GreenEnergy",
    supervisor: "Jane Roe",
    startDate: "2025-02-01",
    endDate: "2025-04-01",
    internshipTitle: "Engineering Intern",
    introduction: "Continued research in renewable systems design.",
    body: "Simulated turbine energy output under varying wind conditions using MATLAB. Compared simulation results with real-world data to validate models. Contributed to team discussions on optimizing blade angles. However, failed to document key assumptions, parameters, and justifications used in the simulation reports.",
    helpfulCourse: "Energy Systems",
    strengths: "Simulation skills and participation in renewable energy system discussions.",
    improvementAreas: "Insufficient documentation of research methods and simulation assumptions.",
    recommendation: "Yes, with reservations",
    additionalComments: "Technically capable but needs to better articulate and document technical processes.",
  },
  {
    id: 9,
    student: "David Wilson",
    major: "Data Science",
    status: "Pending",
    details: "Week 3 Report: Completed data analysis phase.",
    company: "FinTech Solutions",
    supervisor: "Michael Chen",
    startDate: "2025-02-15",
    endDate: "2025-04-15",
    internshipTitle: "Data Science Intern",
    introduction: "Analyzed customer churn data for risk prediction.",
    body: "Performed exploratory data analysis on churn dataset using Python. Applied logistic regression and decision trees to build prediction models. Conducted cross-validation and calculated metrics such as precision, recall, and F1-score. Created dashboards for executives using Power BI to illustrate churn trends and customer segments.",
    helpfulCourse: "Machine Learning",
    strengths: "Machine learning modeling, clear metrics tracking, and intuitive dashboard development.",
    improvementAreas: "Could explore deeper model evaluation techniques and feature tuning.",
    recommendation: "Yes, highly recommend",
    additionalComments: "Solid understanding of ML and analytics. Professional-level communication of findings.",
  },
];

const FacultyReportEval = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [majorFilter, setMajorFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [reports, setReports] = useState(initialReports);
  const [notifications, setNotifications] = useState([]);
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [clarification, setClarification] = useState("");
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    const initialComments = {};
    initialReports.forEach(report => {
      initialComments[report.id] = report.comments || '';
    });
    setCommentInputs(initialComments);
  }, []);

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

  const addNotification = (message, type = "system") => {
    const newNotification = {
      id: notifications.length + 1,
      type,
      message,
      time: "Just now",
    };
    setNotifications([newNotification, ...notifications]);
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

  const filteredReports = reports.filter(
    (report) =>
      report.student.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (majorFilter ? report.major === majorFilter : true) &&
      (statusFilter ? report.status === statusFilter : true)
  );

  const openModal = (type, item) => {
    setSelectedItem(item);
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleReportAction = (id, status, comment = "") => {
    const newStatus = status.charAt(0).toUpperCase() + status.slice(1);
    if (newStatus === "Rejected" || newStatus === "Flagged") {
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === id
            ? { ...report, status: newStatus, comments: comment }
            : report
        )
      );
      const report = reports.find((r) => r.id === id);
      addNotification(
        `Report from ${
          report.student
        } has been marked as ${newStatus.toLowerCase()}${
          comment ? ` with comment: "${comment}"` : ""
        }`,
        "report"
      );
    } else {
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === id ? { ...report, status: newStatus } : report
        )
      );
      const report = reports.find((r) => r.id === id);
      addNotification(
        `Report from ${
          report.student
        } has been marked as ${newStatus.toLowerCase()}`,
        "report"
      );
    }
  };

const handleAddComment = (id, comment) => {
  if (!comment.trim()) return;
  
  setReports(prevReports =>
    prevReports.map(report =>
      report.id === id
        ? { ...report, comments: comment }
        : report
    )
  );
  
  setCommentInputs(prev => ({
    ...prev,
    [id]: ''
  }));
  
  const report = reports.find(r => r.id === id);
  addNotification(
    `Comment added to ${report.student}'s report: "${comment}"`,
    "report"
  );
};

  const handleCommentChange = (id, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const renderModalContent = () => {
  if (!selectedItem) return null;

  switch (modalType) {
    case "report":
      return (
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
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: 0,
                }}
              >
                Internship Report – {selectedItem.student}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  padding: "0.25rem",
                  borderRadius: "50%",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "1rem" }}>
              <div style={{ marginBottom: "1.5rem", color: "#374151" }}>
                <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Major:</strong> {selectedItem.major}
                </p>
                <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Internship Title:</strong> {selectedItem.internshipTitle}
                </p>
                <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Company:</strong> {selectedItem.company}
                </p>
                <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Supervisor:</strong> {selectedItem.supervisor}
                </p>
                <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Period:</strong> {selectedItem.startDate} – {selectedItem.endDate}
                </p>
                <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      backgroundColor:
                        selectedItem.status === "Accepted"
                          ? "#d1fae5"
                          : selectedItem.status === "Rejected"
                          ? "#fee2e2"
                          : selectedItem.status === "Flagged"
                          ? "#fef3c7"
                          : "#dbeafe",
                      color:
                        selectedItem.status === "Accepted"
                          ? "#065f46"
                          : selectedItem.status === "Rejected"
                          ? "#b91c1c"
                          : selectedItem.status === "Flagged"
                          ? "#92400e"
                          : "#1e40af",
                    }}
                  >
                    {selectedItem.status}
                  </span>
                </p>
                {selectedItem.comments && (
                  <p style={{ fontSize: "0.875rem" }}>
                    <strong>Comments:</strong> {selectedItem.comments}
                  </p>
                )}
              </div>

              <div style={{ color: "#1f2937" }}>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Introduction
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#4b5563", marginBottom: "1rem", lineHeight: 1.5 }}>
                  {selectedItem.introduction}
                </p>

                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Body
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#4b5563", marginBottom: "1rem", lineHeight: 1.5 }}>
                  {selectedItem.body}
                </p>

                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Helpful Course
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#4b5563", marginBottom: "1rem", lineHeight: 1.5 }}>
                  {selectedItem.helpfulCourse}
                </p>
              </div>
              {selectedItem.status === "Pending" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    onClick={() => handleReportStatusChange(selectedItem.id, "flagged")}
                    style={{
                      padding: "0.5rem 0.75rem",
                      background: "#f59e0b",
                      color: "#fff",
                      borderRadius: "0.25rem",
                      flex: 1,
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Flag size={16} /> Flag
                  </button>
                  <button
                    onClick={() => handleReportStatusChange(selectedItem.id, "rejected")}
                    style={{
                      padding: "0.5rem 0.75rem",
                      background: "#ef4444",
                      color: "#fff",
                      borderRadius: "0.25rem",
                      flex: 1,
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <X size={16} /> Reject
                  </button>
                  <button
                    onClick={() => handleReportStatusChange(selectedItem.id, "accepted")}
                    style={{
                      padding: "0.5rem 0.75rem",
                      background: "#10b981",
                      color: "#fff",
                      borderRadius: "0.25rem",
                      flex: 1,
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Check size={16} /> Accept
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );

    case "evaluation":
      return (
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
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: 0,
                }}
              >
                Evaluation – {selectedItem.student}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  padding: "0.25rem",
                  borderRadius: "50%",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "1rem" }}>
              <div style={{ marginBottom: "1.5rem", color: "#374151" }}>
                <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Major:</strong> {selectedItem.major}
                </p>
                <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Internship Title:</strong> {selectedItem.internshipTitle}
                </p>
                <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Company:</strong> {selectedItem.company}
                </p>
                <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Supervisor:</strong> {selectedItem.supervisor}
                </p>
                <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Period:</strong> {selectedItem.startDate} – {selectedItem.endDate}
                </p>
                <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      backgroundColor:
                        selectedItem.status === "Accepted"
                          ? "#d1fae5"
                          : selectedItem.status === "Rejected"
                          ? "#fee2e2"
                          : selectedItem.status === "Flagged"
                          ? "#fef3c7"
                          : "#dbeafe",
                      color:
                        selectedItem.status === "Accepted"
                          ? "#065f46"
                          : selectedItem.status === "Rejected"
                          ? "#b91c1c"
                          : selectedItem.status === "Flagged"
                          ? "#92400e"
                          : "#1e40af",
                    }}
                  >
                    {selectedItem.status}
                  </span>
                </p>
              </div>

              <div style={{ color: "#1f2937" }}>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Strengths
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#4b5563", marginBottom: "1rem", lineHeight: 1.5 }}>
                  {selectedItem.strengths}
                </p>

                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Areas for Improvement
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#4b5563", marginBottom: "1rem", lineHeight: 1.5 }}>
                  {selectedItem.improvementAreas}
                </p>

                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Recommendation
                </h3>
                <div
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem",
                    backgroundColor:
                      selectedItem.recommendation === "No"
                        ? "#fecaca"
                        : selectedItem.recommendation.includes("highly")
                        ? "#bbf7d0"
                        : "#fde68a",
                    color: "#1f2937",
                    borderRadius: "0.375rem",
                    fontWeight: "500",
                    marginBottom: "1rem",
                  }}
                >
                  {selectedItem.recommendation}
                </div>

                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Additional Comments
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#4b5563", marginBottom: "1rem", lineHeight: 1.5 }}>
                  {selectedItem.additionalComments}
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
  return (
    <div style={{ animation: "fadeIn 0.3s" }}>
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "700",
          marginBottom: "2rem",
          color: "#1f2937",
          letterSpacing: "-0.025em",
        }}
      >
        Manage Reports
      </h2>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
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
          <Search
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
              pointerEvents: "none",
            }}
            size={18}
          />
          <input
            type="text"
            placeholder="Search by student name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "0.75rem 0.75rem 0.75rem 2.5rem",
              width: "100%",
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              outline: "none",
              boxSizing: "border-box",
              fontSize: "0.875rem",
              transition: "all 0.3s ease",
              backgroundColor: "#fff",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#3b82f6";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(59, 130, 246, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
              e.target.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
            }}
          />
        </div>
        <div style={{ flex: "0 0 auto" }}>
          <select
            value={majorFilter}
            onChange={(e) => setMajorFilter(e.target.value)}
            style={{
              padding: "0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              outline: "none",
              minWidth: "12rem",
              width: "12rem",
              fontSize: "0.875rem",
              transition: "all 0.3s ease",
              backgroundColor: "#fff",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1rem",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#3b82f6";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(59, 130, 246, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
              e.target.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
            }}
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
              padding: "0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              outline: "none",
              minWidth: "12rem",
              width: "12rem",
              fontSize: "0.875rem",
              transition: "all 0.3s ease",
              backgroundColor: "#fff",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1rem",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#3b82f6";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(59, 130, 246, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
              e.target.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
            }}
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
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            background: "#fff",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ color: "#6b7280", fontSize: "1rem" }}>
            No reports match your search criteria.
          </p>
        </div>
      ) : (
        <div
          style={{
            background: "#fff",
            borderRadius: "0.75rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ overflowX: "auto", maxWidth: "100%" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: 0,
                fontSize: "0.875rem",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(90deg, #f9fafb 0%, #f3f4f6 100%)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  <th
                    style={{
                      padding: "1rem 1.5rem",
                      textAlign: "left",
                      color: "#1f2937",
                      fontWeight: "600",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Student
                  </th>
                  <th
                    style={{
                      padding: "1rem 1.5rem",
                      textAlign: "left",
                      color: "#1f2937",
                      fontWeight: "600",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Company
                  </th>
                  <th
                    style={{
                      padding: "1rem 1.5rem",
                      textAlign: "left",
                      color: "#1f2937",
                      fontWeight: "600",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Internship Title
                  </th>
                  <th
                    style={{
                      padding: "1rem 1.5rem",
                      textAlign: "left",
                      color: "#1f2937",
                      fontWeight: "600",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      padding: "1rem 1.5rem",
                      textAlign: "left",
                      color: "#1f2937",
                      fontWeight: "600",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report, index) => (
                  <tr
                    key={report.id}
                    style={{
                      background: index % 2 === 0 ? "#fff" : "#fafafa",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f1f5f9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        index % 2 === 0 ? "#fff" : "#fafafa")
                    }
                  >
                    <td
                      style={{
                        padding: "1.25rem 1.5rem",
                        borderBottom: "1px solid #e5e7eb",
                        color: "#374151",
                        fontWeight: "500",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        minWidth: "0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <User size={20} />
                        <span>{report.student}</span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "1.25rem 1.5rem",
                        borderBottom: "1px solid #e5e7eb",
                        color: "#374151",
                        fontWeight: "500",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        minWidth: "0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Building size={20} />
                        <span>{report.company}</span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "1.25rem 1.5rem",
                        borderBottom: "1px solid #e5e7eb",
                        color: "#374151",
                        fontWeight: "500",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        minWidth: "0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <FiBriefcase size={20} />
                        <span>{report.internshipTitle}</span>
                      </div>
                    </td>
                   <td
                      style={{
                        padding: "1.25rem 1.5rem",
                        borderBottom: "1px solid #e5e7eb",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        minWidth: "0",
                      }}
                    >
                      <span
                        style={{
                          padding: "0.375rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
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
                      {report.comments && (
                        <div
                          style={{
                            marginTop: "0.25rem",
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            maxWidth: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Comment: {report.comments}
                        </div>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "1.25rem 1.5rem",
                        borderBottom: "1px solid #e5e7eb",
                        display: "flex",
                        gap: "0.75rem",
                        alignItems: "center",
                        minWidth: "0",
                      }}
                    >
                      <button
                        className="uniform-action-button"
                        style={{
                          background: "#2a9d8f",
                          color: "#fff",
                          border: "none",
                          borderRadius: "0.375rem",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          fontWeight: "500",
                          padding: "0.5rem 1rem",
                        }}
                        onClick={() => openModal("report", report)}
                        onMouseOver={(e) => {
                          e.target.style.background = "#30b3a3";
                          e.target.style.transform = "scale(1.05)";
                          e.target.style.boxShadow =
                            "0 2px 8px rgba(0, 0, 0, 0.15)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = "#2a9d8f";
                          e.target.style.transform = "scale(1)";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        View Report
                      </button>
                      <button
                        className="uniform-action-button"
                        style={{
                          background: "#4a90e2",
                          color: "#fff",
                          border: "none",
                          borderRadius: "0.375rem",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          fontWeight: "500",
                          padding: "0.5rem 1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => openModal("evaluation", report)}
                        onMouseOver={(e) => {
                          e.target.style.background = "#5a9ff3";
                          e.target.style.transform = "scale(1.05)";
                          e.target.style.boxShadow =
                            "0 2px 8px rgba(0, 0, 0, 0.15)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = "#4a90e2";
                          e.target.style.transform = "scale(1)";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        View Evaluation
                      </button>
                      {(report.status === "Rejected" || report.status === "Flagged") && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input
                          type="text"
                          placeholder="Enter Clarification"
                          value={commentInputs[report.id] || ''}
                          onChange={(e) => handleCommentChange(report.id, e.target.value)}
                          style={{
                            padding: "0.5rem",
                            border: "1px solid #d1d5db",
                            borderRadius: "0.375rem",
                            fontSize: "0.875rem",
                            width: "150px",
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && commentInputs[report.id]?.trim()) {
                              handleAddComment(report.id, commentInputs[report.id]);
                            }
                          }}
                        />
                        <button
                          className="uniform-action-button"
                          style={{
                            background: "#2a9d8f",
                            color: "#fff",
                            border: "none",
                            borderRadius: "0.375rem",
                            cursor: "pointer",
                            padding: "0.5rem",
                            width: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => {
                            if (commentInputs[report.id]?.trim()) {
                              handleAddComment(report.id, commentInputs[report.id]);
                            }
                          }}
                        >
                          <FaPaperPlane size={16} />
                        </button>
                      </div>
                    )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          {renderModalContent()}
        </div>
      )}
    </div>
  );
};

export default FacultyReportEval;