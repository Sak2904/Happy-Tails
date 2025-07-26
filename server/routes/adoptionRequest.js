import express from "express";
import mongoose from "mongoose";
import Pet from "../models/Pets.js";

const router = express.Router();

// ✅ Updated Schema
const adoptionRequestSchema = new mongoose.Schema({
  petId: { type: String, required: true },
  petName: { type: String, required: true },
  ownername: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },

  // 🔁 Replacing 'reason' with two fields
  commitment: { type: String, enum: ["Yes", "No"], required: true },
  ownedBefore: { type: String, enum: ["Yes", "No"], required: true },

  userId: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
}, { timestamps: true });

const AdoptionRequest = mongoose.models.AdoptionRequest || mongoose.model("AdoptionRequest", adoptionRequestSchema);

// ✅ GET All Requests
router.get("/", async (req, res) => {
  try {
    const requests = await AdoptionRequest.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Error fetching adoption requests" });
  }
});

// ✅ GET User-Specific Requests
router.get("/user/:userId", async (req, res) => {
  try {
    const requests = await AdoptionRequest.find({ userId: req.params.userId });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ PUT: Update Status + Pet Adoption
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedRequest = await AdoptionRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Adoption request not found" });
    }

    if (status === "approved") {
      const petObjectId = new mongoose.Types.ObjectId(updatedRequest.petId);
      await Pet.findByIdAndUpdate(petObjectId, { adopted: true });
    }

    res.status(200).json({
      message: "Adoption request updated",
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      message: "Failed to update request",
      error: error.message,
    });
  }
});

// ✅ POST New Adoption Request
router.post("/", async (req, res) => {
  try {
    const {
      petId,
      petName,
      ownername,
      email,
      phone,
      address,
      commitment,
      ownedBefore,
      userId
    } = req.body;

    if (!petId || !petName || !ownername || !email || !phone || !address || !commitment || !ownedBefore || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRequest = new AdoptionRequest({
      petId,
      petName,
      ownername,
      email,
      phone,
      address,
      commitment,
      ownedBefore,
      userId,
    });

    await newRequest.save();
    res.status(201).json({ message: "Adoption request submitted successfully!" });
  } catch (error) {
    console.error("Error submitting adoption request:", error);
    res.status(500).json({ error: "Failed to submit request.", details: error.message });
  }
});

export default router;

// ✅ PUT to Update Status by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updatedRequest = await AdoptionRequest.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!updatedRequest) {
//       return res.status(404).json({ message: "Adoption request not found" });
//     }

//     res.status(200).json({ message: "Adoption request updated", request: updatedRequest });
//   } catch (error) {
//     console.error("Update error:", error);
//     res.status(500).json({ message: "Failed to update request", error: error.message });
//   }
// });
