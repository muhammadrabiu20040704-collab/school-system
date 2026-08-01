import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    academicSession:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicSession",
        required: true
    },
    isActive:{
        type: Boolean,
        default: false
    },
    isArchived:{
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
});

export default mongoose.model("Semester", semesterSchema);