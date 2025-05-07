import React, { useState } from "react";

// Dummy Data
const companies = [
  {
    id: 1,
    name: "TechCorp",
    industry: "Technology",
    status: "Pending",
    details: "A leading tech firm specializing in AI.",
  },
  {
    id: 2,
    name: "MediHealth",
    industry: "Healthcare",
    status: "Pending",
    details: "Innovative healthcare solutions provider.",
  },
  {
    id: 3,
    name: "GreenEnergy",
    industry: "Energy",
    status: "Pending",
    details: "Sustainable energy solutions company.",
  },
];

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    internshipStatus: "Active",
    major: "CS",
    profile: "3rd-year CS student, GPA: 3.8",
  },
  {
    id: 2,
    name: "Bob Smith",
    internshipStatus: "Pending",
    major: "Engineering",
    profile: "2nd-year Engineering student, GPA: 3.5",
  },
  {
    id: 3,
    name: "Clara Davis",
    internshipStatus: "Completed",
    major: "CS",
    profile: "4th-year CS student, GPA: 3.9",
  },
];

const reports = [
  {
    id: 1,
    student: "Alice Johnson",
    major: "CS",
    status: "Pending",
    details: "Week 1 Report: Developed API endpoints.",
    company: "TechCorp",
    supervisor: "John Doe",
    startDate: "2025-01-01",
    endDate: "2025-03-01",
  },
  {
    id: 2,
    student: "Bob Smith",
    major: "Engineering",
    status: "Flagged",
    details: "Week 2 Report: Missing documentation.",
    company: "GreenEnergy",
    supervisor: "Jane Roe",
    startDate: "2025-02-01",
    endDate: "2025-04-01",
    comments: "Needs more detail on project scope.",
  },
  {
    id: 3,
    student: "Clara Davis",
    major: "CS",
    status: "Accepted",
    details: "Final Report: Successfully deployed app.",
    company: "MediHealth",
    supervisor: "Emily Stone",
    startDate: "2025-01-15",
    endDate: "2025-03-15",
  },
];

const statistics = {
  reportsPerCycle: { accepted: 10, rejected: 3, flagged: 2 },
  averageReviewTime: "2 days",
  popularCourses: ["CS101", "ENG202"],
  topCompanies: ["TechCorp (Rating: 4.8)", "MediHealth (Rating: 4.5)"],
  internshipCount: { TechCorp: 5, MediHealth: 3, GreenEnergy: 2 },
};

