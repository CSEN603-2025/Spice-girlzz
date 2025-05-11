import React, { useState } from 'react';
import './AppointmentsPage.css'; 
import './App.css'; // Keep this too if you still use shared styles
import HeaderandSidebar from './StudentHandS';


function ScheduleCall() {
  const [formData, setFormData] = useState({
    topic: '',
    date: '',
    time: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to an API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ topic: '', date: '', time: '' });
    
    // Reset submission status after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <HeaderandSidebar>
    <div className="appointment-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h3 style={{ color: '#1d3557', textAlign: 'center' }}>Schedule a Call</h3>
      
      {submitted ? (
        <div style={{ 
          backgroundColor: '#a8dadc', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          <p>Request submitted successfully!</p>
          <p>Your request will appear in 'Appointments'.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="appointment-row" style={{ marginBottom: '15px' }}>
            <label className="label">Topic:</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                width: '100%'
              }}
            />
          </div>
          
          <div className="appointment-row" style={{ marginBottom: '15px' }}>
            <label className="label">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>
          
          <div className="appointment-row" style={{ marginBottom: '20px' }}>
            <label className="label">Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>
          
          <button 
            type="submit" 
            className="row"
            style={{
              width: '100%',
              justifyContent: 'center',
              fontSize: '1rem',
              padding: '12px'
            }}
          >
            Submit Request
          </button>
        </form>
      )}
    </div>
    </HeaderandSidebar>
  );
}

export default ScheduleCall;