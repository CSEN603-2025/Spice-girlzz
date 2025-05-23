// import { useState, useEffect } from "react";
// import SideBar from "./Components/FacultySideBar";
// import FacultyHeader from "./Components/FacultyHeader";
// import { useNavigate } from "react-router-dom";
// import { Bell, Flag, Check, X, Download, Search } from "lucide-react";
// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
// import FacultySideBar from "./Components/FacultySideBar";

// const generateDummyPDF = async (report) => {
//   try {
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage();
//     const { width, height } = page.getSize();
//     const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
//     const text = `
//       Internship Report
//       ================
      
//       Student: ${report.student}
//       Major: ${report.major}
//       Company: ${report.company}
//       Status: ${report.status}
      
//       Report Details:
//       ${report.details}
//     `;
    
//     page.drawText(text, {
//       x: 50,
//       y: height - 50,
//       size: 12,
//       font,
//       color: rgb(0, 0, 0),
//     });
    
//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `Report_${report.student.replace(' ', '_')}_${report.id}.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//   }
// };
// // Helper Component
// const ProfileItem = ({ label, value }) => (
//   <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
//     <strong>{label}:</strong> {value || "Not provided"}
//   </p>
// );

// // const initialReports = [
// //   {
// //     id: 1,
// //     student: "Alice Johnson",
// //     major: "Computer Science",
// //     status: "Pending",
// //     details: "Week 1 Report: Developed API endpoints.",
// //     company: "TechCorp",
// //     supervisor: "John Doe",
// //     startDate: "2025-01-01",
// //     endDate: "2025-03-01",
// //   },
// //   {
// //     id: 2,
// //     student: "Bob Smith",
// //     major: "Engineering",
// //     status: "Flagged",
// //     details: "Week 2 Report: Missing documentation.",
// //     company: "GreenEnergy",
// //     supervisor: "Jane Roe",
// //     startDate: "2025-02-01",
// //     endDate: "2025-04-01",
// //     comments: "Needs more detail on project scope.",
// //   },
// //   {
// //     id: 3,
// //     student: "Clara Davis",
// //     major: "Computer Science",
// //     status: "Accepted",
// //     details: "Final Report: Successfully deployed app.",
// //     company: "MediHealth",
// //     supervisor: "Emily Stone",
// //     startDate: "2025-01-15",
// //     endDate: "2025-03-15",
// //   },
// //   {
// //     id: 4,
// //     student: "David Wilson",
// //     major: "Data Science",
// //     status: "Rejected",
// //     details: "Week 3 Report: Incomplete analysis.",
// //     company: "FinTech Solutions",
// //     supervisor: "Michael Chen",
// //     startDate: "2025-02-15",
// //     endDate: "2025-04-15",
// //   },
// //   {
// //     id: 5,
// //     student: "Emma Brown",
// //     major: "Engineering",
// //     status: "Pending",
// //     details: "Week 1 Report: Initial design phase.",
// //     company: "EduLearn",
// //     supervisor: "Sarah Johnson",
// //     startDate: "2025-03-01",
// //     endDate: "2025-05-01",
// //   },
// // ];

// const initialStatistics = {
//   reportsPerCycle: { accepted: 12, rejected: 4, flagged: 3, pending: 5 },
//   averageReviewTime: "3 days",
//   popularCourses: [
//     { name: "CS101", reports: 15 },
//     { name: "ENG202", reports: 12 },
//     { name: "DS100", reports: 8 }
//   ],
//   topCompanies: [
//     { name: "TechCorp", rating: 4.7, reports: 6 },
//     { name: "MediHealth", rating: 4.6, reports: 4 },
//     { name: "FinTech Solutions", rating: 4.4, reports: 5 }
//   ],
//   statusTrends: {
//     labels: ["Jan", "Feb", "Mar", "Apr"],
//     accepted: [8, 10, 12, 15],
//     rejected: [2, 3, 4, 5],
//     flagged: [1, 2, 3, 4]
//   },
//   performanceMetrics: {
//     facultyAverage: 3.2,
//     departmentAverage: 2.8,
//     universityAverage: 2.5
//   }
// };
// const generateStatisticsReport = async (stats, evaluations = []) => {
//   try {
//     const now = new Date();
//     const reportDate = now.toLocaleDateString();
//     const reportTime = now.toLocaleTimeString();
    
