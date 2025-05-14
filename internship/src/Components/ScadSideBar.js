import React, { useState, useEffect } from "react";
import {
  User,
  BarChart2,
  Building,
  Users,
  FileText,
  Phone,
  LogOut,
} from "lucide-react";

function ScadSideBar({ setActivePage, activePage, onWidthChange }) {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const navItems = [
    {
      title: "Statistics",
      page: "statistics",
      icon: <BarChart2 size={20} />,
    },
    {
      title: "Companies",
      page: "companies",
      icon: <Building size={20} />,
    },
    {
      title: "Students",
      page: "students",
      icon: <Users size={20} />,
    },
    {
      title: "Reports",
      page: "reports",
      icon: <FileText size={20} />,
    },
    {
      title: "Video Calls",
      page: "video-calls",
      icon: <Phone size={20} />,
    },
  ];

  useEffect(() => {
    const width = isSidebarHovered ? "16rem" : "4rem";
    onWidthChange(width);
  }, [isSidebarHovered, onWidthChange]);

  const getButtonStyle = (itemPage) => {
    const isActive = activePage === itemPage;
    return {
      width: "100%",
      padding: "0.75rem",
      textAlign: "left",
      color: isActive || hoveredButton === itemPage ? "#fff" : "#000",
      background: isActive
        ? "#2a9d8f"
        : hoveredButton === itemPage
        ? "#2a9d8f"
        : "transparent",
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
    };
  };

  const handleNavigation = (page) => {
    setActivePage(page);
    if (page === "logout") {
      console.log("Logging out...");
    }
  };

  return (
    <div
      onMouseEnter={() => setIsSidebarHovered(true)}
      onMouseLeave={() => {
        setIsSidebarHovered(false);
        setHoveredButton(null);
      }}
      style={{
        flex: "0 0 auto",
        background: "linear-gradient(#fff 100%)",
        display: "flex",
        flexDirection: "column",
        width: isSidebarHovered ? "16rem" : "4rem",
        height: "100%", // Adjust height to account for header
        transition: "width 0.3s ease-in-out",
        boxShadow: isSidebarHovered ? "2px 0 4px rgba(0, 0, 0, 0.1)" : "none",
        overflowX: "hidden",
        position: "relative", // Changed from fixed to relative
      }}
    >
      <ul style={{ listStyle: "none", padding: "0.5rem", margin: 0 }}>
        {navItems.map((item, index) => (
          <li key={index} style={{ margin: "0.25rem 0" }}>
            <button
              style={getButtonStyle(item.page)}
              onClick={() => handleNavigation(item.page)}
              onMouseOver={() => setHoveredButton(item.page)}
              onMouseOut={() => setHoveredButton(null)}
            >
              {React.cloneElement(item.icon, {
                color:
                  activePage === item.page
                    ? "#bcb8b1"
                    : hoveredButton === item.page
                    ? "#fff"
                    : "#999",
              })}
              {isSidebarHovered && (
                <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                  {item.title}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScadSideBar;
