// Header.jsx
import React from "react";
import { Menu, Mail, User, LogOut,Home } from "lucide-react"; // adjust import as needed
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

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
         //   textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
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
          onClick={() => navigate("/student/messages")}
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
          onClick={() => navigate("/student")}
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
          onClick={() => navigate("/student/Profile")}
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
