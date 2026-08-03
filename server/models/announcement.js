import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
        trim: true
    },
    targetType: {
    type: String,
    enum: [
        "school",
        "students",
        "lecturers",
        "department",
        "level",
        "year"
    ],
    default: "school"
},
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null
    },
    level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Level",
        default: null
    },
    year: {
        type: Number,
        default: null
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
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

export default mongoose.model("Announcement", announcementSchema);