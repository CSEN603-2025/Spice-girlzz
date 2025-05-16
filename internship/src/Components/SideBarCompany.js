import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FilePlus, Clipboard, Users, CheckSquare } from "lucide-react";

function SideBarCompany({ onHoverChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);
  

  const handleHoverChange = (hovered) => {
    setIsSidebarHovered(hovered);
    if (onHoverChange) {
      onHoverChange(hovered);
    }
  };

  const navItems = [
    {
      title: "My Internship Posts",
      page: "posts",
      icon: <FilePlus size={20} />,
      path: "/company/posts",
    },
    {
      title: "Applications",
      page: "applicants",
      icon: <Clipboard size={20} />,
      path: "/company/applicants",
    },
    {
      title: "Interns",
      page: "interns",
      icon: <Users size={20} />,
      path: "/company/interns",
    },
    {
      title: "Evaluations",
      page: "evaluate",
      icon: <CheckSquare size={20} />,
      path: "/company/evaluate",
    },
  ];

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
    };
  };

  return (
    <div
      onMouseEnter={() => handleHoverChange(true)}
      onMouseLeave={() => handleHoverChange(false)}
      style={{
        marginTop: 0.2,
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
        {navItems.map((item, index) => (
          <li key={index} style={{ margin: "0.25rem 0" }}>
            <button
              style={getButtonStyle(item.path)}
              onClick={() => navigate(item.path)}
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

export default SideBarCompany;