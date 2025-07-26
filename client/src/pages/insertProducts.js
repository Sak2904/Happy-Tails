import { connect, connection } from "mongoose";
import { insertMany } from "./models/products.js"; // Adjust path as needed

connect("mongodb://localhost:27017/petShop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  {
    name: "Dog Collar",
    type: "Accessory",
    price: 499,
    image: "/images/products/dog-collar.jpg",
  },
  {
    name: "Cat Food (1kg)",
    type: "Food",
    price: 799,
    image: "/images/products/catfood.jpg",
  },
  {
    name: "Pet Bed",
    type: "Furniture",
    price: 1499,
    image: "/images/products/petbed.jpeg",
  },
  {
    name: "Dog Leash",
    type: "Accessory",
    price: 599,
    image: "/images/products/dogleash.jpeg",
  }
];

insertMany(products)
  .then(() => {
    console.log("✅ Products Inserted Successfully!");
    connection.close();
  })
  .catch((err) => {
    console.error("❌ Error Inserting Products:", err);
  });
