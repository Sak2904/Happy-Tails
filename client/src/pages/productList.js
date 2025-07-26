const handleAddProduct = async () => {
  const userId = localStorage.getItem("userId") || "admin"; // optional field
  if (newProduct.name && newProduct.image && newProduct.price) {
    try {
      // ✅ First: Add the product via POST request
      await axios.post("http://localhost:5000/api/products", { 
        ...newProduct,
        userId
      });

      // ✅ Then: Fetch updated product list from backend
      const refreshed = await axios.get("http://localhost:5000/api/products");
      setProducts(refreshed.data);

      // ✅ Clear the form
      setNewProduct({ type: "Food", name: "", image: "", price: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }
};
