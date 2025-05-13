import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Eye } from "lucide-react";

const ProfileViewsPopup = ({ onClose }) => {
  // Dummy data for profile views
  const profileViews = [
    { id: 1, company: 'TechCorp', viewedOn: '2023-05-15', position: 'Frontend Developer' },
    { id: 2, company: 'DataSystems', viewedOn: '2023-05-10', position: 'React Specialist' },
    { id: 3, company: 'WebSolutions', viewedOn: '2023-05-05', position: 'UI Engineer' },
    { id: 4, company: 'InnovateCo', viewedOn: '2023-04-28', position: 'JavaScript Developer' },
    { id: 5, company: 'DigitalCreations', viewedOn: '2023-04-20', position: 'Full Stack Developer' },
  ];

  const popupRef = useRef(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Create portal container
  const portalContainer = document.createElement('div');
  portalContainer.setAttribute('id', 'profile-views-popup-portal');

  // Append to body on mount, remove on unmount
  useEffect(() => {
    document.body.appendChild(portalContainer);
    return () => document.body.removeChild(portalContainer);
  }, [portalContainer]);

  const popupContent = (
    <div ref={popupRef} style={{
      position: 'fixed',
      top: '64px',
      right: '20px',
      width: '280px',
      maxHeight: 'calc(100vh - 80px)',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 1003, // Above notifications (1002) and header (1001)
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      animation: 'fadeInSlideRight 0.3s ease-out'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid #f3f4f6',
        backgroundColor: '#f9fafb'
      }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: '14px', 
          fontWeight: '600',
          color: '#111827'
        }}>
          Profile Views
        </h3>
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#6b7280',
            padding: '2px',
            borderRadius: '4px',
            lineHeight: 1,
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          ×
        </button>
      </div>
      
      <div style={{ 
        flex: 1,
        overflowY: 'auto',
        padding: '8px'
      }}>
        {profileViews.length === 0 ? (
          <div style={{ 
            padding: '16px', 
            textAlign: 'center', 
            color: '#6b7280', 
            fontSize: '13px'
          }}>
            No profile views yet
          </div>
        ) : (
          profileViews.map(view => (
            <div 
              key={view.id} 
              style={{
                padding: '10px 12px',
                marginBottom: '8px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                backgroundColor: 'white',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '4px'
              }}>
                <strong style={{ fontSize: '13px', color: '#111827' }}>
                  {view.company}
                </strong>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>
                  {view.viewedOn}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#4b5563' }}>
                {view.position}
              </div>
            </div>
          ))
        )}
      </div>
      
      <style>
        {`
          @keyframes fadeInSlideRight {
            from {
              opacity: 0;
              transform: translateX(10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );

  return createPortal(popupContent, portalContainer);
};

export default ProfileViewsPopup;