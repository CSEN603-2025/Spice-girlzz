import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SideBar from './Components/SideBar';

function ProfileStudent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showEditModal, setShowEditModal] = useState(false);

  const majorSemesterMap = {
    'Applied Arts': ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'],
    'Architechture': ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8', 'Semester 9', 'Semester 10'],
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

  const isProfileEmpty = Object.values(profileData).every((value) => !value);

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>🎓 Student Profile</h2>
        <div>
          <button style={styles.navBtn}>📧 Mail</button>
          <button style={styles.navBtn} onClick={() => navigate('/student')}>🏠 Home</button>
          <button style={styles.navBtn} onClick={() => navigate('/')}>🚪 Logout</button>
        </div>
      </div>

      <div style={styles.layout}>
        <SideBar />
        <div style={styles.profileContent}>
          <div style={styles.profileHeader}>
            <h3>Welcome, {profileData.name || "Student"}!</h3>
            <button style={styles.editBtn} onClick={() => setShowEditModal(true)}>✏️ Edit Profile</button>
          </div>

          <div style={styles.profileBox}>
            {isProfileEmpty ? (
              <div style={styles.empty}>
                <p>👤 No profile information added yet. Click edit to begin.</p>
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
        </div>
      </div>

      {/* Modal */}
      {showEditModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Edit Your Profile</h3>
            <form ref={formRef} onSubmit={handleEditSubmit} style={styles.form}>
              <TextInput name="name" defaultValue={profileData.name} placeholder="Enter your name" />
              <TextInput name="email" defaultValue={profileData.email} type="email" placeholder="Enter your email" />
              <SelectInput name="major" value={profileData.major} options={majors} onChange={handleMajorChange} />
              <SelectInput name="semester" value={profileData.semester} options={availableSemesters} disabled={!profileData.major} />
              <TextInput name="jobInterests" defaultValue={profileData.jobInterests} placeholder="Job interests" />
              <TextArea name="previousInternships" defaultValue={profileData.previousInternships} placeholder="Describe previous internships" />

              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.saveBtn}>💾 Save</button>
                <button type="button" style={styles.cancelBtn} onClick={() => setShowEditModal(false)}>❌ Cancel</button>
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
  <p><strong>{label}:</strong> {value || "Not provided"}</p>
);

const TextInput = ({ name, defaultValue, placeholder, type = "text" }) => (
  <input type={type} name={name} defaultValue={defaultValue} placeholder={placeholder} style={styles.input} />
);

const TextArea = ({ name, defaultValue, placeholder }) => (
  <textarea name={name} defaultValue={defaultValue} placeholder={placeholder} style={styles.textarea} />
);

const SelectInput = ({ name, value, onChange, options, disabled = false }) => (
  <select name={name} value={value} onChange={onChange} disabled={disabled} style={styles.input}>
    <option value="">Select</option>
    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
  </select>
);

const styles = {
  container: { fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f7f9fc', minHeight: '100vh' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#1d3557', color: '#fff' },
  title: { margin: 0 },
  navBtn: { backgroundColor: '#457b9d', border: 'none', borderRadius: '5px', padding: '0.5rem 1rem', color: '#fff', cursor: 'pointer', marginLeft: '10px' },
  layout: { display: 'flex' },
  profileContent: { flex: 1, padding: '2rem' },
  profileHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  editBtn: { backgroundColor: '#a8dadc', border: 'none', borderRadius: '5px', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 'bold' },
  profileBox: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  empty: { textAlign: 'center', color: '#999' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', width: '350px', maxHeight: '90vh', overflowY: 'auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.95rem' },
  textarea: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.95rem', minHeight: '80px', resize: 'vertical' },
  buttonGroup: { display: 'flex', justifyContent: 'space-between' },
  saveBtn: { backgroundColor: '#2a9d8f', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  cancelBtn: { backgroundColor: '#e76f51', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px', cursor: 'pointer' },
};

export default ProfileStudent;
