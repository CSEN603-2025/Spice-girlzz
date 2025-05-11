import { useState } from "react";
import { Search, X, Download } from "lucide-react"; // Added Download icon
import SideBar from "./Components/FacultySideBar";
import Header from "./Components/Header";
import jsPDF from "jspdf"; // Import jsPDF for PDF generation

// Helper Component (reused from original code)
const ProfileItem = ({ label, value }) => (
  <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
    <strong>{label}:</strong> {value || "Not provided"}
  </p>
);

// Sample data (reused from original code)
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

export default function ReportFilterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [majorFilter, setMajorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [reports] = useState(initialReports);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("4rem");

  // Handle sidebar width change
  const handleWidthChange = (newWidth) => {
    setSidebarWidth(newWidth);
  };

  // Filter reports based on search term, major, and status
  const filteredReports = reports.filter(
    (report) =>
      report.student.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (majorFilter ? report.major === majorFilter : true) &&
      (statusFilter ? report.status === statusFilter : true)
  );

  // Open modal to view report details
  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  // Generate and download PDF
  const downloadPDF = (report) => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Internship Report", 20, 20);
      doc.setFontSize(12);
      doc.text(`Student: ${report.student}`, 20, 40);
      doc.text(`Major: ${report.major}`, 20, 50);
      doc.text(`Company: ${report.company}`, 20, 60);
      doc.text(`Supervisor: ${report.supervisor}`, 20, 70);
      doc.text(`Period: ${report.startDate} to ${report.endDate}`, 20, 80);
      doc.text(`Status: ${report.status}`, 20, 90);
      // Wrap text for details to prevent overflow
      doc.text(doc.splitTextToSize(`Details: ${report.details}`, 160), 20, 100);
      if (report.comments) {
        doc.text(
          doc.splitTextToSize(`Comments: ${report.comments}`, 160),
          20,
          120
        );
      }
      // Generate the PDF as a Blob
      const pdfBlob = doc.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${report.student}_report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  // Render modal content for report details
  const renderModalContent = () => {
    if (!selectedItem) return null;

    return (
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
            <ProfileItem label="Supervisor" value={selectedItem.supervisor} />
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
         <button
  onClick={() => downloadPDF(selectedItem)}
  style={{
    marginTop: "0.5rem",
    padding: "0.5rem",
    background: "#6b7280",
    color: "#fff",
    borderRadius: "0.25rem",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  }}
>
  <Download size={16} style={{ marginRight: "0.5rem" }} />
  Download PDF
</button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f3f4f6" }}>
      <SideBar
        setActivePage={() => {}} // Placeholder, adjust based on your routing
        activePage="filter-reports" // Unique identifier for this page
        onWidthChange={handleWidthChange}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <main
          style={{
            flex: 1,
            padding: "1.5rem",
            overflowY: "auto",
            marginTop: "4rem",
            marginLeft: sidebarWidth,
            transition: "margin-left 0.3s ease-in-out",
          }}
        >
          <div style={{ animation: "fadeIn 0.3s" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",
              }}
            >
              Filter Internship Reports
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
                          (e.currentTarget.style.background = "#f9fafb")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.background = "none")
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
          </div>
        </main>
      </div>
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

// Add the same fadeIn animation as in the original code
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);