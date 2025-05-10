import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Briefcase, FileText, BarChart2, Search } from "lucide-react";

function SideBar({ setActivePage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const navItems = [
    {
      title: "My Internships",
      page: "applied",
      icon: <Briefcase size={20} />,
      path: "/student/applied",
    },
    {
      title: "Weekly Report",
      page: "report",
      icon: <FileText size={20} />,
      path: "/student/report",
    },
    {
      title: "Evaluation",
      page: "evaluate",
      icon: <BarChart2 size={20} />,
      path: "/student/evaluate",
    },
    {
      title: "Available Internships",
      page: "available",
      icon: <Search size={20} />,
      path: "/student/available",
    },
  ];

  const getButtonStyle = (itemPath) => {
    const isActive = location.pathname === itemPath;
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

  const handleNavigation = (page, path) => {
    setActivePage(page);
    navigate(path);
  };

  return (
    <div
      onMouseEnter={() => setIsSidebarHovered(true)}
      onMouseLeave={() => setIsSidebarHovered(false)}
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
        {navItems.map((item, index) => (
          <li key={index} style={{ margin: "0.25rem 0" }}>
            <button
              style={getButtonStyle(item.path)}
              onClick={() => handleNavigation(item.page, item.path)}
              onMouseOver={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.background = "#4d8f88";
                }
              }}
              onMouseOut={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {React.cloneElement(item.icon, {
                color: location.pathname === item.path ? "#bcb8b1" : "#999",
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

export default SideBar;

// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
// import { SideBarStudent } from './SideBarStudent';

// function SideBar() {
//   const navigate = useNavigate(); // Initialize useNavigate

//   return (
//     <div className='sidebar'>
//       <ul className='SideBarList'>
//         {SideBarStudent.map((val, key) => {
//           return (
//             <li
//               key={key}
//               className='row'
//               id={window.location.pathname === val.link ? 'active' : ''}
//               onClick={() => navigate(val.link)} // Use navigate instead of window.location
//             >
//               <div id='title'>
//                 {val.title}
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default SideBar;

