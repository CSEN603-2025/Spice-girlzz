import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

import "./StudentHomePage.css";

function UpcomingWorkshops() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  // New state variables for workshop management
  const [showWorkshopForm, setShowWorkshopForm] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [workshopFormData, setWorkshopFormData] = useState({
    title: "",
    organizer: "",
    location: "Online",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    description: "",
    speakerBio: "",
    agenda: "",
    duration: "",
    benefits: "",
    targetAudience: "",
    image: null
  });

  // State for workshops with added description
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      title: "Resume Building Workshop",
      organizer: "CareerBoost",
      location: "Online",
      date: "May 12, 2025",
      registered: "120 participants registered",
      postDate: "20/6/2025",
      registeredByUser: false,
      description:
        "Learn to craft a professional resume that stands out to recruiters.",
      duration: "2 hour",
      Benefits: "receive certifiactes after attending",
      TargetAudience: "students",
      image:  <img src={`${process.env.PUBLIC_URL}/imgs/cv.jpg`} alt="Resume" />
    },
    {
      id: 2,
      title: "Tech Interview Prep",
      organizer: "TechHire",
      location: "Online",
      date: "May 20, 2025",
      registered: "80 participants registered",
      postDate: "20/5/2025",
      registeredByUser: false,
      description:
        "Master technical interviews with coding practice and mock sessions.",
      duration: " 1 hour",
      Benefits: "receive certifiactes after attending",
      TargetAudience: "students",
             image:   <img src={`${process.env.PUBLIC_URL}/imgs/interview.jpg`} alt="Interview" />, 

    },
    {
      id: 3,
      title: "Networking for Career Success",
      organizer: "ConnectSphere",
      location: "Online",
      date: "May 25, 2025",
      registered: "150 participants registered",
      postDate: "30/5/2025",
      registeredByUser: false,
      description:
        "Discover networking strategies to build professional connections.",
      duration: "30 minutes",
      Benefits: "receive certifiactes after attending",
      TargetAudience: "students",
    image:  <img src={`${process.env.PUBLIC_URL}/imgs/connections.jpg`} alt="networks" />

    },
    {
      id: 4,
      title: "Career Growth Strategies",
      organizer: "FutureLeaders",
      location: "Online",
      date: "April 30, 2025",
      registered: "100 participants registered",
      postDate: "15/4/2025",
      registeredByUser: false,
      description: "Explore strategies to accelerate your career growth.",
      duration: "3 hours",
      Benefits: "receive certifiactes after attending",
      TargetAudience: "students",
         image:  <img src={`${process.env.PUBLIC_URL}/imgs/ladder.jpg`} alt="Careers" />

    },
  ]);

  // State for popup form
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [currentWorkshopId, setCurrentWorkshopId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    workshopId: "",
  });
  const [isGlobalRegister, setIsGlobalRegister] = useState(false);

  // State for details popup
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const myworkshoplist = [
    {
      id: 5,
      title: "Live Career Webinar",
      organizer: "CareerPath",
      location: "Online",
      date: "May 11, 2025",
      registered: "live now",
      postDate: "10/5/2025",
      registeredByUser: true,
      mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      description:
        "Join our live webinar for career advice from industry experts.",
      duration: "2:30 hours",
      Benefits: "receive certifiactes after attending",
      TargetAudience: "students",
      image:  <img src={`${process.env.PUBLIC_URL}/imgs/cv.jpg`} alt="Resume" />
    },
    {
      id: 6,
      title: "Leadership Skills Bootcamp",
      organizer: "LeadNow",
      location: "Online",
      date: "May 11, 2025",
      registered: "live now",
      postDate: "9/5/2025",
      registeredByUser: true,
      mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "Develop leadership skills to lead teams effectively.",
      duration: "2 Hours",
      Benefits: "receive certifiactes after attending",
      TargetAudience: "students",
      image: (
        <img src={`${process.env.PUBLIC_URL}/imgs/leader.jpg`} alt="leads" />
      ),
    },
    {
      id: 7,
      title: "Data Science Essentials",
      organizer: "DataMinds",
      location: "Online",
      date: "June 1, 2025",
      registered: "live now",
      postDate: "25/5/2025",
      registeredByUser: true,
      mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "Learn the fundamentals of data science and analytics.",
      duration: "1:30 Hours",
      Benefits: "receive certifiactes after attending",
      TargetAudience: "students",
    },
    {
      id: 8,
      title: "Effective Communication Workshop",
      organizer: "SpeakEasy",
      location: "Online",
      date: "March 15, 2025",
      registered: "live now",
      postDate: "10/3/2025",
      registeredByUser: true,
      mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      description:
        "Enhance your communication skills for professional success.",
      duration: "1 Hour",
      Benefits: "receive certifiactes after attending",
      TargetAudience: "students",
      image: (
        <img
          src={`${process.env.PUBLIC_URL}/imgs/communication.jpeg`}
          alt="communicate"
        />
      ),
    },
    {
      id: 9,
      title: "AI in the Workplace",
      organizer: "TechFuture",
      location: "Online",
      date: "May 18, 2025",
      registered: "live now",
      postDate: "12/5/2025",
      registeredByUser: true,
      mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "Understand AI's impact on the workplace and how to adapt.",
      duration: "30 minutes",
      Benefits: "receive certifiactes after attending",
      TargetAudience: "students",
    },
    {
      id: 10,
      title: "Project Management Basics",
      organizer: "PlanPro",
      location: "Online",
      date: "April 1, 2025",
      registered: "live now",
      postDate: "25/3/2025",
      registeredByUser: true,
      mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      description:
        "Learn project management skills to deliver successful projects.",
      duration: "45 minutes",
      Benefits: "receive certifiactes after attending",
      TargetAudience: "students",
      image: (
        <img
          src={`${process.env.PUBLIC_URL}/imgs/project.jpg`}
          alt="projects"
        />
      ),
    },
  ];

  const [attendedWorkshops, setAttendedWorkshops] = useState([]);
  const [ratedWorkshops, setRatedWorkshops] = useState({});
  const [notes, setNotes] = useState({});
  const [ratings, setRatings] = useState({});
  const [feedback, setFeedback] = useState({});
  const [chatMessages, setChatMessages] = useState({});
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentPopupWorkshopId, setCurrentPopupWorkshopId] = useState(null);
  const videoRef = useRef(null);

  // Load registrations and notes
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem("workshopNotes");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
      const savedRegistrations = localStorage.getItem("workshopRegistrations");
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
      console.error("Error loading from localStorage:", err);
      setError("Failed to load saved data.");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("workshopNotes", JSON.stringify(notes));
    } catch (err) {
      console.error("Error saving notes to localStorage:", err);
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
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (isGlobalRegister && !formData.workshopId) {
      setError("Please select a workshop.");
      return;
    }
    try {
      const workshopId = isGlobalRegister
        ? parseInt(formData.workshopId)
        : currentWorkshopId;
      const selectedWorkshop = workshops.find((w) => w.id === workshopId);
      console.log("Registering workshop:", workshopId, formData);
      setWorkshops((prev) =>
        prev.map((workshop) =>
          workshop.id === workshopId
            ? { ...workshop, registeredByUser: true }
            : workshop
        )
      );
      const registrations = JSON.parse(
        localStorage.getItem("workshopRegistrations") || "{}"
      );
      registrations[workshopId] = {
        name: formData.name,
        email: formData.email,
      };
      localStorage.setItem(
        "workshopRegistrations",
        JSON.stringify(registrations)
      );
      alert(`Successfully registered for "${selectedWorkshop.title}"`);
      setShowRegisterPopup(false);
      setFormData({ name: "", email: "", workshopId: "" });
      setCurrentWorkshopId(null);
      setIsGlobalRegister(false);
      setError(null);
    } catch (err) {
      console.error("Error registering for workshop:", err);
      setError("Failed to register for the workshop.");
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
    setFormData({ name: "", email: "", workshopId: "" });
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
      alert("Please provide a rating before submitting.");
      return;
    }
    setRatedWorkshops((prev) => ({
      ...prev,
      [workshopId]: {
        rating: ratings[workshopId],
        feedback: feedback[workshopId] || "",
      },
    }));
  };

  const handleNoteChange = (workshopId, text) => {
    setNotes((prev) => ({
      ...prev,
      [workshopId]: text,
    }));
  };

  const handleSaveNotes = (workshopId) => {
    const noteText = notes[workshopId] || "";
    if (!noteText.trim()) {
      alert("Please enter some notes before saving.");
      return;
    }
    try {
      localStorage.setItem("workshopNotes", JSON.stringify(notes));
      alert("Notes saved successfully!");
    } catch (err) {
      console.error("Error saving notes to localStorage:", err);
      alert("Failed to save notes. Please try again.");
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
        {
          sender: "You",
          text: currentMessage,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    }));
    setCurrentMessage("");

    setTimeout(() => {
      setChatMessages((prev) => ({
        ...prev,
        [workshopId]: [
          ...(prev[workshopId] || []),
          {
            sender: "Attendee",
            text: "Thanks for your message!",
            timestamp: new Date().toLocaleTimeString(),
          },
        ],
      }));
    }, 1000);
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Error playing video:", err);
        alert("Failed to play video. Please try again.");
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
    doc.text("Certificate of Attendance", 105, 40, null, null, "center");
    doc.setFontSize(16);
    doc.text(`This is to certify that`, 105, 70, null, null, "center");
    doc.setFontSize(18);
    doc.text(userName, 105, 90, null, null, "center");
    doc.setFontSize(16);
    doc.text(`has attended the workshop`, 105, 110, null, null, "center");
    doc.setFontSize(18);
    doc.text(workshopTitle, 105, 130, null, null, "center");
    doc.setFontSize(14);
    doc.text(`on ${workshopDate}`, 105, 150, null, null, "center");
    doc.setFontSize(12);
    doc.text("Issued by: CareerBoost", 105, 170, null, null, "center");
    doc.save(`${workshopTitle}_Certificate.pdf`);
  };

  const liveWorkshops = myworkshoplist.filter(
    (workshop) => new Date(workshop.date) <= new Date()
  );

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "/");
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
    setCurrentMessage("");
  };

  // Handle workshop form input changes
  const handleWorkshopFormChange = (e) => {
    const { name, value } = e.target;
    setWorkshopFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle workshop form submission
  const handleWorkshopSubmit = (e) => {
    e.preventDefault();
    
    if (!workshopFormData.title || !workshopFormData.organizer || !workshopFormData.startDate || 
        !workshopFormData.startTime || !workshopFormData.endDate || !workshopFormData.endTime) {
      setError("Please fill in all required fields");
      return;
    }

    const newWorkshop = {
      id: editingWorkshop ? editingWorkshop.id : Date.now(),
      title: workshopFormData.title,
      organizer: workshopFormData.organizer,
      location: workshopFormData.location,
      date: `${workshopFormData.startDate} ${workshopFormData.startTime}`,
      endDate: `${workshopFormData.endDate} ${workshopFormData.endTime}`,
      registered: "0 participants registered",
      postDate: new Date().toLocaleDateString(),
      registeredByUser: false,
      description: workshopFormData.description,
      speakerBio: workshopFormData.speakerBio,
      agenda: workshopFormData.agenda,
      duration: workshopFormData.duration,
      Benefits: workshopFormData.benefits,
      TargetAudience: workshopFormData.targetAudience,
      image: workshopFormData.image ? (
        <img src={URL.createObjectURL(workshopFormData.image)} alt={workshopFormData.title} />
      ) : (
        <img src={`${process.env.PUBLIC_URL}/imgs/default-workshop.jpg`} alt="Default Workshop" />
      )
    };

    if (editingWorkshop) {
      setWorkshops(prev => prev.map(w => w.id === editingWorkshop.id ? newWorkshop : w));
    } else {
      setWorkshops(prev => [...prev, newWorkshop]);
    }

    setShowWorkshopForm(false);
    setEditingWorkshop(null);
    setWorkshopFormData({
      title: "",
      organizer: "",
      location: "Online",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      description: "",
      speakerBio: "",
      agenda: "",
      duration: "",
      benefits: "",
      targetAudience: "",
      image: null
    });
  };

  // Handle workshop deletion
  const handleDeleteWorkshop = (workshopId) => {
    if (window.confirm("Are you sure you want to delete this workshop?")) {
      setWorkshops(prev => prev.filter(w => w.id !== workshopId));
    }
  };

  // Handle workshop edit
  const handleEditWorkshop = (workshop) => {
    setEditingWorkshop(workshop);
    setWorkshopFormData({
      title: workshop.title,
      organizer: workshop.organizer,
      location: workshop.location,
      startDate: workshop.date.split(" ")[0],
      startTime: workshop.date.split(" ")[1],
      endDate: workshop.endDate.split(" ")[0],
      endTime: workshop.endDate.split(" ")[1],
      description: workshop.description,
      speakerBio: workshop.speakerBio || "",
      agenda: workshop.agenda || "",
      duration: workshop.duration,
      benefits: workshop.Benefits,
      targetAudience: workshop.TargetAudience,
      image: null
    });
    setShowWorkshopForm(true);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWorkshopFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  return (
    <div className="">
      <div
        className=""
        
      >
        <main
          style={{
          marginTop:"-20px"
          }}
        >
          <div className="profileContent">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Online Career Workshops
            </h2>

            {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

            {/* Workshop Management Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => {
                  setShowWorkshopForm(true);
                  setEditingWorkshop(null);
                }}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
              >
                Add New Workshop
              </button>
            </div>

            {/* Workshop Management Form */}
            {showWorkshopForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <h3 className="text-xl font-bold mb-6 text-gray-800">
                    {editingWorkshop ? "Edit Workshop" : "Add New Workshop"}
                  </h3>
                  <form onSubmit={handleWorkshopSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-800">
                          Workshop Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={workshopFormData.title}
                          onChange={handleWorkshopFormChange}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-800">
                          Organizer *
                        </label>
                        <input
                          type="text"
                          name="organizer"
                          value={workshopFormData.organizer}
                          onChange={handleWorkshopFormChange}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-800">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={workshopFormData.startDate}
                          onChange={handleWorkshopFormChange}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-800">
                          Start Time *
                        </label>
                        <input
                          type="time"
                          name="startTime"
                          value={workshopFormData.startTime}
                          onChange={handleWorkshopFormChange}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-800">
                          End Date *
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          value={workshopFormData.endDate}
                          onChange={handleWorkshopFormChange}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-800">
                          End Time *
                        </label>
                        <input
                          type="time"
                          name="endTime"
                          value={workshopFormData.endTime}
                          onChange={handleWorkshopFormChange}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-800">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={workshopFormData.description}
                        onChange={handleWorkshopFormChange}
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-800">
                        Speaker Bio
                      </label>
                      <textarea
                        name="speakerBio"
                        value={workshopFormData.speakerBio}
                        onChange={handleWorkshopFormChange}
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-800">
                        Workshop Agenda
                      </label>
                      <textarea
                        name="agenda"
                        value={workshopFormData.agenda}
                        onChange={handleWorkshopFormChange}
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-800">
                          Duration
                        </label>
                        <input
                          type="text"
                          name="duration"
                          value={workshopFormData.duration}
                          onChange={handleWorkshopFormChange}
                          placeholder="e.g., 2 hours"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-800">
                          Target Audience
                        </label>
                        <input
                          type="text"
                          name="targetAudience"
                          value={workshopFormData.targetAudience}
                          onChange={handleWorkshopFormChange}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-800">
                        Benefits
                      </label>
                      <input
                        type="text"
                        name="benefits"
                        value={workshopFormData.benefits}
                        onChange={handleWorkshopFormChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-800">
                        Workshop Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div className="flex gap-4 justify-end mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setShowWorkshopForm(false);
                          setEditingWorkshop(null);
                        }}
                        className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700"
                      >
                        {editingWorkshop ? "Update Workshop" : "Add Workshop"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Upcoming Workshops
                </h3>
              </div>
              {workshops.length === 0 ? (
                <p className="text-gray-600">
                  No upcoming workshops available at the moment.
                </p>
              ) : (
                <div className="cardHolder">
                  {workshops.map((workshop) => (
                    <div key={workshop.id} className="card">
                      <div>{workshop.image}</div>

                      <div className="card-header">
                        <h3 className="program-title">{workshop.title}</h3>
                        <div className="company-info">
                          <span className="company-name">
                            {workshop.organizer}
                          </span>
                          <span className="company-location">
                            {workshop.location}
                          </span>
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
                            onClick={() => handleEditWorkshop(workshop)}
                            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm w-full"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteWorkshop(workshop.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                          >
                            Delete
                          </button>
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
                    {isGlobalRegister
                      ? "Register for an Upcoming Workshop"
                      : `Register for ${
                          workshops.find((w) => w.id === currentWorkshopId)
                            ?.title
                        }`}
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
                            className={
                              workshop.registeredByUser
                                ? "text-gray-500 italic"
                                : ""
                            }
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
                    <div className="text-red-500 text-sm mb-4">{error}</div>
                  )}
                  <div className="flex gap-2">
                    <button
                      className="register-button flex-1 text-white py-2 rounded-lg transition"
                      style={{ backgroundColor: "#2a9d8f" }}
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
                <div className="bg-white p-8 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    {selectedWorkshop.title}
                  </h3>
                  <div className="mb-4 text-gray-600 space-y-4">
                    <div>
                      <strong>Organizer:</strong> {selectedWorkshop.organizer}
                    </div>
                    <div>
                      <strong>Date & Time:</strong> {selectedWorkshop.date}
                    </div>
                    <div>
                      <strong>End Date & Time:</strong> {selectedWorkshop.endDate}
                    </div>
                    <div>
                      <strong>Duration:</strong> {selectedWorkshop.duration}
                    </div>
                    <div>
                      <strong>Target Audience:</strong> {selectedWorkshop.TargetAudience}
                    </div>
                    <div>
                      <strong>Benefits:</strong> {selectedWorkshop.Benefits}
                    </div>
                    <div>
                      <strong>Description:</strong>
                      <p className="mt-1">{selectedWorkshop.description}</p>
                    </div>
                    {selectedWorkshop.speakerBio && (
                      <div>
                        <strong>Speaker Bio:</strong>
                        <p className="mt-1">{selectedWorkshop.speakerBio}</p>
                      </div>
                    )}
                    {selectedWorkshop.agenda && (
                      <div>
                        <strong>Workshop Agenda:</strong>
                        <p className="mt-1 whitespace-pre-line">{selectedWorkshop.agenda}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!selectedWorkshop.registeredByUser && (
                      <button
                        className="register-button flex-1 text-white py-2 rounded-lg transition"
                        style={{ backgroundColor: "#2a9d8f" }}
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
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-lg">
                  <h3 className="text-xl font-bold mb-6 text-gray-800">
                    {
                      liveWorkshops.find((w) => w.id === currentPopupWorkshopId)
                        ?.title
                    }
                  </h3>

                  <div className="mb-4">
                    <h5 className="text-lg font-bold mb-2">Watch Workshop</h5>
                    {liveWorkshops.find((w) => w.id === currentPopupWorkshopId)
                      ?.mediaUrl ? (
                      <>
                        <video
                          ref={videoRef}
                          className="w-full max-h-48 rounded-lg mb-2"
                          controls
                        >
                          <source
                            src={
                              liveWorkshops.find(
                                (w) => w.id === currentPopupWorkshopId
                              ).mediaUrl
                            }
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
                      <p className="text-gray-600">
                        No recording available for this workshop.
                      </p>
                    )}
                  </div>

                  {!attendedWorkshops.includes(currentPopupWorkshopId) ? (
                    <div className="mb-4">
                      <button
                        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 text-sm"
                        onClick={() =>
                          handleMarkAsAttended(currentPopupWorkshopId)
                        }
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
                              ratings[currentPopupWorkshopId] >= star
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                            onClick={() =>
                              handleRatingChange(currentPopupWorkshopId, star)
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <h5 className="text-lg font-bold mb-2">Feedback</h5>
                      <textarea
                        value={feedback[currentPopupWorkshopId] || ""}
                        onChange={(e) =>
                          handleFeedbackChange(
                            currentPopupWorkshopId,
                            e.target.value
                          )
                        }
                        placeholder="Share your feedback..."
                        rows={3}
                        className="w-full p-2 border rounded-lg"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm"
                          onClick={() =>
                            handleSubmitFeedback(currentPopupWorkshopId)
                          }
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <h5 className="text-lg font-bold mb-2">Take Notes</h5>
                    <textarea
                      value={notes[currentPopupWorkshopId] || ""}
                      onChange={(e) =>
                        handleNoteChange(currentPopupWorkshopId, e.target.value)
                      }
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
                      {(chatMessages[currentPopupWorkshopId] || []).map(
                        (message, index) => (
                          <div
                            key={index}
                            className={`mb-2 text-${
                              message.sender === "You" ? "right" : "left"
                            }`}
                          >
                            <span
                              className={`text-sm font-bold ${
                                message.sender === "You"
                                  ? "text-teal-600"
                                  : "text-gray-800"
                              }`}
                            >
                              {message.sender}:
                            </span>{" "}
                            <span className="text-sm">{message.text}</span>
                            <div className="text-xs text-gray-500">
                              {message.timestamp}
                            </div>
                          </div>
                        )
                      )}
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
                        onClick={() =>
                          handleSendMessage(currentPopupWorkshopId)
                        }
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
    </div>
  );
}

export default UpcomingWorkshops;
