import User from "../models/User.js";

// GET DASHBOARD
export const getDashboard = async (req, res) => {
  try {
    // 📊 STATS
    const students = await User.countDocuments({ role: "student" });
    const lecturers = await User.countDocuments({ role: "lecturer" });
    const admins = await User.countDocuments({ role: "admin" });

    // 📈 STUDENT MONTHLY CHART
    const studentStats = await User.aggregate([
      { $match: { role: "student" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // 🗓️ MONTH NAMES
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const chartData = studentStats.map(item => ({
      month: months[item._id - 1],
      students: item.total
    }));

    // 📤 RESPONSE
    res.json({
      stats: {
        students,
        lecturers,
        admins
      },
      chartData
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};