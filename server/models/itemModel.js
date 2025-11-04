import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  imgUrl: { type: String, required: true },
  tier: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
});

const itemModel = mongoose.models.item || mongoose.model("item", itemSchema);

export default itemModel;