//     // Create PDF document
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([600, 800]);
//     const { width, height } = page.getSize();
//     const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
//     let yPosition = height - 50;
    
//     // Add title
//     page.drawText('Internship Program Statistics Report', {
//       x: 50,
//       y: yPosition,
//       size: 20,
//       font: boldFont,
//       color: rgb(0, 0, 0.5),
//     });
//     yPosition -= 30;
    
//     // Add metadata
//     page.drawText(`Generated on: ${reportDate} at ${reportTime}`, {
//       x: 50,
//       y: yPosition,
//       size: 10,
//       font,
//       color: rgb(0.5, 0.5, 0.5),
//     });
//     yPosition -= 40;
    
//     // Section 1: Summary Statistics
//     page.drawText('1. Summary Statistics', {
//       x: 50,
//       y: yPosition,
//       size: 14,
//       font: boldFont,
//       color: rgb(0, 0, 0),
//     });
//     yPosition -= 25;
    
//     const summaryText = `
//       Total Reports: ${stats.reportsPerCycle.accepted + stats.reportsPerCycle.rejected + stats.reportsPerCycle.flagged + stats.reportsPerCycle.pending}
//       Accepted: ${stats.reportsPerCycle.accepted} (${Math.round((stats.reportsPerCycle.accepted / (stats.reportsPerCycle.accepted + stats.reportsPerCycle.rejected + stats.reportsPerCycle.flagged + stats.reportsPerCycle.pending)) * 100)}%)
//       Rejected: ${stats.reportsPerCycle.rejected}
//       Flagged: ${stats.reportsPerCycle.flagged}
//       Pending: ${stats.reportsPerCycle.pending}
//       Average Review Time: ${stats.averageReviewTime}
//     `;
    
//     page.drawText(summaryText, {
//       x: 60,
//       y: yPosition,
//       size: 12,
//       font,
//       color: rgb(0, 0, 0),
//       lineHeight: 15,
//     });
//     yPosition -= 100;
    
//     // Section 2: Popular Courses
//     page.drawText('2. Popular Courses', {
//       x: 50,
//       y: yPosition,
//       size: 14,
//       font: boldFont,
//       color: rgb(0, 0, 0),
//     });
//     yPosition -= 25;
    
//     stats.popularCourses.forEach((course, index) => {
//       page.drawText(`${index + 1}. ${course.name}: ${course.reports} reports`, {
//         x: 60,
//         y: yPosition,
//         size: 12,
//         font,
//         color: rgb(0, 0, 0),
//       });
//       yPosition -= 20;
//     });
//     yPosition -= 20;
    
//     // Section 3: Top Companies
//     page.drawText('3. Top Companies', {
//       x: 50,
//       y: yPosition,
//       size: 14,
//       font: boldFont,
//       color: rgb(0, 0, 0),
//     });
//     yPosition -= 25;
    
//     stats.topCompanies.forEach((company, index) => {
//       page.drawText(`${index + 1}. ${company.name} (Rating: ${company.rating}): ${company.reports} interns`, {
//         x: 60,
//         y: yPosition,
//         size: 12,
//         font,
//         color: rgb(0, 0, 0),
//       });
//       yPosition -= 20;
//     });
//     yPosition -= 30;
    
//     // Section 4: Performance Metrics
//     page.drawText('4. Performance Metrics', {
//       x: 50,
//       y: yPosition,
//       size: 14,
//       font: boldFont,
//       color: rgb(0, 0, 0),
//     });
//     yPosition -= 25;
    
//     page.drawText(`Faculty Average Review Time: ${stats.performanceMetrics.facultyAverage} days`, {
//       x: 60,
//       y: yPosition,
//       size: 12,
//       font,
//       color: rgb(0, 0, 0),
//     });
//     yPosition -= 20;
    
//     page.drawText(`Department Average: ${stats.performanceMetrics.departmentAverage} days`, {
//       x: 60,
//       y: yPosition,
//       size: 12,
//       font,
//       color: rgb(0, 0, 0),
//     });
//     yPosition -= 20;
    
//     page.drawText(`University Average: ${stats.performanceMetrics.universityAverage} days`, {
//       x: 60,
//       y: yPosition,
//       size: 12,
//       font,
//       color: rgb(0, 0, 0),
//     });
//     yPosition -= 40;

