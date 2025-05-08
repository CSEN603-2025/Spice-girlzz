import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarCompany from './Components/SideBarCompany';

const CompanyMail = () => {
  const navigate = useNavigate();
  const [mails, setMails] = useState([
    {
        id: 3,
        from: 'SystemName',
        subject: 'New Application Received - Software Engineering Intern',
        body: 'You have received a new application for your Software Engineering Intern position from John Doe. Click here to view the application details.',
        date: new Date().toISOString().split('T')[0],
        read: false,
        type: 'application'
      }
    ,
    {
      id: 2,
      from: 'SystemName',
      subject: 'Welcome to SystemName Platform',
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

  // Count unread application notifications specifically
  const unreadApplicationCount = mails.filter(mail => 
    mail.type === 'application' && !mail.read
  ).length;

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>Company Mail</h2>
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
            {unreadApplicationCount > 0 && (
              <span style={styles.notificationBadge}>{unreadApplicationCount}</span>
            )}
          </button>
          <button style={styles.navBtn} onClick={() => navigate('/')}>🚪 Logout</button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <SideBarCompany activePage="mail" />

        <div style={styles.mailContent}>
          <div style={styles.mailCard}>
            <h3 style={styles.sectionTitle}>Your Messages</h3>
            <div style={styles.mailList}>
              {mails.length === 0 ? (
                <p style={styles.noData}>No messages found.</p>
              ) : (
                mails.map(mail => (
                  <div 
                    key={mail.id} 
                    style={{ 
                      ...styles.mailItem, 
                      backgroundColor: mail.read ? '#fff' : '#f0f8ff',
                      borderLeft: mail.type === 'application' ? '4px solid #2a9d8f' : '4px solid #457b9d'
                    }}
                    onClick={() => openMail(mail)}
                  >
                    <div style={styles.mailHeader}>
                      <span style={{ fontWeight: 'bold' }}>{mail.from}</span>
                      <span style={{ color: '#666' }}>{mail.date}</span>
                    </div>
                    <div style={styles.mailSubject}>
                      {mail.subject}
                      {mail.type === 'application' && (
                        <span style={styles.applicationBadge}>New Application</span>
                      )}
                    </div>
                    <div style={styles.mailPreview}>{mail.body.substring(0, 100)}...</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mail Details Modal */}
      {selectedMail && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.sectionTitle}>{selectedMail.subject}</h3>
            <div style={styles.mailMeta}>
              <p><strong>From:</strong> {selectedMail.from}</p>
              <p><strong>Date:</strong> {selectedMail.date}</p>
              {selectedMail.type === 'application' && (
                <span style={styles.applicationTag}>Application Notification</span>
              )}
            </div>
            <div style={styles.mailBodyContainer}>
              <p style={styles.mailBody}>{selectedMail.body}</p>
              {selectedMail.type === 'application' && (
                <button
                  style={styles.viewApplicationBtn}
                  onClick={() => navigate('/company/applications')}
                >
                  View Application
                </button>
              )}
            </div>
            <button
              onClick={closeMail}
              style={styles.closeBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}
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
  title: {
    margin: 0
  },
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
    fontSize: '12px'
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  mailContent: {
    flex: 1,
    padding: '2rem',
    marginLeft: '240px',
    overflowY: 'auto',
    height: 'calc(100vh - 64px)'
  },
  mailCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: '#1d3557',
    marginBottom: '1.5rem',
    borderBottom: '2px solid #a8dadc',
    paddingBottom: '0.5rem'
  },
  mailList: {
    marginTop: '1rem'
  },
  mailItem: {
    padding: '1.5rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }
  },
  mailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
    alignItems: 'center'
  },
  mailSubject: {
    fontWeight: '600',
    marginBottom: '0.75rem',
    color: '#1d3557',
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  mailPreview: {
    color: '#647c90',
    fontSize: '0.95rem',
    lineHeight: '1.5'
  },
  noData: {
    color: '#647c90',
    textAlign: 'center',
    fontSize: '1.1rem',
    padding: '2rem'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '700px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  mailMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    color: '#647c90',
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem'
  },
  mailBodyContainer: {
    backgroundColor: '#f1faee',
    padding: '1.5rem',
    borderRadius: '8px'
  },
  mailBody: {
    color: '#1d3557',
    fontSize: '1rem',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap'
  },
  closeBtn: {
    backgroundColor: '#457b9d',
    border: 'none',
    borderRadius: '5px',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    color: '#fff',
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: '1rem'
  },
  applicationBadge: {
    backgroundColor: '#2a9d8f',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  applicationTag: {
    backgroundColor: '#a8dadc',
    color: '#1d3557',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  viewApplicationBtn: {
    backgroundColor: '#2a9d8f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: '1.5rem',
    '&:hover': {
      backgroundColor: '#21867a'
    }
  }
};

export default CompanyMail;