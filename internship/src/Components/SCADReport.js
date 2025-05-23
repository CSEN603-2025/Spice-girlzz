import { useState, useEffect } from "react";
import SideBar from "./ScadSideBar";
import Header from "./SCADHeader";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { Search, User, Building, X, Check, Flag, Download } from "lucide-react";
import { FiBriefcase } from "react-icons/fi";

const ProfileItem = ({ label, value }) => (
  <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
    <strong>{label}:</strong> {value || "Not provided"}
  </p>
);

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
    strengths:
      "Strong backend development skills, secure API integration, collaboration across teams, and good use of Express/Sequelize.",
    improvementAreas:
      "Could include more performance benchmarks and scalability planning.",
    recommendation: "Yes, highly recommend",
    additionalComments:
      "Excellent foundation for a backend developer; shows strong potential for leadership in technical teams.",
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
    comments: "Needs more detail on project scope.",
    internshipTitle: "Design Intern",
    introduction: "Continued design concept exploration for ad campaigns.",
    body: "Worked on initial sketches and digital mockups using Illustrator and Photoshop. Focused on aligning visuals with client brand identity. Participated in creative meetings and reviewed feedback from senior designers. However, final documentation including design rationale, color palette justification, and asset specifications was not submitted.",
    helpfulCourse: "Visual Communication",
    strengths:
      "Creative ideation, visual design alignment with brand identity, and initiative in concept development.",
    improvementAreas:
      "Final documentation was missing; needs better time and file management for professional delivery.",
    recommendation: "Yes, with reservations",
    additionalComments:
      "Creative potential is high, but future success depends on attention to documentation and deadlines.",
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
    strengths:
      "Full-stack capability, AWS deployment skills, secure login system implementation, and excellent documentation.",
    improvementAreas:
      "Could explore unit testing and automation frameworks more deeply.",
    recommendation: "Yes, highly recommend",
    additionalComments:
      "A well-rounded intern who delivered production-ready work with confidence and autonomy.",
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
    introduction:
      "Initiated advanced data analytics for customer segmentation.",
    body: "Used Python and Pandas to clean and preprocess over 50,000 transaction records. Engineered features such as spending frequency and average basket size. Applied k-means clustering to identify customer segments. Visualized data using Power BI dashboards and presented key insights to stakeholders including churn risk and upselling opportunities.",
    helpfulCourse: "Data Mining",
    strengths:
      "Strong command of Python and data analysis techniques, impactful data storytelling using Power BI.",
    improvementAreas:
      "Should improve communication of model limitations and data assumptions.",
    recommendation: "Yes, highly recommend",
    additionalComments:
      "Very capable in data analytics; would thrive in fast-paced environments needing quick insights.",
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
    comments: "Report does not meet minimum requirements.",
    internshipTitle: "Pharmacy Intern",
    introduction: "Introduced to clinical pharmacy operations.",
    body: "Shadowed senior pharmacists during patient consultations and prescription verifications. Participated in medication reconciliation and learned about drug interactions. However, the intern missed several mandatory training modules, including those on inventory system usage and reporting protocols. Tasks were left incomplete, affecting assessment.",
    helpfulCourse: "Clinical Pharmacy",
    strengths:
      "Initial interest in pharmacy operations and willingness to shadow experienced staff.",
    improvementAreas:
      "Several tasks left incomplete; training modules missed; needs discipline and follow-through.",
    recommendation: "No",
    additionalComments:
      "Encouraged to revisit commitment and engagement practices before taking on similar roles.",
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
    comments: "Report does not meet minimum requirements.",
    internshipTitle: "Engineering Intern",
    introduction: "Began orientation and software training.",
    body: "Participated in software training sessions covering simulation tools and CAD software. Attended team briefings and observed ongoing projects in educational robotics. However, failed to complete the simulation setup assignment due to late submissions and lack of engagement. Feedback from mentor indicated minimal contribution to group discussions.",
    helpfulCourse: "Introduction to Engineering Systems",
    strengths:
      "Engaged in orientation and software tools training, showed potential in technical discussions.",
    improvementAreas:
      "Missed deliverables, poor time management, low interaction during team activities.",
    recommendation: "No",
    additionalComments:
      "Should build consistency and demonstrate stronger ownership of assigned tasks.",
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
    strengths:
      "Secure backend API development, CI/CD setup, proactive debugging, and team collaboration.",
    improvementAreas:
      "Could expand documentation for future maintainability and onboarding.",
    recommendation: "Yes, highly recommend",
    additionalComments:
      "Strong backend engineer profile; excellent performance and adaptability.",
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
    comments: "Needs more detail on project scope.",
    internshipTitle: "Engineering Intern",
    introduction: "Continued research in renewable systems design.",
    body: "Simulated turbine energy output under varying wind conditions using MATLAB. Compared simulation results with real-world data to validate models. Contributed to team discussions on optimizing blade angles. However, failed to document key assumptions, parameters, and justifications used in the simulation reports.",
    helpfulCourse: "Energy Systems",
    strengths:
      "Simulation skills and participation in renewable energy system discussions.",
    improvementAreas:
      "Insufficient documentation of research methods and simulation assumptions.",
    recommendation: "Yes, with reservations",
    additionalComments:
      "Technically capable but needs to better articulate and document technical processes.",
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
    strengths:
      "Machine learning modeling, clear metrics tracking, and intuitive dashboard development.",
    improvementAreas:
      "Could explore deeper model evaluation techniques and feature tuning.",
    recommendation: "Yes, highly recommend",
    additionalComments:
      "Solid understanding of ML and analytics. Professional-level communication of findings.",
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

