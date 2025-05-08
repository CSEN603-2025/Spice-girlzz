import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import StudentHomePage from './StudentHomePage';
import ProfileStudent from './ProfileStudent';
import ProfileCompany from './ProfileCompany';
import CompanyMail from './CompanyMail';
import CompanyHomePage from './CompanyHomePage';
import CompanyPosts from './CompanyPosts';
import CompanyApplications from './CompanyApplications';
import CompanyInterns from './CompanyInterns';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student" element={<StudentHomePage />} />
          <Route path="/student/profile" element={<ProfileStudent />} />
          <Route path="/company" element={<CompanyHomePage />} />
          <Route path="/company/profile" element={<ProfileCompany />} />
          <Route path="/company/mail" element = {<CompanyMail />}></Route>
          <Route path="/company/posts" element = {<CompanyPosts />}></Route>
          <Route path="/company/applicants" element = {<CompanyApplications />}></Route>
          <Route path="/company/interns" element = {<CompanyInterns />}></Route>



          {/* <Route path="/student/mail" element = {<CompanyMail />}></Route>
          <Route path="/scad/mail" element = {<CompanyMail />}></Route>
          <Route path="/faculty/mail" element = {<CompanyMail />}></Route> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