//     // Section 5: Company Evaluations (only if evaluations exist)
//     if (evaluations.length > 0) {
//       page.drawText('5. Company Evaluations', {
//         x: 50,
//         y: yPosition,
//         size: 14,
//         font: boldFont,
//         color: rgb(0, 0, 0),
//       });
//       yPosition -= 25;

//       // Calculate evaluation stats
//       const totalEvaluations = evaluations.length;
//       const avgRating = (evaluations.reduce((sum, evaluate) => sum + eval.rating, 0)) / totalEvaluations;
//       const ratingDistribution = [0, 0, 0, 0, 0]; // 1-5 stars
//       evaluations.forEach(evaluate => ratingDistribution[eval.rating - 1]++);

//       const evalText = `
//         Total Evaluations: ${totalEvaluations}
//         Average Rating: ${avgRating.toFixed(1)}/5
//         Rating Distribution:
//         ★★★★★: ${ratingDistribution[4]} (${Math.round((ratingDistribution[4]/totalEvaluations)*100)}%)
//         ★★★★: ${ratingDistribution[3]} (${Math.round((ratingDistribution[3]/totalEvaluations)*100)}%)
//         ★★★: ${ratingDistribution[2]} (${Math.round((ratingDistribution[2]/totalEvaluations)*100)}%)
//         ★★: ${ratingDistribution[1]} (${Math.round((ratingDistribution[1]/totalEvaluations)*100)}%)
//         ★: ${ratingDistribution[0]} (${Math.round((ratingDistribution[0]/totalEvaluations)*100)}%)
//       `;

//       page.drawText(evalText, {
//         x: 60,
//         y: yPosition,
//         size: 12,
//         font,
//         color: rgb(0, 0, 0),
//         lineHeight: 15,
//       });
//       yPosition -= 150;

//       // Sample of recent comments
//       page.drawText('Recent Comments:', {
//         x: 50,
//         y: yPosition,
//         size: 12,
//         font: boldFont,
//         color: rgb(0, 0, 0),
//       });
//       yPosition -= 20;

//       evaluations.slice(0, 3).forEach(evaluate => {
//         const commentText = `"${eval.comments.substring(0, 60)}${eval.comments.length > 60 ? '...' : ''}" - ${eval.studentName}`;
//         page.drawText(commentText, {
//           x: 60,
//           y: yPosition,
//           size: 10,
//           font,
//           color: rgb(0, 0, 0),
//         });
//         yPosition -= 15;
//       });
//     }
    
//     // Footer
//     page.drawText('Generated by Faculty Dashboard System', {
//       x: 50,
//       y: 30,
//       size: 10,
//       font,
//       color: rgb(0.5, 0.5, 0.5),
//     });
    
//     // Save and download
//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `Internship_Statistics_Report_${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
    
//   } catch (error) {
//     console.error('Error generating statistics report:', error);
//     alert('Failed to generate report. Please try again.');
//   }
// };
// export default function FacultyMember() {
//   const navigate = useNavigate();
//   const [activePage, setActivePage] = useState("reports");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [majorFilter, setMajorFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [reports, setReports] = useState(initialReports);
//   const [statistics, setStatistics] = useState(initialStatistics);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [clarification, setClarification] = useState("");
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   // Add state for sidebar width
//   const [sidebarWidth, setSidebarWidth] = useState("4rem");

// //   // Define the onWidthChange handler
// //   const handleWidthChange = (newWidth) => {
// //     setSidebarWidth(newWidth);
// //   };

// //   const filteredReports = reports.filter(
// //     (report) =>
// //       report.student.toLowerCase().includes(searchTerm.toLowerCase()) &&
// //       (majorFilter ? report.major === majorFilter : true) &&
// //       (statusFilter ? report.status === statusFilter : true)
// //   );

// //   useEffect(() => {
// //     const newNotifications = [
// //       {
// //         id: 1,
// //         message: "New report submitted by Alice Johnson",
// //         time: "10 min ago",
// //       },
// //       { id: 2, message: "Report from Bob Smith flagged", time: "1 hour ago" },
// //     ];
// //     setNotifications(newNotifications);
// //   }, []);

// //   const handleReportStatusChange = (id, status) => {
// //     setReports((prevReports) =>
// //       prevReports.map((report) =>
// //         report.id === id
// //           ? {
// //               ...report,
// //               status: status.charAt(0).toUpperCase() + status.slice(1),
// //             }
// //           : report
// //       )
// //     );
// //     const report = reports.find((r) => r.id === id);
// //     setNotifications([
// //       {
// //         id: Date.now(),
// //         message: `Report from ${report.student} marked as ${status}`,
// //         time: "Just now",
// //       },
// //       ...notifications,
// //     ]);
// //   };

