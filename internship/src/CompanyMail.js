import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarCompany from './Components/SideBarCompany';
import { Mail, Home, LogOut, User, Menu } from 'lucide-react';
import './CompanyStyles.css';

const CompanyMail = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      body: 'Congratulations! We are pleased to inform you that your application has been accepted. Please log in to your dashboard for next steps.',
      date: '2023-06-15',
      read: false,
      type: 'system'
    }
  ]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [clickedButtons, setClickedButtons] = useState({});

  const markAsRead = (id) => {
    setMails(mails.map(mail => 
      mail.id === id ? { ...mail, read: true } : mail
    ));
  };

  const openMail = (mail) => {
    if (!mail.read) {
      markAsRead(mail.id);
    }
    setSelectedMail(mail);
  };

  const closeMail = () => {
    setSelectedMail(null);
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

  const unreadApplicationCount = mails.filter(mail => 
    mail.type === 'application' && !mail.read
  ).length;

  return (
    <div className="container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 0 auto', maxWidth: '50%' }}>
          <button className="header-btn" title="Toggle Sidebar" onClick={toggleSidebar}>
            <Menu size={20} />
          </button>
          <h2 className="header-title">Company Mail</h2>
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
            {unreadApplicationCount > 0 && (
              <span className="notification-badge">{unreadApplicationCount}</span>
            )}
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
            <h3 className="section-title">Your Messages</h3>
            <div className="mail-list">
              {mails.length === 0 ? (
                <p className="no-data">No messages found.</p>
              ) : (
                mails.map(mail => (
                  <div 
                    key={mail.id} 
                    className={`mail-item ${mail.read ? '' : 'unread'} ${mail.type}`}
                    onClick={() => openMail(mail)}
                  >
                    <div className="mail-header">
                      <span>{mail.from}</span>
                      <span>{mail.date}</span>
                    </div>
                    <div className="mail-subject">
                      {mail.subject}
                      {mail.type === 'application' && (
                        <span className="application-badge">New Application</span>
                      )}
                    </div>
                    <div className="mail-preview">{mail.body.substring(0, 100)}...</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedMail && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="section-title">{selectedMail.subject}</h3>
            <div className="mail-meta">
              <p><strong>From:</strong> {selectedMail.from}</p>
              <p><strong>Date:</strong> {selectedMail.date}</p>
              {selectedMail.type === 'application' && (
                <span className="application-tag">Application Notification</span>
              )}
            </div>
            <div className="mail-body-container">
              <p className="mail-body">{selectedMail.body}</p>
              {selectedMail.type === 'application' && (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/company/applicants')}
                >
                  View Application
                </button>
              )}
            </div>
            <button className="btn btn-danger" onClick={closeMail}>
              Close
            </button>
          </div>
        </div>
      )}

      {isSidebarOpen && (
        <div className={`mobile-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default CompanyMail;