import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './Components/SideBar';
import InternshipList from './Components/InternshipList';
import internships from './data/internships';




function StudentHomePage() {
  const [activePage, setActivePage] = useState('home');
  const navigate = useNavigate();


  const renderContent = () => {
    console.log('Rendering content for:', activePage); // Log the active page
    switch (activePage) {
      
      case 'applied':
        return <p>You have applied to 3 internships.</p>;
      case 'report':
        return <p>Submit your weekly report here.</p>;
      case 'evaluate':
        return <p>View evaluation results and feedback.</p>;

      case 'available':
          return <p>available internships.</p>;
      default:
        return <p>Welcome, Student! Use the sidebar to navigate.</p>;
     
    }
  };

  return (
    <div>
      <button onClick={() => setActivePage('applied')}>Applied Internships</button>
      <button onClick={() => setActivePage('report')}>Submit Report</button>
      <button onClick={() => setActivePage('evaluate')}>Evaluate</button>
      <button onClick={() => setActivePage('available')}>Available Internships</button>

      {renderContent()} {/* Renders content based on activePage */}
    </div>
  );
};
const styles = {
  container: { fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f7f9fc', minHeight: '100vh' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#1d3557', color: '#fff' },
  title: { margin: 0 },
  navBtn: { backgroundColor: '#457b9d', border: 'none', borderRadius: '5px', padding: '0.5rem 1rem', color: '#fff', cursor: 'pointer', marginLeft: '10px' },
  contentArea: {
    display: 'flex',
    height: 'calc(100vh - 70px)',
  },
  mainContent: {
    flex: 1,
    padding: '2rem',
  },
};

export default StudentHomePage;
