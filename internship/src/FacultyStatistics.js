import { useState } from "react";
import { Download } from "lucide-react";
import { generateStatisticsReport } from "./pdfGenerator";
import "./HomePage.css";

const initialStatistics = {
  reportsPerCycle: { accepted: 12, rejected: 4, flagged: 3, pending: 5 },
  averageReviewTime: "3 days",
  popularCourses: [
    { name: "CS101", reports: 15 },
    { name: "ENG202", reports: 12 },
    { name: "DS100", reports: 8 },
  ],
  topCompanies: [
    { name: "TechCorp", rating: 4.7, reports: 6 },
    { name: "MediHealth", rating: 4.6, reports: 4 },
    { name: "FinTech Solutions", rating: 4.4, reports: 5 },
  ],
  internshipCount: {
    TechCorp: 6,
    MediHealth: 4,
    GreenEnergy: 2,
    FinTech: 5,
    EduLearn: 3,
  },
  performanceMetrics: {
    facultyAverage: 3.2,
    departmentAverage: 2.8,
    universityAverage: 2.5,
  },
};

export default function FacultyStatistics({ isSidebarOpen }) {
  const [statistics] = useState(initialStatistics);

  return (
    <div style={{ maxWidth: "100%" }} className="container">
      <h2 className="title">Real-Time Statistics</h2>
      <div className="cardHolder">
        <div className="card">
          <div className="card-header">
            <h3 className="program-title">Reports This Cycle</h3>
          </div>
          <div className="reports-grid">
            <div className="report-box accepted">
              <p className="report-count">{statistics.reportsPerCycle.accepted}</p>
              <p className="report-label">Accepted</p>
            </div>
            <div className="report-box rejected">
              <p className="report-count">{statistics.reportsPerCycle.rejected}</p>
              <p className="report-label">Rejected</p>
            </div>
            <div className="report-box flagged">
              <p className="report-count">{statistics.reportsPerCycle.flagged}</p>
              <p className="report-label">Flagged</p>
            </div>
            <div className="report-box pending">
              <p className="report-count">{statistics.reportsPerCycle.pending}</p>
              <p className="report-label">Pending</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="program-title">Performance Metrics</h3>
          </div>
          <div className="metric-row">
            <span className="metric-label">Average Review Time:</span>
            <span className="metric-value">{statistics.averageReviewTime}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="program-title">Popular Courses</h3>
          </div>
          <ul className="list">
            {statistics.popularCourses.map((course, index) => (
              <li key={index} className="list-item">
                <span className="list-bullet"></span>
                <span>{course.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="program-title">Top Rated Companies</h3>
          </div>
          <ul className="list">
            {statistics.topCompanies.map((company, index) => (
              <li key={index} className="list-item">
                <span className="list-bullet" style={{ background: index === 0 ? "#10b981" : "#2a9d8f" }}></span>
                <span>{company.name} (Rating: {company.rating})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="program-title">Internship Count by Company</h3>
          </div>
          {Object.entries(statistics.internshipCount).map(([company, count], index) => (
            <div key={index} className="company-row">
              <div className="company-info">
                <span className="company-name">{company}</span>
                <span className="company-count">{count}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(count / 6) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="report-button-container">
        <button
          onClick={() => generateStatisticsReport(statistics)}
          className="actionButton"
        >
          <Download size={18} />
          Generate Comprehensive Report
        </button>
        <p className="report-description">
          This will generate a PDF with all current statistics.
        </p>
      </div>
    </div>
  );
}