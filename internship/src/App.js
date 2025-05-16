// import logo from './logo.svg';
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

import FacultyLayout from './FacultyLayout';
import FacultyStatistics from './FacultyStatistics';
import FacultyReportEval from './FacultyReportEval';
import FacultyHomePage from "./FacultyHomePage";
import NotificationSystem from './Components/NotificationsStudent';
import ProfileStudent from './ProfileStudent';
import UpcomingWorkshops from './UpcomingWorkshops';
import FacultyMail from './FacultyMail';
import FacultyCompEvaluations from "./FacultyCompEvaluations";
import SCADHome from './SCADHome';
import Report from "./Report";
import EvaluationStudent from "./EvaluationStudent";
import Assessment from './Assessment';


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

       <div>
        <NotificationSystem />
    </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<StudentHomePage />}/>
         <Route path="/student/startCall" element={<StartCall />} /> 


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
            <ScheduleCall/>
          }
        />
        <Route path="/student/call" element={<VideoCall/>}/>
        <Route path="/startCall" element={<StartCall />} />
        <Route path="/company" element={<CompanyHomePage />} />
        <Route path="/company/mail" element={<CompanyMail />} />
        <Route path="/company/profile" element={<ProfileCompany />} />
        <Route path="/company/evaluate" element={<CompanyEvaluation />} />
        <Route path="/company/interns" element={<CompanyInterns />} />
        <Route path="/company/posts" element={<CompanyPosts />} />
        <Route path="/company/applicants" element={<CompanyApplications />} />
        <Route path="/student/profile" element={<ProfileStudent />} />
        <Route path="/student/workshops" element={<UpcomingWorkshops />} /> {/* Added Route */}
        <Route path="/staff" element={<SCADStaffDashboard />} />

      <Route path="/faculty" element={<FacultyLayout />}>
        <Route index element={<FacultyStatistics />} />
        <Route path="reportseval" element={<FacultyReportEval />} />
        <Route path="internships" element={<FacultyHomePage />} />
        <Route path="mail" element={<FacultyMail />} />
        {/* <Route path="eval" element={<FacultyCompEvaluations />} /> */}
      </Route>
      
        <Route path="/staff/SCADHome" element={<SCADHome />} />
     
        <Route path="/student/report" element={<Report />} />
        <Route path="/student/evaluation" element={<EvaluationStudent />} />
        <Route path="/student/assessments" element={<Assessment />} /> 


        

         
      </Routes>
    </Router>

   
  );


}

export default App;
