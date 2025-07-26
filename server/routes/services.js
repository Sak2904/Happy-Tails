import express from "express";
const router = express.Router();
import Service from "../models/service.js";

// Add a Service (Admin Only)
router.post("/", async (req, res) => {
  try {
    const { type, name, address, contact, price } = req.body;

    // Debug logs to verify incoming values
    console.log("Received fields:", { type, name, address, contact, price });

    // Check for missing fields
    if (!type || !name || !address || !contact || price === undefined || price === "") {
      return res.status(400).json({ message: "All fields including price are required" });
    }

    // Validate price value
    if (isNaN(price) || Number(price) < 0) {
      return res.status(400).json({ message: "Price must be a valid positive number" });
    }

    const newService = new Service({
      type,
      name,
      address,
      contact,
      price: Number(price)  // Ensure price is a number
    });

    await newService.save();

    console.log("Service added successfully:", newService);
    res.status(201).json(newService);
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


// Get All Services (For Users & Admins)
router.get("/", async (req, res) => {
    try {
        const { type } = req.query;
        const query = type ? { type: { $regex: new RegExp(type, "i") } } : {}; // Case-insensitive search
        const services = await Service.find(query);
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: "Error fetching services" });
    }
});


export default router;
