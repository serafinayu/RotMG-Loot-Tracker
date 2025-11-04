import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collection", // Name of your Collection model
      },
    ],
  },
  { timestamps: true, minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
