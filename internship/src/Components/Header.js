import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Mail, User, LogOut, Home, Eye } from "lucide-react";
import ProfileViewsPopup from "./ProfileViewsPopUp";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileViews, setShowProfileViews] = useState(false);

  // Retrieve email with sessionStorage fallback
  const storedProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
  const email = (location.state?.email || storedProfile.email || "").toLowerCase();

  // Determine if the user is "Pro" (Malak)
  const isProUser = email === "malak@student.guc.edu.eg";

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
        {isProUser && (
          <span
            style={{
              backgroundColor: "#FFD700",
              color: "#000",
              fontSize: "0.75rem",
              fontWeight: "600",
              padding: "0.25rem 0.5rem",
              borderRadius: "12px",
              textTransform: "uppercase",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            Pro
          </span>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          flex: "0 0 auto",
          position: "relative",
        }}
      >
        {isProUser && (
          <div style={{ position: "relative" }}>
            <button
              style={{
                padding: "0.5rem",
                color: "#000",
                background: "transparent",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
              title="Profile Views"
              onClick={() => setShowProfileViews(!showProfileViews)}
            >
              <Eye size={20} />
            </button>
            {showProfileViews && (
              <ProfileViewsPopup onClose={() => setShowProfileViews(false)} />
            )}
          </div>
        )}

        <button
          style={{
            padding: "0.5rem",
            color: "#000",
            background: "transparent",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
          title="Messages"
          onClick={() => navigate("/student/messages", { state: { email } })}
        >
          <Mail size={20} />
        </button>
        <button
          style={{
            padding: "0.5rem",
            color: "#000",
            background: "transparent",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
          title="Home"
          onClick={() => navigate("/student", { state: { email } })}
        >
          <Home size={20} />
        </button>
        <button
          style={{
            padding: "0.5rem",
            color: "#000",
            background: "transparent",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
          title="Profile"
          onClick={() => navigate("/student/Profile", { state: { email } })}
        >
          <User size={20} />
        </button>
        <button
          style={{
            padding: "0.5rem",
            color: "#000",
            background: "transparent",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
          title="Logout"
          onClick={() => navigate("/")}
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;