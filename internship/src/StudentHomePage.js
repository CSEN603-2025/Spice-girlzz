import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './Components/SideBar';
import { Mail, User, LogOut } from 'lucide-react';

function StudentHomePage() {
  const [activePage, setActivePage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [isPaid, setIsPaid] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const navigate = useNavigate();
  const [appliedInternships, setAppliedInternships] = useState(() => {
    const saved = sessionStorage.getItem('appliedInternships');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('appliedInternships', JSON.stringify(appliedInternships));
  }, [appliedInternships]);

  const availableInternships = [
    {
      id: 1,
      companyName: 'SCAD Technologies',
      jobTitle: 'Software Engineer',
      duration: '6 months',
      isPaid: 'paid',
      expectedSalary: '$2000/month',
      skillsRequired: 'JavaScript, React, Node.js',
      description: 'Develop cutting-edge software solutions.',
      startDate: '2025-01-01',
      endDate: '2025-06-30',
    },
    {
      id: 2,
      companyName: 'SCAD Systems',
      jobTitle: 'Web Developer',
      duration: '3 months',
      isPaid: 'unpaid',
      expectedSalary: '$4500/month',
      skillsRequired: 'HTML, CSS, JavaScript',
      description: 'Build responsive web applications.',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
    },
    {
      id: 3,
      companyName: 'SCAD Solutions',
      jobTitle: 'Data Analyst',
      duration: '12 months',
      isPaid: 'paid',
      expectedSalary: '$2500/month',
      skillsRequired: 'Python, SQL, Tableau',
      description: 'Analyze data to drive business decisions.',
      startDate: '2025-03-01',
      endDate: '2026-02-28',
    },
  ];

  const filteredInternships = availableInternships.filter((internship) => {
    const search = searchQuery.toLowerCase();
    const now = new Date();
    const matchesSearch =
      internship.companyName.toLowerCase().includes(search) ||
      internship.jobTitle.toLowerCase().includes(search);
    const matchesIndustry = selectedIndustry ? internship.industry === selectedIndustry : true;
    const matchesDuration = selectedDuration ? internship.duration === selectedDuration : true;
    const matchesPaid = isPaid ? internship.isPaid === isPaid : true;
    const matchesStatus =
      filterStatus === 'current'
        ? new Date(internship.endDate) >= now
        : filterStatus === 'completed'
        ? new Date(internship.endDate) < now
        : true;
    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid && matchesStatus;
  });

  const handleSelectInternship = (internship) => {
    setSelectedInternship(internship);
  };

  const handleApply = (internship) => {
    setAppliedInternships((prevAppliedInternships) => [
      ...prevAppliedInternships,
      internship,
    ]);
    alert(`Applied to ${internship.jobTitle} at ${internship.companyName}!`);
    setSelectedInternship(null);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'applied':
        return (
          <div style={{ animation: 'fadeIn 0.3s' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
              Applied Internships
            </h2>
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.375rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              {appliedInternships.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '1.5rem' }}>
                  {appliedInternships.map((internship, index) => (
                    <div
                      key={index}
                      style={{
                        background: '#fff',
                        padding: '1rem',
                        borderRadius: '0.375rem',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'box-shadow 0.3s, background-color 0.3s',
                      }}
                    >
                      <h4 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                        {internship.jobTitle}
                      </h4>
                      <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#4b5563' }}>
                        <strong>Company:</strong> {internship.companyName}
                      </p>
                      <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#4b5563' }}>
                        <strong>Duration:</strong> {internship.duration}
                      </p>
                      <button
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#3b82f6',
                          color: '#fff',
                          borderRadius: '0.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          marginTop: '0.75rem',
                        }}
                        onClick={() => handleSelectInternship(internship)}
                        onMouseOver={(e) => (e.target.style.background = '#2563eb')}
                        onMouseOut={(e) => (e.target.style.background = '#3b82f6')}
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#4b5563' }}>You have not applied to any internships yet.</p>
              )}
            </div>
          </div>
        );
      case 'available':
        return (
          <div style={{ animation: 'fadeIn 0.3s' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
              Available Internships
            </h2>
            <div style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ position: 'relative', flex: '1 1 20rem', minWidth: '15rem' }}>
                <input
                  type="text"
                  placeholder="Search by job title or company name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: '0.4rem 0.4rem 0.4rem 2rem',
                    width: '100%',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontSize: '0.875rem',
                  }}
                  onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #3b82f6')}
                  onBlur={(e) => (e.target.style.boxShadow = 'none')}
                />
              </div>
              <select
                onChange={(e) => setSelectedIndustry(e.target.value)}
                style={{
                  padding: '0.4rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  outline: 'none',
                  minWidth: '12rem',
                  width: '12rem',
                  maxWidth: '12rem',
                  fontSize: '0.875rem',
                }}
                onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #3b82f6')}
                onBlur={(e) => (e.target.style.boxShadow = 'none')}
              >
                <option value="">Select Industry</option>
                <option value="Tech">Tech</option>
                <option value="Finance">Finance</option>
              </select>
              <select
                onChange={(e) => setSelectedDuration(e.target.value)}
                style={{
                  padding: '0.4rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  outline: 'none',
                  minWidth: '12rem',
                  width: '12rem',
                  maxWidth: '12rem',
                  fontSize: '0.875rem',
                }}
                onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #3b82f6')}
                onBlur={(e) => (e.target.style.boxShadow = 'none')}
              >
                <option value="">Select Duration</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="12 months">12 months</option>
              </select>
              <select
                onChange={(e) => setIsPaid(e.target.value)}
                style={{
                  padding: '0.4rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  outline: 'none',
                  minWidth: '12rem',
                  width: '12rem',
                  maxWidth: '12rem',
                  fontSize: '0.875rem',
                }}
                onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #3b82f6')}
                onBlur={(e) => (e.target.style.boxShadow = 'none')}
              >
                <option value="">Paid/Unpaid</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
              <select
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  padding: '0.4rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  outline: 'none',
                  minWidth: '12rem',
                  width: '12rem',
                  maxWidth: '12rem',
                  fontSize: '0.875rem',
                }}
                onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #3b82f6')}
                onBlur={(e) => (e.target.style.boxShadow = 'none')}
              >
                <option value="all">All Internships</option>
                <option value="current">Current Internships</option>
                <option value="completed">Completed Internships</option>
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '1.5rem' }}>
              {filteredInternships.map((internship) => (
                <div
                  key={internship.id}
                  style={{
                    background: '#fff',
                    padding: '1rem',
                    borderRadius: '0.375rem',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    transition: 'box-shadow 0.3s, background-color 0.3s',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSelectInternship(internship)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.backgroundColor = '#fff';
                  }}
                >
                  <h4 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                    {internship.jobTitle}
                  </h4>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#4b5563' }}>
                    <strong>Company:</strong> {internship.companyName}
                  </p>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#4b5563' }}>
                    <strong>Duration:</strong> {internship.duration}
                  </p>
                  <p style={{ margin: '0.75rem 0 0', fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.4' }}>
                    {internship.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div style={{ animation: 'fadeIn 0.3s' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
              Welcome
            </h2>
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.375rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <p style={{ color: '#4b5563' }}>Welcome, Student! Use the sidebar to navigate.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f3f4f6' }}>
      {/* Sidebar */}
      <div style={{ width: '16rem', background: '#fff', boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
            GUC Internship Portal
          </h1>
        </div>
        <SideBar setActivePage={setActivePage} />
        <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <button
            style={{
              width: '100%',
              padding: '0.75rem',
              textAlign: 'left',
              color: '#4b5563',
              borderRadius: '0.375rem',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => navigate('/')}
            onMouseOver={(e) => (e.target.style.background = '#f3f4f6')}
            onMouseOut={(e) => (e.target.style.background = 'none')}
          >
            <LogOut size={20} style={{ marginRight: '0.75rem' }} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header
          style={{
            background: '#fff',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
              {activePage.charAt(0).toUpperCase() + activePage.slice(1).replace('-', ' ')}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              style={{ padding: '0.5rem', color: '#4b5563', cursor: 'pointer' }}
              onMouseOver={(e) => (e.target.style.color = '#1f2937')}
              onMouseOut={(e) => (e.target.style.color = '#4b5563')}
            >
              <Mail size={24} />
            </button>
            <button
              style={{ padding: '0.5rem', color: '#4b5563', cursor: 'pointer' }}
              onClick={() => navigate('/student/profile')}
              onMouseOver={(e) => (e.target.style.color = '#1f2937')}
              onMouseOut={(e) => (e.target.style.color = '#4b5563')}
            >
              <User size={24} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          {renderContent()}
        </main>
      </div>

      {/* Modal */}
      {selectedInternship && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              maxWidth: '24rem',
              width: '100%',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
              {selectedInternship.jobTitle}
            </h3>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Company:</strong> {selectedInternship.companyName}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Duration:</strong> {selectedInternship.duration}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Paid/Unpaid:</strong> {selectedInternship.isPaid.charAt(0).toUpperCase() + selectedInternship.isPaid.slice(1)}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Expected Salary:</strong> {selectedInternship.expectedSalary}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Skills Required:</strong> {selectedInternship.skillsRequired}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Description:</strong> {selectedInternship.description}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Start Date:</strong> {selectedInternship.startDate}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>End Date:</strong> {selectedInternship.endDate}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
              {activePage === 'available' && (
                <button
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#10b981',
                    color: '#fff',
                    borderRadius: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleApply(selectedInternship)}
                  onMouseOver={(e) => (e.target.style.background = '#059669')}
                  onMouseOut={(e) => (e.target.style.background = '#10b981')}
                >
                  Apply
                </button>
              )}
              <button
                style={{
                  padding: '0.5rem 1rem',
                  background: '#ef4444',
                  color: '#fff',
                  borderRadius: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedInternship(null)}
                onMouseOver={(e) => (e.target.style.background = '#dc2626')}
                onMouseOut={(e) => (e.target.style.background = '#ef4444')}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Animation keyframes
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default StudentHomePage;