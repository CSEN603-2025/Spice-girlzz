import React from 'react';

function AlertPopup({ message, show }) {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#10b981',
      color: '#fff',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 2000,
      fontSize: '0.9rem',
      opacity: 1,
      transition: 'opacity 1s ease-in-out',
    }}>
      {message}
    </div>
  );
}

export default AlertPopup;
