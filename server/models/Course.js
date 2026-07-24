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
    
    level: {
  type: String,
  enum: [
    "ND1",
    "ND2",
    "HND1",
    "HND2"
  ],
  required: true
},

semester: {
      type: String,
      enum: ["First", "Second"],
      required: true
    },

    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

    
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);