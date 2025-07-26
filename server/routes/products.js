import express from "express";
import Product from "../models/products.js"; // Import Product Model

const router = express.Router();

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// ✅ POST new product
router.post("/", async (req, res) => {
  try {
    const { type, name, image, price } = req.body;
    if (!type || !name || !image || price === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProduct = new Product({ type, name, image, price });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error saving product", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});



export default router;
