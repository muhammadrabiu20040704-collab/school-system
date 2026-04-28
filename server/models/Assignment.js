import mongoose from "mongoose";

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

    deadline: Date
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", assignmentSchema);