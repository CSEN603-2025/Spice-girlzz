import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import StudentHomePage from "./StudentHomePage";
import SCADStaffDashboard from "./SCADStaffDashboard";
import AppliedInternships from "./Applied internships";
import ProfileStudent from "./ProfileStudent";
import AvailableInternships from "./AvailableInternships";
import FacultyMember from "./FacultyMember";
import Report from "./Report";
import VideoCall from './VideoCall'
import ScheduleCall from './ScheduleCall';
import StartCall from './StartCall';
import EvaluationStudent from "./EvaluationStudent";



import ProfileCompany from './ProfileCompany';
import CompanyMail from './CompanyMail';
import CompanyHomePage from './CompanyHomePage';
import CompanyPosts from './CompanyPosts';
import CompanyApplications from './CompanyApplications';
import CompanyInterns from './CompanyInterns';
import CompanyEvaluation from './CompanyEvaluation';




function App() {
  const [appliedInternships, setAppliedInternships] = useState(() => {
    try {
      const saved = sessionStorage.getItem("appliedInternships");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing sessionStorage:", error);
      return [];
    }
  });
  

  useEffect(() => {
    sessionStorage.setItem(
      "appliedInternships",
      JSON.stringify(appliedInternships)
    );
  }, [appliedInternships]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/student"
          element={
            <StudentHomePage
              appliedInternships={appliedInternships}
              setAppliedInternships={setAppliedInternships}
            />
          }
        />
         <Route path="/startCall" element={<StartCall />} /> 

        <Route path="/company" element={<CompanyHomePage />} /> 
        <Route path="/company/mail" element={<CompanyMail />} /> 
        <Route path="/company/profile" element={<ProfileCompany />} /> 
        <Route path="/company/evaluate" element={<CompanyEvaluation />} /> 
        <Route path="/company/interns" element={<CompanyInterns />} /> 
        <Route path="/company/posts" element={<CompanyPosts />} /> 
        <Route path="/company/applicants" element={<CompanyApplications />} /> 
        <Route
          path="/student/applied"
          element={
            <AppliedInternships
              appliedInternships={appliedInternships}
              setAppliedInternships={setAppliedInternships}
            />
          }
        />
        <Route path="/student/profile" element={<ProfileStudent />} />
       <Route path="/student/available" element={<AvailableInternships />} />
        <Route path="/staff" element={<SCADStaffDashboard />} />
        <Route path="/facultyMember" element={<FacultyMember />} />
        <Route path="/student/report" element={<Report />} />
        <Route path="/student/evaluation" element={<EvaluationStudent />} />

         
      </Routes>
    </Router>
  );
}

export default App;
