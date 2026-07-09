import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: [
        "Present",
        "Absent",
        "Late",
        "Excused"
      ],
      default: "Present"
    }
  },
  {
    timestamps: true
  }
);

/*
 Prevent duplicate attendance.
 One student can only have one attendance
 record for the same course on the same day.
*/

attendanceSchema.index(
  {
    course: 1,
    student: 1,
    date: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "Attendance",
  attendanceSchema
);