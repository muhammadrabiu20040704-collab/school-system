import User from "../models/User.js";
import Course from "../models/Course.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const students = await User.countDocuments({ role: "student" });
    const lecturers = await User.countDocuments({ role: "lecturer" });
    const courses = await Course.countDocuments();

    res.json({
      students,
      lecturers,
      courses
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};