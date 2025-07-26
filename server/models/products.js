import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  type: { type: String, required: true }
});

export default mongoose.model("Product", ProductSchema);
