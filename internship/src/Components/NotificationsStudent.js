import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, CheckCircle, AlertCircle, Info, PhoneIncoming } from 'lucide-react';
import "./Notifications.css";

const NotificationSystem = () => {
  const [notification, setNotification] = useState(null); // Single notification state
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef(null); // Store timeout ID
  const intervalRef = useRef(null); // Store interval ID

  // Retrieve email
  const storedProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
  const email = (location.state?.email || storedProfile.email || "").toLowerCase();
  const isStudent = email.endsWith('@student.guc.edu.eg');

  const callNotifications = [
    { 
      id: 1, 
      message: 'Incoming Call from SCAD', 
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

  const MalaksNotifs = [
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

  const EsraNotifs = [
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
  ];

  // Get appropriate icon based on notification type
  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={18} />;
      case 'alert': return <AlertCircle size={18} />;
      case 'call': return <PhoneIncoming size={18} />;
      default: return <Info size={18} />;
    }
  };

  // Function to generate a random notification
  const generateNotification = () => {
    // Select user-specific notifications based on email
    const userNotifications = email === 'esra@student.guc.edu.eg' 
      ? EsraNotifs 
      : email === 'malak@student.guc.edu.eg' 
      ? MalaksNotifs 
      : [];

    // Only Malak gets call notifications
    const notificationPool = email === 'malak@student.guc.edu.eg' && Math.random() < 0.5 && userNotifications.length > 0 
      ? userNotifications 
      : email === 'malak@student.guc.edu.eg' 
      ? callNotifications 
      : userNotifications;

    // Exit if no notifications available
    if (notificationPool.length === 0) return;

    // Randomly select a notification
    const randomIndex = Math.floor(Math.random() * notificationPool.length);
    const newNotification = {
      ...notificationPool[randomIndex],
      id: Date.now() + Math.random(), // Unique ID
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setNotification(newNotification);
  };

  // Manage notifications and auto-dismiss
  useEffect(() => {
    if (!isStudent) return; // Skip if not a student

    // Clear any existing timeout or interval
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Set up interval to generate notifications
    intervalRef.current = setInterval(() => {
      if (!notification) {
        generateNotification();
      }
    }, 10000); // Check every 10 seconds

    // Auto-dismiss logic when notification changes
    if (notification) {
      const timeoutDuration = notification.type === 'call' ? 5000 : 3000;
      timeoutRef.current = setTimeout(() => {
        setNotification(null);
        timeoutRef.current = null;
      }, timeoutDuration);
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isStudent, notification, email]);

  const handleDismiss = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setNotification(null);
  };

  const handleAcceptCall = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    navigate('/student/startcall', { state: { email } });
    setNotification(null);
  };

  const handleRejectCall = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setNotification(null);
  };

  // Only render notifications for student users
  if (!isStudent) return null;

  return (
    <div className="notification-container">
      {notification && (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
        >
          <div className="notification-icon">
            {getIcon(notification.type)}
          </div>
          <div className="notification-content">
            <div className="notification-header">
              <h4 className="notification-title">{notification.message}</h4>
              <span className="notification-time">{notification.time}</span>
            </div>
            <p className="notification-details">{notification.details}</p>
            {notification.type === 'call' && (
              <div className="call-actions">
                <button
                  className="call-action accept"
                  onClick={handleAcceptCall}
                >
                  <CheckCircle size={14} />
                  Accept
                </button>
                <button
                  className="call-action reject"
                  onClick={handleRejectCall}
                >
                  <X size={14} />
                  Reject
                </button>
              </div>
            )}
          </div>
          <button 
            className="notification-close"
            onClick={handleDismiss}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;