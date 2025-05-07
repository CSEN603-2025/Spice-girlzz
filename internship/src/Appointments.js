import React from 'react';
import './AppointmentsPage.css'; // 👈 this line
import './App.css'; // Keep this too if you still use shared styles

function AppointmentsPage() {
  const appointments = [
    {
      id: 1,
      date: 'May 10, 2025',
      time: '10:00 AM',
      with: 'Academic Advisor',
      location: 'SCAD Virtual Office Room 1',
    },
    {
      id: 2,
      date: 'May 12, 2025',
      time: '2:00 PM',
      with: 'Career Counselor',
      location: 'SCAD Virtual Office Room 3',
    },
    {
      id: 3,
      date: 'May 15, 2025',
      time: '11:30 AM',
      with: 'Financial Aid Officer',
      location: 'SCAD Virtual Office Room 2',
    },
  ];

  return (
    <div className="video-call-dashboard">
      <div className="dashboard-header">
        <h1>Your Appointments</h1>
      </div>

      <div className="appointments-container">
        {appointments.map((appt) => (
          <div key={appt.id} className="appointment-card">
            <div className="appointment-row">
              <span className="label">Date:</span> {appt.date}
            </div>
            <div className="appointment-row">
              <span className="label">Time:</span> {appt.time}
            </div>
            <div className="appointment-row">
              <span className="label">With:</span> {appt.with}
            </div>
            <div className="appointment-row">
              <span className="label">Location:</span> {appt.location}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppointmentsPage;
