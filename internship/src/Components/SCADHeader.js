import React from "react";
import { Menu, Mail, LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SCADHeader = ({ setActivePage, activePage, toggleSidebar }) => {
  const navigate = useNavigate();

  // Debug props
  console.log("SCADHeader props:", {
    setActivePage,
    activePage,
    toggleSidebar,
  });

  const headerItems = [
    {
      title: "Messages",
      page: "messages",
      icon: <Mail size={20} />,
    },
    {
      title: "Home",
      page: "home",
      icon: <Home size={20} />,
    },
    {
      title: "Logout",
      page: "logout",
      icon: <LogOut size={20} />,
      navigateTo: "/",
    },
  ];

  const getButtonStyle = () => {
    // Static styles, no active state highlighting
    return {
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
      transition: "background 0.2s, color 0.2s",
    };
  };

  const handleNavigation = (page, navigateTo) => {
    console.log("Navigating to page:", page); // Debug activePage update
    if (typeof setActivePage === "function") {
      setActivePage(page);
    } else {
      console.error("setActivePage is not a function:", setActivePage);
    }
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

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
        <button
          onClick={toggleSidebar}
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
        ></button>
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
        {headerItems.map((item, index) => (
          <button
            key={index}
            title={item.title}
            onClick={() => handleNavigation(item.page, item.navigateTo)}
            style={getButtonStyle()}
          >
            {React.cloneElement(item.icon, {
              color: "#000", // Static icon color
            })}
          </button>
        ))}
      </div>
    </header>
  );
};

export default SCADHeader;
