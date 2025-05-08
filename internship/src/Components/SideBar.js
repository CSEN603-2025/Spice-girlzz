import React from 'react';
import { Briefcase, FileText, BarChart2, Search } from 'lucide-react';

function SideBar({ setActivePage }) {
  const navItems = [
    { title: 'My Internships', page: 'applied', icon: <Briefcase size={20} /> },
    { title: 'Weekly Report', page: 'report', icon: <FileText size={20} /> },
    { title: 'Evaluation', page: 'evaluate', icon: <BarChart2 size={20} /> },
    { title: 'Available Internships', page: 'available', icon: <Search size={20} /> },
    // Example: Sidebar Button or Navigation Option
//<button onClick={() => setActivePage('applied')}>My Internships</button>



  ];


  return (
    <div
      style={{
        flex: 1,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
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
              style={{
                width: '100%',
                padding: '0.75rem',
                textAlign: 'left',
                color: '#4b5563',
                background: 'transparent',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'background 0.2s, color 0.2s',
              }}
              onClick={() => setActivePage(item.page)}
              onMouseOver={(e) => {
                e.target.style.background = '#f3f4f6';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              {item.icon}
              <span>{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;