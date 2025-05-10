import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import StudentHomePage from './StudentHomePage';
import ProfileStudent from './ProfileStudent';

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
  return (
    <Router>
    <div>
      {/* <nav>
        <ul>
          <li>
          <Link to="/">Home</Link>
          </li>
        
        </ul>
      </nav> */}

      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<StudentHomePage />} />  
        <Route path="/student/profile" element={<ProfileStudent />} /> 
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


        
         </Routes>
    </div>
  </Router>
    // <StudentHomePage />
  );
}

export default App;
