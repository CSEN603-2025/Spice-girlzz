import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './Components/SideBar';
import Header from './Components/Header';
import './StudentHomePage.css';

function UpcomingWorkshops() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('4rem');
  const [error, setError] = useState(null);

  const workshops = [
    {
      id: 1,
      title: 'Resume Building Workshop',
      organizer: 'CareerBoost',
      location: 'Online',
      date: 'May 15, 2025', // Future date (upcoming)
      registered: '120 participants registered',
      postDate: '20/6/2025',
      registeredByUser: false,
    },
    {
      id: 2,
      title: 'Tech Interview Prep',
      organizer: 'TechHire',
      location: 'Online',
      date: 'May 20, 2025', // Future date (upcoming)
      registered: '80 participants registered',
      postDate: '20/5/2025',
      registeredByUser: true, // User registered
    },
    {
      id: 3,
      title: 'Networking for Career Success',
      organizer: 'ConnectSphere',
      location: 'Online',
      date: 'May 25, 2025', // Future date (upcoming)
      registered: '150 participants registered',
      postDate: '30/5/2025',
      registeredByUser: true, // User registered
    },
    {
      id: 4,
      title: 'Career Growth Strategies',
      organizer: 'FutureLeaders',
      location: 'Online',
      date: 'April 30, 2025', // Past date (not upcoming)
      registered: '100 participants registered',
      postDate: '15/4/2025',
      registeredByUser: true, // User registered
    },
  ];


  
  const myworkshoplist= [
    {
      id: 5,
      title: 'Live Career Webinar',
      organizer: 'CareerPath',
      location: 'Online',
      date: 'May 11, 2025', // Current date (live now)
      registered: 'live now',
      postDate: '10/5/2025',
      registeredByUser: true,
    },
    {
      id: 6,
      title: 'Leadership Skills Bootcamp',
      organizer: 'LeadNow',
      location: 'Online',
      date: 'May 11, 2025', // Current date (live now)
      registered: 'live now',
      postDate: '9/5/2025',
      registeredByUser: true,
    },
    {
      id: 7,
      title: 'Data Science Essentials',
      organizer: 'DataMinds',
      location: 'Online',
      date: 'June 1, 2025', // Future date (upcoming)
      registered: 'live now',
      postDate: '25/5/2025',
      registeredByUser: true,
    },
    {
      id: 8,
      title: 'Effective Communication Workshop',
      organizer: 'SpeakEasy',
      location: 'Online',
      date: 'March 15, 2025', // Past date (not upcoming)
      registered: 'live now',
      postDate: '10/3/2025',
      registeredByUser: true,
    },
    {
      id: 9,
      title: 'AI in the Workplace',
      organizer: 'TechFuture',
      location: 'Online',
      date: 'May 18, 2025', // Future date (upcoming)
      registered:'live now',
      postDate: '12/5/2025',
      registeredByUser: true,
    },
    {
      id: 10,
      title: 'Project Management Basics',
      organizer: 'PlanPro',
      location: 'Online',
      date: 'April 1, 2025', // Past date (not upcoming)
      registered: 'live now',
      postDate: '25/3/2025',
      registeredByUser: true,
    }];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    console.log('UpcomingWorkshops component mounted');
  }, []);

  // Current date for comparison (May 11, 2025)
  const currentDate = new Date('2025-05-11');

  // Filter for Upcoming Workshops (future dates)
  const upcomingWorkshops = workshops.filter((workshop) => {
    const workshopDate = new Date(workshop.date);
    return workshopDate > currentDate;
  });

  // Filter for My Workshops (registered by the user)
  const myWorkshops = myworkshoplist.filter((workshop) => workshop.registeredByUser);

  if (error) {
    return (
      <div className="container">
        <Header toggleSidebar={toggleSidebar} />
        <div className="layout" style={{ marginTop: '4rem', minHeight: 'calc(100vh - 4rem)' }}>
          <SideBar
            setActivePage={(page) => navigate(`/student${page === 'home' ? '' : '/' + page}`)}
            isOpen={isSidebarOpen}
            setSidebarWidth={setSidebarWidth}
          />
          <main style={{ flex: 1, padding: '1.5rem', backgroundColor: '#f9fafb' }}>
            <div className="profileContent">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Error</h2>
              <p style={{ color: '#ef4444' }}>An error occurred: {error.message}</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header toggleSidebar={toggleSidebar} />
      <div className="layout" style={{ marginTop: '4rem', minHeight: 'calc(100vh - 4rem)' }}>
        <SideBar
          setActivePage={(page) => {
            console.log('Navigating to page:', page);
            navigate(`/student${page === 'home' ? '' : '/' + page}`);
          }}
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
            transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
            boxSizing: 'border-box',
            backgroundColor: '#f9fafb',
          }}
        >
          <div className="profileContent">
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: '#1f2937',
              }}
            >
              Online Career Workshops
            </h2>

            {/* Upcoming Workshops Section */}
            <div
              style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '2rem',
              }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#1f2937',
                }}
              >
                Upcoming Workshops
              </h3>
              {upcomingWorkshops.length === 0 ? (
                <p style={{ color: '#4b5563' }}>No upcoming workshops available at the moment.</p>
              ) : (
                <div className="cardHolder">
                  {upcomingWorkshops.map((workshop) => (
                    <div key={workshop.id} className="card">
                      <div className="card-header">
                        <h3 className="program-title">{workshop.title}</h3>
                        <div className="company-info">
                          <span className="company-name">{workshop.organizer}</span>
                          <span className="company-location">{workshop.location}</span>
                          <span className="post-date">{workshop.postDate}</span>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="alumni-count">
                          <span className="pin-icon">📌</span>
                          <span>{workshop.registered}</span>
                        </div>
                        <button className="actionButton">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* My Workshops Section */}
            <div
              style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#1f2937',
                }}
              >
                My Workshops
              </h3>
              {myWorkshops.length === 0 ? (
                <p style={{ color: '#4b5563' }}>You haven't registered for any workshops yet.</p>
              ) : (
                <div className="cardHolder">
                  {myWorkshops.map((workshop) => (
                    <div key={workshop.id} className="card">
                      <div className="card-header">
                        <h3 className="program-title">{workshop.title}</h3>
                        <div className="company-info">
                          <span className="company-name">{workshop.organizer}</span>
                          <span className="company-location">{workshop.location}</span>
                          <span className="post-date">{workshop.postDate}</span>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="alumni-count">
                          <span className="pin-icon">🔴</span>
                          <span
                          className='live'>{workshop.registered}</span>
                          
                        </div>
                        <button className="actionButton">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
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

export default UpcomingWorkshops;