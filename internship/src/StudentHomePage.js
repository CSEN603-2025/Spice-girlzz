import React, { useState } from 'react';

function StudentHomePage() {
  const [activePage, setActivePage] = useState('home');

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
          <button style={styles.navBtn}>👤 Profile</button>
          <button style={styles.navBtn}>🚪 Logout</button>
        </div>
      </div>

      {/* Content Area */}
      <div style={styles.contentArea}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <button onClick={() => setActivePage('applied')} style={styles.sideBtn}>Applied Internships</button>
          <button onClick={() => setActivePage('report')} style={styles.sideBtn}>Submit Report</button>
          <button onClick={() => setActivePage('evaluate')} style={styles.sideBtn}>Evaluations</button>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: 'Arial, sans-serif',
  },
  navbar: {
    backgroundColor: '#1d3557',
    color: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
  },
  navBtn: {
    marginLeft: '10px',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#457b9d',
    color: 'white',
    cursor: 'pointer',
  },
  contentArea: {
    display: 'flex',
    height: 'calc(100vh - 70px)',
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#f1faee',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  sideBtn: {
    marginBottom: '10px',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#a8dadc',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    padding: '2rem',
  },
};

export default StudentHomePage;
