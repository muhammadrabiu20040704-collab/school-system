import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/logo.jpg";
import {
  FaShieldAlt,
  FaBookOpen
} from "react-icons/fa";

import { BsLightningChargeFill } from "react-icons/bs";
import {
    FaUser,
    FaPhoneAlt,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";

import "../../styles/auth.css";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");
      
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

      toast.error(
    error.response?.data?.message || "Something went wrong"
);

    } finally {
      setLoading(false);
    }
  };
return (
    <div className="auth-page">

<div className="login-container">

    <div className="login-left">

     <div className="school-header">

    <img
        src={logo}
        alt="ZACAS Logo"
        className="school-logo"
    />

    <h2>
        Zamfara College of Arts & Science, Gusau
    </h2>

</div>
        <div className="welcome-text">

            <h1>

                Welcome Back! 👋

            </h1>

            <p>

                Sign in to continue to your School Management System

            </p>

        </div>
           <div className="features">

    <div className="feature">

        <div className="feature-icon">
            <FaShieldAlt />
        </div>

        <div>
            <h4>Secure & Reliable</h4>
            <p>Your data is safe with us.</p>
        </div>

    </div>

    <div className="feature">

        <div className="feature-icon">
            <BsLightningChargeFill />
        </div>

        <div>
            <h4>Easy to Use</h4>
            <p>Simple and intuitive interface.</p>
        </div>

    </div>

    <div className="feature">

        <div className="feature-icon">
            <FaBookOpen />
        </div>

        <div>
            <h4>All-in-One</h4>
            <p>Manage everything in one place.</p>
        </div>

    </div>

</div>
        

        <div className="footer">

            © 2026 Zamfara College of Arts & Science, Gusau

        </div>

    </div>

    <div className="login-right">

        <div className="login-card">

            <h1 className="login-title">

                Sign In

            </h1>

            <p className="login-subtitle">

                Enter your credentials to access your account

            </p>

           <form onSubmit={handleSubmit} className="auth-form">

    {/* Email */}

    <div className="input-group">
        <MdEmail className="input-icon" />

        <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="auth-input"
            value={formData.email}
            onChange={handleChange}
        />
    </div>

    {/* Password */}

    <div className="input-group">

        <FaLock className="input-icon" />

        <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            className="auth-input"
            value={formData.password}
            onChange={handleChange}
        />

        <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
        >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>

    </div>

    {/* Options */}

    <div className="form-options">

        <label>
            <input type="checkbox" />
            Remember me
        </label>

        <Link to="/forgot-password">
            Forgot Password?
        </Link>

    </div>

    {/* Button */}

    <button
        className="auth-button"
        disabled={loading}
    >

        {
            loading ? (
                <>
                    <span className="spinner"></span>
                    Signing In...
                </>
            ) : (
                "Sign In"
            )
        }

    </button>

</form>

            <div className="footer">

                Don't have an account?

                <Link to="/register">

                    Sign Up

                </Link>

            </div>

        </div>

    </div>

</div>
</div>
);
}