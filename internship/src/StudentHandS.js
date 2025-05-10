import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // This function will be passed to SideBar as setActivePage
  const handleSetActivePage = (page) => {
    // The SideBar already handles navigation, so we don't need to do anything here
    // But we keep the function to prevent errors
  };

  return (
    <div style={styles.container}>
      <Header toggleSidebar={toggleSidebar} />
      <div style={{ ...styles.layout, marginTop: "4rem", minHeight: "calc(100vh - 4rem)" }}>
        {/* Pass both isOpen and setActivePage props */}
        <SideBar 
          isOpen={isSidebarOpen} 
          setActivePage={handleSetActivePage}
        />
        <main
          style={{
            flex: 1,
            padding: "1.5rem",
            overflowY: "auto",
            // Adjust margin based on sidebar state
            marginLeft: isSidebarOpen ? "16rem" : "4rem",
            width: isSidebarOpen ? "calc(100% - 16rem)" : "calc(100% - 4rem)",
            transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
            boxSizing: "border-box",
          }}
        >
          {children}
        </main>
      </div>

      {/* Mobile overlay - only show on small screens when sidebar is open */}
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
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  layout: {
    display: "flex",
    flex: 1,
  },
};

export default Layout;