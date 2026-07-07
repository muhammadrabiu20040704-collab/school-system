import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

// =======================================
// GET AVAILABLE COURSES FOR STUDENT
// =======================================

import StudentProfile from "../models/StudentProfile.js";

export const getAvailableCourses = async (req, res) => {

  try {

    const profile = await StudentProfile.findOne({

      user: req.user.id

    });

    if (!profile) {

      return res.status(404).json({

        message: "Student profile not found"

      });

    }

    const courses = await Course.find({

      department: profile.department

    })

    .populate("department", "name code")

    .populate("lecturer", "name email");

    res.json(courses);

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

// =======================================
// GET MY COURSES
// =======================================

export const getMyCourses = async (req, res) => {

  try {

    const enrollments = await Enrollment.find({

      student: req.user.id

    })

    .populate({

      path: "course",

      populate: [

        {

          path: "department",

          select: "name code"

        },

        {

          path: "lecturer",

          select: "name email"

        }

      ]

    });

    res.json(enrollments);

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};