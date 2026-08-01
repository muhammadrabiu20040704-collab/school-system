import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    order: {
        type: Number,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
   },
   isArchived: {
        type: Boolean,
        default: false
    }
},

 { timestamps: true }
    
);

export default mongoose.model("Level", levelSchema);
  

