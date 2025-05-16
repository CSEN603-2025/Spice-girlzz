import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import './StudentHomePage.css';
import SideBar from './Components/SideBar';
import Header from './Components/Header';
import './CompanyStyles.css';


function VideoCallDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('4rem');
  const [activeTab, setActiveTab] = useState('sent');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showStartCallModal, setShowStartCallModal] = useState(false);
  const [ringingAppointment, setRingingAppointment] = useState(null);
  const [callRejected, setCallRejected] = useState(false);

  const storedProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
  const email = (location.state?.email || storedProfile.email || "").toLowerCase();

  // Dummy appointment data
  const dummySentAppointments = [
    {
      id: 1,
      recipient: 'scad.office@university.edu',
      dateSent: '2025-05-10 14:30',
      purpose: 'Career Guidance',
      status: 'Pending',
      scheduledDate: '2025-05-11',
      scheduledTime: '10:00',
      isOnline: false
    },
    {
      id: 2,
      recipient: 'advisor.john@university.edu',
      dateSent: '2025-05-09 09:15',
      purpose: 'Report Clarification',
      status: 'Accepted',
      scheduledDate: '2025-05-10',
      scheduledTime: '11:30',
      isOnline: true
    }
  ];

  const dummyReceivedAppointments = [
    {
      id: 3,
      sender: 'advisor.mary@university.edu',
      dateSent: '2025-05-11 10:00',
      purpose: 'Career Guidance Follow-up',
      status: 'Pending',
      scheduledDate: '2025-05-12',
      scheduledTime: '14:00',
      isOnline: false
    },
    {
      id: 4,
      sender: 'scad.office@university.edu',
      dateSent: '2025-05-10 16:45',
      purpose: 'Report Discussion',
      status: 'Accepted',
      scheduledDate: '2025-05-13',
      scheduledTime: '09:30',
      isOnline: true
    }
  ];

  // Load new appointments from sessionStorage and combine with dummy sent appointments
  const newAppointments = JSON.parse(sessionStorage.getItem('sentAppointments') || '[]');
  const initialSentAppointments = [...dummySentAppointments, ...newAppointments];

  // Use state to manage appointments reactively
  const [appointments, setAppointments] = useState({
    sent: initialSentAppointments,
    received: dummyReceivedAppointments
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const markAsRead = (id) => {
    setAppointments(prev => {
      const updatedSent = prev.sent.map(appointment =>
        appointment.id === id && appointment.status === 'Pending'
          ? { ...appointment, status: 'Read' }
          : appointment
      );
      const updatedReceived = prev.received.map(appointment =>
        appointment.id === id && appointment.status === 'Pending'
          ? { ...appointment, status: 'Read' }
          : appointment
      );

      const updatedNewAppointments = newAppointments.map(appointment =>
        appointment.id === id && appointment.status === 'Pending'
          ? { ...appointment, status: 'Read' }
          : appointment
      );
      sessionStorage.setItem('sentAppointments', JSON.stringify(updatedNewAppointments));

      return {
        sent: updatedSent,
        received: updatedReceived
      };
    });
  };

  const openAppointment = (appointment) => {
    if (appointment.status === 'Pending') {
      markAsRead(appointment.id);
    }
    setSelectedAppointment(appointment);
  };

  const closeAppointment = () => {
    setSelectedAppointment(null);
  };

  const handleAccept = (appointmentId) => {
    setAppointments(prev => {
      const updatedReceived = prev.received.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: 'Accepted' }
          : appointment
      );

      const updatedSelected = selectedAppointment?.id === appointmentId
        ? { ...selectedAppointment, status: 'Accepted' }
        : selectedAppointment;
      setSelectedAppointment(updatedSelected);
      return {
        ...prev,
        received: updatedReceived
      };
    });
    console.log(`Accepted appointment ${appointmentId}`);
  };

  const handleReject = (appointmentId) => {
    setAppointments(prev => {
      const updatedReceived = prev.received.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: 'Rejected' }
          : appointment
      );

      const updatedSelected = selectedAppointment?.id === appointmentId
        ? { ...selectedAppointment, status: 'Rejected' }
        : selectedAppointment;
      setSelectedAppointment(updatedSelected);
      return {
        ...prev,
        received: updatedReceived
      };
    });
    console.log(`Rejected appointment ${appointmentId}`);
  };

  // Filter appointments for Start Call (Accepted and Online)
  const availableAppointments = [
    ...appointments.sent.filter(apt => apt.status === 'Accepted' && apt.isOnline),
    ...appointments.received.filter(apt => apt.status === 'Accepted' && apt.isOnline)
  ];

  const handleStartCallClick = () => {
    setShowStartCallModal(true);
    setCallRejected(false);
  };

  const handleSelectAppointment = (appointment) => {
    setShowStartCallModal(false);
    setRingingAppointment(appointment);
    // Simulate ringing for 2 seconds
    setTimeout(() => {
      if (appointment.id === 2) {
        // Hardcoded: ID 2 (advisor.john) always accepts
        navigate('/student/startCall', { state: { email, appointment } });
      } else {
        // Hardcoded: ID 4 (scad.office) always rejects
        setCallRejected(true);
        setRingingAppointment(null);
        // Clear rejection message after 3 seconds
        setTimeout(() => setCallRejected(false), 3000);
      }
    }, 2000);
  };

  return (
    <div className="container">
      <Header toggleSidebar={toggleSidebar} />
      <div className="layout">
        <SideBar
          setActivePage={(page) =>
            navigate(`/student${page === "home" ? "" : "/" + page}`, { state: { email } })
          }
          isOpen={isSidebarOpen}
          setSidebarWidth={setSidebarWidth}
        />
        <div className="main-content" style={{
          marginLeft: window.innerWidth > 768 ? sidebarWidth : '0',
          width: window.innerWidth > 768 ? `calc(100% - ${sidebarWidth})` : '100%',
          transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
          boxSizing: 'border-box',
          backgroundColor: '#f9fafb',
          padding: '1.5rem',
          overflowY: 'auto',
          flex: 1
        }}>
          <div className="profileContent">
            {/* Call Actions Section */}
            <div className="card" style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <h2 className="section-title">Call Management</h2>
              <p className='company-info'>
                Schedule video calls with the SCAD Office for personalized career guidance or to clarify internship report details.
              </p>
              <div className="dashboard-actions">
                <button
                  className="callButton"
                  onClick={() => navigate('/student/scheduleCall')}
                  style={{ marginRight: '1rem' }}
                >
                  📅 Schedule a Call
                </button>
                <button
                  className="callButton"
                  onClick={handleStartCallClick}
                >
                  📞 Start a Call
                </button>
              </div>
            </div>

            {/* Appointments Section */}
            <div className="card">
              <h3 className="section-title">Your Appointments</h3>
              <div style={{
                display: 'flex',
                borderBottom: '1px solid #e5e7eb',
                marginBottom: '1.5rem'
              }}>
                <button
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === 'sent' ? '2px solid #2a9d8f' : '2px solid transparent',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: activeTab === 'sent' ? '#2a9d8f' : '#6b7280',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setActiveTab('sent')}
                >
                  Sent
                </button>
                <button
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === 'received' ? '2px solid #2a9d8f' : '2px solid transparent',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: activeTab === 'received' ? '#2a9d8f' : '#6b7280',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setActiveTab('received')}
                >
                  Received
                </button>
              </div>
              <div className="mail-list">
                {(activeTab === 'sent' ? appointments.sent : appointments.received).length === 0 ? (
                  <p className="no-data">No appointments found.</p>
                ) : (
                  (activeTab === 'sent' ? appointments.sent : appointments.received).map(appointment => (
                    <div
                      key={appointment.id}
                      className={`mail-item ${appointment.status === 'Pending' ? 'unread' : ''}`}
                      onClick={() => openAppointment(appointment)}
                    >
                      <div className="mail-header">
                        <span className="flex items-center">
                          {activeTab === 'sent' ? appointment.recipient : appointment.sender}
                          <span className={`inline-flex items-center ml-2 text-xs font-medium px-2 py-1 rounded-full ${
                            appointment.isOnline 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <span className={`w-2 h-2 rounded-full mr-1 ${
                              appointment.isOnline 
                                ? 'bg-green-500 animate-pulse' 
                                : 'bg-gray-500'
                            }`}></span>
                            {appointment.isOnline ? 'Online' : 'Offline'}
                          </span>
                        </span>
                        <span>{appointment.dateSent}</span>
                      </div>
                      <div className="mail-subject">
                        {appointment.purpose}
                        {appointment.status === 'Pending' && (
                          <span className="appoint-badge">Pending</span>
                        )}
                        {appointment.status === 'Accepted' && (
                          <span className="appoint-badge accepted">Accepted</span>
                        )}
                        {appointment.status === 'Rejected' && (
                          <span className="appoint-badge rejected">Rejected</span>
                        )}
                      </div>
                      <div className="mail-preview">{appointment.purpose.substring(0, 100)}...</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for selecting appointments to start call */}
      {showStartCallModal && (
        <div className="modal-overlay" style={{ zIndex: 1002 }}>
          <div className="modal-content">
            <h3 className="section-title">Select Appointment to Start Call</h3>
            {availableAppointments.length === 0 ? (
              <p className="no-data">No accepted and online appointments available.</p>
            ) : (
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {availableAppointments.map(apt => (
                  <div
                    key={apt.id}
                    className="mail-item"
                    style={{ cursor: 'pointer', padding: '1rem', borderBottom: '1px solid #e5e7eb' }}
                    onClick={() => handleSelectAppointment(apt)}
                  >
                    <div className="mail-header">
                      <span className="flex items-center">
                        {activeTab === 'sent' ? apt.recipient : apt.sender}
                        <span className="inline-flex items-center ml-2 text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                          <span className="w-2 h-2 rounded-full mr-1 bg-green-500 animate-pulse"></span>
                          Online
                        </span>
                      </span>
                      <span>{apt.scheduledDate} {apt.scheduledTime}</span>
                    </div>
                    <div className="mail-subject">{apt.purpose}</div>
                  </div>
                ))}
              </div>
            )}
            <button
              className="btn btn-danger"
              onClick={() => setShowStartCallModal(false)}
              style={{ marginTop: '1rem' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Ringing effect */}
      {ringingAppointment && (
        <div className="modal-overlay" style={{ zIndex: 1002 }}>
          <div className="modal-content" style={{ textAlign: 'center' }}>
            <h3 className="section-title">Calling...</h3>
            <p className="animate-pulse" style={{ color: '#2a9d8f', fontSize: '1.25rem', margin: '1rem 0' }}>
              📞 Ringing {activeTab === 'sent' ? ringingAppointment.recipient : ringingAppointment.sender}
            </p>
          </div>
        </div>
      )}

      {/* Rejection message */}
      {callRejected && (
        <div
          style={{
            position: 'fixed',
            top: '4.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1003,
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            padding: '1rem 2rem',
            borderRadius: '0.375rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          Sorry, the User is Busy
        </div>
      )}

      {/* Existing appointment details modal */}
      {selectedAppointment && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="section-title">{selectedAppointment.purpose}</h3>
            <div className="mail-meta">
              <p><strong>{activeTab === 'sent' ? 'To' : 'From'}:</strong> {activeTab === 'sent' ? selectedAppointment.recipient : selectedAppointment.sender}</p>
              <p><strong>Date Sent:</strong> {selectedAppointment.dateSent}</p>
              <p><strong>Scheduled Date:</strong> {selectedAppointment.scheduledDate}</p>
              <p><strong>Scheduled Time:</strong> {selectedAppointment.scheduledTime}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
              {selectedAppointment.status === 'Pending' && activeTab === 'received' && (
                <span className="application-tag">Pending Appointment</span>
              )}
            </div>
            <div className="mail-body-container">
              <p className="mail-body">{selectedAppointment.purpose}</p>
              {selectedAppointment.status === 'Pending' && activeTab === 'received' && (
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAccept(selectedAppointment.id)}
                    style={{ marginRight: '0.5rem' }}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleReject(selectedAppointment.id)}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
            <button className="btn btn-danger" onClick={closeAppointment}>
              Close
            </button>
          </div>
        </div>
      )}

      {isSidebarOpen && (
        <div className="mobile-overlay active" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}

export default VideoCallDashboard;