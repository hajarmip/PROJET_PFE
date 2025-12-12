 import React, { useState } from "react";
import { Link } from "react-router-dom"; 
export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // SEND CODE
  const sendCode = async () => {
    if (!email) return alert("Enter your email first!");

    const res = await fetch("http://localhost:5000/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    alert(data.message);
  };

  // VERIFY CODE
  const verifyCode = async () => {
    const res = await fetch("http://localhost:5000/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code: emailCode }),
    });

    const data = await res.json();
    if (data.success) {
      setIsVerified(true);
      alert("Email verified!");
    } else {
      alert("Wrong verification code!");
    }
  };

  // REGISTER
  const registerUser = async () => {
    if (!isVerified) return alert("Verify your email first!");
    if (password !== confirmPassword) return alert("Passwords do not match!");

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="register-container">
      <h2 className="title">Register</h2>

      <div className="form-box">
        
        <input type="text" placeholder="Full Name" className="input-field"
          onChange={(e) => setFullName(e.target.value)} />

        <div className="email-row">
          <input type="email" placeholder="Email" className="input-field"
            onChange={(e) => setEmail(e.target.value)} />
          <button className="verify-btn" onClick={sendCode}>Send Code</button>
        </div>

        <div className="verify-row">
          <input type="text" placeholder="Code" className="input-field"
            onChange={(e) => setEmailCode(e.target.value)} />
          <button className="verify-btn" onClick={verifyCode}>Verify</button>
        </div>

        <input type="password" placeholder="Password" className="input-field"
          onChange={(e) => setPassword(e.target.value)} />

        <input type="password" placeholder="Confirm Password" className="input-field"
          onChange={(e) => setConfirmPassword(e.target.value)} />

        <button className="register-btn" onClick={registerUser}>REGISTER</button>
         
        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
