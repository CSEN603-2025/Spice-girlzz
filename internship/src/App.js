// import logo from './logo.svg';
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import React, { useState, useEffect } from "react";

import Login from "./Login";
import Register from "./Register";
import StudentHomePage from "./StudentHomePage";

import SCADStaffDashboard from "./SCADStaffDashboard";
import AppliedInternships from "./Applied internships";
import ProfileStudent from "./ProfileStudent";
import SuggestedInternships from "./SuggestedInternships";
import FacultyMember from "./FacultyMember";

import VideoCall from "./VideoCall";
import ScheduleCall from "./ScheduleCall";
import StartCall from "./StartCall";

import ProfileCompany from "./ProfileCompany";
import CompanyMail from "./CompanyMail";
import CompanyHomePage from "./CompanyHomePage";
import CompanyPosts from "./CompanyPosts";
import CompanyApplications from "./CompanyApplications";
import CompanyInterns from "./CompanyInterns";
import CompanyEvaluation from "./CompanyEvaluation";

import Report from "./Report";
import EvaluationStudent from "./EvaluationStudent";
import FacultyLayout from "./FacultyLayout";
import FacultyStatistics from "./FacultyStatistics";
import FacultyReport from "./FacultyReport";
import { IconName } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import UpcomingWorkshops from "./UpcomingWorkshops";
import SCADHome from "./SCADHome";

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
        <Route path="/student/evaluation" element={<EvaluationStudent />} />
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
        <Route
          path="/student/applied"
          element={
            <AppliedInternships
              appliedInternships={appliedInternships}
              setAppliedInternships={setAppliedInternships}
            />
          }
        />
        <Route
          path="/student/scheduleCall"
          element={
            <ScheduleCall
              appliedInternships={appliedInternships}
              setAppliedInternships={setAppliedInternships}
            />
          }
        />
        <Route
          path="/student/videoCallDashboard"
          element={
            <VideoCall
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
        <Route path="/student/profile" element={<ProfileStudent />} />
        <Route path="/student/suggested" element={<SuggestedInternships />} />
        <Route path="/student/workshops" element={<UpcomingWorkshops />} />{" "}
        {/* Added Route */}
        <Route path="/staff" element={<SCADStaffDashboard />} />
        <Route path="/staff/SCADHome" element={<SCADHome />} />
        <Route path="/faculty" element={<FacultyLayout />}>
          <Route path="reports" element={<FacultyReport />} />
          <Route path="statistics" element={<FacultyStatistics />} />
        </Route>
        <Route path="/student/report" element={<Report />} />
        <Route path="/student/evaluation" element={<EvaluationStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
