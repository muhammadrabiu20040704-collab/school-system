import mongoose from "mongoose";

const academicSessionSchema = new mongoose.Schema(
  {
    session: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    isActive: {
      type: Boolean,
      default: false
    },

    isArchived: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "AcademicSession",
  academicSessionSchema
);