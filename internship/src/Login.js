import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check if the email matches the accepted domains
    const acceptedDomains = ['@acceptedCorp.com', '@student.guc.edu.eg', '@guc.edu.eg'];
    const isEmailValid = acceptedDomains.some(domain => email.endsWith(domain));

    if (!isEmailValid) {
      alert('Invalid email domain');
      return;
    }
    
    // Add authentication logic here
    navigate('/student'); // Redirect to student page for now
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        <button type="button" onClick={() => navigate('/register')} style={styles.button}>Register as Company</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#e2ded0',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '2rem auto',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.5rem',
    border: '1px solid #4e4f50',
    borderRadius: '4px',
  },
  button: {
    padding: '0.5rem',
    backgroundColor: '#647c90',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LoginPage;
