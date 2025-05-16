import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import './StudentHomePage.css'; 
import { Mail, Upload, Paperclip, User, Phone, PhoneIncoming, Home, LogOut, Edit, MapPin, Globe, MessageSquare, Briefcase, Activity, BookOpen, Clipboard, Menu, Weight, X, CheckCircle } from 'lucide-react';

function ProfileStudent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const formRef = useRef(null);
  const [clickedButtons, setClickedButtons] = useState({});
  const [sidebarWidth, setSidebarWidth] = useState('4rem');
  const [documents, setDocuments] = useState({
    certificates: [],
    cv: [],
    coverLetter: [],
    other: []
  });
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [activeDocCategory, setActiveDocCategory] = useState('certificates')
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const storedProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
  const email = (location.state?.email || storedProfile.email || "").toLowerCase();

  const initialProfileData = {
    name: '...',
    phone: '',
    email: '',
    major: '',
    semester: '',
    gender: '',
    Address: '',
    nationality: '',
    language: '',
    jobInterests: [],
    previousInternships: [],
    partTimeJobs: [],
    collegeActivities: [],
    education: [],
    assessments: [], // Added assessments field
    isFirstLogin: true,
    hasProfile: false,
  };

  // Import Roboto font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const [profileData, setProfileData] = useState(() => {
    const savedData = sessionStorage.getItem('studentProfile');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        return {
          ...initialProfileData,
          ...parsedData,
          education: Array.isArray(parsedData.education) ?
            parsedData.education.filter(edu => edu.degree || edu.years) :
            initialProfileData.education,
          jobInterests: Array.isArray(parsedData.jobInterests) ? parsedData.jobInterests : [],
          previousInternships: Array.isArray(parsedData.previousInternships) ? parsedData.previousInternships : [],
          partTimeJobs: Array.isArray(parsedData.partTimeJobs) ? parsedData.partTimeJobs : [],
          collegeActivities: Array.isArray(parsedData.collegeActivities) ? parsedData.collegeActivities : [],
          assessments: Array.isArray(parsedData.assessments) ? parsedData.assessments : [], // Load assessments
        };
      } catch (e) {
        console.error('Error parsing sessionStorage data:', e);
        return initialProfileData;
      }
    }
    return initialProfileData;
  });

  useEffect(() => {
    if (!profileData.hasProfile || profileData.name === '...') {
      setShowEditModal(true);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('studentProfile', JSON.stringify(profileData));
  }, [profileData]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    // Collect all education entries from the form
    const education = [];
    let index = 0;
    while (true) {
      const degree = formData.get(`education[${index}].degree`);
      const years = formData.get(`education[${index}].years`);
      if ((degree && degree.trim() !== '') || (years && years.trim() !== '')) {
        education.push({ degree: degree || '', years: years || '' });
        index++;
      } else {
        break;
      }
    }
    if (education.length === 0) {
      const degree = formData.get('education[0].degree');
      const years = formData.get('education[0].years');
      if ((degree && degree.trim() !== '') || (years && years.trim() !== '')) {
        education.push({ degree: degree || '', years: years || '' });
      }
    }

    const jobInterests = formData.get('jobInterests')
      ? formData.get('jobInterests').split(',').map(item => item.trim()).filter(item => item)
      : profileData.jobInterests;

    const previousInternships = formData.get('previousInternships')
      ? formData.get('previousInternships')
          .split(';')
          .map(item => {
            const [company, role, duration, responsibilities] = item.split(',').map(i => i.trim());
            return { company, role, duration, responsibilities };
          })
          .filter(i => i.company && i.role)
      : profileData.previousInternships;

    const partTimeJobs = formData.get('partTimeJobs')
      ? formData.get('partTimeJobs')
          .split(';')
          .map(item => {
            const [company, role, duration, responsibilities] = item.split(',').map(i => i.trim());
            return { company, role, duration, responsibilities };
          })
          .filter(j => j.company && j.role)
      : profileData.partTimeJobs;

    const collegeActivities = formData.get('collegeActivities')
      ? formData.get('collegeActivities').split(',').map(item => item.trim()).filter(item => item)
      : profileData.collegeActivities;

    const updatedProfile = {
      name: formData.get('name') || profileData.name,
      phone: formData.get('phone') || profileData.phone,
      email: formData.get('email') || profileData.email,
      major: formData.get('major') || profileData.major,
      semester: formData.get('semester') || profileData.semester,
      gender: formData.get('gender') || profileData.gender,
      Address: formData.get('Address') || profileData.Address,
      nationality: formData.get('nationality') || profileData.nationality,
      language: formData.get('language') || profileData.language,
      jobInterests,
      previousInternships,
      partTimeJobs,
      collegeActivities,
      education: education.filter(edu => edu.degree || edu.years),
      assessments: profileData.assessments, // Preserve assessments
      isFirstLogin: false,
      hasProfile: formData.get('name') && formData.get('name').trim() !== '...',
    };

    setProfileData(updatedProfile);
    setShowEditModal(false);
  };

  const handleButtonClick = (buttonId) => {
    setClickedButtons(prev => ({
      ...prev,
      [buttonId]: true
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDocumentUpload = (e, category) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setDocuments(prev => ({
          ...prev,
          [category]: [
            ...prev[category],
            {
              id: Date.now() + Math.random(),
              name: file.name,
              type: file.type,
              size: file.size,
              data: reader.result,
            }
          ]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteDocument = (id, category) => {
    setDocuments(prev => ({
      ...prev,
      [category]: prev[category].filter(doc => doc.id !== id)
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        // Save to session storage
        const updatedProfile = {
          ...profileData,
          profileImage: e.target.result
        };
        setProfileData(updatedProfile);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={styles.container}>
      <Header />
      {/* Layout */}
      <div style={{ ...styles.layout, marginTop: '4rem', minHeight: 'calc(100vh - 4rem)' }}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <SideBar
            setActivePage={(page) =>
              navigate(`/student${page === "home" ? "" : "/" + page}`, { state: { email } })
            }  
            isOpen={isSidebarOpen}
            setSidebarWidth={setSidebarWidth}
          />
        </div>

        {/* Profile Content */}
        <div
          style={{
            ...styles.profileContent,
            marginLeft: window.innerWidth > 768 ? sidebarWidth : '0',
            width: window.innerWidth > 768 ? `calc(100% - ${sidebarWidth})` : '100%',
            transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
            boxSizing: 'border-box',
          }}
        >
          <div style={styles.profileHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div 
                onClick={handleImageClick}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  border: '2px solid #2a9d8f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#e5e7eb';
                  e.target.style.borderColor = '#30b3a3';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.borderColor = '#2a9d8f';
                }}
              >
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <>
                    <User size={40} style={{ color: '#2a9d8f' }} />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'rgba(0, 0, 0, 0.6)',
                      color: 'white',
                      fontSize: '0.75rem',
                      padding: '0.25rem',
                      textAlign: 'center'
                    }}>
                      Click to upload
                    </div>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>
              <h1 style={styles.mainTitle}>Student Profile</h1>
            </div>
            <button
              className='actionButton'
              onClick={(e) => {
                handleButtonClick('editProfile');
                setShowEditModal(true);
              }}
            >
              <Edit size={16} style={{ marginRight: '0.5rem' }} /> {profileData.name && profileData.name !== '...' ? 'Edit Profile' : 'Create Profile'}
            </button>
          </div>

          {profileData.name && profileData.name !== '...' ? (
            <div style={styles.profileBox}>
              <div style={styles.profileSection}>
                <SectionHeader title="Personal Information" icon={<User size={18} style={styles.iconStyle} />} />
                <div style={styles.detailsGrid}>
                  <div style={styles.detailColumn}>
                    <ProfileItem label="Name" value={profileData.name} />
                    <ProfileItem label="Phone Number" value={profileData.phone} />
                    <ProfileItem label="Email" value={profileData.email} />
                  </div>
                  <div style={styles.detailColumn}>
                    <ProfileItem label="Nationality" value={profileData.nationality} />
                  </div>
                </div>
              </div>

              <div style={styles.profileSection}>
                <SectionHeader title="Personal Details" icon={<Clipboard size={18} style={styles.iconStyle} />} />
                <div style={styles.detailsGrid}>
                  <div style={styles.detailColumn}>
                    <ProfileItem label="Gender" value={profileData.gender} />
                    <ProfileItem label="Address" value={profileData.Address} />
                    <ProfileItem label="Language" value={profileData.language} />
                  </div>
                  <div style={styles.detailColumn}>
                    <ProfileItem label="Education" value={
                      profileData.education.length > 0 ? (
                        profileData.education.map((edu, index) => (
                          <div key={index} style={{ marginBottom: '1rem' }}>
                            <p><strong>Degree:</strong> {edu.degree}</p>
                            <p><strong>Years:</strong> {edu.years}</p>
                          </div>
                        ))
                      ) : undefined
                    } />
                    <ProfileItem label="Major" value={profileData.major} />
                    <ProfileItem label="Semester" value={profileData.semester} />
                  </div>
                </div>
              </div>

              <div style={styles.profileSection}>
                <SectionHeader title="Experiences and Interests" icon={<Briefcase size={18} style={styles.iconStyle} />} />
                <div style={styles.detailsGrid}>
                  <div style={styles.detailColumn}>
                    <ProfileItem label="Job Interests" value={
                      Array.isArray(profileData.jobInterests) && profileData.jobInterests.length > 0
                        ? profileData.jobInterests.join(', ')
                        : undefined
                    } />
                    <ProfileItem label="Previous Internships" value={
                      profileData.previousInternships.length > 0 ? (
                        profileData.previousInternships.map((internship, index) => (
                          <div key={index} style={{ marginBottom: '1rem' }}>
                            <p><strong>Company:</strong> {internship.company}</p>
                            <p><strong>Role:</strong> {internship.role}</p>
                            <p><strong>Duration:</strong> {internship.duration}</p>
                            <p><strong>Responsibilities:</strong> {internship.responsibilities}</p>
                          </div>
                        ))
                      ) : undefined
                    } />
                    <ProfileItem label="Part-Time Jobs" value={
                      profileData.partTimeJobs.length > 0 ? (
                        profileData.partTimeJobs.map((job, index) => (
                          <div key={index} style={{ marginBottom: '1rem' }}>
                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Role:</strong> {job.role}</p>
                            <p><strong>Duration:</strong> {job.duration}</p>
                            <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
                          </div>
                        ))
                      ) : undefined
                    } />
                  </div>
                  <div style={styles.detailColumn}>
                    <ProfileItem label="College Activities" value={
                      Array.isArray(profileData.collegeActivities) && profileData.collegeActivities.length > 0
                        ? profileData.collegeActivities.join(', ')
                        : undefined
                    } />
                    <ProfileItem label="Assessments" value={
                      profileData.assessments.length > 0 ? (
                        profileData.assessments.map((assessment, index) => (
                          <div key={index} style={{ marginBottom: '1rem' }}>
                            <p><strong>Title:</strong> {assessment.title}</p>
                            <p><strong>Score:</strong> {assessment.score}</p>
                          </div>
                        ))
                      ) : undefined
                    } />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.emptyProfileMessage}>
              <p>Please create your profile to continue.</p>
            </div>
          )}

          {showEditModal && (
            <div style={{ ...styles.modalOverlay, zIndex: 1002 }}>
              <div style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                width: '95%',
                maxWidth: '1400px',
                maxHeight: '95vh',
                overflowY: 'auto',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                borderLeft: '4px solid #2a9d8f',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    color: '#1f2937', 
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <User size={20} style={{ color: '#2a9d8f' }} />
                    {profileData.name && profileData.name !== '...' ? 'Edit Profile Information' : 'Create Profile'}
                  </h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#9ca3af',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      borderRadius: '50%',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'rgba(0, 0, 0, 0.05)';
                      e.target.style.color = '#6b7280';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#9ca3af';
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <form ref={formRef} onSubmit={handleEditSubmit} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '2rem',
                    alignItems: 'start'
                  }}>
                    {/* Left Column */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.5rem'
                    }}>
                      <div style={{
                        background: '#f9fafb',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h4 style={{ 
                          fontSize: '1rem', 
                          fontWeight: '600', 
                          color: '#1f2937', 
                          margin: '0 0 1rem 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <User size={18} style={{ color: '#2a9d8f' }} />
                          Basic Information
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                          <TextInput name="name" label="Full Name" defaultValue={profileData.name} required />
                          <TextInput name="phone" label="Phone Number" defaultValue={profileData.phone} type="tel" />
                          <TextInput name="email" label="Email" defaultValue={profileData.email} type="email" required />
                          <div style={styles.inputGroup}>
                            <label style={styles.inputLabel}>Major</label>
                            <select
                              name="major"
                              defaultValue={profileData.major}
                              style={styles.input}
                              required
                            >
                              <option value="">Select Major</option>
                              <option value="Computer Science">Computer Science</option>
                              <option value="Business">Business</option>
                              <option value="Engineering">Engineering</option>
                              <option value="Pharmacy">Pharmacy</option>
                            </select>
                          </div>
                          <TextInput name="semester" label="Semester" defaultValue={profileData.semester} required />
                        </div>
                      </div>

                      <div style={{
                        background: '#f9fafb',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h4 style={{ 
                          fontSize: '1rem', 
                          fontWeight: '600', 
                          color: '#1f2937', 
                          margin: '0 0 1rem 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <Clipboard size={18} style={{ color: '#2a9d8f' }} />
                          Personal Details
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                          <TextInput name="gender" label="Gender" defaultValue={profileData.gender} />
                          <TextInput name="Address" label="Address" defaultValue={profileData.Address} />
                          <TextInput name="nationality" label="Nationality" defaultValue={profileData.nationality} />
                          <TextInput name="language" label="Language" defaultValue={profileData.language} />
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.5rem'
                    }}>
                      <div style={{
                        background: '#f9fafb',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h4 style={{ 
                          fontSize: '1rem', 
                          fontWeight: '600', 
                          color: '#1f2937', 
                          margin: '0 0 1rem 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <Briefcase size={18} style={{ color: '#2a9d8f' }} />
                          Experiences and Interests
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <TextInput
                            name="jobInterests"
                            label="Job Interests (comma-separated)"
                            defaultValue={Array.isArray(profileData.jobInterests) ? profileData.jobInterests.join(', ') : ''}
                            placeholder="e.g., UI/UX Design, Software Development"
                          />
                          <TextInput
                            name="previousInternships"
                            label="Previous Internships"
                            defaultValue={profileData.previousInternships.map(i => `${i.company},${i.role},${i.duration},${i.responsibilities}`).join(';')}
                            placeholder="Company,Role,Duration,Responsibilities"
                          />
                          <TextInput
                            name="partTimeJobs"
                            label="Part-Time Jobs"
                            defaultValue={profileData.partTimeJobs.map(j => `${j.company},${j.role},${j.duration},${j.responsibilities}`).join(';')}
                            placeholder="Company,Role,Duration,Responsibilities"
                          />
                          <TextInput
                            name="collegeActivities"
                            label="College Activities"
                            defaultValue={Array.isArray(profileData.collegeActivities) ? profileData.collegeActivities.join(', ') : ''}
                            placeholder="e.g., Coding Club, Debate Team"
                          />
                        </div>
                      </div>

                      <div style={{
                        background: '#f9fafb',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h4 style={{ 
                          fontSize: '1rem', 
                          fontWeight: '600', 
                          color: '#1f2937', 
                          margin: '0 0 1rem 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <BookOpen size={18} style={{ color: '#2a9d8f' }} />
                          Education
                        </h4>
                        {profileData.education.length > 0 ? (
                          profileData.education.map((edu, index) => (
                            <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                              <TextInput
                                name={`education[${index}].degree`}
                                label="Degree"
                                defaultValue={edu.degree}
                              />
                              <TextInput
                                name={`education[${index}].years`}
                                label="Year of Graduation"
                                defaultValue={edu.years}
                              />
                            </div>
                          ))
                        ) : (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <TextInput
                              name="education[0].degree"
                              label="Degree"
                              defaultValue=""
                            />
                            <TextInput
                              name="education[0].years"
                              label="Year of Graduation"
                              defaultValue=""
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    gap: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e5e7eb'
                  }}>
                    <button
                      type="button"
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#e5e7eb',
                        color: '#4b5563',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => {
                        handleButtonClick('cancel');
                        setShowEditModal(false);
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#d1d5db'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                    >
                      <X size={16} />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#2a9d8f',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={(e) => handleButtonClick('saveChanges')}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#30b3a3'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#2a9d8f'}
                    >
                      <CheckCircle size={16} />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div style={styles.doc}>
            <SectionHeader title="Documents" icon={<Paperclip size={18} style={styles.iconStyle} />} />
            
            {/* Document Tabs */}
            <div style={styles.tabContainer}>
              <button
                style={{
                  ...styles.tabButton,
                  ...(activeDocCategory === 'certificates' && styles.activeTab)
                }}
                onClick={() => setActiveDocCategory('certificates')}
              >
                Certificates
              </button>
              <button
                style={{
                  ...styles.tabButton,
                  ...(activeDocCategory === 'cv' && styles.activeTab)
                }}
                onClick={() => setActiveDocCategory('cv')}
              >
                CV
              </button>
              <button
                style={{
                  ...styles.tabButton,
                  ...(activeDocCategory === 'coverLetter' && styles.activeTab)
                }}
                onClick={() => setActiveDocCategory('coverLetter')}
              >
                Cover Letter
              </button>
              <button
                style={{
                  ...styles.tabButton,
                  ...(activeDocCategory === 'other' && styles.activeTab)
                }}
                onClick={() => setActiveDocCategory('other')}
              >
                Other
              </button>
            </div>

            {/* Tab Content */}
            <div style={styles.tabContent}>
              {/* Upload Button for current category */}
              <div style={{ marginBottom: '1rem' }}>
                <label
                  htmlFor={`document-upload-${activeDocCategory}`}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#2a9d8f',
                    color: '#fff',
                    borderRadius: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                  onMouseOver={(e) => (e.target.style.background = '#30b3a3')}
                  onMouseOut={(e) => (e.target.style.background = '#2a9d8f')}
                >
                  <Upload size={16} style={{ marginRight: '0.5rem' }} /> 
                  Upload {activeDocCategory === 'cv' ? 'CV' : 
                         activeDocCategory === 'coverLetter' ? 'Cover Letter' : 
                         activeDocCategory === 'certificates' ? 'Certificates' : 'Other Documents'}
                </label>
                <input
                  id={`document-upload-${activeDocCategory}`}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  style={{ display: 'none' }}
                  onChange={(e) => handleDocumentUpload(e, activeDocCategory)}
                />
              </div>

              {/* Documents List for current category */}
              {documents[activeDocCategory].length > 0 ? (
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.375rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '1.5rem' }}>
                    {documents[activeDocCategory].map((doc) => (
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
                        <span
                          style={{
                            cursor: 'pointer',
                            fontWeight: '500',
                            color: '#2a9d8f',
                            textDecoration: 'underline',
                            flex: 1,
                            padding: '0.5rem'
                          }}
                          onClick={() => setSelectedDocument(doc)}
                        >
                          {doc.name}
                        </span>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                          <button
                            style={{
                              padding: '0.5rem 1rem',
                              background: '#ef4444',
                              color: '#fff',
                              borderRadius: '0.25rem',
                              cursor: 'pointer',
                              fontSize: '0.875rem',
                            }}
                            onClick={() => handleDeleteDocument(doc.id, activeDocCategory)}
                            onMouseOver={(e) => (e.target.style.background = '#dc2626')}
                            onMouseOut={(e) => (e.target.style.background = '#ef4444')}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ 
                  background: '#fff', 
                  padding: '1.5rem', 
                  borderRadius: '0.375rem', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                  textAlign: 'center',
                  color: '#6b7280'
                }}>
                  No {activeDocCategory === 'cv' ? 'CV' : 
                      activeDocCategory === 'coverLetter' ? 'Cover Letter' : 
                      activeDocCategory === 'certificates' ? 'certificates' : 'other documents'} uploaded yet
                </div>
              )}
            </div>

            {/* Document Preview Modal */}
            {selectedDocument && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1003,
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '0.5rem',
                  maxWidth: '80%',
                  maxHeight: '80%',
                  overflow: 'auto'
                }}>
                  <h3>{selectedDocument.name}</h3>
                  {selectedDocument.type.includes('image') ? (
                    <img
                      src={selectedDocument.data}
                      alt={selectedDocument.name}
                      style={{ maxWidth: '100%', maxHeight: '400px' }}
                    />
                  ) : (
                    <iframe
                      src={selectedDocument.data}
                      title={selectedDocument.name}
                      style={{ width: '100%', height: '500px', border: 'none' }}
                    />
                  )}
                  <button
                    style={{
                      marginTop: '1rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedDocument(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

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
    </div>
  );
}

const ProfileItem = ({ label, value, icon }) => {
  const getIcon = () => {
    const iconMap = {
      'Name': <User size={16} style={styles.iconStyle} />,
      'Phone Number': <Phone size={16} style={styles.iconStyle} />,
      'Email': <Mail size={16} style={styles.iconStyle} />,
      'Gender': <User size={16} style={styles.iconStyle} />,
      'Address': <MapPin size={16} style={styles.iconStyle} />,
      'Nationality': <Globe size={16} style={styles.iconStyle} />,
      'Language': <MessageSquare size={16} style={styles.iconStyle} />,
      'Activities': <Activity size={16} style={styles.iconStyle} />,
      'Semester': <BookOpen size={16} style={styles.iconStyle} />,
      'Major': <Briefcase size={16} style={styles.iconStyle} />,
      'Education': <BookOpen size={16} style={styles.iconStyle} />,
      'Assessments': <Clipboard size={16} style={styles.iconStyle} />, // Added icon for Assessments
    };
    return iconMap[label] || null;
  };

  const isEmpty = value === undefined || value === null || value === '';

  return (
    <div style={styles.profileItem}>
      {label && (
        <strong style={styles.profileLabel}>
          {getIcon()}
          {label}:
        </strong>
      )}
      <span style={styles.profileValue}>
        {isEmpty ? (
          <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Not provided</span>
        ) : (
          value
        )}
      </span>
    </div>
  );
};

const TextInput = ({ name, label, defaultValue, type = "text", required, placeholder }) => (
  <div style={styles.inputGroup}>
    <label style={styles.inputLabel}>{label}</label>
    <input
      type={type}
      name={name}
      defaultValue={defaultValue}
      style={styles.input}
      required={required}
      placeholder={placeholder}
    />
  </div>
);

const SectionHeader = ({ title, icon }) => (
  <h2 style={styles.sectionTitle}>
    {icon}
    {title}
  </h2>
);

const styles = {
  container: {
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: 'linear-gradient( #fff 100%)',
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
    padding: '2rem',
    overflowY: 'auto',
    backgroundColor: '#f9fafb',
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  mainTitle: {
    fontSize: '1.55rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  profileBox: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
   height: 'auto',
  },
  profileSection: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
    padding: '1.5rem',
    width: '100%',
    Height: '300px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    transition: 'transform 0.2s, box-shadow 0.2s',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)'
    }
  },
  doc: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    marginTop: '2rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
    padding: '1.5rem',
    width: '100%',
    minHeight: '300px', 
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    transition: 'transform 0.2s, box-shadow 0.2s',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)'
    }
  },
  sectionTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '1.25rem',
    paddingBottom: '0.75rem',
    borderBottom: '2px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  subSectionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: '1rem 0 0.5rem',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    alignItems: 'start',
  },
  detailColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    height: '100%',
  },
  experienceItem: {
    marginBottom: '1.25rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '0.5rem',
    borderLeft: '3px solid #3b82f6',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'translateX(2px)'
    }
  },
  educationItem: {
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '0.5rem',
    borderLeft: '3px solid #10b981'
  },
  educationDegree: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 0.25rem 0',
  },
  educationYears: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0,
  },
  profileItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    fontSize: '0.75rem',
    marginBottom: '0.5rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px dashed #e5e7eb',
    minHeight: '2.5rem',
    ':last-child': {
      borderBottom: 'none',
      marginBottom: 0,
      paddingBottom: 0,
    },
  },
  iconStyle: {
    color: '#2a9d8f',
    width: '18px',
    height: '18px'
  },
  profileLabel: {
    fontWeight: '500',
    color: '#4b5563',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  profileValue: {
    color: '#111827',
    fontWeight: '400',
    paddingLeft: '1.5rem'
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1002,
  },
  modal: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formSectionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 0.5rem 0',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #e5e7eb',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  inputLabel: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4b5563',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    fontSize: '0.875rem',
    outline: 'none',
  },
  educationFormGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    padding: '0.75rem',
    backgroundColor: 'f9fafb',
    borderRadius: '0.5rem',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  saveBtn: {
    backgroundColor: '#2a9d8f',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'background-color 0.2s ease',
  },
  cancelBtn: {
    backgroundColor: '#ef4444',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#dc2626',
    },
  },
  emptyProfileMessage: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    color: '#4b5563',
    fontSize: '1rem',
  },
  tabContainer: {
    display: 'flex',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '1rem',
  },
  tabButton: {
    padding: '0.75rem 1.5rem',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#6b7280',
    transition: 'all 0.2s ease',
  },
  activeTab: {
    color: '#2a9d8f',
    borderBottom: '2px solid #2a9d8f',
  },
  tabContent: {
    padding: '1rem 0',
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
    .profile-content {
      margin-left: 0 !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default ProfileStudent;