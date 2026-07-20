import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import {
  FaShieldAlt,
  FaBookOpen,
  FaEnvelope
} from "react-icons/fa";

import { BsLightningChargeFill } from "react-icons/bs";
import logo from "../../assets/logo.jpg";


const ForgotPassword = () => {

    const [identifier, setIdentifier] = useState("");
    const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {

    e.preventDefault();

    if (!identifier) {

        return toast.error(
            "Email or Phone Number is required"
        );

    }

    try {

        setLoading(true);

        const res = await axios.post(
            "http://localhost:3000/api/auth/forgot-password",
            {
                identifier
            }
        );

        toast.success(res.data.message);

        setIdentifier("");

    } catch (error) {

        toast.error(

            error.response?.data?.message ||

            "Something went wrong"

        );

    } finally {

        setLoading(false);

    }

};





     return (
         <div className="auth-page">
         <div className="login-container">

             {/* LEFT SIDE */} 

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
        Forgot Password?
    </h1>

    <p>
        Don't worry. Enter your email address or phone number and we'll send you a password reset link.
    </p>

</div>

<div className="features">

    <div className="feature">

        <div className="feature-icon">
            <FaShieldAlt />
        </div>

        <div>
            <h4>Secure Recovery</h4>
            <p>Your account recovery is protected with secure verification.</p>
        </div>

    </div>

    <div className="feature">

        <div className="feature-icon">
            <BsLightningChargeFill />
        </div>

        <div>
            <h4>Fast Reset</h4>
            <p>Receive your password reset link within seconds.</p>
        </div>

    </div>

    <div className="feature">

        <div className="feature-icon">
            <FaBookOpen />
        </div>

        <div>
            <h4>Easy Recovery</h4>
            <p>Reset your password quickly and continue your learning.</p>
        </div>

    </div>

</div>

<div className="footer">

    © 2026 Zamfara College of Arts & Science, Gusau

</div>
                </div> 
                
                {/* RIGHT SIDE */}
                
                 <div className="login-right"> 
                    
                    <div className="login-card"> 
                        
                        
<div className="login-title">

    <h1>Forgot Password</h1>

    <p className="login-subtitle">
        Enter your email address or phone number to receive
        a password reset link.
    </p>

    <form onSubmit={handleSubmit} className="auth-form">

        {/* Input will come here */}

    <div className="input-group">

        <FaEnvelope className="input-icon" />

        <input 
            type="text"
            placeholder="Email or Phone Number"
            className="auth-input"
            value={identifier}
           onChange={(e) =>
    setIdentifier(e.target.value)
}
        />

    </div>

        {/* Button will come here */}

<button
    className="auth-button"
    disabled={loading}
>

    {
        loading ? (

            <>
                <span className="spinner"></span>
                Sending...
            </>

        ) : (

            "Send Reset Link"

        )
    }

</button>

    </form >

    <div className="auth-link">

        <p>
          
            Remember your password?

            <Link to="/login">

                Back to Login

            </Link>

        </p>

    </div>

</div>

                        </div> 
                        </div> 
                        </div>
                        </div> 
                        
                    );
                 };
                 
                 export default ForgotPassword;