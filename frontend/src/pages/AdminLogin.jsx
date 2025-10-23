import React, { useState } from "react";
import axios from "axios";
import "./Admin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", { email, password });
      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        window.location.href = "/admin/dashboard";
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Login</h2>
      <form onSubmit={handleLogin} className="admin-form">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="admin-btn">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
