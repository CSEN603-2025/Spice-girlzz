import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={styles.container}>
      {isRegistered === false && (
        <>
          <h2>Company Registration</h2>
          <form onSubmit={handleRegister} style={styles.form}>
            <input name="companyName" type="text" placeholder="Company Name" required style={styles.input} />
            <input name="industry" type="text" placeholder="Industry" required style={styles.input} />
            <input name="companySize" type="text" placeholder="Company Size" required style={styles.input} />
            <label style={styles.label}>Upload Company Logo:</label>
            <input name="companyLogo" type="file" accept="image/*" required style={styles.input} />
            <input name="email" type="email" placeholder="Company Email" required style={styles.input} />
            <input name="password" type="password" placeholder="Password" required style={styles.input} />
            <label style={styles.label}>Upload Tax Document:</label>
            <input name="taxDocument" type="file" accept=".pdf,.doc,.docx" required style={styles.input} />
            <button type="submit" style={styles.button}>Register</button>
          </form>
        </>
      )}

      {isRegistered === "accepted" && (
        <div>
          <h2 style={{ color: '#4e4f50' }}>✅ Registration Successful!</h2>
          <p style={{ marginTop: '1rem', color: '#746c70' }}>
            Your registration has been accepted. You may now log in.
          </p>
          <button onClick={() => navigate('/')} style={styles.button}>Go to Login</button>
        </div>
      )}

      {isRegistered === "rejected" && (
        <div>
          <h2 style={{ color: 'darkred' }}>❌ Registration Rejected</h2>
          <p style={{ marginTop: '1rem', color: '#746c70' }}>
            Your company has not been approved. Please contact admin or try again.
          </p>
          <button onClick={() => setIsRegistered(false)} style={styles.button}>Back to Register</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#e2ded0',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  label: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#4e4f50',
  },
  button: {
    padding: '10px',
    backgroundColor: '#647c90',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default RegisterPage;
