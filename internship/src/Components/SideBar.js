import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Briefcase, FileText, BarChart2, Search, Play, Video, BookOpenCheck, Star } from "lucide-react";

function SideBar({ setActivePage, isOpen, setSidebarWidth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    const width = isSidebarHovered || isOpen ? "16rem" : "4rem";
    setSidebarWidth(width);
  }, [isSidebarHovered, isOpen, setSidebarWidth]);

  const email = location.state?.email || "";

  // Select navigation items based on specific email
  const navItems = [
    {
      title: "My Internships",
      page: "applied",
      icon: <Briefcase size={20} />,
      path: "/student/applied",
    },
    {
      title: "Report",
      page: "report",
      icon: <FileText size={20} />,
      path: "/student/report",
    },
    {
      title: "Evaluation",
      page: "evaluation",
      icon: <BarChart2 size={20} />,
      path: "/student/evaluation",
    },

  ];

  const navItemsPro = [
    {
      title: "My Internships",
      page: "applied",
      icon: <Briefcase size={20} />,
      path: "/student/applied",
    },
    {
      title: "Report",
      page: "report",
      icon: <FileText size={20} />,
      path: "/student/report",
    },
    {
      title: "Evaluation",
      page: "evaluation",
      icon: <BarChart2 size={20} />,
      path: "/student/evaluation",
    },

    {
      title: "Workshops",
      page: "workshops",
      icon: <Play size={20} />,
      path: "/student/workshops",
      isPro: true  // Mark as premium feature
    },
    {
      title: "Video Call",
      page: "call",
      icon: <Video size={20} />,
      path: "/student/call",
      isPro: true  // Mark as premium feature
    },
    {
      title: "Assessments",
      page: "assessments",
      icon: <BookOpenCheck size={20} />,
      path: "/student/assessments",
      isPro: true  // Mark as premium feature
    },
  ];

  // Determine which navItems to use based on email
  const selectedNavItems = email === "malak@student.guc.edu.eg" ? navItemsPro : navItems;

  const getButtonStyle = (itemPath) => {
    const isActive = location.pathname === itemPath;
    return {
      width: "100%",
      padding: "0.75rem",
      textAlign: "left",
      color: isActive || hoveredButton === itemPath ? "#fff" : "#000",
      background: isActive ? "#2a9d8f" : hoveredButton === itemPath ? "#2a9d8f" : "transparent",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      transition: "background 0.2s, color 0.2s",
      border: "none",
      justifyContent: isSidebarHovered ? "flex-start" : "center",
      position: "relative" // Added for star positioning

    };
  };

  const handleNavigation = (page, path) => {
    setActivePage(page);
    navigate(path, { state: { email } }); // Preserve email in state
  };

  return (
    <div
      onMouseEnter={() => setIsSidebarHovered(true)}
      onMouseLeave={() => {
        setIsSidebarHovered(false);
        setHoveredButton(null);
      }}
      style={{
        flex: 1,
        background: "linear-gradient(#fff 100%)",
        display: "flex",
        flexDirection: "column",
        width: isSidebarHovered ? "16rem" : "4rem",
        height: "100vh",
        position: "fixed",
        top: "3.75rem",
        left: 0,
        transition: "width 0.3s ease-in-out",
        zIndex: 1000,
        boxShadow: isSidebarHovered ? "2px 0 4px rgba(0, 0, 0, 0.1)" : "none",
        overflowX: "hidden",
      }}
    >
      <ul style={{ listStyle: "none", padding: "0.5rem", margin: 0 }}>
        {selectedNavItems.map((item, index) => (
          <li key={index} style={{ margin: "0.25rem 0" }}>
            <button
              style={getButtonStyle(item.path)}
              onClick={() => handleNavigation(item.page, item.path)}
              onMouseOver={() => setHoveredButton(item.path)}
              onMouseOut={() => setHoveredButton(null)}
            >
              {React.cloneElement(item.icon, {
                color:
                  location.pathname === item.path
                    ? "#bcb8b1"
                    : hoveredButton === item.path
                    ? "#fff"
                    : "#999",
              })}
              {isSidebarHovered && (
           <>
                  <span style={{ 
                    whiteSpace: "nowrap", 
                    overflow: "hidden",
                    flex: 1,
                    textAlign: "left"
                  }}>
                    {item.title}
                  </span>
                  {item.isPro && (
                    <Star 
                      size={16} 
                      color="#FFD700" 
                      fill="#FFD700" 
                      style={{ 
                        marginLeft: "auto",
                        flexShrink: 0
                      }} 
                    />
                  )}
                </>

              )}

            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;