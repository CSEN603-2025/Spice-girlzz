// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import Login from './Login';
import Register from './Register';
import StudentHomePage from './StudentHomePage';
import ProfileStudent from './ProfileStudent';

import SCADStaffDashboard from "./SCADStaffDashboard";
import AppliedInternships from "./Applied internships";
import AvailableInternships from "./AvailableInternships";
import FacultyMember from "./FacultyMember";

import VideoCall from './VideoCall'
import ScheduleCall from './ScheduleCall';
import Appointments from './Appointments';
import StartCall from './StartCall';



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
        <Route
          path="/student/applied"
          element={
            <AppliedInternships
              appliedInternships={appliedInternships}
              setAppliedInternships={setAppliedInternships}
            />
          }
        />

        <Route path="/student/scheduleCall" element={<ScheduleCall />} /> 
        <Route path="/student/videoCallDashboard" element={<VideoCall />} /> 

        <Route path="/startCall" element={<StartCall />} /> 
        <Route path="/appointments" element={<Appointments />} /> 

        <Route path="/company" element={<CompanyHomePage />} /> 
        <Route path="/company" element={<CompanyMail />} /> 
        <Route path="/company/profile" element={<ProfileCompany />} /> 
        <Route path="/company/evaluate" element={<CompanyEvaluation />} /> 
        <Route path="/company/interns" element={<CompanyInterns />} /> 
        <Route path="/company/posts" element={<CompanyPosts />} /> 
        <Route path="/company/applicants" element={<CompanyApplications />} /> 

        
        <Route path="/student/profile" element={<ProfileStudent />} />
        <Route path="/student/available" element={<AvailableInternships />} />
        <Route path="/staff" element={<SCADStaffDashboard />} />
        <Route path="/facultyMember" element={<FacultyMember />} />
      </Routes>
    </Router>
  );
}

export default App;
