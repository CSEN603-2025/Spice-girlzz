import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import SideBar from './Components/SideBar';
import Header from './Components/Header';
import './StudentHomePage.css';

function UpcomingWorkshops() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('4rem');
  const [error, setError] = useState(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
  

    const showSuccessToast = (message) => {
    setShowSuccessNotification(true);
    setSuccessMessage(message);
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 3000);
  };
  

  // State for workshops with added description
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      title: 'Resume Building Workshop',
      organizer: 'CareerBoost',
      location: 'Online',
      date: 'May 12, 2025',
      registered: '120 participants registered',
      postDate: '20/6/2025',
      registeredByUser: false,
      description: 'Learn to craft a professional resume that stands out to recruiters.',
      duration:'2 hour',
      Benefits:'receive certifiactes after attending',
      TargetAudience:'students',
       image:  <img src={`${process.env.PUBLIC_URL}/imgs/cv.jpg`} alt="Resume" />
       
      

    },
    {
      id: 2,
      title: 'Tech Interview Prep',
      organizer: 'TechHire',
      location: 'Online',
      date: 'May 20, 2025',
      registered: '80 participants registered',
      postDate: '20/5/2025',
      registeredByUser: false,
      description: 'Master technical interviews with coding practice and mock sessions.',
      duration:' 1 hour',
       Benefits:'receive certifiactes after attending',
       TargetAudience:'students',
       image:   <img src={`${process.env.PUBLIC_URL}/imgs/interview.jpg`} alt="Interview" />, 
    },
    {
      id: 3,
      title: 'Networking for Career Success',
      organizer: 'ConnectSphere',
      location: 'Online',
      date: 'May 25, 2025',
      registered: '150 participants registered',
      postDate: '30/5/2025',
      registeredByUser: false,
      description: 'Discover networking strategies to build professional connections.',
      duration:'30 minutes',
      Benefits:'receive certifiactes after attending',
      TargetAudience:'students',
      image:  <img src={`${process.env.PUBLIC_URL}/imgs/connections.jpg`} alt="networks" />
    },
    {
      id: 4,
      title: 'Career Growth Strategies',
      organizer: 'FutureLeaders',
      location: 'Online',
      date: 'April 30, 2025',
      registered: '100 participants registered',
      postDate: '15/4/2025',
      registeredByUser: false,
      description: 'Explore strategies to accelerate your career growth.',
      duration:'3 hours',
       Benefits:'receive certifiactes after attending',
       TargetAudience:'students',
    image:  <img src={`${process.env.PUBLIC_URL}/imgs/ladder.jpg`} alt="Careers" />
    },
  ]);

  // State for popup form
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [currentWorkshopId, setCurrentWorkshopId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', workshopId: '' });
  const [isGlobalRegister, setIsGlobalRegister] = useState(false);

  // State for details popup
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const myworkshoplist = [
    {
      id: 5,
      title: 'Live Career Webinar',
      organizer: 'CareerPath',
      location: 'Online',
      date: 'May 11, 2025',
      registered: 'live now',
      postDate: '10/5/2025',
      registeredByUser: true,
      mediaUrl:  `${process.env.PUBLIC_URL}/imgs/215189_tiny.mp4`,
      description: 'Join our live webinar for career advice from industry experts.',
      duration:'2:30 hours',
       Benefits:'receive certifiactes after attending',
       TargetAudience:'students',
        image:  <img src={`${process.env.PUBLIC_URL}/imgs/livecareer.jpg`} alt="livecareer" />
     

    },
    {
      id: 6,
      title: 'Leadership Skills Bootcamp',
      organizer: 'LeadNow',
      location: 'Online',
      date: 'May 11, 2025',
      registered: 'live now',
      postDate: '9/5/2025',
      registeredByUser: true,
      mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'Develop leadership skills to lead teams effectively.',
      duration:'2 Hours',
       Benefits:'receive certifiactes after attending',
       TargetAudience:'students',
       image:  <img src={`${process.env.PUBLIC_URL}/imgs/leader.jpeg`} alt="leads" />
    },
    {
      id: 7,
      title: 'Data Science Essentials',
      organizer: 'DataMinds',
      location: 'Online',
      date: 'June 1, 2025',
      registered: 'live now',
      postDate: '25/5/2025',
      registeredByUser: true,
      mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'Learn the fundamentals of data science and analytics.',
      duration:'1:30 Hours',
       Benefits:'receive certifiactes after attending',
       TargetAudience:'students',
    },
    {
      id: 8,
      title: 'Effective Communication Workshop',
      organizer: 'SpeakEasy',
      location: 'Online',
      date: 'March 15, 2025',
      registered: 'live now',
      postDate: '10/3/2025',
      registeredByUser: true,
      mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'Enhance your communication skills for professional success.',
      duration:'1 Hour',
       Benefits:'receive certifiactes after attending',
       TargetAudience:'students',
        image:  <img src={`${process.env.PUBLIC_URL}/imgs/communication.jpeg.jpg`} alt="communicate" />
    },
    {
      id: 9,
      title: 'AI in the Workplace',
      organizer: 'TechFuture',
      location: 'Online',
      date: 'May 18, 2025',
      registered: 'live now',
      postDate: '12/5/2025',
      registeredByUser: true,
      mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'Understand AI’s impact on the workplace and how to adapt.',
      duration:'30 minutes',
       Benefits:'receive certifiactes after attending',
       TargetAudience:'students',
    },
    {
      id: 10,
      title: 'Project Management Basics',
      organizer: 'PlanPro',
      location: 'Online',
      date: 'April 1, 2025',
      registered: 'live now',
      postDate: '25/3/2025',
      registeredByUser: true,
      mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'Learn project management skills to deliver successful projects.',
      duration:'45 minutes',
      Benefits:'receive certifiactes after attending',
      TargetAudience:'students',
      image:  <img src={`${process.env.PUBLIC_URL}/imgs/project.jpg`} alt="projects" />
    },
  ];

  const [attendedWorkshops, setAttendedWorkshops] = useState([]);
  const [ratedWorkshops, setRatedWorkshops] = useState({});
  const [notes, setNotes] = useState({});
  const [ratings, setRatings] = useState({});
  const [feedback, setFeedback] = useState({});
  const [chatMessages, setChatMessages] = useState({});
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentPopupWorkshopId, setCurrentPopupWorkshopId] = useState(null);
  const videoRef = useRef(null);

  // Load registrations and notes
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('workshopNotes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
      const savedRegistrations = localStorage.getItem('workshopRegistrations');
      if (savedRegistrations) {
        const registrations = JSON.parse(savedRegistrations);
        setWorkshops((prev) =>
          prev.map((workshop) =>
            registrations[workshop.id]
              ? { ...workshop, registeredByUser: true }
              : workshop
          )
        );
      }
    } catch (err) {
      console.error('Error loading from localStorage:', err);
      setError('Failed to load saved data.');
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('workshopNotes', JSON.stringify(notes));
    } catch (err) {
      console.error('Error saving notes to localStorage:', err);
    }
  }, [notes]);

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle registration form submission
  const handleRegister = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (isGlobalRegister && !formData.workshopId) {
      setError('Please select a workshop.');
      return;
    }
    try {
      const workshopId = isGlobalRegister ? parseInt(formData.workshopId) : currentWorkshopId;
      const selectedWorkshop = workshops.find((w) => w.id === workshopId);
      console.log('Registering workshop:', workshopId, formData);
      setWorkshops((prev) =>
        prev.map((workshop) =>
          workshop.id === workshopId
            ? { ...workshop, registeredByUser: true }
            : workshop
        )
      );
      const registrations = JSON.parse(localStorage.getItem('workshopRegistrations') || '{}');
      registrations[workshopId] = { name: formData.name, email: formData.email };
      localStorage.setItem('workshopRegistrations', JSON.stringify(registrations));
     
      showSuccessToast(`Successfully registered for "${selectedWorkshop.title}"`)
      setShowRegisterPopup(false);
      setFormData({ name: '', email: '', workshopId: '' });
      setCurrentWorkshopId(null);
      setIsGlobalRegister(false);
      setError(null);
    } catch (err) {
      console.error('Error registering for workshop:', err);
      setError('Failed to register for the workshop.');
    }
  };

  // Open and close popup
  const openRegisterPopup = (workshopId, isGlobal = false) => {
    setCurrentWorkshopId(workshopId);
    setIsGlobalRegister(isGlobal);
    setShowRegisterPopup(true);
  };

  const closeRegisterPopup = () => {
    setShowRegisterPopup(false);
    setFormData({ name: '', email: '', workshopId: '' });
    setCurrentWorkshopId(null);
    setIsGlobalRegister(false);
    setError(null);
  };

  // Open and close details popup
  const openDetailsPopup = (workshop) => {
    setSelectedWorkshop(workshop);
    setShowDetailsPopup(true);
  };

  const closeDetailsPopup = () => {
    setShowDetailsPopup(false);
    setSelectedWorkshop(null);
  };

  const handleMarkAsAttended = (workshopId) => {
    setAttendedWorkshops((prev) => [...prev, workshopId]);
  };

  const handleRatingChange = (workshopId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [workshopId]: rating,
    }));
  };

  const handleFeedbackChange = (workshopId, text) => {
    setFeedback((prev) => ({
      ...prev,
      [workshopId]: text,
    }));
  };

  const handleSubmitFeedback = (workshopId) => {
    if (!ratings[workshopId]) {
    
      showSuccessToast('Please provide rating before submitting!')
      return;
    }
    setRatedWorkshops((prev) => ({
      ...prev,
      [workshopId]: { rating: ratings[workshopId], feedback: feedback[workshopId] || '' },
    }));
  };

  const handleNoteChange = (workshopId, text) => {
    setNotes((prev) => ({
      ...prev,
      [workshopId]: text,
    }));
  };

  const handleSaveNotes = (workshopId) => {
    const noteText = notes[workshopId] || '';
    if (!noteText.trim()) {
     
      showSuccessToast('Please enter some notes before saving'); 
      return;
    }
    try {
      localStorage.setItem('workshopNotes', JSON.stringify(notes));
      
      showSuccessToast('Notes saved successfully!'); 
    } catch (err) {
      console.error('Error saving notes to localStorage:', err);
     
       showSuccessToast('Failed to save notes. Please try again.');
    }
  };

  const handleChatMessageChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleSendMessage = (workshopId) => {
    if (!currentMessage.trim()) return;

    setChatMessages((prev) => ({
      ...prev,
      [workshopId]: [
        ...(prev[workshopId] || []),
        { sender: 'You', text: currentMessage, timestamp: new Date().toLocaleTimeString() },
      ],
    }));
    setCurrentMessage('');

    setTimeout(() => {
      setChatMessages((prev) => ({
        ...prev,
        [workshopId]: [
          ...(prev[workshopId] || []),
          { sender: 'Jane Doe', text: 'Thanks for your message!', timestamp: new Date().toLocaleTimeString() },
        ],
      }));
    }, 1000);
     showSuccessToast("Jane sent 'Thanks for your message!'");
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error('Error playing video:', err);
        alert('Failed to play video. Please try again.');
      });
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const generateCertificate = (userName, workshopTitle, workshopDate) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Certificate of Attendance', 105, 40, null, null, 'center');
    doc.setFontSize(16);
    doc.text(`This is to certify that`, 105, 70, null, null, 'center');
    doc.setFontSize(18);
    doc.text(userName, 105, 90, null, null, 'center');
    doc.setFontSize(16);
    doc.text(`has attended the workshop`, 105, 110, null, null, 'center');
    doc.setFontSize(18);
    doc.text(workshopTitle, 105, 130, null, null, 'center');
    doc.setFontSize(14);
    doc.text(`on ${workshopDate}`, 105, 150, null, null, 'center');
    doc.setFontSize(12);
    doc.text('Issued by: CareerBoost', 105, 170, null, null, 'center');
    doc.save(`${workshopTitle}_Certificate.pdf`);
  };

  const liveWorkshops = myworkshoplist.filter((workshop) => new Date(workshop.date) <= new Date());

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/');
    } catch {
      return dateString;
    }
  };

  const handleViewDetails = (workshopId) => {
    navigate(`/workshop-details/${workshopId}`);
  };

  const openPopup = (workshopId) => {
    setCurrentPopupWorkshopId(workshopId);
  };

  const closePopup = () => {
    setCurrentPopupWorkshopId(null);
    setCurrentMessage('');
  };

  return (
    <div className="container">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="layout" style={{ marginTop: '4rem', minHeight: 'calc(100vh - 4rem)' }}>
        <SideBar
          setActivePage={(page) => navigate(`/student${page === 'home' ? '' : '/' + page}`)}
          isOpen={isSidebarOpen}
          setSidebarWidth={setSidebarWidth}
        />
        <main
          style={{
            flex: 1,
            padding: '1.5rem',
            overflowY: 'auto',
            marginLeft: window.innerWidth > 768 ? sidebarWidth : '0',
            width: window.innerWidth > 768 ? `calc(100% - ${sidebarWidth})` : '100%',
            transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
          }}
        >
          <div className="profileContent">
         

            {error && (
              <div className="text-red-500 mb-4 text-sm">
                {error}
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Upcoming Workshops
                </h3>
                <button
                  className="register-button text-white px-4 py-2 rounded-lg transition text-sm"
                  style={{ backgroundColor: '#2a9d8f' }}
                  onClick={() => openRegisterPopup(null, true)}
                >
                  Register for a Workshop
                </button>
              </div>
              {workshops.length === 0 ? (
                <p className="text-gray-600">No upcoming workshops available at the moment.</p>
              ) : (
                <div className="cardHolder">
                  {workshops.map((workshop) => (
                    <div key={workshop.id} className="card">
                    
                        <div >{workshop.image}</div>
                    
                      <div className="card-header">
                        <h3 className="program-title">{workshop.title}</h3>
                        <div className="company-info">
                          <span className="company-name">{workshop.organizer}</span>
                          <span className="company-location">{workshop.location}</span>
                          <span className="post-date">{workshop.postDate}</span>
                        </div>
                      </div>
                      <div className="card-footer flex justify-between items-center flex-wrap gap-2">
                        <div className="alumni-count">
                          <span className="pin-icon">📌</span>
                          <span>{workshop.registered}</span>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            className="w-32 py-2 text-sm bg-teal-600 text-white rounded hover:bg-teal-700 transition"
                            onClick={() => openDetailsPopup(workshop)}
                          >
                            View Details
                          </button>
                          {!workshop.registeredByUser && (
                            <button
                              className="register-button w-32 py-2 text-sm text-white rounded transition"
                              style={{ backgroundColor: '#2a9d8f' }}
                              onClick={() => openRegisterPopup(workshop.id)}
                            >
                              Register Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                My Registered Workshops
              </h3>
              {liveWorkshops.length === 0 ? (
                <p className="text-gray-600">No workshops registered yet.</p>
              ) : (
                <div className="cardHolder">
                  
                  {liveWorkshops.map((workshop) => (
                    <div 
                      key={workshop.id}
                      className="card"
                    >
                       <div>{workshop.image}</div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-bold text-gray-800">
                          {workshop.title.toUpperCase()}
                        </h4>
                      </div>
          
                      <div className="flex justify-between text-gray-600 text-sm mb-4">
                        <span>{workshop.organizer}</span>
                        <span>{workshop.location}</span>
                        <span>{formatDate(workshop.date)}</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <button
                          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm"
                          onClick={() => openDetailsPopup(workshop)}
                        >
                          VIEW DETAILS
                        </button>
                        <button
                          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm"
                          onClick={() => openPopup(workshop.id)}
                        >
                          JOIN
                        </button>
                        <div className="flex items-center gap-2 w-full">
                          <span className="text-red-500 font-bold text-sm">
                            {workshop.registered} 🔴
                          </span>
                          {attendedWorkshops.includes(workshop.id) && ratedWorkshops[workshop.id] && (
                            <button
                              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm w-full"
                              onClick={() =>
                                generateCertificate('John Doe', workshop.title, workshop.date)
                              }
                            >
                              DOWNLOAD CERTIFICATE
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Registration Popup Form */}
            {showRegisterPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
                  <h3 className="text-xl font-bold mb-6 text-gray-800">
                    {isGlobalRegister ? 'Register for an Upcoming Workshop' : `Register for ${workshops.find((w) => w.id === currentWorkshopId)?.title}`}
                  </h3>
                  {isGlobalRegister && (
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2 text-gray-800">
                        Select Workshop
                      </label>
                      <select
                        name="workshopId"
                        value={formData.workshopId}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select a workshop</option>
                        {workshops.map((workshop) => (
                          <option
                            key={workshop.id}
                            value={workshop.id}
                            className={workshop.registeredByUser ? 'text-gray-500 italic' : ''}
                          >
                            {`${workshop.title} - ${workshop.organizer} (${workshop.date})`}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-gray-800">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-gray-800">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm mb-4">
                      {error}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      className="register-button flex-1 text-white py-2 rounded-lg transition"
                      style={{ backgroundColor: '#2a9d8f' }}
                      onClick={handleRegister}
                    >
                      Submit
                    </button>
                    <button
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={closeRegisterPopup}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Details Popup */}
            {showDetailsPopup && selectedWorkshop && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    {selectedWorkshop.title}
                  </h3>
                  <div className="mb-4 text-gray-600">
                    <p><strong>Benefits</strong> {selectedWorkshop.Benefits}</p>


                      <p><strong>TargetAudience</strong> {selectedWorkshop.TargetAudience}</p>


                     <p><strong>duration</strong> {selectedWorkshop.duration}</p>

                    <p><strong>Description:</strong> {selectedWorkshop.description}</p>
                  </div>
                  <div className="flex gap-2">
                    {!selectedWorkshop.registeredByUser && (
                      <button
                        className="register-button flex-1 text-white py-2 rounded-lg transition"
                        style={{ backgroundColor: '#2a9d8f' }}
                        onClick={() => {
                          closeDetailsPopup();
                          openRegisterPopup(selectedWorkshop.id);
                        }}
                      >
                        Register Now
                      </button>
                    )}
                    <button
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={closeDetailsPopup}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Join Workshop Popup */}
            {currentPopupWorkshopId && (
              <div className="modal-overlay">
                <div className="bg-white p-8 rounded-lg w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-lg">
                  <h3 className="text-xl font-bold mb-6 text-gray-800">
                    {liveWorkshops.find((w) => w.id === currentPopupWorkshopId)?.title}
                  </h3>

                  <div className="mb-4">
                    <h5 className="text-lg font-bold mb-2">
                      Watch Workshop
                    </h5>
                    {liveWorkshops.find((w) => w.id === currentPopupWorkshopId)?.mediaUrl ? (
                      <>
                        <video
                          ref={videoRef}
                          className="w-full max-h-48 rounded-lg mb-2"
                          controls
                        >
                          <source
                            src={liveWorkshops.find((w) => w.id === currentPopupWorkshopId).mediaUrl}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                        <div className="flex gap-2">
                          <button
                            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm"
                            onClick={handlePlay}
                          >
                            Play
                          </button>
                          <button
                            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm"
                            onClick={handlePause}
                          >
                            Pause
                          </button>
                          <button
                            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm"
                            onClick={handleStop}
                          >
                            Stop
                          </button>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-600">No recording available for this workshop.</p>
                    )}
                  </div>

                  {!attendedWorkshops.includes(currentPopupWorkshopId) ? (
                    <div className="mb-4">
                      <button
                        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 text-sm"
                        onClick={() => handleMarkAsAttended(currentPopupWorkshopId)}
                      >
                        MARK AS ATTENDED
                      </button>
                    </div>
                  ) : !ratedWorkshops[currentPopupWorkshopId] ? (
                    <div className="mb-4">
                      <h5 className="text-lg font-bold mb-2">
                        Rate this Workshop
                      </h5>
                      <div className="mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`cursor-pointer text-xl ${
                              ratings[currentPopupWorkshopId] >= star ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                            onClick={() => handleRatingChange(currentPopupWorkshopId, star)}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <h5 className="text-lg font-bold mb-2">
                        Feedback
                      </h5>
                      <textarea
                        value={feedback[currentPopupWorkshopId] || ''}
                        onChange={(e) => handleFeedbackChange(currentPopupWorkshopId, e.target.value)}
                        placeholder="Share your feedback..."
                        rows={3}
                        className="w-full p-2 border rounded-lg"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm"
                          onClick={() => handleSubmitFeedback(currentPopupWorkshopId)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <h5 className="text-lg font-bold mb-2">
                      Take Notes
                    </h5>
                    <textarea
                      value={notes[currentPopupWorkshopId] || ''}
                      onChange={(e) => handleNoteChange(currentPopupWorkshopId, e.target.value)}
                      placeholder="Write your notes here..."
                      rows={3}
                      className="w-full p-2 border rounded-lg"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm"
                        onClick={() => handleSaveNotes(currentPopupWorkshopId)}
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-lg font-bold mb-2">
                      Chat with Attendees
                    </h5>
                    <div className="max-h-36 overflow-y-auto mb-2 p-2 bg-gray-100 rounded-lg border">
                      {(chatMessages[currentPopupWorkshopId] || []).map((message, index) => (
                        <div
                          key={index}
                          className={`mb-2 text-${message.sender === 'You' ? 'right' : 'left'}`}
                        >
                          <span
                            className={`text-sm font-bold ${
                              message.sender === 'You' ? 'text-teal-600' : 'text-gray-800'
                            }`}
                          >
                            {message.sender}:
                          </span>{' '}
                          <span className="text-sm">{message.text}</span>
                          <div className="text-xs text-gray-500">{message.timestamp}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 items-center">
                      <textarea
                        value={currentMessage}
                        onChange={handleChatMessageChange}
                        placeholder="Type your message..."
                        rows={1}
                        className="flex-1 p-2 border rounded-lg resize-none"
                      />
                      <button
                        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm"
                        onClick={() => handleSendMessage(currentPopupWorkshopId)}
                      >
                        Send
                      </button>
                    </div>
                  </div>

                  <button
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 text-sm"
                    onClick={closePopup}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </main>
      </div>
{showSuccessNotification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1002,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '320px',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-start',
              padding: '0.875rem 1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              background: 'white',
              borderLeft: '4px solid #2a9d8f',
              width: '100%',
              animation: 'slideIn 0.3s ease-out forwards',
            }}
          >
            <div style={{ marginRight: '0.75rem', marginTop: '0.125rem', flexShrink: 0, color: '#2a9d8f' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <h4 style={{ fontWeight: '600', fontSize: '0.875rem', margin: 0, color: '#1f2937' }}>
                  {successMessage}
                </h4>
                <span style={{ fontSize: '0.6875rem', color: '#6b7280' }}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowSuccessNotification(false)}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: '50%',
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpcomingWorkshops;