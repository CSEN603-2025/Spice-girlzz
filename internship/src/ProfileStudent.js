import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SideBar from './Components/SideBar';
import { Mail, Home, LogOut, Edit, Upload } from 'lucide-react';

function ProfileStudent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [appliedInternships, setAppliedInternships] = useState(() => {
    const saved = sessionStorage.getItem('appliedInternships');
    if (!saved) return [];
    const now = new Date();
    return JSON.parse(saved).map(item => ({
      ...item,
      status: new Date(item.endDate) < now ? 'finalized' : (item.status || 'pending')
    }));
  });
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [documents, setDocuments] = useState(() => {
    const saved = sessionStorage.getItem('documents');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDocument, setSelectedDocument] = useState(null);

  const filterInternships = (internships) => {
    const now = new Date();
    return internships.filter((internship) => {
      const isFinalized = new Date(internship.endDate) < now;
      const matchesDate = filter === 'current'
        ? !isFinalized
        : filter === 'completed'
        ? isFinalized
        : true;
      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'finalized' && isFinalized) ||
        (!isFinalized && internship.status === statusFilter);
      return matchesDate && matchesStatus;
    });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const majorSemesterMap = {
    'Applied Arts': ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'],
    'Architecture': ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8', 'Semester 9', 'Semester 10'],
    'Business Informatics': ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'],
    'IET': ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8', 'Semester 9', 'Semester 10'],
    'Management': ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'],
    'MET': ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8', 'Semester 9', 'Semester 10'],
    'Mechatronics Engineering': ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8', 'Semester 9', 'Semester 10'],
    'Pharmacy': ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8', 'Semester 9', 'Semester 10'],
  };

  const majors = Object.keys(majorSemesterMap);
  const formRef = useRef(null);

  const initialProfileData = {
    name: '',
    email: location.state?.email || '',
    major: '',
    semester: '',
    jobInterests: '',
    previousInternships: '',
  };

  const [profileData, setProfileData] = useState(() => {
    const savedData = sessionStorage.getItem('studentProfile');
    return savedData ? JSON.parse(savedData) : initialProfileData;
  });

  const [availableSemesters, setAvailableSemesters] = useState(
    majorSemesterMap[profileData.major] || []
  );

  useEffect(() => {
    sessionStorage.setItem('studentProfile', JSON.stringify(profileData));
  }, [profileData]);

  useEffect(() => {
    sessionStorage.setItem('documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    sessionStorage.setItem('appliedInternships', JSON.stringify(appliedInternships));
  }, [appliedInternships]);

  const handleMajorChange = (e) => {
    const selectedMajor = e.target.value;
    setAvailableSemesters(majorSemesterMap[selectedMajor] || []);
    setProfileData((prev) => ({
      ...prev,
      major: selectedMajor,
      semester: '',
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    setProfileData({
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      major: formData.get('major') || '',
      semester: formData.get('semester') || '',
      jobInterests: formData.get('jobInterests') || '',
      previousInternships: formData.get('previousInternships') || '',
    });
    setShowEditModal(false);
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setDocuments((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type,
            size: file.size,
            data: reader.result,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteDocument = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleSetActivePage = (page) => {
    if (page === 'home') {
      navigate('/student');
    } else {
      navigate(`/student/${page}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return '#10b981';
      case 'rejected':
        return '#ef4444';
      case 'pending':
        return '#f59e0b';
      case 'finalized':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  const isProfileEmpty = Object.values(profileData).every((value) => !value);
  const filteredAppliedInternships = filterInternships(appliedInternships);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h2 style={styles.title}>Student Profile</h2>
        <div style={styles.headerButtons}>
          <button
            style={styles.headerBtn}
            onMouseOver={(e) => (e.target.style.color = '#1f2937')}
            onMouseOut={(e) => (e.target.style.color = '#4b5563')}
          >
            <Mail size={24} />
          </button>
          <button
            style={styles.headerBtn}
            onClick={() => navigate('/student')}
            onMouseOver={(e) => (e.target.style.color = '#1f2937')}
            onMouseOut={(e) => (e.target.style.color = '#4b5563')}
          >
            <Home size={24} />
          </button>
          <button
            style={styles.headerBtn}
            onClick={() => navigate('/')}
            onMouseOver={(e) => (e.target.style.color = '#1f2937')}
            onMouseOut={(e) => (e.target.style.color = '#4b5563')}
          >
            <LogOut size={24} />
          </button>
        </div>
      </header>

      <div style={styles.layout}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <h1 style={styles.sidebarTitle}>GUC Internship Portal</h1>
          </div>
          <SideBar setActivePage={handleSetActivePage} />
          <div style={styles.sidebarFooter}>
            <button
              style={styles.logoutBtn}
              onClick={() => navigate('/')}
              onMouseOver={(e) => (e.target.style.background = '#f3f4f6')}
              onMouseOut={(e) => (e.target.style.background = 'none')}
            >
              <LogOut size={20} style={{ marginRight: '0.75rem' }} /> Logout
            </button>
          </div>
        </div>

        <div style={styles.profileContent}>
          <div style={styles.profileHeader}>
            <h3 style={styles.profileTitle}>Welcome, {profileData.name || "Student"}!</h3>
            <button
              style={styles.editBtn}
              onClick={() => setShowEditModal(true)}
              onMouseOver={(e) => (e.target.style.background = '#2563eb')}
              onMouseOut={(e) => (e.target.style.background = '#3b82f6')}
            >
              <Edit size={16} style={{ marginRight: '0.5rem' }} /> Edit Profile
            </button>
          </div>

          <div style={styles.profileBox}>
            {isProfileEmpty ? (
              <div style={styles.empty}>
                <p style={styles.emptyText}>No profile information added yet. Click edit to begin.</p>
              </div>
            ) : (
              <div style={styles.grid}>
                <ProfileItem label="Name" value={profileData.name} />
                <ProfileItem label="Email" value={profileData.email} />
                <ProfileItem label="Major" value={profileData.major} />
                <ProfileItem label="Semester" value={profileData.semester} />
                <ProfileItem label="Job Interests" value={profileData.jobInterests} />
                <ProfileItem label="Previous Internships" value={profileData.previousInternships} />
              </div>
            )}
          </div>

          {/* Documents Section */}
          <div style={{ marginTop: '1.5rem', animation: 'fadeIn 0.3s' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
              Documents
            </h2>
            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  padding: '0.5rem 1rem',
                  background: '#3b82f6',
                  color: '#fff',
                  borderRadius: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
                onMouseOver={(e) => (e.target.style.background = '#2563eb')}
                onMouseOut={(e) => (e.target.style.background = '#3b82f6')}
              >
                <Upload size={16} style={{ marginRight: '0.5rem' }} /> Upload Documents
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={handleDocumentUpload}
                />
              </label>
            </div>
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.375rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              {documents.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '1.5rem' }}>
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      style={{
                        background: '#fff',
                        padding: '1rem',
                        borderRadius: '0.375rem',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'box-shadow 0.3s, background-color 0.3s',
                      }}
                    >
                      <p style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 'bold', color: '#1f2937' }}>
                        {doc.name}
                      </p>
                      <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#4b5563' }}>
                        <strong>Type:</strong> {doc.type}
                      </p>
                      <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#4b5563' }}>
                        <strong>Size:</strong> {(doc.size / 1024).toFixed(2)} KB
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                        <button
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#3b82f6',
                            color: '#fff',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                          }}
                          onClick={() => setSelectedDocument(doc)}
                          onMouseOver={(e) => (e.target.style.background = '#2563eb')}
                          onMouseOut={(e) => (e.target.style.background = '#3b82f6')}
                        >
                          View
                        </button>
                        <button
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#ef4444',
                            color: '#fff',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                          }}
                          onClick={() => handleDeleteDocument(doc.id)}
                          onMouseOver={(e) => (e.target.style.background = '#dc2626')}
                          onMouseOut={(e) => (e.target.style.background = '#ef4444')}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#4b5563' }}>No documents uploaded yet.</p>
              )}
            </div>
          </div>

          {/* Applied Internships Section */}
          <div style={{ marginTop: '1.5rem', animation: 'fadeIn 0.3s' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
              Applied Internships
            </h2>
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
              <select
                onChange={handleFilterChange}
                value={filter}
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
              <select
                onChange={handleStatusFilterChange}
                value={statusFilter}
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
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="finalized">Finalized</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.375rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              {filteredAppliedInternships.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '1.5rem' }}>
                  {filteredAppliedInternships.map((internship, index) => (
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
                      <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: getStatusColor(internship.status) }}>
                        <strong>Status:</strong> {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
                      </p>
                      <p style={{ margin: '0.75rem 0 0', fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.4' }}>
                        {internship.description}
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
                        onClick={() => setSelectedInternship(internship)}
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
        </div>
      </div>

      {/* Modal for Internship Details */}
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
            <p style={{ color: getStatusColor(selectedInternship.status), marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Status:</strong> {selectedInternship.status.charAt(0).toUpperCase() + selectedInternship.status.slice(1)}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Documents:</strong> {documents.length > 0 ? documents.map(doc => doc.name).join(', ') : 'None uploaded'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
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

      {/* Modal for Document Preview */}
      {selectedDocument && (
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
              {selectedDocument.name}
            </h3>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Type:</strong> {selectedDocument.type}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Size:</strong> {(selectedDocument.size / 1024).toFixed(2)} KB
            </p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Preview:</strong> Document preview not supported in this view.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
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
                onClick={() => setSelectedDocument(null)}
                onMouseOver={(e) => (e.target.style.background = '#dc2626')}
                onMouseOut={(e) => (e.target.style.background = '#ef4444')}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Profile Editing */}
      {showEditModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Edit Your Profile</h3>
            <form ref={formRef} onSubmit={handleEditSubmit} style={styles.form}>
              <TextInput name="name" defaultValue={profileData.name} placeholder="Enter your name" />
              <TextInput name="email" defaultValue={profileData.email} type="email" placeholder="Enter your email" />
              <SelectInput name="major" value={profileData.major} options={majors} onChange={handleMajorChange} />
              <SelectInput name="semester" value={profileData.semester} options={availableSemesters} disabled={!profileData.major} />
              <TextInput name="jobInterests" defaultValue={profileData.jobInterests} placeholder="Job interests" />
              <TextArea name="previousInternships" defaultValue={profileData.previousInternships} placeholder="Describe previous internships" />

              <div style={styles.buttonGroup}>
                <button
                  type="submit"
                  style={styles.saveBtn}
                  onMouseOver={(e) => (e.target.style.background = '#059669')}
                  onMouseOut={(e) => (e.target.style.background = '#10b981')}
                >
                  Save
                </button>
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={() => setShowEditModal(false)}
                  onMouseOver={(e) => (e.target.style.background = '#dc2626')}
                  onMouseOut={(e) => (e.target.style.background = '#ef4444')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
const ProfileItem = ({ label, value }) => (
  <p style={styles.profileItem}>
    <strong>{label}:</strong> {value || "Not provided"}
  </p>
);

const TextInput = ({ name, defaultValue, placeholder, type = "text" }) => (
  <input
    type={type}
    name={name}
    defaultValue={defaultValue}
    placeholder={placeholder}
    style={styles.input}
    onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #3b82f6')}
    onBlur={(e) => (e.target.style.boxShadow = 'none')}
  />
);

const TextArea = ({ name, defaultValue, placeholder }) => (
  <textarea
    name={name}
    defaultValue={defaultValue}
    placeholder={placeholder}
    style={styles.textarea}
    onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #3b82f6')}
    onBlur={(e) => (e.target.style.boxShadow = 'none')}
  />
);

const SelectInput = ({ name, value, onChange, options, disabled = false }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    disabled={disabled}
    style={styles.input}
    onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #3b82f6')}
    onBlur={(e) => (e.target.style.boxShadow = 'none')}
  >
    <option value="">Select</option>
    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
  </select>
);

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  headerButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  headerBtn: {
    padding: '0.5rem',
    color: '#4b5563',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  layout: {
    display: 'flex',
    flex: 1,
  },
  sidebar: {
    width: '16rem',
    background: '#fff',
    boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarHeader: {
    padding: '1rem',
    borderBottom: '1px solid #e5e7eb',
  },
  sidebarTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  sidebarFooter: {
    padding: '1rem',
    borderTop: '1px solid #e5e7eb',
  },
  logoutBtn: {
    width: '100%',
    padding: '0.75rem',
    textAlign: 'left',
    color: '#4b5563',
    borderRadius: '0.375rem',
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  profileContent: {
    flex: 1,
    padding: '1.5rem',
    overflowY: 'auto',
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  profileTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  editBtn: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
  },
  profileBox: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '0.375rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  empty: {
    textAlign: 'center',
    color: '#6b7280',
  },
  emptyText: {
    fontSize: '0.875rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  profileItem: {
    fontSize: '0.875rem',
    color: '#4b5563',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '350px',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    fontSize: '0.875rem',
    outline: 'none',
  },
  textarea: {
    padding: '0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    fontSize: '0.875rem',
    minHeight: '80px',
    resize: 'vertical',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
  saveBtn: {
    backgroundColor: '#10b981',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  cancelBtn: {
    backgroundColor: '#ef4444',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
};

export default ProfileStudent;