import { useState } from "react";
import { Outlet } from "react-router-dom";
import FacultyHeader from "./Components/FacultyHeader";
import SideBarFaculty from "./Components/FacultySideBar";

export default function FacultyLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div
      className={sidebarExpanded ? "sidebar-expanded" : ""}
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f3f4f6",
        marginLeft: sidebarExpanded ? "16rem" : "4rem",
        transition: "margin-left 0.3s ease-in-out",
      }}
    >
      <SideBarFaculty onHoverChange={setSidebarExpanded} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <FacultyHeader />
        <main
          style={{
            flex: 1,
            padding: "1.5rem",
            overflowY: "auto",
            marginTop: "4rem",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}