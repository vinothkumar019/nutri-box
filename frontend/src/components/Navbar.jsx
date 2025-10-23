// src/components/Navbar.jsx
import React from 'react';

export default function Navbar({ user }) {
  return (
    <div className="nav">
      <div className="nav-left">
        <div className="logo">NutriBox</div>
      </div>
      <div className="nav-right">
        <div className="greet">Good Morning, {user?.firstName || 'Friend'} 👋</div>
      </div>
    </div>
  );
}
