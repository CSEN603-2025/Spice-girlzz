import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, CheckCircle, AlertCircle, Info, PhoneIncoming } from 'lucide-react';
import "./Notifications.css";

const NotificationCompany = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve email
  const storedProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
  const email = (location.state?.email || storedProfile.email || "").toLowerCase();
  const isStudent = email.endsWith('@student.guc.edu.eg');

  const callNotifications = [
    { 
      id: 1, 
      message: 'Incoming Call from Career Advisor', 
      details: 'You have an incoming video call. Accept to join the meeting.',
      type: 'call'
    },
    { 
      id: 2, 
      message: 'Incoming Call from Internship Coordinator', 
      details: 'Join the call to discuss your application.',
      type: 'call'
    },
    { 
      id: 3, 
      message: 'Incoming Call from Academic Advisor', 
      details: 'Video call to review your semester progress.',
      type: 'call'
    },
  ];

  const otherNotifications = [
    { 
      id: 4, 
      message: 'SCAD accepted your appointment!', 
      details: 'Head to Video Calls to join your scheduled meeting',
      type: 'success'
    },
    { 
      id: 5, 
      message: 'New internship cycle starts soon!', 
      details: 'Prepare your documents - applications open in 7 days',
      type: 'info'
    },
    { 
      id: 6, 
      message: 'Report status updated', 
      details: 'Your supervisor has reviewed your latest submission',
      type: 'success'
    },
    { 
      id: 7, 
      message: 'Workshop starting soon', 
      details: '"Career guidance for CS students" begins in 15 minutes!',
      type: 'alert'
    },
    { 
      id: 8, 
      message: 'Workshop starting soon', 
      details: '"How to improve your CV?" begins in 2 days!',
      type: 'alert'
    },
  ];

  // Get appropriate icon based on notification type
  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle size={18} />;
      case 'alert': return <AlertCircle size={18} />;
      case 'call': return <PhoneIncoming size={18} />;
      default: return <Info size={18} />;
    }
  };

  // Interval for call notifications (more frequent)
  useEffect(() => {
    if (!isStudent) return; // Skip if not a student

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * callNotifications.length);
      const newNotification = { 
        ...callNotifications[randomIndex], 
        id: Date.now() + Math.random(), // Unique ID
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setNotifications(prev => [...prev, newNotification]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(notif => notif.id !== newNotification.id));
      }, 10000);
    }, 20000); // Every 20 seconds

    return () => clearInterval(interval);
  }, [isStudent]);

  // Interval for other notifications
  useEffect(() => {
    if (!isStudent) return; // Skip if not a student

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * otherNotifications.length);
      const newNotification = { 
        ...otherNotifications[randomIndex], 
        id: Date.now() + Math.random(), // Unique ID
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setNotifications(prev => [...prev, newNotification]);

      // Auto-dismiss non-call notifications after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(notif => notif.id !== newNotification.id));
      }, 5000);
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [isStudent]);

  const handleDismiss = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleAcceptCall = (id) => {
    navigate('/student/startcall', { state: { email } });
    handleDismiss(id);
  };

  const handleRejectCall = (id) => {
    handleDismiss(id);
  };

  // Only render notifications for student users
  if (!isStudent) return null;

  return (
    <div className="notification-container">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`notification notification-${notif.type}`}
        >
          <div className="notification-icon">
            {getIcon(notif.type)}
          </div>
          <div className="notification-content">
            <div className="notification-header">
              <h4 className="notification-title">{notif.message}</h4>
              <span className="notification-time">{notif.time}</span>
            </div>
            <p className="notification-details">{notif.details}</p>
            {notif.type === 'call' && (
              <div className="call-actions">
                <button
                  className="call-action accept"
                  onClick={() => handleAcceptCall(notif.id)}
                >
                  <CheckCircle size={14} />
                  Accept
                </button>
                <button
                  className="call-action reject"
                  onClick={() => handleRejectCall(notif.id)}
                >
                  <X size={14} />
                  Reject
                </button>
              </div>
            )}
          </div>
          <button 
            className="notification-close"
            onClick={() => handleDismiss(notif.id)}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCompany;