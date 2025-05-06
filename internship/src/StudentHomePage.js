import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './Components/SideBar';


function StudentHomePage() {
  const [activePage, setActivePage] = useState('home');
  const navigate = useNavigate();


  const renderContent = () => {
    switch (activePage) {
      case 'applied':
        return <p>You have applied to 3 internships.</p>;
      case 'report':
        return <p>Submit your weekly report here.</p>;
      case 'evaluate':
        return <p>View evaluation results and feedback.</p>;
      default:
        return <p>Welcome, Student! Use the sidebar to navigate.</p>;
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Top Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>GUC Internship Portal</h2>
        <div>
          <button style={styles.navBtn}>📧 Mail</button>
          <button style={styles.navBtn} onClick={() => navigate('/student/profile')}>
            👤 Profile
          </button>
          <button style={styles.navBtn} onClick={() => navigate('/')}>🚪 Logout</button>
        </div>
      </div>

      {/* Content Area */}
      <div style={styles.contentArea}>
       
       <SideBar />

        {/* Main Content */}
        <div style={styles.mainContent}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

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
