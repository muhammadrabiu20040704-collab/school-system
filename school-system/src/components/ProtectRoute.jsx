import { Navigate } from "react-router-dom";

export  default function ProtectRoute({ 
    children,
     allowedRoles
     }) {

        // get token
        const token =  localStorage.getItem("token");

        // get user
        const user = JSON.parse(localStorage.getItem("user"));
       //if not logged in or no user info
        if (!token || !user) {
            return <Navigate to="/login" />;
        }
           //check if user role is allowed
        if (!allowedRoles.includes(user.role)) {
            return <Navigate to="/unauthorized" />;
        }

        return children;
    }