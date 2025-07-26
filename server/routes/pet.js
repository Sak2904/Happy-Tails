import express from "express";
import Pet from "../models/Pets.js";

const router = express.Router();

// Add a Pet (Admin or User)
// Add a Pet (Admin or User)
router.post("/", async (req, res) => {
  try {
    const { name, age, breed, type, gender, image, userId } = req.body;

    if (!name || !age || !breed || !type || !gender || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Only add `addedBy` if userId is a valid 24-char ObjectId
    const newPetData = {
      name,
      age,
      breed,
      type,
      gender,
      image,
      adopted: false
    };

    if (userId && /^[0-9a-fA-F]{24}$/.test(userId)) {
      newPetData.addedBy = userId;
    }

    const newPet = new Pet(newPetData);
    await newPet.save();

    res.status(201).json(newPet);
  } catch (err) {
    console.error("Error saving pet:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



// Get All Pets (For Users & Admins)
router.get("/", async (req, res) => {
  try {
    // const pets = await Pet.find();
    const pets = await Pet.find({ adopted: false }); // ✅ Only show pets not adopted
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pets" });
  }
});

// Delete a Pet
router.delete("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    console.error("Error deleting pet:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;