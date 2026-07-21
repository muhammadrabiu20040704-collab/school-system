import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
    FaLock,
    FaEye,
    FaEyeSlash,
    FaShieldAlt,
    FaBookOpen
} from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import logo from "../../assets/logo.jpg";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {

const navigate = useNavigate();   

const [password, setPassword] = useState("");

const [confirmPassword, setConfirmPassword] = useState("");

const [showPassword, setShowPassword] = useState(false);

const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [loading, setLoading] = useState(false);

const { token } = useParams();

const handleSubmit = async (e) => {

        e.preventDefault();

if(!password) {
    return toast.error("Password is required");
}
if(!confirmPassword) {
    return toast.error("Confirm password is required");
}
if(password !== confirmPassword) {
    return toast.error("passwords do not match");
}
if(password.length < 6 ) {
    return toast.error("password must be at least 6 characters");
}

try {
    
    setLoading(true);

    const res = await axios.put(
      `http://localhost:3000/api/auth/reset-password/${token}`,
      {
        password
      }
    );

    toast.success(res.data.message);

   navigate("/login");

} catch (error) {

    toast.error(

        error.response?.data?.message ||

        "Something went wrong"

    );

}finally{ 
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
            <h1>Reset Your Password 🔐</h1>
            <p>
                Create a strong new password to secure your account and continue using the School Management System.
            </p>
        </div>

        <div className="feature">

            <div className="feature-icon">
                <FaShieldAlt />
            </div>

            <div>
                <h4>Secure Password</h4>
                <p>
                    Choose a strong password to keep your account protected.
                </p>
            </div>
        </div>

        <div className="feature">
          
          <div className="feature-icon">
            <BsLightningChargeFill/>
          </div>

          <div>

          <h4> Quick Access</h4>
          <p>
            Reset your password and regain access within seconds
          </p>
          </div>
        </div>

        <div className="feature">

    <div className="feature-icon">
        <FaBookOpen />
    </div>

    <div>

        <h4>Continue Learning</h4>

        <p>
            Get back to your courses and academic activities without delay.
        </p>

    </div>

</div>

<div className="footer">

    © 2026 Zamfara College of Arts & Science, Gusau

   </div>
</div>
   <div className="login-right">
  
<div className="login-card">

    <div className="login-title">

        <h1>Reset Password</h1>

        <p className="login-subtitle">
            Create a new password for your account.
        </p>

    </div>

    <form onSubmit={handleSubmit} className="auth-form">

          <div className="input-group">

    <FaLock className="input-icon" />

    <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="New Password"
        className="auth-input"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
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
        placeholder="Confirm New Password"
        className="auth-input"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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

          {/* Button will come here */}

<button
     type="submit"
    className="auth-button"
    disabled={loading}
>

    {
        loading ? (

            <>
                <span className="spinner"></span>
                Resetting...
            </>

        ) : (

            "Reset Password"

        )
    }

</button>

    </form>

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
    );
};

export default ResetPassword;