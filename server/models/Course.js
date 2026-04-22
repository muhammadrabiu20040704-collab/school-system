import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },

    // 👇 NEW
    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    // 👇 NEW
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