// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import StudentHomePage from './StudentHomePage';
import ProfileStudent from './ProfileStudent';



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
        <Route path="/student/profile" element={<ProfileStudent />} />    </Routes>
    </div>
  </Router>
    // <StudentHomePage />
  );
}

export default App;
