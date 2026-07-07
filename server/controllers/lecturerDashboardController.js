import User from "../models/User.js";
import LecturerProfile from "../models/LecturerProfile.js";
import Course from "../models/Course.js";
import Assignment from "../models/Assignment.js";
import StudentProfile from "../models/StudentProfile.js";

export const getLecturerDashboard = async (req, res) => {
  try {

    // Logged-in lecturer
    const lecturer = await User.findById(req.user.id)
      .select("-password");

    if (!lecturer) {
      return res.status(404).json({
        message: "Lecturer not found"
      });
    }

    // Lecturer profile
    const profile = await LecturerProfile.findOne({
      user: req.user.id
    }).populate(
      "departments",
      "name code"
    );

    // Lecturer courses
    const courses = await Course.find({
      lecturer: req.user.id
    })
      .populate("department", "name code")
      .populate("students", "_id");

    // Lecturer assignments
    const assignments = await Assignment.find({
      lecturer: req.user.id
    })
      .populate("course", "title code")
      .sort({ createdAt: -1 });

    // ==========================
    // STATISTICS
    // ==========================

    const totalDepartments =
      profile?.departments?.length || 0;

    const totalCourses =
      courses.length;

    const totalAssignments =
      assignments.length;

    // ==========================
    // STUDENTS PER DEPARTMENT
    // ==========================

   const departmentMap = {};

for (const course of courses) {

  const deptId = course.department._id.toString();

  if (!departmentMap[deptId]) {

    // Kirga students na wannan department sau ɗaya kacal
    const totalStudents = await StudentProfile.countDocuments({

      department: deptId

    });

    departmentMap[deptId] = {

      department: course.department,

      totalCourses: 0,

      totalStudents

    };

  }

  // Kirga courses na lecturer a wannan department
  departmentMap[deptId].totalCourses++;

}

const departmentStats = Object.values(departmentMap);

    // ==========================
    // RESPONSE
    // ==========================

    res.json({

      lecturer,

      stats: {

        totalDepartments,

        totalCourses,

        totalAssignments

      },

      departmentStats,

      recentAssignments:
        assignments.slice(0, 3)

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};