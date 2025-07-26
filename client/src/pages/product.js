import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "",phone: "", address: "" });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    method: "",
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upi: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleBuy = () => {
    setShowPayment(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Show confirmation message
    setShowConfirmation(true);
    
    // Clear cart
    setCart([]);
    localStorage.removeItem("cart");
    setPaymentDetails({ method: "", name: "", cardNumber: "", expiry: "", cvv: "", upi: "" });
    setCustomerInfo({ name: "", phone: "", address: "" });

    // Delay closing the modal
    setTimeout(() => {
      setShowPayment(false);
      setShowConfirmation(false);
    }, 3000); // 3 seconds delay before closing modal
  };

  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const filteredProducts =
    filterType === "All" ? products : products.filter((product) => product.type === filterType);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar2">
        <h2>Pet Products</h2>
        <div className="cart">
          🛒 Cart ({cart.length})
          <div className="cart-dropdown">
            {cart.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              <>
              <p>Shopping cart</p>
                <ul>
                  {cart.map((item, index) => (
                    <li key={index}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <p>{item.name}</p>
                        <p>₹{item.price}</p>
                        <label>Quantity:</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                        />
                        <button onClick={() => removeFromCart(index)}>Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="buy-btn" onClick={handleBuy}>
                  Buy Now
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* PRODUCT FILTER */}
      <div className="products-page">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <label style={{ marginRight: "10px", fontWeight: "500" }}>Filter by Type:</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="All">All</option>
            {[...new Set(products.map((p) => p.type))].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* PRODUCT LIST */}
        <ul className="product-list">
          {filteredProducts.map((product) => (
            <li key={product._id} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Type: {product.type}</p>
              <p>Price: ₹{product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="payment-modal">
          <div className="payment-content">
            <h2>Payment Gateway</h2>

            <p style={{ fontSize: "16px", marginBottom: "15px" }}>
              Paying ₹
              <strong>
                {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
              </strong>{" "}
              for <strong>{cart.length}</strong> item(s)
            </p>

            {/* CUSTOMER INFO FORM */}
            <form onSubmit={handlePaymentSubmit}>
              <h3>Customer Information</h3>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={customerInfo.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="phone"
                placeholder="Contact number"
                value={customerInfo.phone}
                onChange={handleInputChange}
                required
              />
              <input
                name="address"
                placeholder="Delivery Address"
                value={customerInfo.address}
                onChange={handleInputChange}
                required
              />

              {/* PAYMENT METHOD */}
              <h3>Select Payment Method</h3>
              <label>
                <input
                  type="radio"
                  name="method"
                  value="card"
                  checked={paymentDetails.method === "card"}
                  onChange={handlePaymentChange}
                />
                Card
              </label>
              <label>
                <input
                  type="radio"
                  name="method"
                  value="upi"
                  checked={paymentDetails.method === "upi"}
                  onChange={handlePaymentChange}
                />
                UPI
              </label>
              <label>
                <input
                  type="radio"
                  name="method"
                  value="cod"
                  checked={paymentDetails.method === "cod"}
                  onChange={handlePaymentChange}
                />
                Cash on Delivery
              </label>

              {/* PAYMENT DETAILS */}
              {paymentDetails.method === "card" && (
                <>
                  <input type="text" name="cardNumber" placeholder="Card Number" required />
                  <input type="text" name="expiry" placeholder="MM/YY" required />
                  <input type="text" name="cvv" placeholder="CVV" required />
                </>
              )}

              {paymentDetails.method === "upi" && (
                <input type="text" name="upi" placeholder="UPI ID" required />
              )}

              {paymentDetails.method === "cod" && (
                <p style={{ color: "#155724", background: "#d4edda", padding: "10px" }}>
                  Pay in cash upon delivery.
                </p>
              )}

              {/* CONFIRM ORDER BUTTON */}
              <button type="submit">Confirm Order</button>
              <button type="button" onClick={() => setShowPayment(false)}>
                Cancel
              </button>
            </form>

            {/* ORDER CONFIRMATION MESSAGE */}
            {showConfirmation && (
  <div className="confirmation-message">
    <h2>Your payment is successful!</h2>
    <p>✅ Order Confirmed</p>
    <p>Your products will be delivered in 2 Days</p>
  </div>
)}          
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
