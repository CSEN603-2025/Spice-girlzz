import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

import './ProfileCompany.css'; // Ensure the CSS file exists
import SideBar from './Components/SideBar';

const ProfileCompany = () => {
  const location = useLocation();
  const companyEmail = location.state?.email || 'No email available'; // Get email from state
  const navigate = useNavigate();

  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    email: companyEmail, // Use email from state
    description: '',
    industry: '',
    website: '',
    location: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Replace this with a real API call to get company data if necessary
    setCompanyInfo({
      name: 'Tech Innovators Ltd.',
      email: companyEmail, // Set company email
      description: 'We build cutting-edge AI solutions.',
      industry: 'Software Development',
      website: 'https://techinnovators.com',
      location: 'San Francisco, CA',
    });
  }, [companyEmail]); // Re-run when companyEmail changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Send updated info to backend
    alert('Company info saved!');
  };

  return (
    <div style={ styles.container  }>
        {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>🎓 Student Profile</h2>
        <div>
          <button style={styles.navBtn}>📧 Mail</button>
          <button style={styles.navBtn} onClick={() => navigate('/student')}>🏠 Home</button>
          <button style={styles.navBtn} onClick={() => navigate('/')}>🚪 Logout</button>
        </div>
        </div>
    <SideBar />

    <div className="company-profile-container">

      <h2>Company Profile</h2>

      {Object.entries(companyInfo).map(([key, value]) => (
        <div className="profile-field" key={key}>
          <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
          {isEditing ? (
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
            />
          ) : (
            <span>{value}</span>
          )}
        </div>
      ))}

      <div className="profile-buttons">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
       
      </div>

   
    </div></div>
  );
};
const styles = {
    container: { fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f7f9fc', minHeight: '100vh' },
    navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#1d3557', color: '#fff' },
    title: { margin: 0 },
    navBtn: { backgroundColor: '#457b9d', border: 'none', borderRadius: '5px', padding: '0.5rem 1rem', color: '#fff', cursor: 'pointer', marginLeft: '10px' },
    layout: { display: 'flex' },
    profileContent: { flex: 1, padding: '2rem' },
    profileHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
    editBtn: { backgroundColor: '#a8dadc', border: 'none', borderRadius: '5px', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 'bold' },
    profileBox: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
    empty: { textAlign: 'center', color: '#999' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modal: { backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', width: '350px', maxHeight: '90vh', overflowY: 'auto' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.95rem' },
    textarea: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.95rem', minHeight: '80px', resize: 'vertical' },
    buttonGroup: { display: 'flex', justifyContent: 'space-between' },
    saveBtn: { backgroundColor: '#2a9d8f', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    cancelBtn: { backgroundColor: '#e76f51', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  };
export default ProfileCompany;
