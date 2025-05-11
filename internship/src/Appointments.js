import React from 'react';
import './AppointmentsPage.css';

function AppointmentsPage() {
  const appointments = [
    {
      id: 1,
      date: 'May 10, 2025',
      time: '10:00 AM',
      with: 'Mariam Khaleel',
      location: 'SCAD Virtual Office Room 1',
    },
    {
      id: 2,
      date: 'May 12, 2025',
      time: '2:00 PM',
      with: 'Asiya Kareem',
      location: 'SCAD Virtual Office Room 3',
    },
    {
      id: 3,
      date: 'May 15, 2025',
      time: '11:30 AM',
      with: 'Ibrahim Mohamed',
      location: 'SCAD Virtual Office Room 2',
    },
  ];

  return (
    <div className="appointments-wrapper">
      <h1 className="appointments-title">Your Upcoming Appointments</h1>

      <div className="appointments-container">
        {appointments.map((appt) => (
          <div key={appt.id} className="appointment-card">
            <div className="appointment-detail"><strong>Date:</strong> {appt.date}</div>
            <div className="appointment-detail"><strong>Time:</strong> {appt.time}</div>
            <div className="appointment-detail"><strong>With:</strong> {appt.with}</div>
            <div className="appointment-detail"><strong>Location:</strong> {appt.location}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppointmentsPage;
