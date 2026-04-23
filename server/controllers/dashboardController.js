import User from "../models/User.js";
import Course from "../models/Course.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const students = await User.countDocuments({ role: "student" });
    const lecturers = await User.countDocuments({ role: "lecturer" });
    const courses = await Course.countDocuments();

    const recentStudents = await User.find({ role: "student" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email createdAt");

    const recentCourses = await Course.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title code createdAt");

    res.json({
      stats: {
        students,
        lecturers,
        courses
      },
      recentStudents,
      recentCourses
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};