// import logo from './logo.svg';
import "./App.css";
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
          <Route path="/staff" element={<SCADStaffDashboard />} />{" "}
        </Routes>
      </div>
    </Router>
    // <StudentHomePage />
  );
}

export default App;
