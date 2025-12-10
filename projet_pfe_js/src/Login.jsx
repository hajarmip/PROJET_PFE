 import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [customCode, setCustomCode] = useState("");

  const sendCode = async () => {
    await fetch("http://localhost:5000/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    alert("Verification code sent!");
  };

  const verifyCode = async () => {
    const res = await fetch("http://localhost:5000/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();

    if (data.success) {
      setIsVerified(true);
      alert("Email verified!");
    } else {
      alert("Wrong code");
    }
  };

  const saveCustomCode = async () => {
    const res = await fetch("http://localhost:5000/save-custom-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, customCode }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Your code has been saved! You can now login with it.");
    } else {
      alert("This code is already taken!");
    }
  };

  return (
    <div className="register-container">

      <h2 className="title">Register page</h2>

      <p className="login-link">
        Already have an account? <a href="/login">Log in</a>
      </p>

      <div className="form-box">

        <div className="full-name">
          <input type="text" placeholder="Full name" className="input-field" />
        </div>

        <div className="email-row">
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="verify-row">
          <input
            type="text"
            placeholder="Email code"
            className="input-field"
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="verify-btn" onClick={verifyCode}>
            Verify
          </button>
        </div>

        <div className="personal-code-row">
          <input
            type="text"
            placeholder="Login code"
            className="input-field"
            onChange={(e) => setCustomCode(e.target.value)}
          />
        </div>

        <div className="personal-code-row">
          <input
            type="text"
            placeholder="Confirmation code"
            className="input-field"
          />
        </div>

        <button className="register-btn" onClick={saveCustomCode}>
          REGISTER
        </button>

      </div>
       </div> );
 
       

    
  
}
