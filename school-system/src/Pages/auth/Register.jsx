import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/auth.css";
 
export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );

      alert("Register successful");

      navigate("/login");

    } catch (error) {

      alert(error.response?.data?.message || "Error");

    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1 className="auth-title">
          Register
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter your FullName"
            className="auth-input"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="you@gmail.com"
            className="auth-input"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="*********"
            className="auth-input"
            onChange={handleChange}
          />

          <button className="auth-button">
            Register
          </button>

        </form>

        <div className="auth-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </div>

      </div>

    </div>
  );
}