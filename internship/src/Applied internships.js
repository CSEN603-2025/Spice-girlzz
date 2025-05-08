import React, { useState, useEffect } from 'react';

function AppliedInternships() {
  const [internships, setInternships] = useState([]);
  
  useEffect(() => {
    // Simulating an API call to fetch the internships the student applied to
    const fetchInternships = async () => {
      // Replace this with your actual API request to get applied internships
      const response = await fetch('/api/internships');  // Replace with the real endpoint
      const data = await response.json();
      setInternships(data);  // Set the fetched data to the state
    };

    fetchInternships();  // Call the fetch function when the component mounts
  }, []);

  // If there are no internships applied, show a message
  if (internships.length === 0) {
    return <p>No internships applied yet.</p>;
  }

  // Render the list of internships
  return (
    <div>
      <h3>Applied Internships</h3>
      <ul>
        {internships.map((internship) => (
          <li key={internship.id}>
            <strong>{internship.title}</strong> - {internship.company}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppliedInternships;
