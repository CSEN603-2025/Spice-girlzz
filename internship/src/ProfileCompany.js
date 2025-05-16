import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './CompanyHeader';
import SideBar from './Components/SideBarCompany';
import './StudentHomePage.css'; // Import StudentHomePage.css for shared styles
import { Mail, Upload, Paperclip, User, Phone, Home, LogOut, Edit, MapPin, Globe, MessageSquare, Briefcase, Activity, BookOpen, Clipboard, Menu } from 'lucide-react';
import CompanyLogo from './technology-background.png';

function ProfileCompany() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const formRef = useRef(null);
  const [clickedButtons, setClickedButtons] = useState({});
  const [sidebarWidth, setSidebarWidth] = useState('4rem');
  const [documents, setDocuments] = useState({
    certificates: [],
    companyProfile: [],
    brochures: [],
    other: []
  });
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [activeDocCategory, setActiveDocCategory] = useState('certificates');

  const storedProfile = JSON.parse(sessionStorage.getItem("companyProfile") || "{}");
  const email = (location.state?.email || storedProfile.email || "").toLowerCase();
  

  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const initialProfileData = {
    name: 'Tech Innovators Ltd.',
    email: email,
    description: 'We build cutting-edge AI solutions for businesses worldwide. Our team specializes in machine learning, cloud computing, and innovative software design. With a passion for technology, we aim to revolutionize industries with smart, scalable solutions.',
    industry: 'Software Development',
    website: 'https://techinnovators.com',
    location: 'San Francisco, CA, USA',
    logo: CompanyLogo,
    founded: '2015',
    employees: '50-100',
    mission: 'To empower businesses with advanced technology.',
    vision: 'To lead the global tech innovation space by 2030.',
    services: ['AI Development', 'Cloud Solutions', 'Custom Software'],
    contactPhone: '+1-415-555-0123',
    socialMedia: ['https://twitter.com/TechInnovators', 'https://linkedin.com/company/techinnovators'],
    isFirstLogin: true,
    hasProfile: false,
  };

  // Import Inter font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const [profileData, setProfileData] = useState(() => {
    const savedData = sessionStorage.getItem('companyProfile');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        return {
          ...initialProfileData,
          ...parsedData,
          socialMedia: Array.isArray(parsedData.socialMedia) ? parsedData.socialMedia : initialProfileData.socialMedia,
          services: Array.isArray(parsedData.services) ? parsedData.services : (parsedData.services ? parsedData.services.split(',').map(item => item.trim()) : initialProfileData.services),
        };
      } catch (e) {
        console.error('Error parsing sessionStorage data:', e);
        return initialProfileData;
      }
    }
    return initialProfileData;
  });

  // useEffect(() => {
  //   if (!profileData.hasProfile || profileData.name === '...') {
  //     setShowEditModal(true);
  //   }
  // }, []);

  useEffect(() => {
    sessionStorage.setItem('companyProfile', JSON.stringify(profileData));
  }, [profileData]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const socialMedia = formData.get('socialMedia')
      ? formData.get('socialMedia').split(',').map(item => item.trim()).filter(item => item)
      : profileData.socialMedia;

    const services = formData.get('services')
      ? formData.get('services').split(',').map(item => item.trim()).filter(item => item)
      : profileData.services;

    const updatedProfile = {
      name: formData.get('name') || profileData.name,
      email: formData.get('email') || profileData.email,
      description: formData.get('description') || profileData.description,
      industry: formData.get('industry') || profileData.industry,
      website: formData.get('website') || profileData.website,
      location: formData.get('location') || profileData.location,
      logo: formData.get('logo') || profileData.logo,
      founded: formData.get('founded') || profileData.founded,
      employees: formData.get('employees') || profileData.employees,
      mission: formData.get('mission') || profileData.mission,
      vision: formData.get('vision') || profileData.vision,
      services,
      contactPhone: formData.get('contactPhone') || profileData.contactPhone,
      socialMedia,
      isFirstLogin: false,
      hasProfile: formData.get('name') && formData.get('name').trim() !== '...',
    };

    setProfileData(updatedProfile);
    setShowEditModal(false);
    alert('Company info saved successfully!');
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

  return (
    <div style={styles.container}>
      <Header />
      {/* Layout */}
      <div style={{ ...styles.layout, marginTop: '4rem', minHeight: 'calc(100vh - 4rem)' }}>
        {/* Sidebar */}
         <SideBar onHoverChange={setIsSidebarHovered} style={styles.sidebar}  />
      <main
        style={{
          padding: "1rem",
          overflowY: "auto",
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: "#f9fafb",
          minHeight: "100vh",
        }}
      className={`content ${isSidebarHovered || isSidebarOpen ? 'sidebar-expanded' : ''}`}>

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
            <div style={styles.headerContent}>
              <img src={profileData.logo} alt="Company Logo" style={styles.logo} />
              <h1 style={styles.mainTitle}>{profileData.name}</h1>
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
          </div>

          {profileData.name && profileData.name !== '...' ? (
            <>
              <div style={styles.profileBox}>
                <div style={styles.profileSection}>
                  <SectionHeader title="Company Information" icon={<Briefcase size={18} style={styles.iconStyle} />} />
                  <div style={styles.detailsGrid}>
                    <div style={styles.detailColumn}>
                      <ProfileItem label="Name" value={profileData.name} />
                      <ProfileItem label="Email" value={<a href={`mailto:${profileData.email}`}>{profileData.email}</a>} />
                      <ProfileItem label="Contact Phone" value={profileData.contactPhone} />
                    </div>
                    <div style={styles.detailColumn}>
                      <ProfileItem label="Website" value={<a href={profileData.website} target="_blank" rel="noopener noreferrer">{profileData.website}</a>} />
                      <ProfileItem label="Industry" value={profileData.industry} />
                      <ProfileItem label="Location" value={profileData.location} />
                    </div>
                  </div>
                </div>

                <div style={styles.profileSection}>
                  <SectionHeader title="About Us" icon={<Clipboard size={18} style={styles.iconStyle} />} />
                  <ProfileItem label="Description" value={profileData.description} />
                  <ProfileItem label="Mission" value={profileData.mission} />
                  <ProfileItem label="Vision" value={profileData.vision} />
                  <ProfileItem label="Services" value={profileData.services.length > 0 ? profileData.services.join(', ') : 'Not provided'} />
                </div>

                <div style={styles.profileSection}>
                  <SectionHeader title="Additional Details" icon={<BookOpen size={18} style={styles.iconStyle} />} />
                  <div style={styles.detailsGrid}>
                    <div style={styles.detailColumn}>
                      <ProfileItem label="Founded" value={profileData.founded} />
                      <ProfileItem label="Employees" value={profileData.employees} />
                    </div>
                    <div style={styles.detailColumn}>
                      <ProfileItem label="Social Media" value={
                        profileData.socialMedia.map((link, index) => (
                          <span key={index}>
                            <a href={link} target="_blank" rel="noopener noreferrer">
                              {link.includes('twitter') ? 'Twitter' : 'LinkedIn'}
                            </a>
                            {index < profileData.socialMedia.length - 1 ? ', ' : ''}
                          </span>
                        ))
                      } />
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.cardContainer}>
                <div style={styles.doc}>
                  <SectionHeader title="Documents" icon={<Paperclip size={18} style={styles.iconStyle} />} />
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
                        ...(activeDocCategory === 'companyProfile' && styles.activeTab)
                      }}
                      onClick={() => setActiveDocCategory('companyProfile')}
                    >
                      Company Profile
                    </button>
                    <button
                      style={{
                        ...styles.tabButton,
                        ...(activeDocCategory === 'brochures' && styles.activeTab)
                      }}
                      onClick={() => setActiveDocCategory('brochures')}
                    >
                      Brochures
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

                  <div style={styles.tabContent}>
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
                        Upload {activeDocCategory === 'companyProfile' ? 'Company Profile' :
                                activeDocCategory === 'brochures' ? 'Brochures' :
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
                        No {activeDocCategory === 'companyProfile' ? 'Company Profile' :
                            activeDocCategory === 'brochures' ? 'brochures' :
                            activeDocCategory === 'certificates' ? 'certificates' : 'other documents'} uploaded yet
                      </div>
                    )}
                  </div>

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

                <div style={styles.highlightsCard}>
                  <SectionHeader title="Company Highlights" icon={<Activity size={18} style={styles.iconStyle} />} />
                  <div style={{ padding: '1rem' }}>
                    <ProfileItem label="Key Achievement" value="Launched AI platform adopted by 100+ enterprises in 2024" />
                    <ProfileItem label="Innovation Award" value="Received Tech Innovator Award in 2023" />
                    <ProfileItem label="Global Reach" value="Serving clients in 20+ countries" />
                    <ProfileItem label="Team Growth" value="Expanded team by 50% in the last year" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={styles.emptyProfileMessage}>
              <p>Please create your company profile to continue.</p>
            </div>
          )}

          {showEditModal && (
            <div style={{ ...styles.modalOverlay, zIndex: 1002 }}>
              <div style={styles.modal}>
                <h3 style={styles.modalTitle}>{profileData.name && profileData.name !== '...' ? 'Edit Company Profile' : 'Create Company Profile'}</h3>
                <form ref={formRef} onSubmit={handleEditSubmit} style={styles.form}>
                  <h4 style={styles.formSectionTitle}>Basic Information</h4>
                  <TextInput name="name" label="Company Name" defaultValue={profileData.name} required />
                  <TextInput name="email" label="Email" defaultValue={profileData.email} type="email" required />
                  <TextInput name="contactPhone" label="Contact Phone" defaultValue={profileData.contactPhone} type="tel" />
                  <TextInput name="website" label="Website" defaultValue={profileData.website} type="url" />
                  <TextInput name="industry" label="Industry" defaultValue={profileData.industry} />
                  <TextInput name="location" label="Location" defaultValue={profileData.location} />

                  <h4 style={styles.formSectionTitle}>About Us</h4>
                  <TextInput
                    name="description"
                    label="Description"
                    defaultValue={profileData.description}
                    placeholder="Describe your company"
                    type="textarea"
                  />
                  <TextInput name="mission" label="Mission" defaultValue={profileData.mission} />
                  <TextInput name="vision" label="Vision" defaultValue={profileData.vision} />
                  <TextInput
                    name="services"
                    label="Services (comma-separated)"
                    defaultValue={profileData.services.join(', ')}
                    placeholder="e.g., AI Development, Cloud Solutions"
                  />

                  <h4 style={styles.formSectionTitle}>Additional Details</h4>
                  <TextInput name="founded" label="Founded" defaultValue={profileData.founded} />
                  <TextInput name="employees" label="Employees" defaultValue={profileData.employees} />
                  <TextInput
                    name="socialMedia"
                    label="Social Media (comma-separated)"
                    defaultValue={profileData.socialMedia.join(', ')}
                    placeholder="e.g., https://twitter.com/company, https://linkedin.com/company"
                  />

                  <div style={styles.buttonGroup}>
                    <button
                      type="submit"
                      style={styles.saveBtn}
                      onClick={(e) => handleButtonClick('saveChanges')}
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      style={styles.cancelBtn}
                      onClick={(e) => {
                        handleButtonClick('cancel');
                        setShowEditModal(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
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
        </main>
      </div>

    </div>
  );
}

const ProfileItem = ({ label, value, icon }) => {
  const getIcon = () => {
    const iconMap = {
      'Name': <User size={16} style={styles.iconStyle} />,
      'Contact Phone': <Phone size={16} style={styles.iconStyle} />,
      'Email': <Mail size={16} style={styles.iconStyle} />,
      'Website': <Globe size={16} style={styles.iconStyle} />,
      'Industry': <Briefcase size={16} style={styles.iconStyle} />,
      'Location': <MapPin size={16} style={styles.iconStyle} />,
      'Description': <Clipboard size={16} style={styles.iconStyle} />,
      'Mission': <BookOpen size={16} style={styles.iconStyle} />,
      'Vision': <BookOpen size={16} style={styles.iconStyle} />,
      'Services': <Activity size={16} style={styles.iconStyle} />,
      'Founded': <BookOpen size={16} style={styles.iconStyle} />,
      'Employees': <User size={16} style={styles.iconStyle} />,
      'Social Media': <MessageSquare size={16} style={styles.iconStyle} />,
      'Key Achievement': <Activity size={16} style={styles.iconStyle} />,
      'Innovation Award': <Activity size={16} style={styles.iconStyle} />,
      'Global Reach': <Globe size={16} style={styles.iconStyle} />,
      'Team Growth': <User size={16} style={styles.iconStyle} />,
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
    {type === "textarea" ? (
      <textarea
        name={name}
        defaultValue={defaultValue}
        style={styles.input}
        required={required}
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        style={styles.input}
        required={required}
        placeholder={placeholder}
      />
    )}
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
  layout: {
    display: 'flex',
    flex: 1,
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
  },
  profileContent: {
    flex: 1,
    padding: '2rem',
    overflowY: 'auto',
    backgroundColor: '#f9fafb',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'flex-start',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  logo: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  mainTitle: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  profileBox: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', // Increased card width
    gap: '1.5rem',
    height: 'auto',
    marginBottom: '2rem',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', // Increased card width
    gap: '1.5rem',
  },
  profileSection: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
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
  doc: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
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
  highlightsCard: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
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
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  detailColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  profileItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px dashed #e5e7eb',
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
    .header-content {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
document.head.appendChild(styleSheet);

export default ProfileCompany;