// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

export default function Signup() {
  const nav = useNavigate();
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "male",
    heightCm: "",
    weightKg: "",
    goal: "",
    dietType: "veg",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.firstName.trim()) return "First name is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.password || form.password.length < 6) return "Password must be at least 6 characters";
    if (!form.dietType) return "Please select diet preference";
    // optional: check age/height/weight numeric
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        age: form.age ? Number(form.age) : undefined,
        gender: form.gender,
        heightCm: form.heightCm ? Number(form.heightCm) : undefined,
        weightKg: form.weightKg ? Number(form.weightKg) : undefined,
        goal: form.goal,
        dietType: form.dietType,
      };

      const res = await axios.post(`${API_BASE}/auth/signup`, payload);
      // on success store token + user
      if (res?.data?.token) {
        localStorage.setItem("nb_token", res.data.token);
        localStorage.setItem("nb_user", JSON.stringify(res.data.user));
        // navigate to dashboard
        nav("/dashboard");
      } else {
        setError("Unexpected response from server");
      }
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Signup failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account 🥗</h2>

        {error && <div style={{ background: "#ffe6e6", color: "#9b1c1c", padding: "10px", borderRadius: 8, marginBottom: 12 }}>{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="auth-input"
              placeholder="First name"
              required
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="auth-input"
              placeholder="Last name"
            />
          </div>

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="auth-input"
            placeholder="Email address"
            required
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="auth-input"
            placeholder="Password (min 6 chars)"
            required
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input
              name="age"
              type="number"
              min="1"
              value={form.age}
              onChange={handleChange}
              className="auth-input"
              placeholder="Age"
            />
            <select name="gender" value={form.gender} onChange={handleChange} className="select-diet">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input
              name="heightCm"
              type="number"
              min="1"
              value={form.heightCm}
              onChange={handleChange}
              className="auth-input"
              placeholder="Height (cm)"
            />
            <input
              name="weightKg"
              type="number"
              min="1"
              value={form.weightKg}
              onChange={handleChange}
              className="auth-input"
              placeholder="Weight (kg)"
            />
          </div>

          <select name="goal" value={form.goal} onChange={handleChange} className="select-diet">
            <option value="">Select your goal (optional)</option>
            <option value="weight-loss">Weight loss</option>
            <option value="muscle-gain">Muscle gain</option>
            <option value="healthy-lifestyle">Healthy lifestyle</option>
          </select>

          <select name="dietType" value={form.dietType} onChange={handleChange} className="select-diet" required>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-link" style={{ marginTop: 12 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
