import mongoose from "mongoose";
// Assignment model
const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },

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

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true
    },

    level: {
      type: String,
      enum: ["ND1", "ND2", "HND1", "HND2"],
      required: true
    },

    semester: {
      type: String,
      enum: ["First", "Second"],
      required: true
    },

    deadline: Date,

    assignedStudents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", assignmentSchema);