const SCADStaffDashboard = () => {
  const [activePage, setActivePage] = useState("statistics");
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [majorFilter, setMajorFilter] = useState("");
  const [callStatus, setCallStatus] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [cycleDates, setCycleDates] = useState({
    start: "2025-01-01",
    end: "2025-06-30",
  });

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (industryFilter ? company.industry === industryFilter : true)
  );

  const handleCompanyAction = (id, action) => {
    console.log(`Company ${id} ${action}ed`);
  };

  const downloadPDF = (id) => {
    console.log(`Downloading PDF for company ${id}`);
  };

  const filteredStudents = students.filter((student) =>
    statusFilter ? student.internshipStatus === statusFilter : true
  );

  const filteredReports = reports.filter(
    (report) =>
      (majorFilter ? report.major === majorFilter : true) &&
      (statusFilter ? report.status === statusFilter : true)
  );

  const setReportStatus = (id, status) => {
    console.log(`Report ${id} status set to ${status}`);
  };

  const handleCallAction = (action) => {
    if (action === "accept") {
      setCallStatus("ongoing");
      console.log("Call accepted");
    } else if (action === "reject") {
      setCallStatus(null);
      console.log("Call rejected");
    } else if (action === "leave") {
      setCallStatus(null);
      console.log("Call left");
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "companies":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Manage Companies
            </h2>
            <div className="mb-6 flex space-x-6">
              <input
                type="text"
                placeholder="Search by company name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Industries</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Energy">Energy</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 text-left text-gray-700">Name</th>
                    <th className="p-4 text-left text-gray-700">Industry</th>
                    <th className="p-4 text-left text-gray-700">Status</th>
                    <th className="p-4 text-left text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company) => (
                    <tr
                      key={company.id}
                      className="hover:bg-gray-50 transition-colors duration-300"
                    >
                      <td className="p-4 border-b border-gray-200">
                        {company.name}
                      </td>
                      <td className="p-4 border-b border-gray-200">
                        {company.industry}
                      </td>
                      <td className="p-4 border-b border-gray-200">
                        {company.status}
                      </td>
                      <td className="p-4 border-b border-gray-200 flex space-x-4">
                        <button
                          onClick={() =>
                            console.log(
                              `Viewing details for ${company.name}: ${company.details}`
                            )
                          }
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() =>
                            handleCompanyAction(company.id, "accept")
                          }
                          className="text-green-600 hover:text-green-800 transition-colors duration-300"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleCompanyAction(company.id, "reject")
                          }
                          className="text-red-600 hover:text-red-800 transition-colors duration-300"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => downloadPDF(company.id)}
                          className="text-purple-600 hover:text-purple-800 transition-colors duration-300"
                        >
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "students":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Manage Students
            </h2>
            <div className="mb-6">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 text-left text-gray-700">Name</th>
                    <th className="p-4 text-left text-gray-700">Major</th>
                    <th className="p-4 text-left text-gray-700">
                      Internship Status
                    </th>
                    <th className="p-4 text-left text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors duration-300"
                    >
                      <td className="p-4 border-b border-gray-200">
                        {student.name}
                      </td>
                      <td className="p-4 border-b border-gray-200">
                        {student.major}
                      </td>
                      <td className="p-4 border-b border-gray-200">
                        {student.internshipStatus}
                      </td>
                      <td className="p-4 border-b border-gray-200">
                        <button
                          onClick={() =>
                            console.log(
                              `Viewing profile for ${student.name}: ${student.profile}`
                            )
                          }
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "reports":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Manage Reports
            </h2>
            <div className="mb-6 flex space-x-6">
              <select
                value={majorFilter}
                onChange={(e) => setMajorFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Majors</option>
                <option value="CS">CS</option>
                <option value="Engineering">Engineering</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Flagged">Flagged</option>
                <option value="Rejected">Rejected</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 text-left text-gray-700">Student</th>
                    <th className="p-4 text-left text-gray-700">Major</th>
                    <th className="p-4 text-left text-gray-700">Status</th>
                    <th className="p-4 text-left text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-gray-50 transition-colors duration-300"
                    >
                      <td className="p-4 border-b border-gray-200">
                        {report.student}
                      </td>
                      <td className="p-4 border-b border-gray-200">
                        {report.major}
                      </td>
                      <td className="p-4 border-b border-gray-200">
                        {report.status}
                      </td>
                      <td className="p-4 border-b border-gray-200 flex space-x-4">
                        <button
                          onClick={() =>
                            console.log(
                              `Viewing report details for ${report.student}: ${
                                report.details
                              }, Company: ${report.company}, Supervisor: ${
                                report.supervisor
                              }, Dates: ${report.startDate} to ${
                                report.endDate
                              }${
                                report.comments
                                  ? ", Comments: " + report.comments
                                  : ""
                              }`
                            )
                          }
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => setReportStatus(report.id, "flagged")}
                          className="text-yellow-600 hover:text-yellow-800 transition-colors duration-300"
                        >
                          Flag
                        </button>
                        <button
                          onClick={() => setReportStatus(report.id, "rejected")}
                          className="text-red-600 hover:text-red-800 transition-colors duration-300"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => setReportStatus(report.id, "accepted")}
                          className="text-green-600 hover:text-green-800 transition-colors duration-300"
                        >
                          Accept
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "statistics":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Real-Time Statistics
            </h2>
            <div className="mb-6">
              <label className="text-gray-700 mr-4">
                Internship Cycle Dates:
              </label>
              <input
                type="date"
                value={cycleDates.start}
                onChange={(e) =>
                  setCycleDates({ ...cycleDates, start: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-lg mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={cycleDates.end}
                onChange={(e) =>
                  setCycleDates({ ...cycleDates, end: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="font-bold text-gray-700">Reports Per Cycle</h3>
                <p className="mt-2 text-gray-600">
                  Accepted: {statistics.reportsPerCycle.accepted}
                </p>
                <p className="text-gray-600">
                  Rejected: {statistics.reportsPerCycle.rejected}
                </p>
                <p className="text-gray-600">
                  Flagged: {statistics.reportsPerCycle.flagged}
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="font-bold text-gray-700">Average Review Time</h3>
                <p className="mt-2 text-gray-600">
                  {statistics.averageReviewTime}
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="font-bold text-gray-700">Popular Courses</h3>
                <p className="mt-2 text-gray-600">
                  {statistics.popularCourses.join(", ")}
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="font-bold text-gray-700">Top Rated Companies</h3>
                <p className="mt-2 text-gray-600">
                  {statistics.topCompanies.join(", ")}
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="font-bold text-gray-700">
                  Internship Count by Company
                </h3>
                {Object.entries(statistics.internshipCount).map(
                  ([company, count]) => (
                    <p key={company} className="mt-2 text-gray-600">
                      {company}: {count}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        );

      case "video-calls":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Video Calls
            </h2>
            {callStatus === null ? (
              <div>
                <p className="mb-4 text-gray-700">
                  Incoming Call Notification: Student Alice Johnson
                </p>
                <div className="flex space-x-6">
                  <button
                    onClick={() => handleCallAction("accept")}
                    className="text-green-600 hover:text-green-800 transition-colors duration-300"
                  >
                    Accept Call
                  </button>
                  <button
                    onClick={() => handleCallAction("reject")}
                    className="text-red-600 hover:text-red-800 transition-colors duration-300"
                  >
                    Reject Call
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="mb-4 text-gray-700">
                  Ongoing Call with Alice Johnson (Status: Online)
                </p>
                <div className="flex space-x-6 mb-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  >
                    {isMuted ? "Unmute Mic" : "Mute Mic"}
                  </button>
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  >
                    {isVideoOn ? "Disable Video" : "Enable Video"}
                  </button>
                  <button
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  >
                    {isScreenSharing ? "Stop Sharing" : "Share Screen"}
                  </button>
                  <button
                    onClick={() => handleCallAction("leave")}
                    className="text-red-600 hover:text-red-800 transition-colors duration-300"
                  >
                    Leave Call
                  </button>
                </div>
                <p className="text-gray-600">
                  Notification: Alice Johnson has left the call.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return (
          <p className="text-gray-700">
            Welcome, SCAD Staff! Use the sidebar to navigate.
          </p>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Top Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">SCAD Staff Dashboard</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors duration-300">
            Mail
          </button>
          <button className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors duration-300">
            Profile
          </button>
          <button className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors duration-300">
            Logout
          </button>
        </div>
      </nav>

      {/* Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-500 text-white p-4 h-[calc(100vh-64px)]">
          <ul className="space-y-2">
            <li
              className={`p-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                activePage === "companies" ? "bg-blue-700" : "hover:bg-blue-600"
              }`}
              onClick={() => setActivePage("companies")}
            >
              Companies
            </li>
            <li
              className={`p-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                activePage === "students" ? "bg-blue-700" : "hover:bg-blue-600"
              }`}
              onClick={() => setActivePage("students")}
            >
              Students
            </li>
            <li
              className={`p-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                activePage === "reports" ? "bg-blue-700" : "hover:bg-blue-600"
              }`}
              onClick={() => setActivePage("reports")}
            >
              Reports
            </li>
            <li
              className={`p-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                activePage === "statistics"
                  ? "bg-blue-700"
                  : "hover:bg-blue-600"
              }`}
              onClick={() => setActivePage("statistics")}
            >
              Statistics
            </li>
            <li
              className={`p-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                activePage === "video-calls"
                  ? "bg-blue-700"
                  : "hover:bg-blue-600"
              }`}
              onClick={() => setActivePage("video-calls")}
            >
              Video Calls
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default SCADStaffDashboard;
