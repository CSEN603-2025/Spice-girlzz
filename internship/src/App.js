import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import AppliedInternships from './Applied internships';
import ProfileStudent from './ProfileStudent';
import AvailableInternships from './AvailableInternships';

function App() {
  const [appliedInternships, setAppliedInternships] = useState(() => {
    try {
      const saved = sessionStorage.getItem('appliedInternships');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error parsing sessionStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    sessionStorage.setItem('appliedInternships', JSON.stringify(appliedInternships));
  }, [appliedInternships]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route
          path="/student"
          element={<StudentHomePage appliedInternships={appliedInternships} setAppliedInternships={setAppliedInternships} />}
        />
        <Route
          path="/student/applied"
          element={<AppliedInternships appliedInternships={appliedInternships} setAppliedInternships={setAppliedInternships} />}
        />
        <Route path="/student/Profile" element={<ProfileStudent/>} />
        <Route path="/student/available"   element={<AvailableInternships />} 
/>
      </Routes>
    </Router>
  );
}

export default App;