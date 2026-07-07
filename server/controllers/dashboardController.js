import User from "../models/User.js";
import Assignment from "../models/Assignment.js";
import Course from "../models/Course.js";
import Department from "../models/Department.js"
import StudentProfile from "../models/StudentProfile.js";

// GET DASHBOARD
export const getDashboard = async (req, res) => {
  try {
    // 📊 STATS
    const students = await User.countDocuments({ role: "student" });
    const lecturers = await User.countDocuments({ role: "lecturer" });
    const admins = await User.countDocuments({ role: "admin" });
    const departments = await Department.countDocuments();
    const courses = await Course.countDocuments();
    const assignments = await Assignment.countDocuments();
          
    //recent students
    const recentStudents = await StudentProfile.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email")
      .populate("department", "name");

      //students per departments
    const departmentStats = await StudentProfile.aggregate([
      {
        $group: {
          _id: "$department",
          totalStudents: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "departments",
          localField: "_id",
          foreignField: "_id",
          as: "departmentInfo"
        }
      },
      { $unwind: "$departmentInfo" },
      {
        $project: {
          _id: 0,
          department: "$departmentInfo.name",
          totalStudents: 1
        }
      },
      { $sort: { totalStudents: -1 } }
    ]);

    // 📤 RESPONSE
    res.json({
      stats: {
        students,
        lecturers,
        admins,
        departments,
        courses,
        assignments
      },
      recentStudents,
      departmentStats
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};