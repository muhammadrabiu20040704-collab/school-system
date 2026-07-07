import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/auth.css";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      
      if (res.data.user.role === "admin") {
      navigate("/admin-dashboard");
    }

    else if (res.data.user.role === "lecturer") {
      navigate("/lecturer-dashboard");
    }

    else if (res.data.user.role === "student") {
      navigate("/student-dashboard");
    }

    } catch (error) {

      alert(error.response?.data?.message || "Error");

    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1 className="auth-title">
          Login
        </h1>

        <form onSubmit={handleSubmit}>

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
            Login
          </button>

        </form>

        <div className="auth-link">
          Don’t have an account?
          <Link to="/register"> Register</Link>
        </div>

      </div>

    </div>
  );
}