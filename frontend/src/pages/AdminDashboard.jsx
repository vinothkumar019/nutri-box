import React, { useState } from "react";
import axios from "axios";
import "./Admin.css";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    calories: "",
    price: "",
    image: "",
    type: "veg"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/add-item", formData);
      if (res.data.success) {
        alert("✅ Item added successfully!");
        setFormData({ name: "", calories: "", price: "", image: "", type: "Veg" });
      } else {
        alert("Failed to add item!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>🍽️ NutriBox Admin Dashboard</h2>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("adminToken");
            window.location.href = "/admin";
          }}
        >
          Logout
        </button>
      </div>

      <form className="add-item-form" onSubmit={handleAddItem}>
        <h3>Add New Food Item</h3>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={formData.calories}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="veg">Veg 🥕</option>
          <option value="non-veg">Non-Veg 🍗</option>
        </select>

        <button type="submit" className="admin-btn">Add Item</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
