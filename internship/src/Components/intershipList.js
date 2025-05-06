import React from 'react';

function InternshipList({ internships }) {
  return (
    <div>
      <h3>Available Internships</h3>
      <ul>
        {internships.map((item, index) => (
          <li key={index}>
            <strong>{item.company}</strong> – {item.title} ({item.duration})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InternshipList;
