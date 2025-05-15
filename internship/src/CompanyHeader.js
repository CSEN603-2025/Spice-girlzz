import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Home, LogOut, User, Menu } from 'lucide-react';
import './CompanyStyles.css';

const CompanyHeader = ({ title, mails, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Determine if badge should be shown
  const showNotificationBadge = location.pathname !== '/company/mail';

  // Compute unread application count (for potential future use)
  const unreadApplicationCount = (mails || []).filter(mail => 
    mail.type === 'application' && !mail.read
  ).length;

  // // Trigger random popup (not on /company/mail)
  // useEffect(() => {
  //   if (location.pathname === '/company/mail') return;

  //   // Check if popup has already shown in this session
  //   const hasShown = sessionStorage.getItem('notificationPopupShown');
  //   if (hasShown) return;

  //   // Random delay between 10-30 seconds
  //   const delay = Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
  //   const timer = setTimeout(() => {
  //     setShowPopup(true);
  //     sessionStorage.setItem('notificationPopupShown', 'true');
  //   }, delay);

  //   return () => clearTimeout(timer); // Cleanup on unmount
  // }, [location.pathname]);

  // Handle Go to Mail button
  const handleGoToMail = () => {
    setShowPopup(false);
    navigate('/company/mail');
  };

  // Debug logging
  console.log('CompanyHeader - mails:', mails);
  console.log('CompanyHeader - unreadApplicationCount:', unreadApplicationCount);
  console.log('CompanyHeader - location.pathname:', location.pathname);
  console.log('CompanyHeader - showNotificationBadge:', showNotificationBadge);
  // console.log('CompanyHeader - showPopup:', showPopup);

  return (
    <>
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 0 auto', maxWidth: '50%' }}>
          
          <h2 className="header-title">InternHub</h2>
        </div>
        <div className="header-buttons">
          <button
            className="header-btn"
            title="Messages"
            onClick={() => navigate('/company/mail')}
          >
            <Mail size={20} />
            {showNotificationBadge && (
              <span className="notification-badge">1</span>
            )}
          </button>
          <button
            className="header-btn"
            title="Profile"
            onClick={() => navigate('/company/profile')}
          >
            <User size={20} />
          </button>
          <button
            className="header-btn"
            title="Home"
            onClick={() => navigate('/company')}
          >
            <Home size={20} />
          </button>
          <button
            className="header-btn"
            title="Logout"
            onClick={() => navigate('/')}
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>
      {/* {showPopup && (
        <div className="notification-popup">
          <div className="notification-content">
            <h3>New Application Received!</h3>
            <p>You have a new application waiting in your inbox.</p>
            <div className="notification-buttons">
              <button className="btn btn-primary" onClick={handleGoToMail}>
                Go to Mail
              </button>
              <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default CompanyHeader;