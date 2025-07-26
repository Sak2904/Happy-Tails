import { Schema, model } from "mongoose";

const PetSchema = new Schema({
  name: String,
  age: Number,
  breed: String,
  type: { type: String, enum: ["Dog", "Cat"] },
  gender: { type: String, enum: ["Male", "Female"], required: true }, // ✅ NEW FIELD
  image: String,
  addedBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
  adopted: { type: Boolean, default: false }, 
});

export default model("Pet", PetSchema);