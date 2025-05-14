import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaVideo, 
  FaVideoSlash, 
  FaDesktop, 
  FaPhoneSlash, 
  FaComment,
  FaUserFriends,
  FaEllipsisH
} from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import NotificationSystem from './Components/NotificationsStudent';
import './StudentHomePage.css';
import './App.css';
import './CompanyStyles.css';

const StartCall = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('4rem');
  const [callStatus, setCallStatus] = useState('connecting'); // 'connecting', 'ongoing', 'caller-left', 'ended'
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionWarning, setConnectionWarning] = useState(false);

  const storedProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
  const email = (location.state?.email || storedProfile.email || "").toLowerCase();

  // Simulate call lifecycle
  useEffect(() => {
    if (callStatus === 'connecting') {
      const timer = setTimeout(() => setCallStatus('ongoing'), 2000);
      return () => clearTimeout(timer);
    } else if (callStatus === 'ongoing') {
      const durationTimer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(durationTimer);
    }
  }, [callStatus]);

  // Simulate caller leaving after 10 seconds
  useEffect(() => {
    if (callStatus === 'ongoing') {
      const leaveTimer = setTimeout(() => {
        setCallStatus('caller-left');
        // Trigger notification
        const newNotification = {
          id: Date.now(),
          message: 'Caller Left',
          details: 'SCAD Academic Advisor Alice Johnson has left the call.',
          type: 'alert',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        // Note: NotificationSystem handles its own state
      }, 10000); // 10 seconds
      return () => clearTimeout(leaveTimer);
    }
  }, [callStatus]);

  // Random connection warnings
  useEffect(() => {
    if (callStatus === 'ongoing') {
      const warningTimer = setTimeout(() => {
        setConnectionWarning(true);
        setTimeout(() => setConnectionWarning(false), 3000);
      }, 10000);
      return () => clearTimeout(warningTimer);
    }
  }, [callStatus]);

  const handleCallAction = (action) => {
    if (action === 'leave') {
      setCallStatus('ended');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Format call duration (MM:SS)
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <NotificationSystem />
      <Header toggleSidebar={toggleSidebar} />
      <div className="layout">
        <SideBar
          setActivePage={(page) =>
            navigate(`/student${page === "home" ? "" : "/" + page}`, { state: { email } })
          }
          isOpen={isSidebarOpen}
          setSidebarWidth={setSidebarWidth}
        />
        <div
          className="main-content"
          style={{
            marginLeft: window.innerWidth > 768 ? sidebarWidth : '0',
            width: window.innerWidth > 768 ? `calc(100% - ${sidebarWidth})` : '100%',
            transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
            boxSizing: 'border-box',
            backgroundColor: '#f9fafb',
            padding: '1.5rem',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          <div className="profileContent">
            <div
              className="card"
              style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
              }}
            >
              <h2 className="section-title">Video Call</h2>
              {callStatus === 'connecting' ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-300 rounded-full mb-4"></div>
                    <p className="text-gray-600 mb-2">Connecting to SCAD Academic Advisor Alice Johnson...</p>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 animate-progress"></div>
                    </div>
                  </div>
                </div>
              ) : callStatus === 'ongoing' ? (
                <div>
                  <div className="relative mb-6">
                    {/* Remote Video (Simulated) */}
                    <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center mb-4 overflow-hidden">
                      <div className="relative w-full h-full">
                        <img 
                          src="https://media.giphy.com/media/m9cEHoc70Xtqy7jrMJ/giphy.gif" 
                          alt="Remote participant" 
                          className="w-full h-full object-cover"
                        />
                        {connectionWarning && (
                          <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-sm flex items-center">
                            <IoMdNotifications className="mr-1" /> Weak connection
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-sm">
                          SCAD Academic Advisor Alice Johnson
                        </div>
                      </div>
                    </div>

                    {/* Local Video (Simulated) */}
                    <div className="absolute bottom-4 right-4 w-24 h-32 bg-gray-200 rounded-md border-2 border-white overflow-hidden">
                      {isVideoOn ? (
                        <img 
                          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExODVkMmtkanBnOXlmbW85OXVvM3M1OXB1cTRvcGVyZ3NvMDVtNWZweCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WTTASedFlXQuanytvw/giphy.gif" 
                          alt="You" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-400">
                          <FaVideoSlash size={20} className="text-gray-600" />
                        </div>
                      )}
                      <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white px-1 rounded text-xs">
                        You
                      </div>
                    </div>

                    {/* Call Duration */}
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-sm">
                      {formatDuration(callDuration)}
                    </div>
                  </div>

                  {/* Call Controls */}
                  <div className="flex justify-center gap-4 mb-4">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-3 rounded-full text-white cursor-pointer transition-all duration-200 ${
                        isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
                    </button>
                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={`p-3 rounded-full text-white cursor-pointer transition-all duration-200 ${
                        !isVideoOn ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                      title={isVideoOn ? "Turn off camera" : "Turn on camera"}
                    >
                      {isVideoOn ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
                    </button>
                    <button
                      onClick={() => setShowChat(!showChat)}
                      className={`p-3 rounded-full text-white cursor-pointer transition-all duration-200 ${
                        showChat ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                      title="Chat"
                    >
                      <FaComment size={20} />
                    </button>
                    <button
                      onClick={() => setShowParticipants(!showParticipants)}
                      className={`p-3 rounded-full text-white cursor-pointer transition-all duration-200 ${
                        showParticipants ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                      title="Participants"
                    >
                      <FaUserFriends size={20} />
                    </button>
                    <button
                      onClick={() => setIsScreenSharing(!isScreenSharing)}
                      className={`p-3 rounded-full text-white cursor-pointer transition-all duration-200 ${
                        isScreenSharing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                      title="Share screen"
                    >
                      <FaDesktop size={20} />
                    </button>
                    <button
                      onClick={() => handleCallAction('leave')}
                      className="p-3 rounded-full bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-all duration-200"
                      title="End call"
                    >
                      <FaPhoneSlash size={20} />
                    </button>
                  </div>

                  {/* Chat Sidebar (Simulated) */}
                  {showChat && (
                    <div className="absolute right-4 top-20 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-10">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">Chat</h3>
                        <button onClick={() => setShowChat(false)} className="text-gray-500 hover:text-gray-700">
                          ×
                        </button>
                      </div>
                      <div className="h-48 overflow-y-auto mb-3 space-y-2">
                        <div className="text-right">
                          <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-lg max-w-xs">
                            Hi Alice!
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-gray-200 px-3 py-1 rounded-lg max-w-xs">
                            Hello! Can you hear me?
                          </div>
                        </div>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Type a message..." 
                        className="w-full p-2 border border-gray-300 rounded-md" 
                        disabled
                      />
                    </div>
                  )}

                  {/* Participants Sidebar (Simulated) */}
                  {showParticipants && (
                    <div className="absolute right-4 top-20 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-10">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">Participants (3)</h3>
                        <button onClick={() => setShowParticipants(false)} className="text-gray-500 hover:text-gray-700">
                          ×
                        </button>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                            <span className="text-blue-600 text-sm">AJ</span>
                          </div>
                          <span>Alice Johnson (Host)</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                            <span className="text-green-600 text-sm">Y</span>
                          </div>
                          <span>You</span>
                          <span className="ml-auto text-xs text-gray-500">Mic {isMuted ? "off" : "on"}</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                            <span className="text-purple-600 text-sm">MB</span>
                          </div>
                          <span>Mike Brown</span>
                          <span className="ml-auto text-xs text-gray-500">Mic off</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : callStatus === 'caller-left' ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-full h-64 bg-gray-100 rounded-md flex flex-col items-center justify-center mb-4">
                    <FaPhoneSlash size={32} className="text-gray-500 mb-2" />
                    <p className="text-gray-600 text-lg text-center">
                      SCAD Academic Advisor Alice Johnson has left the call
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">Duration: {formatDuration(callDuration)}</p>
                    <button
                      onClick={() => {
                        setCallStatus('connecting');
                        setCallDuration(0);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Start New Call
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaPhoneSlash size={24} className="text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Call ended</h3>
                    <p className="text-gray-600 mb-4">Duration: {formatDuration(callDuration)}</p>
                    <button
                      onClick={() => {
                        setCallStatus('connecting');
                        setCallDuration(0);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Call Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <div className="mobile-overlay active" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default StartCall;