// //   const submitClarification = (id) => {
// //     const report = reports.find((r) => r.id === id);
// //     setReports((prevReports) =>
// //       prevReports.map((r) =>
// //         r.id === id ? { ...r, comments: clarification } : r
// //       )
// //     );
// //     setNotifications([
// //       {
// //         id: Date.now(),
// //         message: `Clarification submitted for ${report.student}'s report`,
// //         time: "Just now",
// //       },
// //       ...notifications,
// //     ]);
// //     setClarification("");
// //     setShowModal(false);
// //   };

// //   const openModal = (type, item) => {
// //     setSelectedItem(item);
// //     setModalType(type);
// //     setShowModal(true);
// //   };

// //   const closeModal = () => {
// //     setShowModal(false);
// //     setSelectedItem(null);
// //     setClarification("");
// //   };

// //   const renderModalContent = () => {
// //     if (!selectedItem) return null;

//     switch (modalType) {
//       case "report":
//         return (
//           <div style={{ animation: "fadeIn 0.3s", padding: "1.5rem" }}>
//             <div
//               style={{
//                 background: "#fff",
//                 padding: "1.5rem",
//                 borderRadius: "0.5rem",
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 maxWidth: "20rem",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: "1rem",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.25rem",
//                     fontWeight: "bold",
//                     color: "#1f2937",
//                   }}
//                 >
//                   Report from {selectedItem.student}
//                 </h3>
//                 <button
//                   onClick={closeModal}
//                   style={{ color: "#6b7280", cursor: "pointer" }}
//                 >
//                   <X size={24} />
//                 </button>
//               </div>
//               <div style={{ marginBottom: "1rem" }}>
//                 <ProfileItem label="Major" value={selectedItem.major} />
//                 <ProfileItem label="Company" value={selectedItem.company} />
//                 <ProfileItem
//                   label="Supervisor"
//                   value={selectedItem.supervisor}
//                 />
//                 <ProfileItem
//                   label="Period"
//                   value={`${selectedItem.startDate} to ${selectedItem.endDate}`}
//                 />
//                 <ProfileItem label="Status" value={selectedItem.status} />
//                 <ProfileItem label="Details" value={selectedItem.details} />
//                 {selectedItem.comments && (
//                   <ProfileItem label="Comments" value={selectedItem.comments} />
//                 )}
//               </div>
//               {selectedItem.status === "Pending" && (
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     gap: "0.5rem",
//                   }}
//                 >
//                   <button
//                     onClick={() =>
//                       handleReportStatusChange(selectedItem.id, "flagged")
//                     }
//                     style={{
//                       padding: "0.5rem",
//                       background: "#f59e0b",
//                       color: "#fff",
//                       borderRadius: "0.25rem",
//                       flex: 1,
//                     }}
//                   >
//                     <Flag size={16} /> Flag
//                   </button>
//                   <button
//                     onClick={() =>
//                       handleReportStatusChange(selectedItem.id, "rejected")
//                     }
//                     style={{
//                       padding: "0.5rem",
//                       background: "#ef4444",
//                       color: "#fff",
//                       borderRadius: "0.25rem",
//                       flex: 1,
//                     }}
//                   >
//                     <X size={16} /> Reject
//                   </button>
//                   <button
//                     onClick={() =>
//                       handleReportStatusChange(selectedItem.id, "accepted")
//                     }
//                     style={{
//                       padding: "0.5rem",
//                       background: "#10b981",
//                       color: "#fff",
//                       borderRadius: "0.25rem",
//                       flex: 1,
//                     }}
//                   >
//                     <Check size={16} /> Accept
//                   </button>
//                 </div>
//               )}
//               {(selectedItem.status === "Flagged" ||
//                 selectedItem.status === "Rejected") && (
//                 <div style={{ marginTop: "1rem" }}>
//                   <textarea
//                     value={clarification}
//                     onChange={(e) => setClarification(e.target.value)}
//                     placeholder="Enter clarification..."
//                     style={{
//                       width: "100%",
//                       padding: "0.5rem",
//                       border: "1px solid #d1d5db",
//                       borderRadius: "0.25rem",
//                       resize: "vertical",
//                     }}
//                   />
//                   <button
//                     onClick={() => submitClarification(selectedItem.id)}
//                     style={{
//                       marginTop: "0.5rem",
//                       padding: "0.5rem 1rem",
//                       background: "#3b82f6",
//                       color: "#fff",
//                       borderRadius: "0.25rem",
//                     }}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               )}
//              <button
//   onClick={() => generateDummyPDF(selectedItem)}
//   style={{
//     marginTop: "0.5rem",
//     padding: "0.5rem",
//     background: "#6b7280",
//     color: "#fff",
//     borderRadius: "0.25rem",
//     display: "flex",
//     alignItems: "center",
//   }}
// >
//   <Download size={16} /> Download PDF
// </button>
//             </div>
//           </div>
//         );
//       case "statistics":
//         return (
//           <div style={{ animation: "fadeIn 0.3s" }}>
//             <h2
//               style={{
//                 fontSize: "1.5rem",
//                 fontWeight: "bold",
//                 marginBottom: "1.5rem",
//                 color: "#1f2937",
//               }}
//             >
//               Real-Time Statistics
//             </h2>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
//                 gap: "1.5rem",
//               }}
//             >
//               <div
//                 style={{
//                   background: "#fff",
//                   padding: "1.5rem",
//                   borderRadius: "0.375rem",
//                   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.25rem",
//                     fontWeight: "bold",
//                     marginBottom: "1rem",
//                     color: "#1f2937",
//                   }}
//                 >
//                   Reports This Cycle
//                 </h3>
//                 <div style={{ display: "flex", gap: "0.3rem" }}>
//                   <div
//                     style={{
//                       background: "#d1fae5",
//                       borderRadius: "0.375rem",
//                       padding: "0.75rem",
//                       flex: 1,
//                       textAlign: "center",
//                     }}
//                   >
//                     <p
//                       style={{
//                         fontSize: "1.5rem",
//                         fontWeight: "bold",
//                         color: "#065f46",
//                       }}
//                     >
//                       {statistics.reportsPerCycle.accepted}
//                     </p>
//                     <p style={{ fontSize: "0.875rem", color: "#065f46" }}>
//                       Accepted
//                     </p>
//                   </div>
//                   <div
//                     style={{
//                       background: "#fee2e2",
//                       borderRadius: "0.375rem",
//                       padding: "0.75rem",
//                       flex: 1,
//                       textAlign: "center",
//                     }}
//                   >
//                     <p
//                       style={{
//                         fontSize: "1.5rem",
//                         fontWeight: "bold",
//                         color: "#991b1b",
//                       }}
//                     >
//                       {statistics.reportsPerCycle.rejected}
//                     </p>
//                     <p style={{ fontSize: "0.875rem", color: "#991b1b" }}>
//                       Rejected
//                     </p>
//                   </div>
//                   <div
//                     style={{
//                       background: "#fefcbf",
//                       borderRadius: "0.375rem",
//                       padding: "0.75rem",
//                       flex: 1,
//                       textAlign: "center",
//                     }}
//                   >
//                     <p
//                       style={{
//                         fontSize: "1.5rem",
//                         fontWeight: "bold",
//                         color: "#975a16",
//                       }}
//                     >
//                       {statistics.reportsPerCycle.flagged}
//                     </p>
//                     <p style={{ fontSize: "0.875rem", color: "#975a16" }}>
//                       Flagged
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 style={{
//                   background: "#fff",
//                   padding: "1.5rem",
//                   borderRadius: "0.375rem",
//                   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontWeight: "bold",
//                     color: "#1f2937",
//                     marginBottom: "0.75rem",
//                   }}
//                 >
//                   Performance Metrics
//                 </h3>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <span style={{ color: "#6b7280" }}>Average Review Time:</span>
//                   <span style={{ fontWeight: "bold", color: "#3b82f6" }}>
//                     {statistics.averageReviewTime}
//                   </span>
//                 </div>
//                 <div
//                   style={{
//                     width: "100%",
//                     background: "#e5e7eb",
//                     borderRadius: "9999px",
//                     height: "0.625rem",
//                   }}
//                 >
//                   <div
//                     style={{
//                       background: "#3b82f6",
//                       height: "0.625rem",
//                       borderRadius: "9999px",
//                       width: "75%",
//                     }}
//                   ></div>
//                 </div>
//               </div>
//               <div
//                 style={{
//                   background: "#fff",
//                   padding: "1.5rem",
//                   borderRadius: "0.375rem",
//                   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontWeight: "bold",
//                     color: "#1f2937",
//                     marginBottom: "0.75rem",
//                   }}
//                 >
//                   Popular Courses
//                 </h3>
//                 <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
//                   {statistics.popularCourses.map((course, index) => (
//                     <li
//                       key={index}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         marginBottom: "0.5rem",
//                       }}
//                     >
//                       <span
//                         style={{
//                           width: "0.5rem",
//                           height: "0.5rem",
//                           background: "#3b82f6",
//                           borderRadius: "50%",
//                           marginRight: "0.5rem",
//                         }}
//                       ></span>
//                       <span style={{ color: "#4b5563" }}>{course}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div
//                 style={{
//                   background: "#fff",
//                   padding: "1.5rem",
//                   borderRadius: "0.375rem",
//                   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontWeight: "bold",
//                     color: "#1f2937",
//                     marginBottom: "0.75rem",
//                   }}
//                 >
//                   Top Rated Companies
//                 </h3>
//                 <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
//                   {statistics.topCompanies.map((company, index) => (
//                     <li
//                       key={index}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         marginBottom: "0.5rem",
//                       }}
//                     >
//                       <span
//                         style={{
//                           width: "0.5rem",
//                           height: "0.5rem",
//                           background: index === 0 ? "#10b981" : "#3b82f6",
//                           borderRadius: "50%",
//                           marginRight: "0.5rem",
//                         }}
//                       ></span>
//                       <span style={{ color: "#4b5563" }}>{company}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div
//                 style={{
//                   background: "#fff",
//                   padding: "1.5rem",
//                   borderRadius: "0.375rem",
//                   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontWeight: "bold",
//                     color: "#1f2937",
//                     marginBottom: "0.75rem",
//                   }}
//                 >
//                   Internship Count by Company
//                 </h3>
//                 {Object.entries(statistics.internshipCount).map(
//                   ([company, count], index) => (
//                     <div key={index}>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           marginBottom: "0.25rem",
//                         }}
//                       >
//                         <span style={{ color: "#4b5563" }}>{company}</span>
//                         <span style={{ color: "#4b5563", fontWeight: "bold" }}>
//                           {count}
//                         </span>
//                       </div>
//                       <div
//                         style={{
//                           width: "100%",
//                           background: "#e5e7eb",
//                           borderRadius: "9999px",
//                           height: "0.5rem",
//                         }}
//                       >
//                         <div
//                           style={{
//                             background: "#3b82f6",
//                             height: "0.5rem",
//                             borderRadius: "9999px",
//                             width: `${(count / 6) * 100}%`,
//                           }}
//                         ></div>
//                       </div>
//                     </div>
//                   )
//                 )}
//               </div>
//              <div style={{ marginTop: "2rem", textAlign: "center" }}>
//   <button
//     onClick={() => generateStatisticsReport(statistics)}
//     style={{
//       padding: "0.75rem 1.5rem",
//       background: "#3b82f6",
//       color: "#fff",
//       borderRadius: "0.375rem",
//       fontWeight: "bold",
//       display: "inline-flex",
//       alignItems: "center",
//       gap: "0.5rem",
//       cursor: "pointer",
//       border: "none",
//       fontSize: "1rem",
//     }}
//   >
//     <Download size={18} />
//     Generate Comprehensive Report
//   </button>
//   <p style={{ marginTop: "0.5rem", color: "#2a9d8f", fontSize: "0.875rem" }}>
//     This will generate a PDF with all current statistics
//   </p>
// </div>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const renderContent = () => {
//     switch (activePage) {
//       case "reports":
//         return (
//           <div style={{ animation: "fadeIn 0.3s" }}>
//             <h2
//               style={{
//                 fontSize: "1.5rem",
//                 fontWeight: "bold",
//                 marginBottom: "1.5rem",
//                 color: "#1f2937",
//               }}
//             >
//               Manage Reports
//             </h2>
//             <div
//               style={{
//                 marginBottom: "1.5rem",
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: "0.75rem",
//                 alignItems: "flex-start",
//               }}
//             >
//               <div
//                 style={{
//                   position: "relative",
//                   flex: "1 1 20rem",
//                   minWidth: "15rem",
//                 }}
//               >
//                 <Search
//                   style={{
//                     position: "absolute",
//                     left: "0.5rem",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     color: "#9ca3af",
//                   }}
//                   size={16}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search by student name..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   style={{
//                     padding: "0.4rem 0.4rem 0.4rem 2rem",
//                     width: "100%",
//                     border: "1px solid #d1d5db",
//                     borderRadius: "0.375rem",
//                     outline: "none",
//                     boxSizing: "border-box",
//                     fontSize: "0.875rem",
//                   }}
//                 />
//               </div>
//               <select
//                 value={majorFilter}
//                 onChange={(e) => setMajorFilter(e.target.value)}
//                 style={{
//                   padding: "0.4rem",
//                   border: "1px solid #d1d5db",
//                   borderRadius: "0.375rem",
//                   outline: "none",
//                   minWidth: "12rem",
//                   width: "12rem",
//                   fontSize: "0.875rem",
//                 }}
//               >
//                 <option value="">All Majors</option>
//                 <option value="Computer Science">Computer Science</option>
//                 <option value="Engineering">Engineering</option>
//                 <option value="Data Science">Data Science</option>
//               </select>
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 style={{
//                   padding: "0.4rem",
//                   border: "1px solid #d1d5db",
//                   borderRadius: "0.375rem",
//                   outline: "none",
//                   minWidth: "12rem",
//                   width: "12rem",
//                   fontSize: "0.875rem",
//                 }}
//               >
//                 <option value="">All Statuses</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Flagged">Flagged</option>
//                 <option value="Rejected">Rejected</option>
//                 <option value="Accepted">Accepted</option>
//               </select>
//             </div>
//             {filteredReports.length === 0 ? (
//               <div style={{ textAlign: "center", padding: "3rem" }}>
//                 <p style={{ color: "#6b7280" }}>
//                   No reports match your search criteria.
//                 </p>
//               </div>
//             ) : (
//               <div
//                 style={{
//                   background: "#fff",
//                   borderRadius: "0.375rem",
//                   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                   overflow: "hidden",
//                 }}
//               >
//                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                   <thead>
//                     <tr style={{ background: "#f3f4f6" }}>
//                       <th
//                         style={{
//                           padding: "1rem",
//                           textAlign: "left",
//                           color: "#1f2937",
//                         }}
//                       >
//                         Student
//                       </th>
//                       <th
//                         style={{
//                           padding: "1rem",
//                           textAlign: "left",
//                           color: "#1f2937",
//                         }}
//                       >
//                         Company
//                       </th>
//                       <th
//                         style={{
//                           padding: "1rem",
//                           textAlign: "left",
//                           color: "#1f2937",
//                         }}
//                       >
//                         Major
//                       </th>
//                       <th
//                         style={{
//                           padding: "1rem",
//                           textAlign: "left",
//                           color: "#1f2937",
//                         }}
//                       >
//                         Status
//                       </th>
//                       <th
//                         style={{
//                           padding: "1rem",
//                           textAlign: "left",
//                           color: "#1f2937",
//                         }}
//                       >
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredReports.map((report) => (
//                       <tr
//                         key={report.id}
//                         style={{
//                           background: "none",
//                           transition: "background-color 0.3s",
//                         }}
//                         onMouseOver={(e) =>
//                           (e.target.style.background = "#f9fafb")
//                         }
//                         onMouseOut={(e) => (e.target.style.background = "none")}
//                       >
//                         <td
//                           style={{
//                             padding: "1rem",
//                             borderBottom: "1px solid #e5e7eb",
//                           }}
//                         >
//                           {report.student}
//                         </td>
//                         <td
//                           style={{
//                             padding: "1rem",
//                             borderBottom: "1px solid #e5e7eb",
//                           }}
//                         >
//                           {report.company}
//                         </td>
//                         <td
//                           style={{
//                             padding: "1rem",
//                             borderBottom: "1px solid #e5e7eb",
//                           }}
//                         >
//                           {report.major}
//                         </td>
//                         <td
//                           style={{
//                             padding: "1rem",
//                             borderBottom: "1px solid #e5e7eb",
//                           }}
//                         >
//                           <span
//                             style={{
//                               padding: "0.25rem 0.5rem",
//                               borderRadius: "9999px",
//                               fontSize: "0.75rem",
//                               ...(report.status === "Accepted"
//                                 ? { background: "#d1fae5", color: "#065f46" }
//                                 : report.status === "Rejected"
//                                 ? { background: "#fee2e2", color: "#991b1b" }
//                                 : report.status === "Flagged"
//                                 ? { background: "#fefcbf", color: "#975a16" }
//                                 : { background: "#dbeafe", color: "#1e40af" }),
//                             }}
//                           >
//                             {report.status}
//                           </span>
//                         </td>
//                         <td
//                           style={{
//                             padding: "1rem",
//                             borderBottom: "1px solid #e5e7eb",
//                           }}
//                         >
//                           <button
//                             onClick={() => openModal("report", report)}
//                             style={{ color: "#3b82f6", cursor: "pointer" }}
//                           >
//                             View Details
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         );
//       case "statistics": //This is the correct placement; do not remove this :) -Menna Shaaban
//         return (
//     <div style={{ animation: "fadeIn 0.3s" }}>
//       <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#1f2937" }}>
//         Real-Time Statistics
//       </h2>
      
//       {/* ... (existing statistics content) ... */}

//       {/* ===== ADD THE BUTTON HERE ===== */}
//       <div style={{ marginTop: "2rem", textAlign: "center" }}>
//         <button
//           onClick={() => generateStatisticsReport(statistics)}
//           style={{
//             padding: "0.75rem 1.5rem",
//             background: "#3b82f6",
//             color: "#fff",
//             borderRadius: "0.375rem",
//             fontWeight: "bold",
//             display: "inline-flex",
//             alignItems: "center",
//             gap: "0.5rem",
//             cursor: "pointer",
//             border: "none",
//             fontSize: "1rem",
//           }}
//         >
//           <Download size={18} />
//           Generate Comprehensive Report
//         </button>
//         <p style={{ marginTop: "0.5rem", color: "#6b7280", fontSize: "0.875rem" }}>
//           This will generate a PDF with all current statistics.
//         </p>
//       </div>
//     </div>
//   );
//     }
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh", background: "#f3f4f6" }}>
//       <FacultySideBar
//         setActivePage={setActivePage}
//         activePage={activePage}
//         onWidthChange={handleWidthChange} // Add this prop
//       />
//       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <FacultyHeader />
//         {showNotifications && (
//           <div
//             style={{
//               position: "absolute",
//               top: "4rem",
//               right: "1rem",
//               width: "20rem",
//               background: "#fff",
//               borderRadius: "0.375rem",
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//               zIndex: 50,
//             }}
//           >
//             <div style={{ padding: "1rem", borderBottom: "1px solid #e5e7eb" }}>
//               <h3
//                 style={{
//                   fontSize: "1.125rem",
//                   fontWeight: "bold",
//                   color: "#1f2937",
//                 }}
//               >
//                 Notifications
//               </h3>
//             </div>
//             <div style={{ maxHeight: "24rem", overflowY: "auto" }}>
//               {notifications.length === 0 ? (
//                 <p
//                   style={{
//                     padding: "1rem",
//                     color: "#6b7280",
//                     textAlign: "center",
//                   }}
//                 >
//                   No notifications
//                 </p>
//               ) : (
//                 notifications.map((n) => (
//                   <div
//                     key={n.id}
//                     style={{
//                       padding: "1rem",
//                       borderBottom: "1px solid #e5e7eb",
//                     }}
//                   >
//                     <p style={{ color: "#4b5563" }}>{n.message}</p>
//                     <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
//                       {n.time}
//                     </p>
//                   </div>
//                 ))
//               )}
//             </div>
//             <div style={{ padding: "1rem", borderTop: "1px solid #e5e7eb" }}>
//               <button
//                 onClick={() => setShowNotifications(false)}
//                 style={{ width: "100%", textAlign: "center", color: "#3b82f6" }}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//         <main
//           style={{
//             flex: 1,
//             padding: "1.5rem",
//             overflowY: "auto",
//             marginTop: "4rem",
//             marginLeft: sidebarWidth, // Adjust margin based on sidebar width
//             transition: "margin-left 0.3s ease-in-out", // Smooth transition
//           }}
//         >
//           {renderContent()}
//         </main>
//       </div>
//       {showModal && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 50,
//           }}
//         >
//           {renderModalContent()}
//         </div>
//       )}
//     </div>
//   );
// }

// // const styles = `
// //   @keyframes fadeIn {
// //     from { opacity: 0; }
// //     to { opacity: 1; }
// //   }
// // `;

// // const styleSheet = document.createElement("style");
// // styleSheet.textContent = styles;
// // document.head.appendChild(styleSheet);