import mongoose from "mongoose";

const lecturerProfileSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  departments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department"
    }
  ],

  staffId: {
    type: String,
    required: true
  }

});

export default mongoose.model(
  "LecturerProfile",
  lecturerProfileSchema
);