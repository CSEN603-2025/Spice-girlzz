import { useState, useEffect, useRef } from "react";
import SideBar from "./Components/ScadSideBar";
import Header from "./Components/SCADHeader";
import { useNavigate, useLocation } from "react-router-dom";
import "./StudentHomePage.css";
import "./SCADDashboardAlaa.css";
import {
  Settings,
  Building,
  Bell,
  Mail,
  User,
  LogOut,
  Search,
  Download,
  Flag,
  Check,
  X,
  VideoOff,
} from "lucide-react";
import { FaEnvelope, FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaComment, FaUserFriends, FaDesktop, FaPhoneSlash } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

function VideoCallDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const localVideoRef = useRef(null);
  const participantVideoRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("4rem");
  const [activeTab, setActiveTab] = useState("sent");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showStartCallModal, setShowStartCallModal] = useState(false);
  const [ringingAppointment, setRingingAppointment] = useState(null);
  const [ringingPhase, setRingingPhase] = useState("ringing"); // 'ringing' or 'video'
  const [showScheduleCallModal, setShowScheduleCallModal] = useState(false);
  const [callRejected, setCallRejected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [videoError, setVideoError] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [callDuration, setCallDuration] = useState(0); // Added for call duration tracking
  const [newAppointment, setNewAppointment] = useState({
    recipient: "",
    purpose: "",
    scheduledDate: "",
    scheduledTime: "",
    isOnline: true,
    studentName: "",
    studentEmail: "",
  });
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [connectionWarning, setConnectionWarning] = useState(false);

  const storedProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
  const email = (location.state?.email || storedProfile.email || "").toLowerCase();

  const dummySentAppointments = [
    {
      id: 1,
      recipient: "esraa.ahmed@guc.edu.eg",
      dateSent: "2025-05-10 14:30",
      purpose: "Career Guidance",
      status: "Pending",
      scheduledDate: "2025-05-11",
      scheduledTime: "10:00",
      isOnline: false,
      studentName: "John Doe",
      studentEmail: email,
    },
    {
      id: 2,
      recipient: "alaa.abdelnaser@guc.edu.eg",
      dateSent: "2025-05-09 09:15",
      purpose: "Report Clarification",
      status: "Accepted",
      scheduledDate: "2025-05-10",
      scheduledTime: "11:30",
      isOnline: true,
      studentName: "John Doe",
      studentEmail: email,
    },
  ];

  const dummyReceivedAppointments = [
    {
      id: 3,
      sender: "scad.office@university.edu",
      dateSent: "2025-05-11 10:00",
      purpose: "Career Guidance Follow-up",
      status: "Pending",
      scheduledDate: "2025-05-12",
      scheduledTime: "14:00",
      isOnline: false,
      studentName: "Esraa Ahmed",
      studentEmail: "esraa.ahmed@university.edu",
    },
    {
      id: 4,
      sender: "alaa.abdelnaser@university.edu",
      dateSent: "2025-05-10 16:45",
      purpose: "Report Discussion",
      status: "Accepted",
      scheduledDate: "2025-05-13",
      scheduledTime: "09:30",
      isOnline: true,
      studentName: "Alaa Abdelnaser",
      studentEmail: "alaa.abdelnaser@university.edu",
    },
  ];

  const newAppointments = JSON.parse(sessionStorage.getItem("sentAppointments") || "[]");
  const initialSentAppointments = [...dummySentAppointments, ...newAppointments];

  const [appointments, setAppointments] = useState({
    sent: initialSentAppointments,
    received: dummyReceivedAppointments,
  });

  // Format duration in MM:SS
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setSidebarWidth(isSidebarOpen ? "4rem" : "16rem");
  };

  const onWidthChange = (width) => {
    setSidebarWidth(width);
  };

  const markAsRead = (id) => {
    setAppointments((prev) => {
      const updatedSent = prev.sent.map((appointment) =>
        appointment.id === id && appointment.status === "Pending"
          ? { ...appointment, status: "Read" }
          : appointment
      );
      const updatedReceived = prev.received.map((appointment) =>
        appointment.id === id && appointment.status === "Pending"
          ? { ...appointment, status: "Read" }
          : appointment
      );
      const updatedNewAppointments = newAppointments.map((appointment) =>
        appointment.id === id && appointment.status === "Pending"
          ? { ...appointment, status: "Read" }
          : appointment
      );
      sessionStorage.setItem("sentAppointments", JSON.stringify(updatedNewAppointments));
      return { sent: updatedSent, received: updatedReceived };
    });
  };

  const openAppointment = (appointment) => {
    if (appointment.status === "Pending") markAsRead(appointment.id);
    setSelectedAppointment(appointment);
  };

  const closeAppointment = () => setSelectedAppointment(null);

  const handleAccept = (appointmentId) => {
    setAppointments((prev) => {
      const updatedReceived = prev.received.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: "Accepted" }
          : appointment
      );
      const updatedSelected =
        selectedAppointment?.id === appointmentId
          ? { ...selectedAppointment, status: "Accepted" }
          : selectedAppointment;
      setSelectedAppointment(updatedSelected);
      return { ...prev, received: updatedReceived };
    });
    console.log(`Accepted appointment ${appointmentId}`);
    addNotification(`Appointment ${appointmentId} accepted`, "appointment");
  };

  const handleReject = (appointmentId) => {
    setAppointments((prev) => {
      const updatedReceived = prev.received.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: "Rejected" }
          : appointment
      );
      const updatedSelected =
        selectedAppointment?.id === appointmentId
          ? { ...selectedAppointment, status: "Rejected" }
          : selectedAppointment;
      setSelectedAppointment(updatedSelected);
      return { ...prev, received: updatedReceived };
    });
    console.log(`Rejected appointment ${appointmentId}`);
    addNotification(`Appointment ${appointmentId} rejected`, "appointment");
  };

  const availableAppointments = [
    ...appointments.sent.filter((apt) => apt.status === "Accepted" && apt.isOnline),
    ...appointments.received.filter((apt) => apt.status === "Accepted" && apt.isOnline),
  ];

  const startVideoCall = async () => {
    try {
      setVideoError(null);
      console.log("Requesting media devices...");
      if (window.location.protocol !== "https:" && window.location.hostname !== "localhost") {
        throw new Error("Camera access requires a secure context (HTTPS or localhost).");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("Media stream acquired:", stream);
      console.log("Stream tracks:", stream.getTracks());
      const videoTracks = stream.getVideoTracks();
      console.log("Video tracks:", videoTracks);
      if (videoTracks.length === 0) {
        throw new Error("No video tracks available");
      }
      videoTracks.forEach((track) => {
        console.log(`Video track: enabled=${track.enabled}, state=${track.readyState}`);
      });
      setMediaStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        await localVideoRef.current.play().catch((error) => {
          console.error("Error playing local video:", error);
          addNotification("Failed to play local video", "error");
        });
        setIsVideoPlaying(true);
      }
      if (participantVideoRef.current) {
        console.log("Triggering participant video playback...");
        participantVideoRef.current.play().catch((error) => {
          console.error("Error playing participant video:", error);
          addNotification("Failed to play participant video", "error");
        });
      }
      addNotification("Video call started", "call");
    } catch (error) {
      console.error("Error accessing camera/microphone:", error);
      let errorMessage = "Failed to access camera/microphone";
      if (error.name === "NotAllowedError") {
        errorMessage = "Camera/microphone access denied. Please allow permissions.";
      } else if (error.name === "NotFoundError") {
        errorMessage = "No camera or microphone found. Please connect a device.";
      } else if (error.name === "NotReadableError") {
        errorMessage = "Camera/microphone in use by another application.";
      } else if (error.message === "No video tracks available") {
        errorMessage = "No video stream available. Check camera connection.";
      } else if (error.message.includes("secure context")) {
        errorMessage = "Camera access requires HTTPS or localhost.";
      }
      setVideoError(errorMessage);
      addNotification(errorMessage, "error");
    }
  };

  const stopVideoCall = () => {
    if (mediaStream) {
      console.log("Stopping media stream...");
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
    if (participantVideoRef.current) {
      console.log("Pausing participant video...");
      participantVideoRef.current.pause();
      participantVideoRef.current.currentTime = 0;
    }
    if (localVideoRef.current) {
      console.log("Resetting local video...");
      localVideoRef.current.srcObject = null;
    }
    setRingingAppointment(null);
    setRingingPhase("ringing");
    setVideoError(null);
    setIsVideoPlaying(false);
    setCallDuration(0); // Reset call duration
    addNotification("Video call ended", "call");
  };

  const playVideosManually = () => {
    if (localVideoRef.current && mediaStream) {
      console.log("Manually playing local video...");
      localVideoRef.current.srcObject = mediaStream;
      localVideoRef.current
        .play()
        .then(() => {
          console.log("Local video playing");
          setIsVideoPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing local video manually:", error);
          addNotification("Failed to play local video", "error");
        });
    }
    if (participantVideoRef.current) {
      console.log("Manually playing participant video...");
      participantVideoRef.current
        .play()
        .then(() => {
          console.log("Participant video playing");
        })
        .catch((error) => {
          console.error("Error playing participant video manually:", error);
          addNotification("Failed to play participant video", "error");
        });
    }
  };

  // Increment call duration during video phase
  useEffect(() => {
    let timer;
    if (ringingPhase === "video") {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [ringingPhase]);

  useEffect(() => {
    if (mediaStream && localVideoRef.current) {
      console.log("Assigning stream to local video element:", mediaStream);
      localVideoRef.current.srcObject = mediaStream;
      localVideoRef.current.play().catch((error) => {
        console.error("Error playing local video:", error);
        addNotification("Failed to play local video", "error");
      });
    }
    return () => {
      if (mediaStream) {
        console.log("Cleaning up media stream on unmount...");
        mediaStream.getTracks().forEach((track) => track.stop());
        setMediaStream(null);
      }
    };
  }, [mediaStream]);

  useEffect(() => {
    if (ringingAppointment && ringingPhase === "video") {
      console.log("Video call modal opened, checking visibility...");
      const modal = document.querySelector(".modal-overlay");
      if (modal) {
        const styles = window.getComputedStyle(modal);
        console.log("Modal styles:", {
          display: styles.display,
          visibility: styles.visibility,
          opacity: styles.opacity,
          zIndex: styles.zIndex,
        });
      }
      if (localVideoRef.current) {
        console.log("Local video element:", localVideoRef.current);
        console.log("Local video srcObject:", localVideoRef.current.srcObject);
        const videoStyles = window.getComputedStyle(localVideoRef.current);
        console.log("Local video styles:", {
          display: videoStyles.display,
          visibility: videoStyles.visibility,
          width: videoStyles.width,
          height: videoStyles.height,
        });
      }
      if (participantVideoRef.current) {
        console.log("Participant video element:", participantVideoRef.current);
        console.log("Participant video src:", participantVideoRef.current.currentSrc);
        const videoStyles = window.getComputedStyle(participantVideoRef.current);
        console.log("Participant video styles:", {
          display: videoStyles.display,
          visibility: videoStyles.visibility,
          width: videoStyles.width,
          height: videoStyles.height,
        });
      }
    }
  }, [ringingAppointment, ringingPhase]);

  const handleStartCallClick = () => {
    setShowStartCallModal(true);
    setCallRejected(false);
  };

  const handleSelectAppointment = (appointment) => {
    setShowStartCallModal(false);
    setRingingAppointment(appointment);
    setRingingPhase("ringing");
    if (appointment.id === 2) {
      startVideoCall();
      setTimeout(() => {
        setRingingPhase("video");
      }, 2000);
    } else {
      setTimeout(() => {
        setCallRejected(true);
        setRingingAppointment(null);
        setRingingPhase("ringing");
        setTimeout(() => setCallRejected(false), 3000);
      }, 2000);
    }
  };

  const handleScheduleCallSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const dateSent = currentDate.toISOString().slice(0, 16).replace("T", " ");
    const newAppt = {
      id: appointments.sent.length + newAppointments.length + 1,
      recipient: newAppointment.recipient,
      dateSent,
      purpose: newAppointment.purpose,
      status: "Pending",
      scheduledDate: newAppointment.scheduledDate,
      scheduledTime: newAppointment.scheduledTime,
      isOnline: newAppointment.isOnline,
      studentName: newAppointment.studentName,
      studentEmail: newAppointment.studentEmail,
    };
    const updatedSentAppointments = [...appointments.sent, newAppt];
    const updatedNewAppointments = [...newAppointments, newAppt];
    setAppointments((prev) => ({ ...prev, sent: updatedSentAppointments }));
    sessionStorage.setItem("sentAppointments", JSON.stringify(updatedNewAppointments));
    setShowScheduleCallModal(false);
    setNewAppointment({
      recipient: "",
      purpose: "",
      scheduledDate: "",
      scheduledTime: "",
      isOnline: true,
      studentName: "",
      studentEmail: "",
    });
    addNotification(`Appointment scheduled with ${newAppt.recipient}`, "appointment");
  };

  const addNotification = (message, type = "system") => {
    const newNotification = {
      id: notifications.length + 1,
      type,
      message,
      time: "Just now",
    };
    setNotifications([newNotification, ...notifications]);
  };

  useEffect(() => {
    const newNotifications = [
      {
        id: 1,
        type: "appointment",
        message: "New appointment request from advisor.john",
        time: "5 minutes ago",
      },
      {
        id: 2,
        type: "call",
        message: "Incoming call from scad.office",
        time: "1 hour ago",
      },
    ];
    setNotifications(newNotifications);

    const timer = setTimeout(() => {
      const incomingCall = window.confirm("Incoming call from advisor.mary. Accept?");
      if (incomingCall) {
        addNotification("Call started with advisor.mary", "call");
      }
    }, 15000);

    return () => {
      clearTimeout(timer);
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="dashboard-container" style={{ marginTop: "-290px" }}>
      <Header toggleSidebar={toggleSidebar} />
      <div className="dashboard-content">
        <SideBar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          onWidthChange={onWidthChange}
        />
        <div
          className="main-content"
          style={{
            marginLeft: window.innerWidth > 768 ? sidebarWidth : "0",
            width: window.innerWidth > 768 ? `calc(100% - ${sidebarWidth})` : "100%",
            transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
            boxSizing: "border-box",
            backgroundColor: "#f9fafb",
            padding: "1.5rem",
            overflowY: "auto",
            flex: 1,
          }}
        >
          <div className="fade-in">
            <div
              className="card"
              style={{
                marginBottom: "2rem",
                padding: "1.5rem",
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            >
              <h2 className="section-title">Call Management</h2>
              <p className="company-info">
                Schedule video calls for personalized career guidance or to clarify internship report details.
              </p>
              <div className="dashboard-actions">
                <button
                  className="callButton"
                  onClick={() => setShowScheduleCallModal(true)}
                  style={{ marginRight: "1rem" }}
                >
                  📅 Schedule a Call
                </button>
                <button className="callButton" onClick={handleStartCallClick}>
                  📞 Start a Call
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="section-title">Your Appointments</h3>
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "1.5rem",
                }}
              >
                <button
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "transparent",
                    border: "none",
                    borderBottom: activeTab === "sent" ? "2px solid #2a9d8f" : "2px solid transparent",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: activeTab === "sent" ? "#2a9d8f" : "#6b7280",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => setActiveTab("sent")}
                >
                  Sent
                </button>
                <button
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "transparent",
                    border: "none",
                    borderBottom: activeTab === "received" ? "2px solid #2a9d8f" : "2px solid transparent",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: activeTab === "received" ? "#2a9d8f" : "#6b7280",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => setActiveTab("received")}
                >
                  Received
                </button>
              </div>
              <div className="mail-list">
                {(activeTab === "sent" ? appointments.sent : appointments.received).length === 0 ? (
                  <p className="no-data">No appointments found.</p>
                ) : (
                  (activeTab === "sent" ? appointments.sent : appointments.received).map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`mail-item ${appointment.status === "Pending" ? "unread" : ""}`}
                      onClick={() => openAppointment(appointment)}
                    >
                      <div className="mail-header">
                        <span className="flex items-center">
                          {activeTab === "sent" ? appointment.recipient : appointment.sender}
                          <span
                            className={`inline-flex items-center ml-2 text-xs font-medium px-2 py-1 rounded-full ${
                              appointment.isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full mr-1 ${
                                appointment.isOnline ? "bg-green-500 animate-pulse" : "bg-gray-500"
                              }`}
                            ></span>
                            {appointment.isOnline ? "Online" : "Offline"}
                          </span>
                        </span>
                        <span>{appointment.dateSent}</span>
                      </div>
                      <div className="mail-subject">
                        {appointment.purpose}
                        {appointment.status === "Pending" && <span className="appoint-badge">Pending</span>}
                        {appointment.status === "Accepted" && (
                          <span className="appoint-badge accepted">Accepted</span>
                        )}
                        {appointment.status === "Rejected" && (
                          <span className="appoint-badge rejected">Rejected</span>
                        )}
                      </div>
                      <div className="mail-preview">{appointment.purpose.substring(0, 100)}...</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showScheduleCallModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="schedule-header">Schedule a New Call</h3>
            <form onSubmit={handleScheduleCallSubmit} className="schedule-form">
              <div style={{ marginBottom: "1rem" }} className="form-group">
                <label htmlFor="studentName" style={{ display: "block", marginBottom: "0.5rem" }} className="form-label">
                  Student Name
                </label>
                <input
                  type="text"
                  id="studentName"
                  value={newAppointment.studentName}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, studentName: e.target.value })
                  }
                  required
                   className='form-input'
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="studentEmail" style={{ display: "block", marginBottom: "0.5rem" }}className="form-label">
                  Student Email
                </label>
                <input
                  type="email"
                  id="studentEmail"
                  value={newAppointment.studentEmail}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, studentEmail: e.target.value })
                  }
                  required
                  className='form-input'
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="purpose" style={{ display: "block", marginBottom: "0.5rem" }}className="form-label">
                  Purpose
                </label>
                <input
                  type="text"
                  id="purpose"
                  value={newAppointment.purpose}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, purpose: e.target.value })
                  }
                  required
                   className='form-input'
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="scheduledDate" style={{ display: "block", marginBottom: "0.5rem" }}className="form-label">
                  Scheduled Date
                </label>
                <input
                  type="date"
                  id="scheduledDate"
                  value={newAppointment.scheduledDate}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, scheduledDate: e.target.value })
                  }
                  required
                   className='form-input'
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="scheduledTime" style={{ display: "block", marginBottom: "0.5rem" }}className="form-label">
                  Scheduled Time
                </label>
                <input
                  type="time"
                  id="scheduledTime"
                  value={newAppointment.scheduledTime}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, scheduledTime: e.target.value })
                  }
                  required
                   className='form-input'
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="isOnline" style={{ display: "block", marginBottom: "0.5rem" }}className="form-label">
                  Online Call
                </label>
                <input
                  type="checkbox"
                  id="isOnline"
                  checked={newAppointment.isOnline}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, isOnline: e.target.checked })
                  }
                  className='form-input'
                />
                <span>Enable Online Call</span>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" , gap:"10px"}}>
                <button
                  type="button"
                  className="clear"
                  onClick={() => setShowScheduleCallModal(false)}
                  
                >
                  Cancel
                </button>
                <button type="submit" className="submit">
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showStartCallModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="section-title">Select Appointment to Start Call</h3>
            {availableAppointments.length === 0 ? (
              <p className="no-data">No accepted and online appointments available.</p>
            ) : (
              <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                {availableAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="mail-item"
                    style={{ cursor: "pointer", padding: "1rem", borderBottom: "1px solid #e5e7eb" }}
                    onClick={() => handleSelectAppointment(apt)}
                  >
                    <div className="mail-header">
                      <span className="flex items-center">
                        {activeTab === "sent" ? apt.recipient : apt.sender} ({apt.studentName})
                        <span className="inline-flex items-center ml-2 text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                          <span className="w-2 h-2 rounded-full mr-1 bg-green-500 animate-pulse"></span>
                          Online
                        </span>
                      </span>
                      <span>
                        {apt.scheduledDate} {apt.scheduledTime}
                      </span>
                    </div>
                    <div className="mail-subject">{apt.purpose}</div>
                  </div>
                ))}
              </div>
            )}
            <button
              className="btn btn-danger"
              onClick={() => setShowStartCallModal(false)}
              style={{ marginTop: "1rem" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {ringingAppointment && (
        <div className="modal-overlay">
          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "8px",
              maxWidth: "900px",
              width: "100%",
              maxHeight: "700px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: ringingPhase === "ringing" ? "center" : "left",
            }}
          >
            {ringingPhase === "ringing" ? (
              <>
                <h3 className="section-title">Calling...</h3>
                <p
                  className="animate-pulse"
                  style={{ color: "#2a9d8f", fontSize: "1.25rem", margin: "1rem 0" }}
                >
                  📞 Ringing{" "}
                  {activeTab === "sent" ? ringingAppointment.recipient : ringingAppointment.sender} (
                  {ringingAppointment.studentName})
                </p>
              </>
            ) : (
              <>
                <h3 className="section-title">Video Call</h3>
                {videoError ? (
                  <div style={{ marginBottom: "1rem", color: "#991b1b" }}>
                    <p>{videoError}</p>
                  </div>
                ) : (
                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ position: "relative" }}>
                      {/* Main Video (Remote Participant) */}
                      <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center mb-4 overflow-hidden">
                        <div className="relative w-full h-full">
                         <img
      src="https://media1.tenor.com/m/fSQKu0TBPi0AAAAd/stock-cam-webcampro.gif"
      alt="Remote participant placeholder"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: mediaStream ? "block" : "none",
        
      }}
    />
                          {connectionWarning && (
                            <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-sm flex items-center">
                              <IoMdNotifications className="mr-1" /> Weak connection
                            </div>
                          )}
                          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-sm">
                            {ringingAppointment.studentName}
                          </div>
                        </div>
                      </div>

                      {/* Local Video (Small overlay) */}
                      <div className="absolute bottom-4 right-4 w-24 h-32 bg-gray-200 rounded-md border-2 border-white overflow-hidden">
                        {isVideoOn ? (
                          <video
                           
                            autoPlay
                            playsInline
                            muted
                            loop
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                              visibility: "visible",
                            }}
                            src="https://media.giphy.com/media/m9cEHoc70Xtqy7jrMJ/giphy.mp4"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-black">
                            <FaVideoSlash size={20} className="text-gray-600" />
                          </div>
                        )}
                        <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white px-1 rounded text-xs">
                          You (SCAD)
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
                        onClick={stopVideoCall}
                        className="p-3 rounded-full bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-all duration-200"
                        title="End call"
                      >
                        <FaPhoneSlash size={20} />
                      </button>
                    </div>

                    {/* Chat Sidebar */}
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
                              Hi there!
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

                    {/* Participants Sidebar */}
                    {showParticipants && (
                      <div className="absolute right-4 top-20 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-10">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">Participants (2)</h3>
                          <button onClick={() => setShowParticipants(false)} className="text-gray-500 hover:text-gray-700">
                            ×
                          </button>
                        </div>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                              <span className="text-blue-600 text-sm">SC</span>
                            </div>
                            <span>SCAD Office (Host)</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                              <span className="text-green-600 text-sm">S</span>
                            </div>
                            <span>{ringingAppointment.studentName}</span>
                            <span className="ml-auto text-xs text-gray-500">Mic {isMuted ? "off" : "on"}</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {callRejected && (
        <div
          style={{
            position: "fixed",
            top: "4.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1003,
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            padding: "1rem 2rem",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          Sorry, the User is Busy
        </div>
      )}

      {selectedAppointment && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="section-title">{selectedAppointment.purpose}</h3>
            <div className="mail-meta">
              <p>
                <strong>{activeTab === "sent" ? "To" : "From"}:</strong>{" "}
                {activeTab === "sent" ? selectedAppointment.recipient : selectedAppointment.sender}
              </p>
              <p>
                <strong>Student Name:</strong> {selectedAppointment.studentName}
              </p>
              <p>
                <strong>Student Email:</strong> {selectedAppointment.studentEmail}
              </p>
              <p>
                <strong>Date Sent:</strong> {selectedAppointment.dateSent}
              </p>
              <p>
                <strong>Scheduled Date:</strong> {selectedAppointment.scheduledDate}
              </p>
              <p>
                <strong>Scheduled Time:</strong> {selectedAppointment.scheduledTime}
              </p>
              <p>
                <strong>Status:</strong> {selectedAppointment.status}
              </p>
              {selectedAppointment.status === "Pending" && activeTab === "received" && (
                <span className="application-tag">Pending Appointment</span>
              )}
            </div>
            <div className="mail-body-container">
              <p className="mail-body">{selectedAppointment.purpose}</p>
              {selectedAppointment.status === "Pending" && activeTab === "received" && (
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAccept(selectedAppointment.id)}
                    style={{ marginRight: "0.5rem" }}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleReject(selectedAppointment.id)}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
            <button className="btn btn-danger" onClick={closeAppointment}>
              Close
            </button>
          </div>
        </div>
      )}

      {showNotifications && (
        <div
          style={{
            position: "absolute",
            top: "4rem",
            right: "1rem",
            width: "20rem",
            background: "#fff",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 50,
          }}
        >
          <div style={{ padding: "1rem", borderBottom: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#1f2937" }}>
              Notifications
            </h3>
          </div>
          <div style={{ maxHeight: "24rem", overflowY: "auto" }}>
            {notifications.length === 0 ? (
              <p style={{ padding: "1rem", color: "#6b7280", textAlign: "center" }}>
                No notifications
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    padding: "1rem",
                    borderBottom: "1px solid #e5e7eb",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#f3f4f6")}
                  onMouseOut={(e) => (e.target.style.background = "none")}
                >
                  <p style={{ color: "#4b5563" }}>{notification.message}</p>
                  <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>{notification.time}</p>
                </div>
              ))
            )}
          </div>
          <div style={{ padding: "1rem", borderTop: "1px solid #e5e7eb" }}>
            <button
              onClick={() => setShowNotifications(false)}
              style={{
                width: "100%",
                textAlign: "center",
                color: "#3b82f6",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.color = "#2563eb")}
              onMouseOut={(e) => (e.target.style.color = "#3b82f6")}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isSidebarOpen && (
        <div className="mobile-overlay active" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}

export default VideoCallDashboard;
