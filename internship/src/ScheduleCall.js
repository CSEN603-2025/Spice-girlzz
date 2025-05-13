import React, { useState } from 'react';
import './AppointmentsPage.css';
import './App.css';
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import { useNavigate, useLocation } from 'react-router-dom';
import './StudentHomePage.css';

function ScheduleCall() {
  const location = useLocation();
  const storedProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
  const email = (location.state?.email || storedProfile.email || "").toLowerCase();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topic: '',
    date: '',
    time: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("4rem");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: Date.now(), // Unique ID based on timestamp
      recipient: 'scad.office@university.edu', // Default recipient
      dateSent: new Date().toISOString().slice(0, 16).replace('T', ' '), // Format: YYYY-MM-DD HH:mm
      purpose: formData.topic,
      status: 'Pending',
      scheduledDate: formData.date,
      scheduledTime: formData.time
    };

    // Retrieve existing appointments from sessionStorage or initialize empty array
    const existingAppointments = JSON.parse(sessionStorage.getItem('sentAppointments') || '[]');
    // Add new appointment
    const updatedAppointments = [...existingAppointments, newAppointment];
    // Save back to sessionStorage
    sessionStorage.setItem('sentAppointments', JSON.stringify(updatedAppointments));

    console.log('Form submitted:', newAppointment);
    setSubmitted(true);
    setFormData({ topic: '', date: '', time: '' });

    // Reset submission status after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className='container'>
      <Header toggleSidebar={toggleSidebar} />
      <div className="layout" style={{ marginTop: "4rem", minHeight: "calc(100vh - 4rem)" }}>
        <SideBar
          setActivePage={(page) =>
              navigate(`/student${page === "home" ? "" : "/" + page}`, { state: { email } })
            }
            isOpen={isSidebarOpen}
            setSidebarWidth={setSidebarWidth}
        />
        <main style={{
          flex: 1,
          padding: "1.5rem",
          overflowY: "auto",
          marginLeft: window.innerWidth > 768 ? sidebarWidth : "0",
          width: window.innerWidth > 768 ? `calc(100% - ${sidebarWidth})` : "100%",
          transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
          boxSizing: "border-box",
          backgroundColor: "#f9fafb",
        }}>
          <div className="schedule" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h3 className="schedule-header">Schedule a Call</h3>
            {submitted ? (
              <div className="success-message">
                <p>Request submitted successfully!</p>
                <p className='subtext'>Your request will appear in 'Video Call Section'.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='schedule-form'>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label className="form-label">Topic:</label>
                  <input
                    type="text"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                    className='form-input'
                  />
                </div>
                <div className="date-time-grid" style={{ marginBottom: '15px' }}>
                  <label className="form-label">Date:</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className='form-input'
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label className="form-label">Time:</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className='form-input'
                  />
                </div>
                <button
                  type="submit"
                  className="submit-btn"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ScheduleCall;