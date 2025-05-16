import React from "react";
import { useState, useEffect } from "react";
import SideBar from "./Components/ScadSideBar";
import Header from "./Components/SCADHeader";
import ManageCompanies from "./SCADDahboardCompanies";
import { useNavigate } from "react-router-dom";
import { generateStatisticsReport } from "./pdfGenerator.js";
import "./StudentHomePage.css";
import "./SCADDashboardAlaa.css";
import { FaPaperPlane } from "react-icons/fa"; // Import the icon (install react-icons if needed)
import { FaEnvelope } from "react-icons/fa"; // Import the mail icon
import { FiBriefcase } from "react-icons/fi";
import { FaIndustry } from "react-icons/fa";
import VideoCallDashboard from "./videoCallSCAD";
import SCADHome from "./SCADHome.js";
import SCADMail from "./Mail.js";
import UpcomingWorkshops from "./SCADworkshops.js";
import NotificationSystem from "./Components/NotificationsStudent.js";
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
    details: "Enrolled in 2022 · GPA 3.85 · Top 10%",
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
    details: "96 credits earned · DAAD Scholar",
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
    details: "On Leave · Previously ranked 5th · AI Club",
    appliedInternships: [
      { companyName: "MediHealth", jobTitle: "Data Analyst Intern" },
    ],
  },
  {
    id: 4,
    name: "John Ibraham",
    internshipStatus: "Active",
    major: "Data Engineer",
    semester: "Semester 9",
    avatar: "/imgs/John.png",
    email: "john.ibraham@student.guc.edu.eg",
    jobInterests: "Data Engineer",
    previousInternships: "DataSync (2023)",
    details: "Graduating 2025 · Languages: German",
    appliedInternships: [],
  },
  {
    id: 5,
    name: "Malak Hisham Sallam",
    internshipStatus: "Active",
    major: "Data Science",
    semester: "Semester 5",
    avatar: "/imgs/Malak.jpeg",
    email: "malak.hisham@student.guc.edu.eg",
    jobInterests: "Data Analysis",
    previousInternships: "DataSync (2023)",
    details: "Active Student · Robotics Club · 2 internships",
    appliedInternships: [],
  },
  {
    id: 6,
    name: "Mennatullah Shaaban",
    internshipStatus: "Pending",
    major: "Pharmacy",
    semester: "Semester 3",
    avatar: "/imgs/mennatullah-shaaban.jpg",
    email: "mennatullah.shaaban@student.guc.edu.eg",
    jobInterests: "Pharmacy",
    previousInternships: "None",
    appliedInternships: [{ companyName: "Pharma", jobTitle: "Researcher" }],
  },
  {
    id: 7,
    name: "Ismail Mohamed",
    internshipStatus: "Active",
    major: "Data Science",
    semester: "Semester 9",
    avatar: "/imgs/ismail.png",
    email: "ismail.mohamed@student.guc.edu.eg",
    jobInterests: "Data Engineer",
    previousInternships: "DataSync (2023)",
    appliedInternships: [],
  },
  {
    id: 8,
    name: "Clara Davis",
    major: "Computer Science",
    internshipStatus: "Accepted",
    details: "Final Report: Successfully deployed app.",
    avatar: "/imgs/clara.png",
    email: "Clara.Davis@student.guc.edu.eg",
    jobInterests: "Applied Arts",
    previousInternships: "None",
    appliedInternships: [{ companyName: "BuildCorp", jobTitle: "DesignKSA" }],
  },
  {
    id: 9,
    name: "Ahmed Eissa",
    major: "Engineering",
    internshipStatus: "Flagged",
    details: "Week 1 Report: Incomplete tasks.",
    avatar: "/imgs/ahmed.png",
    email: "Ahmed.eissa@student.guc.edu.eg",
    jobInterests: "English Litreture",
    previousInternships: "None",
    appliedInternships: [{ companyName: "BuildCorp", jobTitle: "WritingVeny" }],
  },
  {
    id: 10,
    name: "Emma Brown",
    major: "Engineering",
    internshipStatus: "Rejected",
    details: "Week 1 Report: Incomplete tasks.",
    avatar: "/imgs/emma.png",
    email: "Emma.Brown@student.guc.edu.eg",
    jobInterests: "English Litreture",
    previousInternships: "None",
    appliedInternships: [{ companyName: "BuildCorp", jobTitle: "WritingVeny" }],
  },
];

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

