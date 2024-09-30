import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "University name is required"]
    },
    courses: [
        {
            type: String,            
        }
    ]
})

export default mongoose.model("university", universitySchema);