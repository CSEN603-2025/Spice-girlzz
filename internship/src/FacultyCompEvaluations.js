import React, { useState, useEffect } from 'react';
import './HomePage.css';

const CompanyEvaluations = () => {
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const sampleEvaluations = [
      {
        id: 1,
        studentId: 1,
        studentName: 'John Ramzy',
        companyName: 'TechCorp',
        supervisor: 'Jane Doe',
        startDate: '2023-04-01',
        endDate: '2023-06-30',
        rating: 4,
        strengths: 'Excellent problem-solving skills, quick learner',
        areasForImprovement: 'Could improve documentation skills',
        recommendation: 'yes',
        comments: 'Would happily hire again',
        date: '2023-05-15',
        internshipTitle: 'Software Developer',
        yearOfStudy: '3rd Year'
      },
      {
        id: 2,
        studentId: 2,
        studentName: 'Menna Ibrahim',
        companyName: 'MediHealth',
        supervisor: 'Emily Stone',
        startDate: '2023-07-01',
        endDate: '2023-09-30',
        rating: 5,
        strengths: 'Strong analytical skills, great attention to detail',
        areasForImprovement: 'Needs more confidence in presentations',
        recommendation: 'yes',
        comments: 'Outstanding intern, highly recommended',
        date: '2023-08-10',
        internshipTitle: 'Data Analyst',
        yearOfStudy: '4th Year'
      },
      {
        id: 3,
        studentId: 3,
        studentName: 'Alice Johnson',
        companyName: 'FinTech Solutions',
        supervisor: 'Michael Chen',
        startDate: '2023-05-01',
        endDate: '2023-07-31',
        rating: 3,
        strengths: 'Good teamwork, reliable',
        areasForImprovement: 'Needs to improve coding efficiency',
        recommendation: 'maybe',
        comments: 'Shows potential but needs more technical growth',
        date: '2023-06-20',
        internshipTitle: 'Financial Analyst',
        yearOfStudy: '2nd Year'
      },
      {
        id: 4,
        studentId: 4,
        studentName: 'Bob Smith',
        companyName: 'GreenEnergy',
        supervisor: 'Sarah Johnson',
        startDate: '2023-06-01',
        endDate: '2023-08-31',
        rating: 4,
        strengths: 'Creative problem solver, strong work ethic',
        areasForImprovement: 'Time management could be better',
        recommendation: 'yes',
        comments: 'Solid contributor to the team',
        date: '2023-07-25',
        internshipTitle: 'Energy Consultant',
        yearOfStudy: '3rd Year'
      },
      {
        id: 5,
        studentId: 5,
        studentName: 'Clara Davis',
        companyName: 'EduLearn',
        supervisor: 'David Wilson',
        startDate: '2023-03-01',
        endDate: '2023-05-31',
        rating: 5,
        strengths: 'Exceptional communication, proactive',
        areasForImprovement: 'None noted',
        recommendation: 'yes',
        comments: 'A pleasure to work with',
        date: '2023-04-30',
        internshipTitle: 'Education Specialist',
        yearOfStudy: '4th Year'
      },
      {
        id: 6,
        studentId: 6,
        studentName: 'David Wilson',
        companyName: 'TechCorp',
        supervisor: 'Laura Brown',
        startDate: '2023-08-01',
        endDate: '2023-10-31',
        rating: 3,
        strengths: 'Good technical knowledge',
        areasForImprovement: 'Needs to improve collaboration skills',
        recommendation: 'maybe',
        comments: 'Requires more team integration',
        date: '2023-09-15',
        internshipTitle: 'Software Developer',
        yearOfStudy: '2nd Year'
      },
      {
        id: 7,
        studentId: 7,
        studentName: 'Emma Brown',
        companyName: 'MediHealth',
        supervisor: 'James Lee',
        startDate: '2023-02-01',
        endDate: '2023-04-30',
        rating: 4,
        strengths: 'Detail-oriented, strong research skills',
        areasForImprovement: 'Could be more assertive in meetings',
        recommendation: 'yes',
        comments: 'Valuable team member',
        date: '2023-03-20',
        internshipTitle: 'Data Analyst',
        yearOfStudy: '3rd Year'
      },
      {
        id: 8,
        studentId: 8,
        studentName: 'Frank Miller',
        companyName: 'FinTech Solutions',
        supervisor: 'Anna Smith',
        startDate: '2023-09-01',
        endDate: '2023-11-30',
        rating: 2,
        strengths: 'Willing to learn',
        areasForImprovement: 'Lacks technical proficiency, needs supervision',
        recommendation: 'no',
        comments: 'Not suitable for current role',
        date: '2023-10-05',
        internshipTitle: 'Financial Analyst',
        yearOfStudy: '2nd Year'
      }
    ];
    setEvaluations(sampleEvaluations);
  }, []);

  return (
    <div className="container faculty-page">
      <div className="card">
        <h3 className="section-title">Company Evaluations</h3>
        {evaluations.length === 0 ? (
          <p className="no-data">No evaluations found.</p>
        ) : (
          <div className="evaluation-list">
            {evaluations.map(evaluation => (
              <div key={evaluation.id} className="evaluation-card">
                <div className="evaluation-subtitle">{evaluation.internshipTitle}</div>
                <div className="evaluation-header">
                  <h4 className="evaluation-title">
                    {evaluation.studentName}, {evaluation.yearOfStudy} Computer Science
                  
                  </h4>
                  <span className="evaluation-date">{evaluation.date}</span>
                </div>
                <div className="evaluation-details">
                  <div className="detail-row">
                    <strong>Company:</strong> {evaluation.companyName}
                  </div>
                  <div className="detail-row">
                    <strong>Supervisor:</strong> {evaluation.supervisor}
                  </div>
                  <div className="detail-row">
                    <strong>Internship Period:</strong> {evaluation.startDate} to {evaluation.endDate}
                  </div>
                  <div className="detail-row">
                    <strong>Strengths:</strong> {evaluation.strengths}
                  </div>
                  <div className="detail-row">
                    <strong>Areas for Improvement:</strong> {evaluation.areasForImprovement}
                  </div>
                  <div className="detail-row">
                    <strong>Recommendation:</strong> {
                      evaluation.recommendation === 'yes' ? 'Highly recommended' :
                      evaluation.recommendation === 'maybe' ? 'Recommended with reservations' : 'Not recommended'
                    }
                  </div>
                  {evaluation.comments && (
                    <div className="detail-row">
                      <strong>Comments:</strong> {evaluation.comments}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyEvaluations;