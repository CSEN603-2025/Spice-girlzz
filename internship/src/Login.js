// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function LoginPage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Check if the email matches the accepted domains
//     const acceptedDomains = [
//       "@acceptedCorp.com",
//       "@student.guc.edu.eg",
//       "@guc.edu.eg",
//       "@mervat",
//     ];
//     const isEmailValid = acceptedDomains.some((domain) =>
//       email.endsWith(domain)
//     );

//     if (!isEmailValid) {
//       alert("Invalid email domain");
//       return;
//     }
    
//     // For student email, redirect to student page with email in state
//     if (email.endsWith('@student.guc.edu.eg')) {
//       navigate('/student', { state: { email } });
//     } else if (email.endsWith("mervat")){
//       navigate("/facultyMember");
//     } else if(email.endsWith('@acceptedCorp.com')){
//       navigate('/company', { state: { email } });
//     } 
//     else if (email.endsWith("@guc.edu.eg")) {
//       navigate("/staff");
//     }
//       else {
//       // Handle other roles (e.g., company or faculty) if needed
//       alert('Only student login supported for now');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin} style={styles.form}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <button type="submit" style={styles.button}>
//           Login
//         </button>
//         <button
//           type="button"
//           onClick={() => navigate("/register")}
//           style={styles.button}
//         >
//           Register as Company
//         </button>
//       </form>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     backgroundColor: "#e2ded0",
//     padding: "2rem",
//     borderRadius: "8px",
//     maxWidth: "400px",
//     margin: "2rem auto",
//     textAlign: "center",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "1rem",
//   },
//   input: {
//     padding: "0.5rem",
//     border: "1px solid #4e4f50",
//     borderRadius: "4px",
//   },
//   button: {
//     padding: "0.5rem",
//     backgroundColor: "#647c90",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
// };

// export default LoginPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const acceptedDomains = [
      "@acceptedCorp.com",
      "@student.guc.edu.eg",
      "@guc.edu.eg",
      "@mervat",
    ];
    const isEmailValid = acceptedDomains.some((domain) =>
      email.endsWith(domain)
    );

    if (!isEmailValid) {
      alert("Invalid email domain");
      return;
    }

    // Initialize student profile in sessionStorage
    const initialProfile = {
      name: "...",
      isFirstLogin: true,
      hasProfile: false,
      email: email,
      phone: "",
      gender: "",
      Address: "",
      nationality: "",
      language: "",
      jobInterests: [],
      previousInternships: [],
      partTimeJobs: [],
      collegeActivities: [],
      education: [],
    };
    sessionStorage.setItem("studentProfile", JSON.stringify(initialProfile));

   if (email.endsWith('@student.guc.edu.eg')) {
      navigate('/student', { state: { email } });
    } else if (email.endsWith("mervat")){
      navigate("/facultyMember");
    } else if(email.endsWith('@acceptedCorp.com')){
      navigate('/company', { state: { email } });
    }
    else if (email.endsWith("@guc.edu.eg")) {
     navigate("/staff");
   }
  }




  return (
    <div className="login-container">
      <div className="promo-section">
        <div className="star-icon">✨</div>
        <h1 className="promo-title">
          Salam, this is InternHub! <span role="img" aria-label="hand">👋</span>
        </h1>
        <p className="promo-text">
          A place to access a variety of internships from pharmacy to Computer Science internships. Use InternHub and save tons of time!
        </p>
        <p className="footer-text">© 2025 InternHub. ALL RIGHTS RESERVED.</p>
      </div>
      <div className="login-section">
        <h2 className="welcome-text">Welcome Back to InternHub!</h2>
        <h3 className="login-title">New Company? Click Register Button</h3>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="login-button">
            Login Now
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="secondary-button"
          >
            Register as Company
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;