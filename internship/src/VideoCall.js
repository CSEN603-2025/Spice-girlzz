import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // for styling with your color palette

function VideoCallDashboard() {
  const navigate = useNavigate();

  return (
    <div className="video-call-dashboard" style={{ paddingTop: '100px' }}>
      <header className="dashboard-header">
        <h1>Video Call Dashboard</h1>
      </header>

      <div className="dashboard-actions">
      <button onClick={() => navigate('/schedule')}>📅 Schedule a Call</button>
      <button onClick={() => navigate('/appointments')}>📄 View Appointments</button>
      <button onClick={() => navigate('/call')}>📞 Start a Call</button>
      </div>
    </div>
  );
}

export default VideoCallDashboard;
