import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  stack: {
    type: String,
    required: true,
  },
  numOfMembers: {
    type: Number,
    required: true,
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      role: {
        type: String,
        enum: ["Developer", "Designer", "Leader", "Tester"],
        required: true,
      },
    },
  ],
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  course: {
    type: String,
    required: true,
  }
});

export default mongoose.model("project", projectSchema);
