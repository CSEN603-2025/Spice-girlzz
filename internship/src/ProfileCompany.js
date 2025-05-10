import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProfileCompany.css';
import SideBarCompany from './Components/SideBarCompany';

const ProfileCompany = () => {
  const location = useLocation();
  const companyEmail = location.state?.email || 'No email available';
  const navigate = useNavigate();

  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    email: companyEmail,
    description: '',
    industry: '',
    website: '',
    location: '',
    logo: 'https://via.placeholder.com/150',
    founded: '2015',
    employees: '50-100'
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCompanyInfo({
      name: 'Tech Innovators Ltd.',
      email: companyEmail,
      description: 'We build cutting-edge AI solutions for businesses worldwide.',
      industry: 'Software Development',
      website: 'https://techinnovators.com',
      location: 'San Francisco, CA',
      logo: 'https://via.placeholder.com/150',
      founded: '2015',
      employees: '50-100'
    });
  }, [companyEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Company info saved successfully!');
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>Company Profile</h2>
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
        <SideBarCompany activePage="profile" />
        
        <div style={styles.profileContent}>
          {/* Profile Header */}
          <div style={styles.profileHeader}>
            <div style={styles.logoContainer}>
              <img 
                src={companyInfo.logo} 
                alt="Company Logo" 
                style={styles.logo}
              />
              {isEditing && (
                <button style={styles.uploadBtn}>Change Logo</button>
              )}
            </div>
            <div style={styles.headerInfo}>
              <h1 style={styles.companyName}>{companyInfo.name}</h1>
              <p style={styles.companyIndustry}>{companyInfo.industry}</p>
              <div style={styles.headerMeta}>
                <span style={styles.metaItem}>📍 {companyInfo.location}</span>
                <span style={styles.metaItem}>🕰️ Since {companyInfo.founded}</span>
                <span style={styles.metaItem}>👥 {companyInfo.employees} employees</span>
              </div>
            </div>
            <button 
              style={isEditing ? styles.saveBtn : styles.editBtn}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
          </div>

          {/* Profile Details */}
          <div style={styles.profileDetails}>
            <div style={styles.detailSection}>
              <h3 style={styles.sectionTitle}>About Us</h3>
              {isEditing ? (
                <textarea
                  name="description"
                  value={companyInfo.description}
                  onChange={handleChange}
                  style={styles.textArea}
                />
              ) : (
                <p style={styles.description}>{companyInfo.description}</p>
              )}
            </div>

            <div style={styles.detailGrid}>
              <div style={styles.detailItem}>
                <label style={styles.detailLabel}>Website</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="website"
                    value={companyInfo.website}
                    onChange={handleChange}
                    style={styles.inputField}
                  />
                ) : (
                  <a href={companyInfo.website} style={styles.detailValueLink} target="_blank" rel="noopener noreferrer">
                    {companyInfo.website}
                  </a>
                )}
              </div>

              <div style={styles.detailItem}>
                <label style={styles.detailLabel}>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={companyInfo.email}
                    onChange={handleChange}
                    style={styles.inputField}
                  />
                ) : (
                  <a href={`mailto:${companyInfo.email}`} style={styles.detailValue}>
                    {companyInfo.email}
                  </a>
                )}
              </div>

              <div style={styles.detailItem}>
                <label style={styles.detailLabel}>Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={companyInfo.location}
                    onChange={handleChange}
                    style={styles.inputField}
                  />
                ) : (
                  <span style={styles.detailValue}>{companyInfo.location}</span>
                )}
              </div>

              <div style={styles.detailItem}>
                <label style={styles.detailLabel}>Industry</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="industry"
                    value={companyInfo.industry}
                    onChange={handleChange}
                    style={styles.inputField}
                  />
                ) : (
                  <span style={styles.detailValue}>{companyInfo.industry}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    fontFamily: 'Segoe UI, sans-serif', 
    backgroundColor: '#f7f9fc', 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  navbar: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '1rem 2rem', 
    backgroundColor: '#1d3557', 
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  title: { margin: 0 },
  navBtn: { 
    backgroundColor: '#457b9d', 
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
    backgroundColor: '#e63946',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '12px',
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
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    marginBottom: '2rem',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem'
  },
  logo: {
    width: '150px',
    height: '150px',
    borderRadius: '8px',
    objectFit: 'cover',
    border: '1px solid #eee'
  },
  uploadBtn: {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  headerInfo: {
    flex: 1
  },
  companyName: {
    fontSize: '2rem',
    margin: '0 0 0.5rem 0',
    color: '#1d3557'
  },
  companyIndustry: {
    fontSize: '1.1rem',
    color: '#457b9d',
    margin: '0 0 1rem 0'
  },
  headerMeta: {
    display: 'flex',
    gap: '1.5rem',
    color: '#666',
    fontSize: '0.9rem'
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem'
  },
  editBtn: {
    backgroundColor: '#a8dadc',
    border: 'none',
    borderRadius: '5px',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#1d3557',
    fontSize: '1rem',
    alignSelf: 'flex-start'
  },
  saveBtn: {
    backgroundColor: '#2a9d8f',
    border: 'none',
    borderRadius: '5px',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'white',
    fontSize: '1rem',
    alignSelf: 'flex-start'
  },
  profileDetails: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  detailSection: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.3rem',
    color: '#1d3557',
    marginBottom: '1rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '0.5rem'
  },
  description: {
    lineHeight: '1.6',
    color: '#333',
    fontSize: '1rem'
  },
  textArea: {
    width: '100%',
    minHeight: '120px',
    padding: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontFamily: 'inherit',
    fontSize: '1rem',
    lineHeight: '1.5'
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  detailItem: {
    marginBottom: '1rem'
  },
  detailLabel: {
    display: 'block',
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '0.3rem'
  },
  detailValue: {
    fontSize: '1rem',
    color: '#333'
  },
  detailValueLink: {
    fontSize: '1rem',
    color: '#457b9d',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  inputField: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem'
  }
};

export default ProfileCompany;