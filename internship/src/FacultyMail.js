import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyStyles.css';

const FacultyMail = () => {
  const navigate = useNavigate();
  const [mails, setMails] = useState([
    {
      id: 2,
      from: 'InternHub',
      subject: 'Welcome to InternHub Platform',
      body: 'We are pleased to have such a good faculty member',
      date: '2023-06-10',
      read: true,
      type: 'system'
    },
    {
      id: 1,
      from: 'scadoffice@guc.edu.eg',
      subject: 'Ahmed has some issues with his report...',
      body: 'Ahmed has a report that is missing some stuff they may need to redo their internship',
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
    if (!mail.read) markAsRead(mail.id);
    setSelectedMail(mail);
  };

  const closeMail = () => setSelectedMail(null);

  return (
    <div className="content">
      <div className="card">
        <h3 className="section-title">Your Messages</h3>
        <div className="mail-list">
          {mails.length === 0 ? (
            <p className="no-data">No messages found.</p>
          ) : (
            mails.map(mail => (
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
                  {mail.type === 'application' && (
                    <span className="application-badge">New Application</span>
                  )}
                </div>
                <div className="mail-preview">{(mail.body || 'No content').substring(0, 100)}...</div>
              </div>
            ))
          )}
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
    </div>
  );
};

export default FacultyMail;
