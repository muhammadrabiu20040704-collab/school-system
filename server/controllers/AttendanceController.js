import Attendance from "../models/Attendance.js";
import Course from "../models/Course.js";
import StudentProfile from "../models/StudentProfile.js";

export const takeAttendance = async (req, res) => {

    try {

        const { courseId, date, attendance } = req.body;

        // Check course
        const course = await Course.findOne({

            _id: courseId,

            lecturer: req.user.id

        });

        if (!course) {

            return res.status(404).json({

                message: "Course not found"

            });

        }

        // Check duplicate attendance
        const existing = await Attendance.findOne({

            course: courseId,

            date: new Date(date)

        });

        if (existing) {

            return res.status(400).json({

                message: "Attendance for this date already exists"

            });

        }

        // Prepare records
        const records = attendance.map((item) => ({

            course: courseId,

            lecturer: req.user.id,

            student: item.student,

            date: new Date(date),

            status: item.status

        }));

        await Attendance.insertMany(records);

        res.status(201).json({

            message: "Attendance saved successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};
// ==============================
// GET ATTENDANCE HISTORY
// ==============================
export const getAttendanceHistory = async (req, res) => {
    try {

        const { courseId } = req.params;

        // Check course ownership
        const course = await Course.findOne({
            _id: courseId,
            lecturer: req.user.id
        });

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const history = await Attendance.aggregate([
            {
                $match: {
                    course: course._id
                }
            },
            {
                $group: {
                    _id: "$date",

                    totalStudents: {
                        $sum: 1
                    },

                    present: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "Present"] },
                                1,
                                0
                            ]
                        }
                    },

                    absent: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "Absent"] },
                                1,
                                0
                            ]
                        }
                    },

                    late: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "Late"] },
                                1,
                                0
                            ]
                        }
                    },

                    excused: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "Excused"] },
                                1,
                                0
                            ]
                        }
                    }

                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ]);

        res.json(history);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
};
//==============================
// GET ATTENDANCE BY DATE
//==============================
export const getAttendanceByDate = async (req, res) => {

    try {

        const { courseId, date } = req.params;

        // Check course ownership
        const course = await Course.findOne({
            _id: courseId,
            lecturer: req.user.id
        });

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

       // Get attendance records
const records = await Attendance.find({

    course: course._id,

    date: new Date(date)

})
.populate("student", "name")
.sort({ createdAt: 1 });

// Add student profile
const attendanceWithProfile = await Promise.all(

    records.map(async (record) => {

        const profile = await StudentProfile
            .findOne({
                user: record.student._id
            })
            .populate("department", "name code");

        return {

            _id: record._id,

            course: record.course,

            lecturer: record.lecturer,

            date: record.date,

            status: record.status,

            student: record.student,

            profile: {

                admissionNumber: profile?.admissionNumber,

                level: profile?.level,

                semester: profile?.semester,

                department: profile?.department

            }

        };

    })

);

res.json(attendanceWithProfile);
        res.json(attendanceWithProfile);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};


//==============================
// UPDATE ATTENDANCE
//==============================
export const updateAttendance = async (req, res) => {

    try {

        const { id } = req.params;

        const { status } = req.body;

        // Check attendance ownership
        const attendance = await Attendance.findOne({

            _id: id,

            lecturer: req.user.id

        });

        if (!attendance) {

            return res.status(404).json({

                message: "Attendance not found"

            });

        }

        attendance.status = status;

        await attendance.save();

        res.json({

            message: "Attendance updated successfully",

            attendance

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};