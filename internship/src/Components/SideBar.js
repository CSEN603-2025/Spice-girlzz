import React from 'react';

function SideBar({ setActivePage }) {
  return (
    <div style={styles.sidebar}>
      <button onClick={() => setActivePage('home')}>🏠 Home</button>
      <button onClick={() => setActivePage('applied')}>📄 Applied Internships</button>
      <button onClick={() => setActivePage('report')}>📝 Weekly Report</button>
      <button onClick={() => setActivePage('evaluate')}>📊 Evaluation</button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '200px',
    padding: '1rem',
    backgroundColor: '#f1faee',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    borderRight: '1px solid #ccc',
  },
};

export default SideBar;