function SCADReport() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [majorFilter, setMajorFilter] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [reports, setReports] = useState(initialReports);
  const [statistics, setStatistics] = useState(initialStatistics);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState("4rem");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [commentInput, setCommentInput] = useState(""); // Added for comment handling

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setSidebarWidth(isSidebarOpen ? "4rem" : "16rem");
  };

  const handleWidthChange = (width) => {
    setSidebarWidth(width);
    setIsSidebarOpen(width === "16rem");
  };

  const filteredReports = reports.filter(
    (report) =>
      report.student.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (majorFilter ? report.major === majorFilter : true) &&
      (statusFilter ? report.status === statusFilter : true)
  );

  const addNotification = (message, type = "system") => {
    const newNotification = {
      id: notifications.length + 1,
      type,
      message,
      time: "Just now",
    };
    setNotifications([newNotification, ...notifications]);
  };

  const handleReportAction = (id, status, comment = "") => {
    const newStatus = status.charAt(0).toUpperCase() + status.slice(1);
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id
          ? {
              ...report,
              status: newStatus,
              ...(comment && { comments: comment }),
            }
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
  };

  const handleAddComment = (id, comment) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id &&
        (report.status === "Rejected" || report.status === "Flagged")
          ? { ...report, comments: comment }
          : report
      )
    );
    const report = reports.find((r) => r.id === id);
    addNotification(
      `Comment added to ${report.student}'s report: "${comment}"`,
      "report"
    );
  };

  const openModal = (type, item) => {
    setSelectedItem(item);
    setModalType(type);
    setShowModal(true);
    setCommentInput(""); // Reset comment input
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setCommentInput(""); // Reset comment input
  };

  const handleCommentSubmit = () => {
    if (commentInput.trim() && selectedItem) {
      handleAddComment(selectedItem.id, commentInput);
      setCommentInput("");
    }
  };

  const renderModalContent = () => {
    if (!selectedItem) return null;

    switch (modalType) {
      case "report":
        return (
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "50rem",
              width: "100%",
              lineHeight: "1.6",
              fontFamily: "Georgia, serif",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                Internship Report – {selectedItem.student}
              </h2>
              <button
                onClick={closeModal}
                style={{ color: "#6b7280", cursor: "pointer" }}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ marginBottom: "1.5rem", color: "#374151" }}>
              <p>
                <strong>Major:</strong> {selectedItem.major}
              </p>
              <p>
                <strong>Internship Title:</strong>{" "}
                {selectedItem.internshipTitle}
              </p>
              <p>
                <strong>Company:</strong> {selectedItem.company}
              </p>
              <p>
                <strong>Supervisor:</strong> {selectedItem.supervisor}
              </p>
              <p>
                <strong>Period:</strong> {selectedItem.startDate} –{" "}
                {selectedItem.endDate}
              </p>
              <p>
                <strong>Status:</strong> {selectedItem.status}
              </p>
              <p>
                <strong>Details:</strong> {selectedItem.details}
              </p>
              {selectedItem.comments && (
                <p>
                  <strong>Comments:</strong> {selectedItem.comments}
                </p>
              )}
            </div>
            <div style={{ color: "#1f2937" }}>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Introduction
              </h3>
              <p style={{ marginBottom: "1rem", textAlign: "justify" }}>
                {selectedItem.introduction}
              </p>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Body
              </h3>
              <p style={{ marginBottom: "1rem", textAlign: "justify" }}>
                {selectedItem.body}
              </p>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Helpful Course
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                {selectedItem.helpfulCourse}
              </p>
            </div>
            {(selectedItem.status === "Rejected" ||
              selectedItem.status === "Flagged") && (
              <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  Add Comment
                </h3>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Enter your comment"
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.25rem",
                      fontSize: "0.875rem",
                      color: "#1f2937",
                    }}
                  />
                  <button
                    onClick={handleCommentSubmit}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#2a9d8f",
                      color: "#fff",
                      borderRadius: "0.25rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FaPaperPlane size={16} />
                    Submit
                  </button>
                </div>
              </div>
            )}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginTop: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "#2a9d8f",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={() => handleReportAction(selectedItem.id, "accepted")}
              >
                <Check size={16} style={{ marginRight: "0.5rem" }} />
                Accept
              </button>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "#f59e0b",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const comment = prompt("Enter comment for flagging:");
                  if (comment)
                    handleReportAction(selectedItem.id, "flagged", comment);
                }}
              >
                <Flag size={16} style={{ marginRight: "0.5rem" }} />
                Flag
              </button>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "#dc2626",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const comment = prompt("Enter comment for rejection:");
                  if (comment)
                    handleReportAction(selectedItem.id, "rejected", comment);
                }}
              >
                <X size={16} style={{ marginRight: "0.5rem" }} />
                Reject
              </button>
            </div>
          </div>
        );
      case "evaluation":
        return (
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "50rem",
              width: "100%",
              lineHeight: "1.6",
              fontFamily: "Georgia, serif",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                Internship Evaluation – {selectedItem.student}
              </h2>
              <button
                onClick={closeModal}
                style={{ color: "#6b7280", cursor: "pointer" }}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ marginBottom: "1.5rem", color: "#374151" }}>
              <p>
                <strong>Major:</strong> {selectedItem.major || "N/A"}
              </p>
              <p>
                <strong>Internship Title:</strong>{" "}
                {selectedItem.internshipTitle || "N/A"}
              </p>
              <p>
                <strong>Company:</strong> {selectedItem.company || "N/A"}
              </p>
              <p>
                <strong>Supervisor:</strong> {selectedItem.supervisor || "N/A"}
              </p>
              <p>
                <strong>Period:</strong> {selectedItem.startDate} –{" "}
                {selectedItem.endDate}
              </p>
              <p>
                <strong>Status:</strong> {selectedItem.status || "N/A"}
              </p>
              <p>
                <strong>Details:</strong> {selectedItem.details || "N/A"}
              </p>
              {selectedItem.comments && (
                <p>
                  <strong>Comments:</strong> {selectedItem.comments}
                </p>
              )}
            </div>
            <div style={{ color: "#1f2937" }}>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  marginTop: "1.5rem",
                }}
              >
                Strengths
              </h3>
              <p style={{ marginBottom: "1rem", textAlign: "justify" }}>
                {selectedItem.strengths || "N/A"}
              </p>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Areas for Improvement
              </h3>
              <p style={{ marginBottom: "1rem", textAlign: "justify" }}>
                {selectedItem.improvementAreas || "N/A"}
              </p>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  marginTop: "1.5rem",
                }}
              >
                Recommendation
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem",
                    backgroundColor:
                      selectedItem.recommendation === "No"
                        ? "#fecaca"
                        : selectedItem.recommendation &&
                          selectedItem.recommendation.includes("highly")
                        ? "#bbf7d0"
                        : "#fde68a",
                    color: "#1f2937",
                    borderRadius: "0.375rem",
                    fontWeight: "bold",
                  }}
                >
                  {selectedItem.recommendation || "N/A"}
                </span>
              </p>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Additional Comments
              </h3>
              <p style={{ marginBottom: "1rem", textAlign: "justify" }}>
                {selectedItem.additionalComments || "N/A"}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginTop: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "#2a9d8f",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={() => handleReportAction(selectedItem.id, "accepted")}
              >
                <Check size={16} style={{ marginRight: "0.5rem" }} />
                Accept
              </button>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "#f59e0b",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const comment = prompt("Enter comment for flagging:");
                  if (comment)
                    handleReportAction(selectedItem.id, "flagged", comment);
                }}
              >
                <Flag size={16} style={{ marginRight: "0.5rem" }} />
                Flag
              </button>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "#dc2626",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const comment = prompt("Enter comment for rejection:");
                  if (comment)
                    handleReportAction(selectedItem.id, "rejected", comment);
                }}
              >
                <X size={16} style={{ marginRight: "0.5rem" }} />
                Reject
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const newNotifications = [
      {
        id: 1,
        type: "report",
        message: "New report submitted by Malak Hisham",
        time: "5 minutes ago",
      },
      {
        id: 2,
        type: "report",
        message: "Report from Esraa Ahmed flagged",
        time: "1 hour ago",
      },
    ];
    setNotifications(newNotifications);
  }, []);

  return (
    <div className="container">
      <Header toggleSidebar={toggleSidebar} />
      <div className="layout">
        <SideBar width={sidebarWidth} onWidthChange={handleWidthChange} />
        <div
          className="main-content"
          style={{
            marginLeft: window.innerWidth > 768 ? sidebarWidth : "0",
            width:
              window.innerWidth > 768 ? `calc(100% - ${sidebarWidth})` : "100%",
            transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
            boxSizing: "border-box",
            backgroundColor: "#f9fafb",
            padding: "1.5rem",
            overflowY: "auto",
            flex: 1,
          }}
        >
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
                  <option value="BI">BI</option>
                  <option value="Applied Arts">Applied Arts</option>
                  <option value="Pharmacy">Pharmacy</option>
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
                                  : {
                                      background: "#dbeafe",
                                      color: "#1e40af",
                                    }),
                              }}
                            >
                              {report.status}
                            </span>
                            {(report.status === "Rejected" ||
                              report.status === "Flagged") &&
                              report.comments && (
                                <div
                                  style={{
                                    marginTop: "0.25rem",
                                    fontSize: "0.75rem",
                                    color: "#6b7280",
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div className="modal-content">{renderModalContent()}</div>
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
      {isSidebarOpen && (
        <div
          className="mobile-overlay active"
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
}

export default SCADReport;
