import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './Components/SideBar';
import { Mail, User, LogOut, Home, Menu } from 'lucide-react';

function AvailableInternships() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [isPaid, setIsPaid] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState('4rem'); 

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
      industry: 'Tech',
      status: 'available',
    },
    {
      id: 2,
      companyName: 'SCAD Systems',
      jobTitle: 'Web Developer',
      duration: '3 months',
      isPaid: 'unpaid',
      expectedSalary: '$0/month',
      skillsRequired: 'HTML, CSS, JavaScript',
      description: 'Build responsive web applications.',
      industry: 'Tech',
      status: 'available',
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
      industry: 'Tech',
      status: 'available',
    },
  ];

  const filteredInternships = availableInternships.filter((internship) => {
    const search = searchQuery.toLowerCase();
    const matchesSearch =
      internship.companyName.toLowerCase().includes(search) ||
      internship.jobTitle.toLowerCase().includes(search);
    const matchesIndustry = selectedIndustry ? internship.industry === selectedIndustry : true;
    const matchesDuration = selectedDuration ? internship.duration === selectedDuration : true;
    const matchesPaid = isPaid ? internship.isPaid === isPaid : true;
    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });

  const handleApply = (internship) => {
    const appliedInternship = {
      id: internship.id,
      title: internship.jobTitle,
      company: internship.companyName,
      duration: internship.duration,
      isPaid: internship.isPaid,
      expectedSalary: internship.expectedSalary,
      skillsRequired: internship.skillsRequired,
      description: internship.description,
      industry: internship.industry,
      status: 'pending',
      applicationDate: new Date().toISOString().split('T')[0],
    };
    setAppliedInternships((prevAppliedInternships) => [
      ...prevAppliedInternships,
      appliedInternship,
    ]);
    alert(`Applied to ${internship.jobTitle} at ${internship.companyName}!`);
    setSelectedInternship(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={{ ...styles.header, position: 'fixed', top: 0, width: '100%', zIndex: 1001, boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 0 auto', maxWidth: '50%' }}>
          <button
            style={styles.headerBtn}
            title="Toggle Sidebar"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </button>
          <h2 style={styles.title}>GUC Internship System</h2>
        </div>
        <div style={styles.headerButtons}>
          <button
            style={styles.headerBtn}
            onClick={() => navigate('/student/messages')}
          >
            <Mail size={20} />
          </button>
          <button
            style={styles.headerBtn}
            onClick={() => navigate('/student')}
          >
            <Home size={20} />
          </button>
          <button
            style={styles.headerBtn}
            onClick={() => navigate('/student/Profile')}
          >
            <User size={20} />
          </button>
          <button
            style={styles.headerBtn}
            onClick={() => navigate('/')}
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

     <div style={{ ...styles.layout, marginTop: '4rem', minHeight: 'calc(100vh - 4rem)' }}>
          {/* Sidebar */}
          <div style={styles.sidebar}>
            <SideBar
              setActivePage={(page) => navigate(`/student${page === 'home' ? '' : '/' + page}`)}
              isOpen={isSidebarOpen}
              setSidebarWidth={setSidebarWidth} // Add setSidebarWidth prop
            />
          </div>

          {/* Main Content */}
          <main
            style={{
              flex: 1,
              padding: '1.5rem',
              overflowY: 'auto',
              marginLeft: window.innerWidth > 768 ? sidebarWidth : '0',
              width: window.innerWidth > 768 ? `calc(100% - ${sidebarWidth})` : '100%',
              transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
              boxSizing: 'border-box',
              backgroundColor: '#f9fafb',
            }}
            >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
            Available Internships
          </h2>

          {/* Search and Filter Inputs */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search by job title or company name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #3b82f6')}
              onBlur={(e) => (e.target.style.boxShadow = 'none')}
            />
            <select
              onChange={(e) => setSelectedIndustry(e.target.value)}
              style={styles.filterButtons}
              onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #3b82f6')}
              onBlur={(e) => (e.target.style.boxShadow = 'none')}
            >
              <option value="">Select Industry</option>
              <option value="Tech">Tech</option>
              <option value="Finance">Finance</option>
            </select>
            <select
              onChange={(e) => setSelectedDuration(e.target.value)}
              style={styles.filterButtons}
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
              style={styles.filterButtons}
              onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #3b82f6')}
              onBlur={(e) => (e.target.style.boxShadow = 'none')}
            >
              <option value="">Paid/Unpaid</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedIndustry('');
                setSelectedDuration('');
                setIsPaid('');
              }}
              style={styles.filterButtons}
            >
              Clear Filters
            </button>
          </div>

          {/* Internships Grid */}
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
                onClick={() => setSelectedInternship(internship)}
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
        </main>
      </div>

      {/* Internship Details Modal */}
      {selectedInternship && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1002,
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  background: '#10b981',
                  color: '#fff',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  border: 'none',
                  fontSize: '0.875rem',
                }}
                onClick={() => handleApply(selectedInternship)}
                onMouseOver={(e) => (e.target.style.background = '#059669')}
                onMouseOut={(e) => (e.target.style.background = '#10b981')}
              >
                Apply
              </button>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  background: '#ef4444',
                  color: '#fff',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  border: 'none',
                  fontSize: '0.875rem',
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

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '4rem',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: window.innerWidth <= 768 ? 'block' : 'none',
          }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: 'linear-gradient(#fff)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '0.75rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#000',
    margin: 0,
    letterSpacing: '-0.015em',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  headerButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  headerBtn: {
    padding: '0.5rem',
    color: '#000',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  layout: {
    display: 'flex',
    flex: 1,
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
  },
  filterButtons: {
    fontSize: '0.8rem',
    padding: '0.5em 1em',
    backgroundColor: '#e5e7eb',
    color: '#1f2937',
    border: 'none',
    borderRadius: '1150px',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.2s ease',
  },
  searchInput: {
    fontSize: '0.8rem',
    padding: '0.5em 1em',
    backgroundColor: '#e5e7eb',
    color: '#1f2937',
    border: 'none',
    borderRadius: '1150px',
    cursor: 'text',
    textAlign: 'left',
    width: '400px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.2s ease',
  },
  '@media (max-width: 768px)': {
    searchInput: {
      width: '100%',
    },
    filterButtons: {
      minWidth: 'auto',
    },
  },
};

// Animation keyframes and media query
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @media (max-width: 768px) {
    .main-content {
      margin-left: 0 !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default AvailableInternships;