const mongoose = require("mongoose");

const AdoptionRequestSchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pets",
    required: true,
  },
  petName: { type: String, required: true },
  userName: { type: String, required: true },
  petImage: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },

  // ✅ Replacing "reason" with two new fields
  commitment: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
  ownedBefore: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdoptionRequest", AdoptionRequestSchema);
