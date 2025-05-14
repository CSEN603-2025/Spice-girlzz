import React from "react";
import { Menu, Mail, User, LogOut, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SCADHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the "home" destination based on the current route
  const isStaffPage = location.pathname.endsWith("/staff");
  const homeDestination = isStaffPage ? "/staff/SCADHome" : "/staff";

  // Determine the "mail" destination based on the current route
  const isMessagesPage = location.pathname === "/student/messages";
  const mailDestination = isMessagesPage ? "/staff" : "/student/messages";

  // Define button styles with dynamic background color based on the current route
  const getButtonStyle = (isActive) => ({
    padding: "0.5rem",
    color: "#000",
    background: isActive ? "#2a9d8f" : "transparent",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "background 0.2s ease",
  });

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100vw",
        height: "auto",
        background: "linear-gradient(#fff)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "0.75rem 1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1001,
        boxSizing: "border-box",
        margin: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flex: "1 0 auto",
          maxWidth: "50%",
        }}
      >
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#000",
            margin: 0,
            letterSpacing: "-0.015em",
          }}
        >
          InternHub
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          flex: "0 0 auto",
        }}
      >
        <button
          style={getButtonStyle(isMessagesPage)}
          title="Messages"
          onClick={() => navigate(mailDestination)}
        >
          <Mail size={20} />
        </button>

        <button
          style={getButtonStyle(location.pathname === "/staff/SCADHome")} // Highlight only on exact home route
          title="Home"
          onClick={() => navigate(homeDestination)}
        >
          <Home size={20} />
        </button>

        <button
          style={getButtonStyle(false)}
          title="Logout"
          onClick={() => navigate("/")}
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default SCADHeader;
