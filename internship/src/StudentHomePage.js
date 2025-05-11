import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Header from "./Components/Header";
import { Mail, User, LogOut, Menu } from "lucide-react";
import AppliedInternships from "./Applied internships";
import "./StudentHomePage.css" ; 
import { SiVodafone } from "react-icons/si";
import { SiMeta } from "react-icons/si";
import { FaApple } from "react-icons/fa6";
import { SiSiemens } from "react-icons/si";



import { SiNetflix, SiVisa} from 'react-icons/si';


function StudentHomePage({ appliedInternships, setAppliedInternships }) {
  const [activePage, setActivePage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("4rem");


  const navigate = useNavigate();

  const [studentProfile, setStudentProfile] = useState({
    name: "...",
    isFirstLogin: true,
    hasProfile: false,
  });

   useEffect(() => {
    const savedProfile = sessionStorage.getItem("studentProfile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setStudentProfile(parsedProfile);
      } catch (e) {
        console.error("Error parsing sessionStorage data:", e);
      }
    }
  }, []);

   const handleProfileSetup = () => {
    setStudentProfile({ ...studentProfile, isFirstLogin: false, hasProfile: true });
    navigate("/student/Profile");
  };

  // Handle view applied internships navigation
  const handleViewAppliedInternships = () => {
    navigate("/applied");
  };

  // Import Inter font
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
    link.rel = "./StudentHomePage.css";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="container">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />
        {/* Layout */}
        <div className="layout"
          style={{
            marginTop: "4rem",
            minHeight: "calc(100vh - 4rem)",
          }}
        >

          {/* Sidebar */}
          <SideBar
            setActivePage={setActivePage}
            isOpen={isSidebarOpen}
            setSidebarWidth={setSidebarWidth}
          />

          {/* Main Content */}
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
                {studentProfile.hasProfile && studentProfile.name !== "..."
                  ? `Welcome Back, ${studentProfile.name}!`
                  : `Welcome, ...!`}
       </h2>
              <div
                style={{
                  background: "#fff",
                  padding: "1.5rem",
                  borderRadius: "0.375rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                   {studentProfile.isFirstLogin || !studentProfile.hasProfile ? (
                  <>
                    <p style={{ color: "#746c70", marginBottom: "1rem" }}>
                      Let's get started with your profile setup!
                    </p>
                    <button className="actionButton"
                      onClick={handleProfileSetup}
                    
                    >
                      Set up your profile!
                    </button>
                  </>
                )  : (
                  <>
                    <p style={{ color: "#746c70", marginBottom: "1rem" }}>
                      Explore available internships and start applying!
                    </p>
                    <button 
                      onClick={() => navigate("/internships")}
                      className="actionButton"
                    >
                      Browse Internships
                    </button>
                  </>
                )}
                
              </div>
              
            </div>
          </div>
                     <section className="clients-section">
<div className="client-logos">
  <SiNetflix style={{ color: "#E50914", fontSize: "2rem" }} />
  <SiVisa style={{ color: "#1A1F71", fontSize: "2rem" }} />
   <SiVodafone style={{ color: "#E60000", fontSize: "2rem" }} />
   <SiMeta style={{ color: "#0668E1", fontSize: "2rem" }} />
   <FaApple style={{ color: "#000000", fontSize: "2rem" }} />
    <SiSiemens style={{ color: "#000000", fontSize: "4rem" }} />
</div>
      </section>

      <div className="profileContent">
        <h2 style={ {fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",}}>Top Internships Postings!</h2>
    

       <div className="cardHolder">

        {/*vodafone card*/}
           <div className="card">
    <div className="card-header">
      <h3 className="program-title">Vodanation Summer Internship Program 2025</h3>
      <div className="company-info">
        <span className="company-name">Vodafone</span>
        <span className="company-location">Egypt</span>
      </div>
    </div>
    <div className="card-footer">
      <div className="alumni-count">
        <span className="pin-icon">📌</span>
        <span>50 students have applied already</span>
      </div>
      <span className="post-date">3 days ago</span>
    </div>
 
  </div>


  {/*L'oreal card*/}
                      <div className="card">
    <div className="card-header">
      <h3 className="program-title">L'Oreal Summer Internship Program 2025</h3>
      <div className="company-info">
        <span className="company-name">L'Oreal</span>
        <span className="company-location">Egypt</span>
      </div>
    </div>
    <div className="card-footer">
      <div className="alumni-count">
        <span className="pin-icon">📌</span>
        <span>70 students have applied already</span>
      </div>
      <span className="post-date">10 days ago</span>
    </div>
     </div>

     {/*Google card*/}

                           <div className="card">
    <div className="card-header">
      <h3 className="program-title">Google Winter Hyprid Internship Program 2025</h3>
      <div className="company-info">
        <span className="company-name">Google</span>
        <span className="company-location">USA</span>
      </div>
    </div>
    <div className="card-footer">
      <div className="alumni-count">
        <span className="pin-icon">📌</span>
        <span>200 students have applied already</span>
      </div>
      <span className="post-date">2 hours ago</span>
    </div>
  


     </div>





  </div>
  </div>

          </main>


        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              top: "4rem",
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
              display: window.innerWidth <= 768 ? "block" : "none",
            }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

      {/* Modal */}
      </div>
  );
}


export default StudentHomePage;
