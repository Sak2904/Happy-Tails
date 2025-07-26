import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.mjs"; 
import petRoutes from "./routes/pet.js";
import serviceRoutes from "./routes/services.js";
import productRoutes from "./routes/products.js";
import adoptionRequestRoutes from "./routes/adoptionRequest.js";
import userRoutes from "./routes/user.js";
import User from "./models/user.js";
import authRoutes from "./routes/auth.js";  
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config(); // Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(cors({ 
  origin: "*", // ⛔️ You can restrict later, for now allow all
  // origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5001"], // ✅ include this
  methods: ["GET", "POST", "PUT", "DELETE"],
  // credentials: true
  allowedHeaders: ["Content-Type", "Authorization"],

}));
app.options("*", cors()); // ✅ Handles preflight requests


// ✅ Connect to MongoDB
connectDB();

// ✅ Import Models
const { Schema, model } = mongoose;

// 🐶 Pet Schema
const PetSchema = new Schema({
  name: { type: String, required: true }, 
  age: Number,
  breed: String,
  type: String,
  image: String,
});
const Pet = mongoose.models.Pet || model("Pet", PetSchema);

// 🏥 Service Schema
const ServiceSchema = new Schema({
  type: String,
  name: String,
  address: String,
  contact: String,
});
const Service = mongoose.models.Service || model("Service", ServiceSchema);

// 🛍️ Product Schema
const ProductSchema = new Schema({
  type: String,
  name: String,
  image: String,
  price: Number,
});
const Product = mongoose.models.Product || model("Product", ProductSchema);

// 🏠 Adoption Request Schema
const AdoptionRequestSchema = new Schema({
  petId: String,
  petName: String,
  ownername: String,
  email: String,
  phone: String,
  address: String,
  reason: String,
});
const AdoptionRequest = mongoose.models.AdoptionRequest || model("AdoptionRequest", AdoptionRequestSchema);

// 👤 User Schema (for authentication)
// const UserSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   password: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });
// const User = mongoose.models.User || model("User", UserSchema);

// ✅ Register Routes
app.use("/api/pets", petRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/adoption-requests", adoptionRequestRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// ✅ GET Pets
app.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pets", error });
  }
});

// ✅ GET Services
app.get("/api/services", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
});

// ✅ POST Pet (Add Pet)
app.post("/pets", async (req, res) => {
  try {
    const { name, age, breed, type, image } = req.body;
    if (!name || !age || !breed || !type || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newPet = new Pet({ name, age, breed, type, image });
    await newPet.save();
    res.status(201).json({ message: "Pet added successfully", pet: newPet });
  } catch (error) {
    res.status(500).json({ message: "Error saving pet", error });
  }
});

// ✅ DELETE Pet
app.delete("/api/pets/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete pet" });
  }
});

// ✅ POST Service
app.post("/api/services", async (req, res) => {
  try {
    const { type, name, address, contact } = req.body;
    if (!type || !name || !address || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newService = new Service({ type, name, address, contact });
    await newService.save();
    res.status(201).json({ message: "Service added successfully", service: newService });
  } catch (error) {
    res.status(500).json({ message: "Error saving service", error });
  }
});

// ✅ DELETE Service
app.delete("/api/services/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Invalid service ID", error });
  }
});

// ✅ GET Products
// app.get("/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products", error });
//   }
// });

// // ✅ POST Product
// app.post("/products", async (req, res) => {
//   try {
//     const { type, name, image, price } = req.body;
//     if (!type || !name || !image || price === undefined) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     const newProduct = new Product({ type, name, image, price });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ message: "Error saving product", error });
//   }
// });

// ✅ DELETE Product
// app.delete("/products/:id", async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Invalid product ID", error });
//   }
// });

// ✅ POST Adoption Request
app.post("/api/adoption-requests", async (req, res) => {
  try {
    const newRequest = new AdoptionRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: "Adoption request submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit request." });
  }
});

// ✅ GET Adoption Requests
app.get("/api/adoption-requests", async (req, res) => {
  const requests = await AdoptionRequest.find();
  res.json(requests);
});

// ✅ User Exists Check

app.post("/api/users/check", async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Hardcoded Admin Login (Remove if you store admin in MongoDB)
    if (email === "admin@gmail.com") {
      const adminPassword = "Admin@123"; // Hardcoded for now
      const isPasswordValid = password === adminPassword; // Simple check

      if (isPasswordValid) {
        return res.json({ success: true, role: "admin" });
      } else {
        return res.status(401).json({ success: false, message: "Incorrect password!" });
      }
    }

    // ✅ Check User in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found!" });
    }

    // ✅ Compare Password
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect password!" });
    }    

    res.json({ success: true, role: "user" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error!" });
  }
});

// ✅ Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
