import mongoose from "mongoose";
// Course model
const courseSchema = new mongoose.Schema(
  {
    title: String,
    code: String,

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department"
    },
    
  createdAd: {
    type: Date,
    default: Date.now
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