import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, FileText, BarChart2, Search } from 'lucide-react';

function SideBar({ setActivePage, isOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { title: 'My Internships', page: 'applied', icon: <Briefcase size={20} />, path: '/student/applied' },
    { title: 'Weekly Report', page: 'report', icon: <FileText size={20} />, path: '/student/report' },
    { title: 'Evaluation', page: 'evaluate', icon: <BarChart2 size={20} />, path: '/student/evaluate' },
    { title: 'Available Internships', page: 'available', icon: <Search size={20} />, path: '/student/available' },
  ];

  const getButtonStyle = (itemPath) => {
    const isActive = location.pathname === itemPath;
    return {
      width: '100%',
      padding: '0.75rem',
      textAlign: 'left',
      color: isActive ? '#000' : '#000', // Ivory for text
      background: isActive ? '#4e4f50' : 'transparent', // Cool Gray for active background
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      transition: 'background 0.2s, color 0.2s',
      border: 'none',
    };
  };

  const handleNavigation = (page, path) => {
    setActivePage(page);
    navigate(path);
  };

  return (
    <div
      style={{
        flex: 1,
        background: 'linear-gradient( #fff 100%)', // Same as header
        display: 'flex',
        flexDirection: 'column',
        width: '16rem',
        height: 'calc(100% - 4rem)', // Subtract header height
        height:'100%',
        position: 'fixed',
        top: '3.75rem', // Start below header
        left: 0,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', // Slide in/out
        transition: 'transform 0.3s ease-in-out', // Smooth transition
        zIndex: 1000, // Below header (z-index 1001)
        boxShadow: isOpen ? '2px 0 4px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <ul
        style={{
          listStyle: 'none',
          padding: '0.5rem',
          margin: 0,
        }}
      >
        {navItems.map((item, index) => (
          <li
            key={index}
            style={{
              margin: '0.25rem 0',
            }}
          >
            <button
              style={getButtonStyle(item.path)}
              onClick={() => handleNavigation(item.page, item.path)}
              onMouseOver={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.background = '#bcb8b1'; // Gray for hover
                }
              }}
              onMouseOut={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              {React.cloneElement(item.icon, { color: '#4d8f88' })} {/* Ivory for icons */}
              <span>{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;