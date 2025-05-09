import React, { useState } from "react";
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

  const navItems = [
    {
      title: "Cycle",
      page: "cycle",
      icon: <User size={20} />,
    },
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

  const getButtonStyle = (itemPage) => {
    const isActive = activePage === itemPage;
    return {
      width: "100%",
      padding: "0.75rem",
      textAlign: "left",
      color: "#000",
      background: isActive ? "#4d8f88" : "transparent",
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

  // Notify parent of width change when hover state changes
  const currentWidth = isSidebarHovered ? "16rem" : "4rem";
  React.useEffect(() => {
    onWidthChange(currentWidth);
  }, [isSidebarHovered, onWidthChange]);

  return (
    <div
      onMouseEnter={() => setIsSidebarHovered(true)}
      onMouseLeave={() => setIsSidebarHovered(false)}
      style={{
        flex: "0 0 auto", // Ensure it doesn't grow or shrink beyond its width
        background: "linear-gradient(#fff 100%)",
        display: "flex",
        flexDirection: "column",
        width: currentWidth,
        height: "100vh",
        transition: "width 0.3s ease-in-out",
        boxShadow: isSidebarHovered ? "2px 0 4px rgba(0, 0, 0, 0.1)" : "none",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          padding: "1rem",
          borderBottom: "1px solid #e5e7eb",
        }}
      ></div>
      <ul
        style={{
          listStyle: "none",
          padding: "0.5rem",
          position: "relative",
          top: "20px",
        }}
      >
        {navItems.map((item, index) => (
          <li key={index} style={{ margin: "0.25rem 0" }}>
            <button
              style={getButtonStyle(item.page)}
              onClick={() => handleNavigation(item.page)}
              onMouseOver={(e) => {
                if (activePage !== item.page) {
                  e.currentTarget.style.background = "#4d8f88";
                }
              }}
              onMouseOut={(e) => {
                if (activePage !== item.page) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {React.cloneElement(item.icon, {
                color: activePage === item.page ? "#bcb8b1" : "#999",
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
