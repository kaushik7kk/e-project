import mongoose, { Schema } from "mongoose";

const folderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
});

export default mongoose.model("folder", folderSchema);
