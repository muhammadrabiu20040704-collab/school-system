import jwt from "jsonwebtoken";
import User from "../models/User.js";
// PROTECT ROUTES
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    
    req.headers.authorization.startsWith("Bearer")
  ) {

    console.log("Authorization header found:", req.headers.authorization);
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("TOKEN:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("DECODED:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      console.log("USER:", req.user);

      next();

    } catch (error) {
      console.log("ERROR:", error.message);
      return res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }
};
// AUTHORIZE ROLES
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user.role}) not allowed`
      });
    }
    next();
  };
};
// ADMIN ONLY
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin only access" });
  }
};