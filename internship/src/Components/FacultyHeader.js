import React from "react";
import { Mail, Home, User, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "../HomePage.css";

const FacultyHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mails] = React.useState([
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

  // Check if current route is the mail page
  const isMailPage = location.pathname === '/faculty/mail';

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 0 auto', maxWidth: '50%' }}>
        <h2 className="header-title">InternHub</h2>
      </div>
      <div className="header-buttons">
        <button
          className="header-btn"
          title="Messages"
          onClick={() => navigate('/faculty/mail')}
        >
          <Mail size={20} />
          {!isMailPage && unreadApplicationCount > 0 && (
            <span className="notification-badge">{unreadApplicationCount}</span>
          )}
        </button>

        <button
          className="header-btn"
          title="Home"
          onClick={() => navigate('/faculty')}
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
  );
};

export default FacultyHeader;