export default function SCADStaffDashboard() {
  const inputRefs = React.useRef({});
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

  const [sidebarOpen, setSidebarOpen] = useState(false); // For toggleSidebar

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
              <a
                href="/pdfs/company-details.pdf"
                download
                style={{
                  padding: "0.5rem 1rem",
                  background: "#2a9d8f",
                  color: "#fff",
                  borderRadius: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              
              >
                <Download size={16} style={{ marginRight: "0.5rem" }} />
                Download
              </a>
            </div>
          </div>
        );
      case "report":
        return (
          <div>
            <div
             style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2
               style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", margin: 0 }}
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

            {/* Basic Info */}
            <div style={{ fontSize: "0.875rem", color: "#6b7280" , marginBottom:"0.5rem" ,background: '#f9fafb',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb'  }}>
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

            {/* Report Content */}
            <div style={{ color: "#1f2937" }}>
               <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                    Introduction
                  </h3>
              <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.5 , marginBottom:"0.5rem" }}>
                {selectedItem.introduction}
              </p>

              <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                    Body
                  </h3>
              <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.5 , marginBottom:"0.5rem" }}>
                {selectedItem.body}
              </p>

               <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                    Helpful Courses
                  </h3>
              <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.5 }}>
                {selectedItem.helpfulCourse}
              </p>
            </div>
          </div>
        );

      case "evaluation":
        return (
          <div>
            <div
             style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}
            >
              <h2
               style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", margin: 0 }}
              >
                Internship Evaluation – {selectedItem.student}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  color: "#6b7280",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem", // Bigger icon for easier access
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Basic Info */}
            <div style={{ fontSize: "0.875rem", color: "#6b7280" , marginBottom:"0.5rem" ,background: '#f9fafb',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb' }}>
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

            {/* Report Content */}
            <div style={{ color: "#1f2937" }}>
              {/* Strengths and Other Evaluation Fields */}
              <h3
               style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}
              >
                Strengths
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.5 , marginBottom:"0.5rem" }}>
                {selectedItem.strengths || "N/A"}
              </p>

              <h3
               style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}
              >
                Areas for Improvement
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.5 , marginBottom:"0.5rem" }}>
                {selectedItem.improvementAreas || "N/A"}
              </p>

              <h3
               style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}
              >
                Recommendation
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.5 , marginBottom:"0.5rem" }}>
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
                style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}
              >
                Additional Comments
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.5 , marginBottom:"0.5rem" }}>
                {selectedItem.additionalComments || "N/A"}
              </p>
            </div>
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
                className="modal-close-button"
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
      case "workshops":
        return (
         <div style={{ marginTop: "1rem", marginLeft: "1rem" , width: "90%" , height: "90%"}}>
            <UpcomingWorkshops />
          </div>
        );
      case "home":
        return (
           <div style={{ marginTop: "1rem", marginLeft: "1rem" , width: "90%" , height: "90%"}}>
            <SCADHome />
              </div>
          
        );
      case "messages":
        return (
          <div style={{ marginTop: "1rem", marginLeft: "1rem" }}>
            <SCADMail />
          </div>
        );

      case "companies":
        const handleCompanyAction = (id, action) => {
          // Update status based on action
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

        const handleToggleStatus = (id, currentStatus) => {
          const newStatus =
            currentStatus === "Accepted" ? "Rejected" : "Accepted";
          setCompanies((prevCompanies) =>
            prevCompanies.map((company) =>
              company.id === id ? { ...company, status: newStatus } : company
            )
          );
          const company = companies.find((c) => c.id === id);
          addNotification(
            `Company ${company.name} status changed to ${newStatus}`,
            "company"
          );
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
              Manage Companies
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
                  placeholder="Search by company name..."
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
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
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
                <option value="">All Industries</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Energy">Energy</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            {companies.length === 0 ? (
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
                  No companies found.
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
                            width: "25%",
                            borderBottom: "1px solid #e5e7eb",
                          }}
                        >
                          Company Name
                        </th>
                        <th
                          style={{
                            padding: "1rem 1.5rem",
                            textAlign: "left",
                            color: "#1f2937",
                            fontWeight: "600",
                            width: "25%",
                            borderBottom: "1px solid #e5e7eb",
                          }}
                        >
                          Industry
                        </th>
                        <th
                          style={{
                            padding: "1rem 1.5rem",
                            textAlign: "left",
                            color: "#1f2937",
                            fontWeight: "600",
                            width: "20%",
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
                            width: "30%",
                            borderBottom: "1px solid #e5e7eb",
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
                        .map((company, index) => (
                          <tr
                            key={company.id}
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
                            {/* Company Name with Icon */}
                            <td
                              style={{
                                padding: "1.25rem 1.5rem",
                                borderBottom: "1px solid #e5e7eb",
                                color: "#374151",
                                fontWeight: "500",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
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
                                {company.name}
                              </div>
                            </td>

                            {/* Industry with Icon */}
                            <td
                              style={{
                                padding: "1.25rem 1.5rem",
                                borderBottom: "1px solid #e5e7eb",
                                color: "#374151",
                                fontWeight: "500",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                }}
                              >
                                <FaIndustry size={20} />
                                {company.industry}
                              </div>
                            </td>

                            {/* Status Badge */}
                            <td
                              style={{
                                padding: "1.25rem 1.5rem",
                                borderBottom: "1px solid #e5e7eb",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <span
                                style={{
                                  padding: "0.375rem 0.75rem",
                                  borderRadius: "9999px",
                                  fontSize: "0.75rem",
                                  fontWeight: "500",
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

                            {/* Action Buttons */}
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
                                onClick={() => openModal("companies", company)}
                                style={{
                                  width: "120px",
                                  backgroundColor: "#2a9d8f",
                                  color: "#fff",
                                  padding: "0.5rem 1rem",
                                  border: "none",
                                  borderRadius: "0.375rem",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
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
                                View Details
                              </button>

                              {company.status === "Pending" ? (
                                <>
                                  <button
                                    style={{
                                      width: "80px",
                                      backgroundColor: "rgb(74, 194, 154)",
                                      color: "#fff",
                                      padding: "0.5rem",
                                      border: "none",
                                      borderRadius: "0.375rem",
                                      cursor: "pointer",
                                      fontSize: "0.875rem",
                                      transition: "all 0.3s ease",
                                    }}
                                    onClick={() =>
                                      handleCompanyAction(company.id, "accept")
                                    }
                                    onMouseOver={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "rgba(74, 194, 154, 0.71)";
                                      e.currentTarget.style.transform =
                                        "scale(1.05)";
                                      e.currentTarget.style.boxShadow =
                                        "0 2px 8px rgba(0, 0, 0, 0.15)";
                                    }}
                                    onMouseOut={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "rgb(74, 194, 154)";
                                      e.currentTarget.style.transform =
                                        "scale(1)";
                                      e.currentTarget.style.boxShadow = "none";
                                    }}
                                  >
                                    Accept
                                  </button>
                                  <button
                                    style={{
                                      width: "80px",
                                      backgroundColor: "rgb(220, 98, 98)",
                                      color: "#fff",
                                      padding: "0.5rem",
                                      border: "none",
                                      borderRadius: "0.375rem",
                                      cursor: "pointer",
                                      fontSize: "0.875rem",
                                      transition: "all 0.3s ease",
                                    }}
                                    onClick={() =>
                                      handleCompanyAction(company.id, "reject")
                                    }
                                    onMouseOver={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "rgba(188, 90, 90, 0.76)";
                                      e.currentTarget.style.transform =
                                        "scale(1.05)";
                                      e.currentTarget.style.boxShadow =
                                        "0 2px 8px rgba(0, 0, 0, 0.15)";
                                    }}
                                    onMouseOut={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "rgb(220, 98, 98)";
                                      e.currentTarget.style.transform =
                                        "scale(1)";
                                      e.currentTarget.style.boxShadow = "none";
                                    }}
                                  >
                                    Reject
                                  </button>
                                </>
                              ) : (
                                <button
                                  style={{
                                    width: "80px",
                                    backgroundColor:
                                      company.status === "Accepted"
                                        ? "rgb(220, 98, 98)"
                                        : "rgb(74, 194, 154)",
                                    color: "#fff",
                                    padding: "0.5rem",
                                    border: "none",
                                    borderRadius: "0.375rem",
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                    transition: "all 0.3s ease",
                                  }}
                                  onClick={() =>
                                    handleToggleStatus(
                                      company.id,
                                      company.status
                                    )
                                  }
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.transform =
                                      "scale(1.05)";
                                    e.currentTarget.style.boxShadow =
                                      "0 2px 8px rgba(0, 0, 0, 0.15)";
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.transform =
                                      "scale(1)";
                                    e.currentTarget.style.boxShadow = "none";
                                  }}
                                >
                                  {company.status === "Accepted"
                                    ? "Reject"
                                    : "Accept"}
                                </button>
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
          <div
            style={{
              animation: "fadeIn 0.3s",
              fontFamily: "Inter, sans-serif",
              width:"85%",
              height:"90%"
            }}
          >
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                marginBottom: "2rem",
                color: "#1f2937",
                letterSpacing: "-0.025em",
                // No fontFamily specified here to exclude Inter for the title
              }}
            >
              Manage Students
            </h2>
            <div
              style={{
                marginBottom: "1rem",
                padding: "0.5rem",
                background: "#f3f4f6",
                borderRadius: "0.375rem",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#4b5563",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                System Status: Running normally | Date: May 13, 2025 | Total
                Students: 10
              </p>
            </div>
            <div
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                alignItems: "flex-start",
                fontFamily: "Inter, sans-serif",
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
                    fontFamily: "Inter, sans-serif",
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
                  fontFamily: "Inter, sans-serif",
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
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
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
                  fontFamily: "Inter, sans-serif",
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
                <option value="Data Engineer">Data Engineer</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Applied Arts">Applied Arts</option>
              </select>
            </div>
            {filteredStudents.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <p
                  style={{ color: "#6b7280", fontFamily: "Inter, sans-serif" }}
                >
                  No students match your search criteria.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "20px",
                  padding: "10px",
                  maxWidth: "1600px",
                  margin: "0 auto",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    style={{
                      maxWidth: "320px",
                      background: "white",
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      padding: "20px",
                      transition: "transform 0.3s ease",
                      fontFamily: "Inter, sans-serif",
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
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        <img
                          src={student.avatar}
                          alt={student.name}
                          style={{
                            width: "4rem",
                            height: "4rem",
                            borderRadius: "9999px",
                            marginRight: "1rem",
                          }}
                        />
                        <div>
                          <h3
                            className="program-title"
                            style={{
                              fontSize: "1.1rem",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {student.name}
                          </h3>
                          <p
                            className="company-info"
                            style={{
                              color: "#636e72",
                              fontSize: "0.85rem",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {student.major}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          marginBottom: "0.75rem",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        <span
                          className="status"
                          style={{
                            padding: "0.25rem 0.5rem",
                            borderRadius: "9999px",
                            fontSize: "0.7rem",
                            fontFamily: "Inter, sans-serif",
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
                      style={{
                        color: "#4b5563",
                        fontSize: "0.8rem",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {student.details || "No additional details provided"}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        marginTop: "0.75rem",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <button
                        onClick={() => openModal("profile", student)}
                        style={{
                          width: "70%",
                          backgroundColor: "#2a9d8f",
                          color: "#fff",
                          padding: "0.5rem 1rem",
                          border: "none",
                          borderRadius: "0.375rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.875rem",
                          transition: "all 0.4s ease",
                          fontFamily: "Inter, sans-serif",
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
                      <button
                        onClick={() =>
                          (window.location.href = `mailto:${student.email}?subject=Message from Admin&body=Hello ${student.name},%0D%0AI wanted to get in touch regarding...`)
                        }
                        style={{
                          width: "30%",
                          backgroundColor: "#4a90e2",
                          color: "#fff",
                          padding: "0.5rem 1rem",
                          border: "none",
                          borderRadius: "0.375rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.875rem",
                          transition: "all 0.4s ease",
                          marginLeft: "20px",
                          fontFamily: "Inter, sans-serif",
                        }}
                        onMouseOver={(e) =>
                          Object.assign(e.currentTarget.style, {
                            backgroundColor: "#5a9ff3",
                            transform: "scale(1.02)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          })
                        }
                        onMouseOut={(e) =>
                          Object.assign(e.currentTarget.style, {
                            backgroundColor: "#4a90e2",
                            transform: "scale(1)",
                            boxShadow: "none",
                          })
                        }
                      >
                        <FaEnvelope
                          size={16}
                          style={{ marginRight: "0.5rem" }}
                        />
                      </button>
                    </div>
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
          <div
            style={{
              animation: "fadeIn 0.3s",
              padding: "1.5rem",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "0.375rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                maxWidth: "40rem",
                width: "100%",
                margin: "0 auto",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <div
                style={{
                  marginBottom: "1.5rem",
                  textAlign: "center",
                  fontFamily: "Inter, sans-serif",
                }}
              >
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
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {currentStudent.name}
                </h3>
                <div
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <ProfileItem
                    label="Semester"
                    value={currentStudent.semester}
                  />
                  <ProfileItem label="Major" value={currentStudent.major} />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "1rem",
                  fontFamily: "Inter, sans-serif",
                }}
              >
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
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Applied Internships
                </h3>
                <div
                  style={{
                    marginTop: "0.5rem",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {currentStudent.appliedInternships &&
                  currentStudent.appliedInternships.length > 0 ? (
                    currentStudent.appliedInternships.map(
                      (internship, index) => (
                        <div
                          key={index}
                          style={{
                            marginBottom: "0.75rem",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          <p
                            style={{
                              color: "#4b5563",
                              fontSize: "0.875rem",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            <strong>Company:</strong> {internship.companyName} -{" "}
                            <strong>Job Title:</strong> {internship.jobTitle}
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "0.875rem",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      No applied internships yet.
                    </p>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "2rem",
                  fontFamily: "Inter, sans-serif",
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
                    fontFamily: "Inter, sans-serif",
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
        const handleReportAction = (id, status, comment = "") => {
          const newStatus = status.charAt(0).toUpperCase() + status.slice(1);
          if (newStatus === "Rejected" || newStatus === "Flagged") {
            setReports((prevReports) =>
              prevReports.map((report) =>
                report.id === id
                  ? { ...report, status: newStatus, comment }
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
          setReports((prevReports) =>
            prevReports.map((report) =>
              report.id === id &&
              (report.status === "Rejected" || report.status === "Flagged")
                ? { ...report, comment }
                : report
            )
          );
          const report = reports.find((r) => r.id === id);
          addNotification(
            `Comment added to ${report.student}'s report: "${comment}"`,
            "report"
          );
        };

        return (
          <div style={{ animation: "fadeIn 0.3s" , width:"100%"}}>
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
              <div style={{ flex: "0 0 auto"  }}>
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
        background: "linear-gradient(90deg, #f9fafb 0%, #f3f4f6 100%)",
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
        onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = index % 2 === 0 ? "#fff" : "#fafafa")
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
                : {
                    background: "#dbeafe",
                    color: "#1e40af",
                  }),
            }}
          >
            {report.status}
          </span>
          {(report.status === "Rejected" || report.status === "Flagged") &&
            report.comment && (
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
                Comment: {report.comment}
              </div>
            )}
        </td>
        <td
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #e5e7eb",
            minWidth: "0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
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
                  e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
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
                  e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "#4a90e2";
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "none";
                }}
              >
                View Evaluation
              </button>
            </div>
            {(report.status === "Rejected" || report.status === "Flagged") && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  width: "100%",
                  marginTop: "0.5rem",
                }}
              >
                <input
                  type="text"
                  placeholder="Add a comment..."
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    flex: 1,
                    boxSizing: "border-box",
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.target.value.trim()) {
                      handleAddComment(report.id, e.target.value.trim());
                      e.target.value = "";
                    }
                  }}
                  ref={(el) => (inputRefs.current[report.id] = el)}
                />
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
                    padding: "0.5rem",
                    width: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    const input = inputRefs.current[report.id];
                    if (input && input.value.trim()) {
                      handleAddComment(report.id, input.value.trim());
                      input.value = "";
                    }
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#30b3a3";
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#2a9d8f";
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <FaPaperPlane size={16} />
                </button>
              </div>
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
          <div
            style={{
              maxWidth: "100%",
              animation: "fadeIn 0.3s",
              paddingLeft: sidebarWidth === "16rem" ? "8rem" : "2rem", // Reduced padding to prevent excessive shift
              transition: "padding-left 0.3s ease", // Smooth transition for sidebar toggle
              boxSizing: "border-box",
              width: "100%",
              margin: "0 auto",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                marginBottom: "2rem",
                color: "#1f2937",
                letterSpacing: "-0.025em",
              }}
            >
              Real-Time Statistics
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
                padding: "0",
              }}
            >
              {/* Reports This Cycle */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    marginBottom: "1rem",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Reports This Cycle
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      background: "#d1fae5",
                      padding: "1rem",
                      borderRadius: "0.375rem",
                      textAlign: "center",
                      color: "#065f46",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        margin: 0,
                      }}
                    >
                      {statistics.reportsPerCycle?.accepted || 0}
                    </p>
                    <p style={{ fontSize: "0.875rem", margin: 0 }}>Accepted</p>
                  </div>
                  <div
                    style={{
                      background: "#fee2e2",
                      padding: "1rem",
                      borderRadius: "0.375rem",
                      textAlign: "center",
                      color: "#dc2626",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        margin: 0,
                      }}
                    >
                      {statistics.reportsPerCycle?.rejected || 0}
                    </p>
                    <p style={{ fontSize: "0.875rem", margin: 0 }}>Rejected</p>
                  </div>
                  <div
                    style={{
                      background: "#fefcbf",
                      padding: "1rem",
                      borderRadius: "0.375rem",
                      textAlign: "center",
                      color: "#975a16",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        margin: 0,
                      }}
                    >
                      {statistics.reportsPerCycle?.flagged || 0}
                    </p>
                    <p style={{ fontSize: "0.875rem", margin: 0 }}>Flagged</p>
                  </div>
                  <div
                    style={{
                      background: "#dbeafe",
                      padding: "1rem",
                      borderRadius: "0.375rem",
                      textAlign: "center",
                      color: "#1e40af",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        margin: 0,
                      }}
                    >
                      {statistics.reportsPerCycle?.pending || 0}
                    </p>
                    <p style={{ fontSize: "0.875rem", margin: 0 }}>Pending</p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    marginBottom: "1rem",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Performance Metrics
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                    fontSize: "0.875rem",
                    color: "#4b5563",
                  }}
                >
                  <span>Average Review Time:</span>
                  <span>{statistics.averageReviewTime || "N/A"}</span>
                </div>
                <div
                  style={{
                    height: "0.5rem",
                    background: "#e5e7eb",
                    borderRadius: "9999px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: "#3b82f6",
                      width: "50%", // Example width, adjust dynamically if needed
                    }}
                  ></div>
                </div>
                {statistics.performanceMetrics && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "1rem",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                      }}
                    >
                      <span>Faculty Average:</span>
                      <span>
                        {statistics.performanceMetrics.facultyAverage || "N/A"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.5rem",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                      }}
                    >
                      <span>Department Average:</span>
                      <span>
                        {statistics.performanceMetrics.departmentAverage ||
                          "N/A"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.5rem",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                      }}
                    >
                      <span>University Average:</span>
                      <span>
                        {statistics.performanceMetrics.universityAverage ||
                          "N/A"}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Popular Courses */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    marginBottom: "1rem",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Popular Courses
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {(statistics.popularCourses || []).map((course, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                      }}
                    >
                      <span
                        style={{
                          width: "0.5rem",
                          height: "0.5rem",
                          background: "#9ca3af",
                          borderRadius: "50%",
                          marginRight: "0.75rem",
                        }}
                      ></span>
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
              <div
                style={{
                  background: "#fff",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    marginBottom: "1rem",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Top Rated Companies
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {(statistics.topCompanies || []).map((company, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                      }}
                    >
                      <span
                        style={{
                          width: "0.5rem",
                          height: "0.5rem",
                          background: index === 0 ? "#10b981" : "#2a9d8f",
                          borderRadius: "50%",
                          marginRight: "0.75rem",
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
              <div
                style={{
                  background: "#fff",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    marginBottom: "1rem",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Internship Count by Company
                </div>
                {statistics.internshipCount &&
                  Object.entries(statistics.internshipCount).map(
                    ([company, count], index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "1rem",
                          fontSize: "0.875rem",
                          color: "#4b5563",
                        }}
                      >
                        <div>
                          <span>{company}</span>
                          <span style={{ marginLeft: "1rem" }}>{count}</span>
                        </div>
                        <div
                          style={{
                            width: "60%",
                            height: "0.5rem",
                            background: "#e5e7eb",
                            borderRadius: "9999px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              background: "#3b82f6",
                              width: `${(count / 6) * 100}%`, // 6 is the max count in internshipCount
                            }}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
              </div>


            </div>

            {/* Generate Report Button */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "2rem",
                marginBottom: "2rem",
                width: "100%",
              }}
            >
              <button
                onClick={() => generateStatisticsReport(statistics)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  backgroundColor: "#2a9d8f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#30b3a3")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2a9d8f")}
              >
                <Download size={18} style={{ marginRight: "0.5rem" }} />
                Generate Comprehensive Report
              </button>
              <p
                style={{
                  marginTop: "0.5rem",
                  textAlign: "center",
                  color: "#6b7280",
                  fontSize: "0.875rem",
                }}
              >
                This will generate a PDF with all current statistics.
              </p>
            </div>
          </div>
        );
      case "video-calls":
        return (
          <div
            className="w-screen h-screen"
            style={{ marginLeft: -90, marginTop: -20 }}
          >
            <VideoCallDashboard />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f3f4f6" }}>
      {/* Sidebar */}

      <SideBar
        setActivePage={setActivePage}
        activePage={activePage}
        onWidthChange={setSidebarWidth}
      />
      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header edited */}
        <Header
          setActivePage={setActivePage}
          activePage={activePage}
          toggleSidebar={toggleSidebar}
        />
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
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1002,
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
            {renderModalContent()}
          </div>
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
