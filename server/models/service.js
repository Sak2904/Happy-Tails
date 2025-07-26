import { Schema, model } from "mongoose";

const ServiceSchema = new Schema({
  type: String,
  name: String,
  address: String,
  contact: String,
  price: Number, // ✅ Add this
});

export default model("Service", ServiceSchema);
