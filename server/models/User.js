import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,

    role: {
      type: String,
      enum: ["student", "lecturer", "admin"],
      default: "student"
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department"
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);