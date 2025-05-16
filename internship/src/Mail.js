import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyStyles.css";

const SCADMail = () => {
  const navigate = useNavigate();

  const [mails, setMails] = useState([
    {
      id: 1,
      from: "alaa.abdelnaser@student.guc.edu.eg",
      subject: "Issue with Report Submission",
      body: "Dear SCAD Staff,\n\nI'm facing an error when trying to submit my internship report for TechCorp. The system keeps timing out. Could you please assist or confirm if the submission went through?\n\nBest regards,\nAlaa Abdelnaser",
      date: "2025-05-10",
      read: false,
      type: "system",
    },
    {
      id: 2,
      from: "mennatullah.elsabagh@student.guc.edu.eg",
      subject: "Clarification on Internship Status",
      body: "Hello SCAD Team,\n\nMy internship application with FinTech Solutions is still showing as 'Pending' in the system. Can you confirm if there’s an issue or when it will be reviewed?\n\nThank you,\nMennatullah El Sabagh",
      date: "2025-05-08",
      read: true,
      type: "system",
    },
    {
      id: 3,
      from: "esraa.ahmed@student.guc.edu.eg",
      subject: "Missing Internship Evaluation",
      body: "Dear SCAD Office,\n\nI completed my internship with MediHealth, but the evaluation form is not visible in the system. Could you please guide me on how to access or resubmit it?\n\nSincerely,\nEsraa Ahmed",
      date: "2025-05-07",
      read: false,
      type: "system",
    },
    {
      id: 4,
      from: "john.ibraham@student.guc.edu.eg",
      subject: "Company Approval Delay",
      body: "Hi SCAD Staff,\n\nI applied for an internship with GreenEnergy, but the company approval is still pending in the system. Can you check if there’s a delay or if I need to follow up?\n\nRegards,\nJohn Ibraham",
      date: "2025-05-06",
      read: true,
      type: "system",
    },
    {
      id: 5,
      from: "malak.hisham@student.guc.edu.eg",
      subject: "Error in Internship Details",
      body: "Hello,\n\nThe system lists my internship title incorrectly for DataSync. It should be 'Data Analyst Intern' instead of 'Data Engineer Intern'. Can this be corrected?\n\nThank you,\nMalak Hisham",
      date: "2025-05-05",
      read: false,
      type: "system",
    },
    {
      id: 6,
      from: "mennatullah.shaaban@student.guc.edu.eg",
      subject: "Unable to Access Report Template",
      body: "Dear SCAD Team,\n\nI’m trying to download the internship report template for Pharma, but the link in the system is broken. Could you share the correct template or fix the link?\n\nBest,\nMennatullah Shaaban",
      date: "2025-05-04",
      read: true,
      type: "system",
    },
    {
      id: 7,
      from: "ismail.mohamed@student.guc.edu.eg",
      subject: "Flagged Report Assistance",
      body: "Hi SCAD Office,\n\nMy report for DataSync was flagged due to incomplete tasks. Can you clarify what’s missing or schedule a meeting to discuss?\n\nThank you,\nIsmail Mohamed",
      date: "2025-05-03",
      read: false,
      type: "system",
    },
    {
      id: 8,
      from: "clara.davis@student.guc.edu.eg",
      subject: "System Login Issue for Internship Portal",
      body: "Dear SCAD Staff,\n\nI’m unable to log into the internship portal to check my application status for BuildCorp. It says 'Invalid Credentials'. Can you reset my access or advise?\n\nRegards,\nClara Davis",
      date: "2025-05-02",
      read: true,
      type: "system",
    },
    {
      id: 9,
      from: "ahmed.eissa@student.guc.edu.eg",
      subject: "Request for Report Resubmission Guidance",
      body: "Hello SCAD Team,\n\nMy report for BuildCorp was rejected due to missing documentation. Could you provide guidance on what needs to be included for resubmission?\n\nSincerely,\nAhmed Eissa",
      date: "2025-05-01",
      read: false,
      type: "system",
    },
  ]);

  const [selectedMail, setSelectedMail] = useState(null);

  const markAsRead = (id) => {
    setMails(
      mails.map((mail) => (mail.id === id ? { ...mail, read: true } : mail))
    );
  };

  const openMail = (mail) => {
    if (!mail.read) markAsRead(mail.id);
    setSelectedMail(mail);
  };

  const closeMail = () => setSelectedMail(null);

  return (
    <div className>
      <div className>
        <h3 className="section-title">Your Messages</h3>
        <div className="mail-list">
          {mails.length === 0 ? (
            <p className="no-data">No messages found.</p>
          ) : (
            mails.map((mail) => (
              <div
                key={mail.id}
                className={`mail-item ${mail.read ? "" : "unread"} ${
                  mail.type || "system"
                }`}
                onClick={() => openMail(mail)}
              >
                <div className="mail-header">
                  <span>{mail.from || "Unknown Sender"}</span>
                  <span>{mail.date || "No Date"}</span>
                </div>
                <div className="mail-subject">
                  {mail.subject || "No Subject"}
                  {mail.type === "application" && (
                    <span className="application-badge">New Application</span>
                  )}
                </div>
                <div className="mail-preview">
                  {(mail.body || "No content").substring(0, 100)}...
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedMail && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="section-title">
              {selectedMail.subject || "No Subject"}
            </h3>
            <div className="mail-meta">
              <p>
                <strong>From:</strong> {selectedMail.from || "Unknown Sender"}
              </p>
              <p>
                <strong>Date:</strong> {selectedMail.date || "No Date"}
              </p>
              {selectedMail.type === "application" && (
                <span className="application-tag">
                  Application Notification
                </span>
              )}
            </div>
            <div className="mail-body-container">
              <p className="mail-body">{selectedMail.body || "No content"}</p>
              {selectedMail.type === "application" && (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/company/applicants")}
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

export default SCADMail;
