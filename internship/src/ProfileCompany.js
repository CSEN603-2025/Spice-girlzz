import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SideBarCompany from './Components/SideBarCompany';
import { Mail, Home, LogOut, User, Menu } from 'lucide-react';
import './CompanyStyles.css';

const ProfileCompany = () => {
  const location = useLocation();
  const companyEmail = location.state?.email || 'No email available';
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [clickedButtons, setClickedButtons] = useState({});

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

  const handleButtonClick = (buttonId) => {
    setClickedButtons(prev => ({
      ...prev,
      [buttonId]: true
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 0 auto', maxWidth: '50%' }}>
          <button className="header-btn" title="Toggle Sidebar" onClick={toggleSidebar}>
            <Menu size={20} />
          </button>
          <h2 className="header-title">Company Profile</h2>
        </div>
        <div className="header-buttons">
          <button
            className={`header-btn ${clickedButtons['headerMail'] ? 'clicked' : ''}`}
            title="Messages"
            onClick={() => {
              handleButtonClick('headerMail');
              navigate('/company/mail');
            }}
          >
            <Mail size={20} />
            <span className="notification-badge">1</span>
          </button>
          <button
            className={`header-btn ${clickedButtons['headerProfile'] ? 'clicked' : ''}`}
            title="Profile"
            onClick={() => {
              handleButtonClick('headerProfile');
              navigate('/company/profile');
            }}
          >
            <User size={20} />
          </button>
          <button
            className={`header-btn ${clickedButtons['headerHome'] ? 'clicked' : ''}`}
            title="Home"
            onClick={() => {
              handleButtonClick('headerHome');
              navigate('/company');
            }}
          >
            <Home size={20} />
          </button>
          <button
            className={`header-btn ${clickedButtons['headerLogout'] ? 'clicked' : ''}`}
            title="Logout"
            onClick={() => {
              handleButtonClick('headerLogout');
              navigate('/');
            }}
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="layout">
        <SideBarCompany onHoverChange={setIsSidebarHovered} />
        <div className={`content ${isSidebarHovered && window.innerWidth > 768 ? 'sidebar-expanded' : ''}`}>
          <div className="profile-header">
            <div className="logo-container">
              <img src={companyInfo.logo} alt="Company Logo" className="logo" />
              {isEditing && (
                <button className="btn btn-light">Change Logo</button>
              )}
            </div>
            <div className="header-info">
              <h1 className="company-name">{companyInfo.name}</h1>
              <p className="company-industry">{companyInfo.industry}</p>
              <div className="header-meta">
                <span className="meta-item">📍 {companyInfo.location}</span>
                <span className="meta-item">🕰️ Since {companyInfo.founded}</span>
                <span className="meta-item">👥 {companyInfo.employees} employees</span>
              </div>
            </div>
            <button 
              className={isEditing ? 'btn btn-primary' : 'btn btn-light'}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
          </div>

          <div className="profile-details">
            <div className="detail-section">
              <h3 className="section-title">About Us</h3>
              {isEditing ? (
                <textarea
                  name="description"
                  value={companyInfo.description}
                  onChange={handleChange}
                  className="form-textarea"
                />
              ) : (
                <p className="description">{companyInfo.description}</p>
              )}
            </div>

            <div className="detail-grid">
              <div className="detail-item">
                <label className="detail-label">Website</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="website"
                    value={companyInfo.website}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <a href={companyInfo.website} className="detail-value-link" target="_blank" rel="noopener noreferrer">
                    {companyInfo.website}
                  </a>
                )}
              </div>

              <div className="detail-item">
                <label className="detail-label">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={companyInfo.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <a href={`mailto:${companyInfo.email}`} className="detail-value">
                    {companyInfo.email}
                  </a>
                )}
              </div>

              <div className="detail-item">
                <label className="detail-label">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={companyInfo.location}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <span className="detail-value">{companyInfo.location}</span>
                )}
              </div>

              <div className="detail-item">
                <label className="detail-label">Industry</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="industry"
                    value={companyInfo.industry}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <span className="detail-value">{companyInfo.industry}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className={`mobile-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default ProfileCompany;