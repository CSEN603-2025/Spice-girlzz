import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import StudentHomePage from './StudentHomePage';
import ProfileStudent from './ProfileStudent';
import ProfileCompany from './ProfileCompany';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student" element={<StudentHomePage />} />
          <Route path="/student/profile" element={<ProfileStudent />} />
          <Route path="/company" element={<ProfileCompany />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
