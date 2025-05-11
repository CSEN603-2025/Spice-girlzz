import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarCompany from './Components/SideBarCompany';
import { Mail, Home, LogOut, User, Menu } from 'lucide-react';
import './CompanyStyles.css';

const CompanyHome = () => {
  const navigate = useNavigate();
  const companyName = "Tech Innovators Ltd.";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [clickedButtons, setClickedButtons] = useState({});

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
          <h2 className="header-title">Company Dashboard</h2>
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
        <div className="sidebar">
          <SideBarCompany setActivePage={(page) => navigate(`/company/${page}`)} />
        </div>
        <div className={`content ${isSidebarOpen && window.innerWidth > 768 ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="card">
            <h3 className="section-title">Welcome back, {companyName}!</h3>
            <p>Here's what's happening with your company today.</p>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className={`mobile-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default CompanyHome;