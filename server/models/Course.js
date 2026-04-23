import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: String,
    code: String,

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department"
    },

    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);