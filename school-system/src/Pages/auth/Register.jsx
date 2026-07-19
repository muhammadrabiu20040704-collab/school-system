import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/logo.jpg";
import {
  FaShieldAlt,
  FaBookOpen,
  FaUserGraduate
} from "react-icons/fa";
import {
    FaUser,
    FaPhoneAlt,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";

import { BsLightningChargeFill } from "react-icons/bs";

import "../../styles/auth.css";

export default function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({

    name: "",

    email: "",

    phone: "",

    password: "",

    confirmPassword: ""

});

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.name.trim()) {

    return toast.error("Full Name is required");

}

if (!formData.email.trim()) {

    return toast.error("Email is required");

}

if (!formData.phone.trim()) {

    return toast.error("Phone Number is required");

}

if (!formData.password) {

    return toast.error("Password is required");

}

if (!formData.confirmPassword) {

    return toast.error("Confirm Password is required");

}

if (formData.password.length < 6) {

    return toast.error(

        "Password must be at least 6 characters"

    );

}

if (formData.password !== formData.confirmPassword) {

    return toast.error(

        "Passwords do not match"

    );

}

        setLoading(true);

        try {
const { confirmPassword, ...userData } = formData;

await axios.post(

    "http://localhost:3000/api/auth/register",

    userData

);
           toast.success("Registration successful");

setTimeout(() => {

    navigate("/login");

}, 1500);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Registration failed"

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

                        Create Account 🎓

                    </h1>

                    <p>

                        Register to access the School Management System

                    </p>

                </div>

                <div className="features">

    <div className="feature">

        <div className="feature-icon">
            <FaShieldAlt />
        </div>

        <div>

            <h4>Secure Account</h4>

            <p>Your information is protected.</p>

        </div>

    </div>

    <div className="feature">

        <div className="feature-icon">
            <FaBookOpen />
        </div>

        <div>

            <h4>Student Portal</h4>

            <p>Access courses and attendance.</p>

        </div>

    </div>

    <div className="feature">

        <div className="feature-icon">
            <BsLightningChargeFill />
        </div>

        <div>

            <h4>Fast Registration</h4>

            <p>Create your account in seconds.</p>

        </div>

    </div>

</div>

                <div className="footer">

                    © 2026 Zamfara College of Arts & Science

                </div>

            </div>

            <div className="login-right-R">

                <div className="login-card">

                    <h1 className="login-title">

                        Register

                    </h1>

                    <p className="login-subtitle">

                        Create your account to access the School Management 


                    </p>

                    <form onSubmit={handleSubmit} className="form-group">
                           <div className="auth-form"></div>
                         
                            <div className="input-group">

    <FaUser className="input-icon" />

    <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="auth-input-R"
        value={formData.name}
        onChange={handleChange}
    />

</div>

                     <div className="input-group">

    <MdEmail className="input-icon" />

    <input
        type="email"
        name="email"
        placeholder="Email Address"
        className="auth-input-R"
        value={formData.email}
        onChange={handleChange}
    />

</div>

 <div className="input-group">

    <FaPhoneAlt className="input-icon" />

    <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        className="auth-input-R"
        value={formData.phone}
        onChange={handleChange}
    />

</div>

                 <div className="input-group">

    <FaLock className="input-icon" />

    <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        className="auth-input-R"
        value={formData.password}
        onChange={handleChange}
    />

    <button
        type="button"
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
    >

        {
            showPassword
                ? <FaEyeSlash />
                : <FaEye />
        }

    </button>

</div>

   <div className="input-group">

    <FaLock className="input-icon" />

    <input
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        placeholder="Confirm Password"
        className="auth-input-R"
        value={formData.confirmPassword}
        onChange={handleChange}
    />

    <button
        type="button"
        className="password-toggle"
        onClick={() =>
            setShowConfirmPassword(!showConfirmPassword)
        }
    >

        {
            showConfirmPassword
                ? <FaEyeSlash />
                : <FaEye />
        }

    </button>

</div>

                        <button

                            className="auth-button-R"

                            disabled={loading}

                        >

                            {

                                loading ? (

                                    <>

                                        <span className="spinner"></span>

                                        Registering...

                                    </>

                                ) : (

                                    "Register"

                                )

                            }

                        </button>

                    </form>

                    <div className="footer">

                        Already have an account?

                        <Link to="/login">

                            Login

                        </Link>

                    </div>

                </div>

            </div>

        </div>
        </div>

    );

}

