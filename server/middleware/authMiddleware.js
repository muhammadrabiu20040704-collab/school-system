import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log("Authorization header:", req.headers.authorization);

      token = req.headers.authorization
        .replace("Bearer", "")
        .trim();

      console.log("TOKEN:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("DECODED:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          message: "User not found"
        });
      }

      console.log("USER:", req.user);

      next();

    } catch (error) {
      console.log("ERROR:", error.message);

      return res.status(401).json({
        message: "Not authorized"
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No token"
    });
  }
};

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

export const adminOnly = (req, res, next) => {
  console.log("ADMIN CHECK:", req.user);

  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Admin only access"
    });
  }
};