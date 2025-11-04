import mongoose from "mongoose";

const obtainedItemSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const collectionSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    obtainedItems: {
      type: Map,
      of: obtainedItemSchema,
    },
  },
  { timestamps: true, minimize: false } // timestamps: true enables createdAt and updatedAt fields
);

const collectionModel =
  mongoose.models.collection || mongoose.model("collection", collectionSchema);

export default collectionModel;
