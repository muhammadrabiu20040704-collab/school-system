import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    admissionNumber: {
      type: String,
      required: true,
      unique: true
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
    }
  },
  { timestamps: true }
);

export default mongoose.model("StudentProfile", studentProfileSchema);