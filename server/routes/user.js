import express from "express";
import User from "../models/user.js"; // ✅ Import the User model

const router = express.Router();

// ✅ Check if the user exists before login
router.post("/check", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
  console.error("❌ Registration Error:", error); // ✅ Add this line
  res.status(500).json({ message: "Server error", error: error.message }); // ✅ Send proper message
}
});

// ✅ User Registration Route (Added)
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Save password as plain text (not hashed)
    const newUser = new User({ name, email, phone, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


export default router;
