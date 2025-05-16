import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function RegisterPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const companyName = form.companyName.value.trim();
    const industry = form.industry.value.trim();
    const companySize = form.companySize.value.trim();
    const companyLogo = form.companyLogo.files[0];
    const email = form.email.value.trim();
    const password = form.password.value;
    const taxDoc = form.taxDocument.files[0];

    if (email === "company@acceptedCorp.com") {
      setIsRegistered("accepted");
    } else if (email === "company@rejectedCorp.com") {
      setIsRegistered("rejected");
    } else {
      alert("Only dummy email companies 'company@acceptedCorp.com' and 'company@rejectedCorp.com' are allowed for testing.");
    }
  };

  return (
    <div className="login-container">
      <div className="promo-section">
        <span className="star-icon">✨</span>
        <h1 className="promo-title">Join Us</h1>
        <p className="promo-text">
          Register your company to access exclusive tools.
        </p>
        <p className="footer-text">© 2025 InternHub.</p>
      </div>
      <div className="login-section">
        {isRegistered === false && (
          <>
            <h2 className="welcome-text">Company Registration</h2>
            <p className="login-title">Create your account</p>
            <form onSubmit={handleRegister} className="login-form">
              <input
                name="companyName"
                type="text"
                placeholder="Company Name"
                required
                className="input-field"
              />
              <input
                name="industry"
                type="text"
                placeholder="Industry"
                required
                className="input-field"
              />
              <input
                name="companySize"
                type="text"
                placeholder="Company Size"
                required
                className="input-field"
              />
              <label className="form-label file-label">Company Logo</label>
              <input
                name="companyLogo"
                type="file"
                accept="image/*"
                required
                className="file-input"
              />
              <input
                name="email"
                type="email"
                placeholder="Company Email"
                required
                className="input-field"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="input-field"
              />
              <label className="form-label file-label">Tax Document</label>
              <input
                name="taxDocument"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                className="file-input"
              />
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </>
        )}

        {isRegistered === "accepted" && (
          <div style={{ textAlign: 'center' }}>
            <h2 className="welcome-text">✅ Registration Successful!</h2>
            <p className="login-title">
              You may now log in.
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn btn-secondary"
            >
              Go to Login
            </button>
          </div>
        )}

        {isRegistered === "rejected" && (
          <div style={{ textAlign: 'center' }}>
            <h2 className="welcome-text" style={{ color: '#dc2626' }}>
              ❌ Registration Rejected
            </h2>
            <p className="login-title">
              Contact admin or try again.
            </p>
            <button
              onClick={() => setIsRegistered(false)}
              className="btn btn-secondary"
            >
              Back to Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;