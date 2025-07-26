import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// 🔹 Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Create new user (no password hashing here)
    const newUser = new User({
      name,
      email,
      phone,
      password, // Stored as plain text
      role: "user", // default
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Login Route (Separate Admin Check)
router.post("/login", async (req, res) => {
  try {
    console.log("Login API Hit!");  // ✅ Add this for debugging
    console.log("Received Login Request:", req.body); 

    const { email, password } = req.body;

    // ✅ Hardcoded Admin Check
    if (email === "admin@gmail.com" && password === "Admin@123") {
      console.log("Admin logged in"); // ✅ Debugging
      const token = jwt.sign(
        { id: "admin123", role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token, user: { email, role: "admin" } });
    }

    // ✅ Normal User Check
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found!"); // ✅ Debugging
      return res.status(401).json({ message: "User not found!" });
    }

    if (user.password !== password) {
      console.log("Invalid password!"); // ✅ Debugging
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Login error:", err); // ✅ Log actual error
    res.status(500).json({ error: err.message });
  }
});

export default router;
