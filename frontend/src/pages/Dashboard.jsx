import React, { useState, useEffect, useMemo } from "react";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [preference, setPreference] = useState("all");

  // ✅ Fetch items from backend (filtered)
  const fetchItems = async (pref = "all") => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/items?type=${pref.toLowerCase()}`
      );
      setItems(res.data);
    } catch (err) {
      console.error("❌ Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems(preference);
  }, [preference]);

  const handleSelect = (item) => {
    if (!selectedItems.some((i) => i._id === item._id)) {
      setSelectedItems([...selectedItems, item]);
      setTotal(total + item.price);
    }
  };

  const handleRemove = (item) => {
    const newSelection = selectedItems.filter((i) => i._id !== item._id);
    setSelectedItems(newSelection);
    setTotal(total - item.price);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleCheckout = () => {
    alert("✅ Checked out successfully!");
    setSelectedItems([]);
    setTotal(0);
  };

  return (
    <div className="dashboard-container">
      <div className="navbar">
        <h2 className="logo">NutriBox</h2>
        <div className="nav-actions">
          <span className="nav-icon">🛒</span>
          <span className="nav-icon">👤</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="header-section">
        <h2 className="greeting">Good Morning! 👋</h2>
        <p className="fuel-text">Ready to fuel your day with nutrition?</p>

        {/* --- Dropdown Menu for Preference --- */}
        <div className="preference-selector">
          <label htmlFor="preference-select">Select your Meal Preference:</label>
          <select
            id="preference-select"
            value={preference}
            onChange={(e) => {
              const newPref = e.target.value;
              setPreference(newPref);
              setSelectedItems([]);
              setTotal(0);
              fetchItems(newPref);
            }}
            className="preference-dropdown"
          >
            <option value="veg">Vegetarian 🥕</option>
            <option value="non-veg">Non-Vegetarian 🍗</option>
            <option value="all">Show All</option>
          </select>
        </div>
      </div>

      <p className="choose-text">Available Items ({items.length})</p>

      <div className="menu-grid">
        {items.map((item) => (
          <div key={item._id} className="menu-item">
            <h3 className="item-name">
              {item.image} {item.name}
            </h3>
            <p className="item-details">
              {item.calories ? `${item.calories} cal` : `₹${item.price}`}
            </p>
            {selectedItems.some((i) => i._id === item._id) ? (
              <button className="remove-btn" onClick={() => handleRemove(item)}>
                Remove
              </button>
            ) : (
              <button className="add-btn" onClick={() => handleSelect(item)}>
                Add
              </button>
            )}
          </div>
        ))}
      </div>

      {/* --- Bottom Summary Section --- */}
      <div className="summary-metrics-section">
        <div className="metric-box">
          <span className="metric-icon">📈</span>
          <p className="metric-label">Total Calories</p>
          <p className="metric-value">
            {selectedItems.reduce((sum, item) => sum + (item.calories || 0), 0)}
          </p>
        </div>
        <div className="metric-box">
          <span className="metric-icon">📦</span>
          <p className="metric-label">Items Today</p>
          <p className="metric-value">{selectedItems.length}</p>
        </div>
        <div className="metric-box">
          <span className="metric-icon">🔥</span>
          <p className="metric-label">Streak Days</p>
          <p className="metric-value">7</p>
        </div>
      </div>

      {/* --- Cart Section --- */}
      <div className="selection-box">
        <h3>Your Selection</h3>
        {selectedItems.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <ul>
            {selectedItems.map((item) => (
              <li key={item._id}>
                {item.name} - {item.calories} cal (₹{item.price})
              </li>
            ))}
          </ul>
        )}
        <div className="total-box">
          <strong>Total Cost:</strong> ₹{total.toFixed(2)}
        </div>
        <button
          className="checkout-btn"
          disabled={selectedItems.length === 0}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
