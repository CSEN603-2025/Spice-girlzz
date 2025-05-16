import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SideBar from './Components/SideBar';
import { Mail, Home, LogOut, User, Menu } from 'lucide-react';
import NotificationSystem from './Components/NotificationsStudent';
import Header from './Components/Header';
import './StudentHomePage.css';


const StudentMail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('4rem');
  const [selectedMail, setSelectedMail] = useState(null);
  const [clickedButtons, setClickedButtons] = useState({});
  const [selectedSender, setSelectedSender] = useState('all');

  // Retrieve email
  const storedProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
  const email = (location.state?.email || storedProfile.email || "").toLowerCase();

  // Define separate mail sets for each user
  const esraMails = [
    {
      id: 1,
      from: 'scad@guc.edu.eg',
      subject: 'Esra: New internship cycle starts soon!',
      body: 'Prepare your documents - applications open in 7 days',
      date: new Date().toISOString().split('T')[0],
      read: false,
      type: 'application',
    },
    {
      id: 2,
      from: 'advisor@guc.edu.eg',
      subject: 'Esra: Report status updated',
      body: 'Esra, Your Report status has been updated head to the Reports section to view it!.',
      date: '2023-06-10',
      read: true,
      type: 'system',
    },
    {
      id: 3,
      from: 'scad@guc.edu.eg',
      subject: 'Esra: Report Status Updated',
      body: 'Esra, uh oh, looks like your report has been flagged! head to reports section to appeal this!',
      date: '2023-06-15',
      read: false,
      type: 'application',
    },

    
  ];

  const malakMails = [
    {
      id: 1,
      from: 'coordinator@guc.edu.eg',
      subject: 'Malak: Workshop Registration',
      body: 'Malak, the "Career Guidance" workshop starts tomorrow.',
      date: new Date().toISOString().split('T')[0],
      read: false,
      type: 'system',
    },
    {
      id: 2,
      from: 'scad@guc.edu.eg',
      subject: 'Malak: SCAD video call appointment',
      body: 'Malak, SCAD has rejected your appointment, try another date!',
      date: '2023-06-15',
      read: true,
      type: 'applications',
    },
    {
      id: 3,
      from: 'scad@guc.edu.eg',
      subject: 'Malak: SCAD accepted your appointment!',
      body: 'Head to Video Calls to join your scheduled meeting.',
      date: '2023-06-12',
      read: false,
      type: 'system',
    },

     {
      id: 3,
      from: 'scad@guc.edu.eg',
      subject: 'Malak: Congratulations, you have received a PRO badge!',
      body: 'Due to your completion of 3 months of internships, you can know access more features!.',
      date: '2023-06-12',
      read: true,
      type: 'system',
    },
  ];

  // Select mail set based on email
  const initialMails = email === 'esra@student.guc.edu.eg' ? esraMails : email === 'malak@student.guc.edu.eg' ? malakMails : [];

  const [mails, setMails] = useState(initialMails);

  // List of unique senders for the tabs
  const senders = ['all', ...new Set(mails.map(mail => mail.from))];

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };



  // Filter mails based on selected sender
  const filteredMails = selectedSender === 'all' 
    ? mails 
    : mails.filter(mail => mail.from === selectedSender);

  return (
    <div className="container">
      <NotificationSystem />
      <Header toggleSidebar={toggleSidebar} />
      <div className="layout">
        <SideBar
          setActivePage={(page) =>
            navigate(`/student${page === "home" ? "" : "/" + page}`, { state: { email } })
          }
          isOpen={isSidebarOpen}
          setSidebarWidth={setSidebarWidth}
        />
        <div
          className="main-content"
          style={{
            marginLeft: window.innerWidth > 768 ? sidebarWidth : '0',
            width: window.innerWidth > 768 ? `calc(100% - ${sidebarWidth})` : '100%',
            transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
            boxSizing: 'border-box',
            backgroundColor: '#f9fafb',
            padding: '1.5rem',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          <div className="card">
            <h3 className="section-title">Your Messages</h3>
            {/* Sender Tabs */}
    
            <div className="mail-list">
              {filteredMails.length === 0 ? (
                <p className="no-data">No messages available.</p>
              ) : (
                filteredMails.map(mail => (
                  <div 
                    key={mail.id} 
                    className={`mail-item ${mail.read ? '' : 'unread'} ${mail.type || 'system'}`}
                    onClick={() => openMail(mail)}
                  >
                    <div className="mail-header">
                      <span>{mail.from || 'Unknown Sender'}</span>
                      <span>{mail.date || 'No Date'}</span>
                    </div>
                    <div className="mail-subject">
                      {mail.subject || 'No Subject'}
                      {mail.type === 'application' ? (
                        <span className="application-badge">Important</span>
                      ) : null}
                    </div>
                    <div className="mail-preview">{(mail.body || 'No content').substring(0, 100)}...</div>
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
            <h3 className="section-title">{selectedMail.subject || 'No Subject'}</h3>
            <div className="mail-meta">
              <p><strong>From:</strong> {selectedMail.from || 'Unknown Sender'}</p>
              <p><strong>Date:</strong> {selectedMail.date || 'No Date'}</p>
              {selectedMail.type === 'application' && (
                <span className="application-tag">Application Notification</span>
              )}
            </div>
            <div className="mail-body-container">
              <p className="mail-body">{selectedMail.body || 'No content'}</p>
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

export default StudentMail;