import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SiVodafone, SiMeta, SiNetflix, SiVisa } from "react-icons/si";
import { FaApple } from "react-icons/fa6";
import { SiSiemens } from "react-icons/si";
import { MdOutlinePlayCircle } from "react-icons/md";
import "./StudentHomePage.css";

function FacultyHomePage() {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [visibleCards, setVisibleCards] = useState(3);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [appliedInternships, setAppliedInternships] = useState(() => {
    const saved = sessionStorage.getItem("appliedInternships");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [filterDuration, setFilterDuration] = useState("");
  const [filterPaid, setFilterPaid] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);

  const navigate = useNavigate();

  // Video mapping by major
  const videoByMajor = {
    "Computer Science": "/videos/computer-science-internships.mp4",
    "Business": "/videos/business-internships.mp4",
    "Engineering": "/videos/engineering-internships.mp4",
    "Pharmacy": "/videos/pharmacy-internships.mp4",
    "": "/videos/general-internships.mp4", // Fallback
  };

  useEffect(() => {
    sessionStorage.setItem("appliedInternships", JSON.stringify(appliedInternships));
  }, [appliedInternships]);

  const allInternships = [
    {
      id: 1,
      title: "PayPal Winter Remote Program 2025",
      company: "PayPal",
      Job: "Networks Engineer",
      location: "Egypt",
      applicants: 2,
      posted: "1 hour ago",
      duration: "6 months",
      isPaid: "paid",
      expectedSalary: "$2000/month",
      skillsRequired: "JavaScript, React",
      description: "Develop payment processing solutions.",
      industry: "FinTech",
      status: "pending",
    },
    {
      id: 2,
      title: "Konecta Summer Internship",
      company: "Konecta",
      Job: "Customer Service",
      location: "Egypt",
      applicants: 10,
      posted: "10 days ago",
      duration: "3 months",
      isPaid: "unpaid",
      expectedSalary: "$0/month",
      skillsRequired: "Customer Support, Communication",
      description: "Assist in customer service operations.",
      industry: "Customer Service",
      status: "finalized",
    },
    {
      id: 3,
      title: "CIB Bank remote Internship",
      company: "CIB",
      Job: "Accountant",
      location: "Cairo, Egypt",
      applicants: 200,
      posted: "2 hours ago",
      duration: "4 months",
      isPaid: "paid",
      expectedSalary: "$1500/month",
      skillsRequired: "Finance, Data Analysis",
      description: "Support banking operations remotely.",
      industry: "Banking",
      status: "rejected",
    },
    {
      id: 4,
      title: "Vodafone Data Internship",
      company: "Vodafone",
      Job: "Data Engineer",
      location: "Cairo, Egypt",
      applicants: 120,
      posted: "1 day ago",
      duration: "6 months",
      isPaid: "paid",
      expectedSalary: "$2500/month",
      skillsRequired: "Python, Data Engineering",
      description: "Build data pipelines for telecom.",
      industry: "Telecom",
      status: "accepted",
    },
    {
      id: 5,
      title: "Nestlé Summer Internship",
      company: "Nestlé",
      Job: "Operations and production management",
      location: "Giza, Egypt",
      applicants: 87,
      posted: "3 days ago",
      duration: "3 months",
      isPaid: "paid",
      expectedSalary: "$1800/month",
      skillsRequired: "Marketing, Supply Chain",
      description: "Support supply chain operations.",
      industry: "FMCG",
      status: "pending",
    },
    {
      id: 6,
      title: "Orange Egypt Tech Internship",
      company: "Orange",
      Job: "Software Engineer",
      location: "Egypt",
      applicants: 43,
      posted: "5 hours ago",
      duration: "5 months",
      isPaid: "paid",
      expectedSalary: "$2200/month",
      skillsRequired: "Networking, Software Development",
      description: "Develop telecom software solutions.",
      industry: "Telecom",
      status: "rejected",
    },
  ];

  const topInternships = [
    {
      id: 7,
      title: "Vodanation Summer Internship Program 2025",
      company: "Vodafone",
      Job: "Data Analyst",
      location: "Egypt",
      duration: "3 months",
      isPaid: "paid",
      expectedSalary: "$2000/month",
      skillsRequired: "Telecom, Software Development",
      description: "Work on telecom solutions.",
      industry: "Telecom",
      status: "pending",
      applicants: 50,
      posted: "3 days ago",
    },
    {
      id: 8,
      title: "L'Oreal Summer Internship Program 2025",
      company: "L'Oreal",
      Job: "Marketing Agent",
      location: "Egypt",
      duration: "3 months",
      isPaid: "paid",
      expectedSalary: "$1800/month",
      skillsRequired: "Marketing, Branding",
      description: "Support marketing campaigns.",
      industry: "Cosmetics",
      status: "pending",
      applicants: 70,
      posted: "10 days ago",
    },
    {
      id: 9,
      title: "Google Winter Hybrid Internship Program 2025",
      company: "Google",
      Job: "Data and Cloud Engineer",
      location: "USA",
      duration: "6 months",
      isPaid: "paid",
      expectedSalary: "$4000/month",
      skillsRequired: "Software Engineering, Cloud",
      description: "Develop cloud-based solutions.",
      industry: "Tech",
      status: "pending",
      applicants: 200,
      posted: "2 hours ago",
    },
  ];

  const triggerApplyAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  const handleApply = (internship) => {
    if (appliedInternships.some((app) => app.id === internship.id)) {
      triggerApplyAlert(`Already applied to ${internship.title}!`);
      return;
    }
    triggerApplyAlert(`Applied to ${internship.title} at ${internship.company}!`);
    const appliedInternship = {
      id: internship.id,
      title: internship.title,
      company: internship.company,
      duration: internship.duration,
      isPaid: internship.isPaid,
      expectedSalary: internship.expectedSalary,
      skillsRequired: internship.skillsRequired,
      description: internship.description,
      industry: internship.industry,
      status: "pending",
      applicationDate: new Date().toISOString().split("T")[0],
      location: internship.location,
      role: internship.Job || internship.title,
    };
    setAppliedInternships((prevAppliedInternships) => [
      ...prevAppliedInternships,
      appliedInternship,
    ]);
    // Save to internshipApplications for JobProviderDashboard
    const savedApplications = sessionStorage.getItem("internshipApplications");
    const applications = savedApplications ? JSON.parse(savedApplications) : [];
    const newApplication = {
      id: applications.length + 1,
      internshipId: internship.id,
      internshipTitle: internship.title,
      company: internship.company,
      studentId: "faculty_" + Date.now(), // Generic faculty ID
      studentName: "Faculty User",
      skills: internship.skillsRequired,
      applicationStatus: "pending",
      applicationDate: new Date().toISOString().split("T")[0],
    };
    sessionStorage.setItem(
      "internshipApplications",
      JSON.stringify([...applications, newApplication])
    );
    setSelectedInternship(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadMore = () => {
    setVisibleCards((prev) => Math.min(prev + 3, filteredInternships.length));
  };

  const filterInternships = (internships) => {
    return internships.filter((internship) => {
      const matchesSearch =
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = filterIndustry
        ? internship.industry === filterIndustry
        : true;
      const matchesDuration = filterDuration
        ? internship.duration === filterDuration
        : true;
      const matchesPaid = filterPaid ? internship.isPaid === filterPaid : true;
      return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
    });
  };

  const filteredInternships = filterInternships(allInternships);
  const filteredTopInternships = filterInternships(topInternships);
  const internshipsToShow = filteredInternships.slice(0, visibleCards);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div className="container">

        <div className="profileContent">
          <div style={{ animation: "fadeIn 0.3s" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",
              }}
            >
              Welcome to InternHub!
            </h2>
            <div
              style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "0.375rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p style={{ color: "#746c70", marginBottom: "1rem" }}>
                Explore available internships!
              </p>
              <div
                style={{
                  marginBottom: "1.5rem",
                  display: "flex",
                  gap: "0.8rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="text"
                  placeholder="Search by job title or company name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="filter-input"
                  style={{
                    fontSize: "0.9rem",
                    padding: "0.75rem 1.5rem",
                    width: "350px",
                    backgroundColor: "#f3f4f6",
                    color: "#1f2937",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.2s ease",
                    cursor: "text",
                  }}
                />
                <select
                  value={filterIndustry}
                  onChange={(e) => setFilterIndustry(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Filter by Industry</option>
                  <option value="FinTech">FinTech</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Banking">Banking</option>
                  <option value="Telecom">Telecom</option>
                  <option value="FMCG">FMCG</option>
                  <option value="Cosmetics">Cosmetics</option>
                  <option value="Tech">Tech</option>
                </select>
                <select
                  value={filterDuration}
                  onChange={(e) => setFilterDuration(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Filter by Duration</option>
                  <option value="3 months">3 months</option>
                  <option value="4 months">4 months</option>
                  <option value="5 months">5 months</option>
                  <option value="6 months">6 months</option>
                </select>
                <select
                  value={filterPaid}
                  onChange={(e) => setFilterPaid(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Filter by Paid/Unpaid</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
                <button
                  className="filter-clear-button"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterIndustry("");
                    setFilterDuration("");
                    setFilterPaid("");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        <section className="clients-section">
 <div className="client-logos">
              <SiNetflix style={{ color: "#E50914", fontSize: "2.5rem" }} />
              <SiVisa style={{ color: "#1A1F71", fontSize: "4rem" }} />
              <SiVodafone style={{ color: "#E60000", fontSize: "2.5rem" }} />
              <SiMeta style={{ color: "#0668E1", fontSize: "3rem" }} />
              <FaApple style={{ color: "#000000", fontSize: "3rem" }} />
              <SiSiemens style={{ color: "#000000", fontSize: "5.5rem" }} />
            </div>
        </section>
        <div className="profileContent">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              color: "#1f2937",
            }}
          >
            Top Internships Postings!
          </h2>
          <div className="cardHolder">
            {filteredTopInternships.length > 0 ? (
              filteredTopInternships.map((internship) => (
                <div className="card" key={internship.id}>
                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="program-title">{internship.title}</h3>
                      <div className="company-info">
                        <span className="company-name">{internship.company}</span>
                        <span className="company-location">{internship.location}</span>
                        <span className="post-date">{internship.posted}</span>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="alumni-count">
                        <span className="pin-icon">📌</span>
                        <span>{internship.applicants} students have applied already</span>
                      </div>
                      <button
                        className="actionButton"
                        onClick={() => setSelectedInternship(internship)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "#4b5563" }}>No internships match your filters.</p>
            )}
          </div>
        </div>
        <div className="profileContent">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              color: "#1f2937",
            }}
          >
            Available Internships
          </h2>
          <div className="cardHolder">
            {internshipsToShow.length > 0 ? (
              internshipsToShow.map((internship) => (
                <div className="card" key={internship.id}>
                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="program-title">{internship.title}</h3>
                      <div className="company-info">
                        <span className="company-name">{internship.company}</span>
                        <span className="company-location">{internship.location}</span>
                        <span className="post-date">{internship.posted}</span>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="alumni-count">
                        <span className="pin-icon">📌</span>
                        <span>{internship.applicants} students have applied already</span>
                      </div>
                      <button
                        className="actionButton"
                        onClick={() => setSelectedInternship(internship)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "#4b5563" }}>No internships match your filters.</p>
            )}
          </div>
          {visibleCards < filteredInternships.length && (
            <div className="load-more-btn">
              <button onClick={loadMore}>Load More Internships</button>
            </div>
          )}
        </div>

      {selectedInternship && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">{selectedInternship.title}</h3>
            <p className="modal-info">
              <strong>Company:</strong> {selectedInternship.company}
            </p>
            <p className="modal-info">
              <strong>Job Title:</strong> {selectedInternship.Job}
            </p>
            <p className="modal-info">
              <strong>Duration:</strong> {selectedInternship.duration}
            </p>
            <p className="modal-info">
              <strong>Paid/Unpaid:</strong>{" "}
              {selectedInternship.isPaid.charAt(0).toUpperCase() +
                selectedInternship.isPaid.slice(1)}
            </p>
            <p className="modal-info">
              <strong>Expected Salary:</strong> {selectedInternship.expectedSalary}
            </p>
            <p className="modal-info">
              <strong>Skills Required:</strong> {selectedInternship.skillsRequired}
            </p>
            <p className="modal-info">
              <strong>Description:</strong> {selectedInternship.description}
            </p>
            <div className="modal-footer">
  
              <button
                className="modal-close-button"
                onClick={() => setSelectedInternship(null)}
              >
                Close
              </button>

            </div>
          </div>
        </div>
      )}

      {showVideoModal && (
        <div className="modal-overlay" role="dialog" aria-labelledby="video-modal-title">
          <div className="modal-content">
            <h3 id="video-modal-title" className="modal-title">
              Internship Requirements
            </h3>
            <div className="video-container">
              <video
                controls
                src={videoByMajor[""]} // Use general video as default
                style={{ width: "100%", maxHeight: "400px" }}
                onError={() => alert("Failed to load video. Please try again later.")}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="modal-footer">
              <button
                className="modal-close-button"
                onClick={() => setShowVideoModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: "1rem",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#10b981",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 2000,
            fontSize: "0.9rem",
            opacity: showAlert ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
          role="alert"
          aria-live="assertive"
        >
          {alertMessage}
        </div>
      )}
    </div>
  );
}

export default FacultyHomePage;