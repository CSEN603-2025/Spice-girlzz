import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarCompany from './Components/SideBarCompany';

const CompanyHome = () => {
  const navigate = useNavigate();
  const companyName = "Tech Innovators Ltd."; // This could come from props or context

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>Company Dashboard</h2>
        <div>

        <button 
            style={styles.navBtn} 
            onClick={() => navigate('/company')}
          >
            🏠 Home
          </button>

          <button 
            style={styles.navBtn} 
            onClick={() => navigate('/company/profile')}
          >
            👤 Profile
          </button>
          
          <button 
            style={styles.navBtn} 
            onClick={() => navigate('/company/mail')}
          >
            📧 Mail
            <span style={styles.notificationBadge}>1</span>
          </button>
          <button style={styles.navBtn} onClick={() => navigate('/')}>🚪 Logout</button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <SideBarCompany activePage="home" />

        <div style={styles.profileContent}>
          <div style={styles.welcomeCard}>
            <h1 style={styles.welcomeTitle}>Welcome back, {companyName}!</h1>
            <p style={styles.welcomeText}>
              Here's what's happening with your company today.
            </p>
            {/* Add any dashboard widgets/metrics here */}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    fontFamily: 'Segoe UI, sans-serif', 
    backgroundColor: '#f7f9fc', // Light blue-gray background
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  navbar: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '1rem 2rem', 
    backgroundColor: '#1d3557', // Dark blue
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  title: { margin: 0 },
  navBtn: { 
    backgroundColor: '#457b9d', // Medium blue
    border: 'none', 
    borderRadius: '5px', 
    padding: '0.5rem 1rem', 
    color: '#fff', 
    cursor: 'pointer', 
    marginLeft: '10px',
    position: 'relative'
  },
  notificationBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#e63946', // Red
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '12px'
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    overflow: 'auto'
  },
  profileContent: {
    flex: 1,
    padding: '2rem',
    marginLeft: '240px',
    overflowY: 'auto',
    height: 'calc(100vh - 64px)' // Adjust based on navbar height
  },
  welcomeCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    textAlign: 'center'
  },
  welcomeTitle: {
    fontSize: '2rem',
    color: '#1d3557', // Dark blue
    marginBottom: '1rem'
  },
  welcomeText: {
    fontSize: '1.1rem',
    color: '#666'
  }
};

export default CompanyHome;