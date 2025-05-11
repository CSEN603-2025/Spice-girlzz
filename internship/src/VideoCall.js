import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Make sure this has shared styles
import Appointments from './Appointments';
import HeaderAndSidebar from './StudentHandS';

function VideoCallDashboard() {
  const navigate = useNavigate();

  return (
    <HeaderAndSidebar>
      <div className="video-call-dashboard">
        <header className="dashboard-header">
          <h1 className="dashboard-title">📹 Video Call Dashboard</h1>
        </header>

        <div className="dashboard-actions">
          <button className="dashboard-button" onClick={() => navigate('/student/scheduleCall')}>
            📅 Schedule a Call
          </button>
          <button className="dashboard-button" onClick={() => navigate('/startCall')}>
            📞 Start a Call
          </button>
        </div>

        <Appointments />
      </div>
    </HeaderAndSidebar>
  );
}

export default VideoCallDashboard;
