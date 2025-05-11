// Header.jsx
import React from "react";
import { Menu, Mail, Home, User, LogOut } from "lucide-react"; // adjust import as needed
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const FacultyHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
    const [clickedButtons, setClickedButtons] = useState({});
     const [mails, setMails] = useState([
    {
      id: 3,
      from: 'InternHub',
      subject: 'New Application Received - Software Engineering Intern',
      body: 'You have received a new application for your Software Engineering Intern position from John Doe. Click here to view the application details.',
      date: new Date().toISOString().split('T')[0],
      read: false,
      type: 'application'
    },
    {
      id: 2,
      from: 'InternHub',
      subject: 'Welcome to InternHub Platform',
      body: 'Thank you for registering your company with us. We look forward to working with you.',
      date: '2023-06-10',
      read: true,
      type: 'system'
    },
    {
      id: 1,
      from: 'scadoffice@guc.edu.eg',
      subject: 'Your application has been accepted!',
      body: 'Congratulations! We are pleased to inform you that your application has been accepted.',
      date: '2023-06-15',
      read: false,
      type: 'system'
    }
  ]);
  
  const unreadApplicationCount = mails.filter(mail => 
    mail.type === 'application' && !mail.read
  ).length;
   const handleButtonClick = (buttonId) => {
    setClickedButtons(prev => ({
      ...prev,
      [buttonId]: true
    }));
  };
 

  return (
    <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 0 auto', maxWidth: '50%' }}>
          <button className="header-btn" title="Toggle Sidebar" onClick={toggleSidebar}>
            <Menu size={20} />
          </button>
          <h2 className="header-title">Student Evaluations</h2>
        </div>
        <div className="header-buttons">
          <button
            className={`header-btn ${clickedButtons['headerMail./'] ? 'clicked' : ''}`}
            title="Messages"
            onClick={() => {
              handleButtonClick('headerMail');
              navigate('/faculty/mail');
            }}
          >
            <Mail size={20} />
            {unreadApplicationCount > 0 && (
              <span className="notification-badge">{unreadApplicationCount}</span>
            )}
          </button>
          <button
            className={`header-btn ${clickedButtons['headerProfile'] ? 'clicked' : ''}`}
            title="Profile"
            onClick={() => {
              handleButtonClick('headerProfile');
              navigate('/faculy/profile');
            }}
          >
            <User size={20} />
          </button>
          <button
            className={`header-btn ${clickedButtons['headerHome'] ? 'clicked' : ''}`}
            title="Home"
            onClick={() => {
              handleButtonClick('headerHome');
              navigate('/faculty');
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
  );
};

export default FacultyHeader;
