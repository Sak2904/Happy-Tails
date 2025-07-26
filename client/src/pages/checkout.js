import React, { useEffect } from "react";

const Checkout = () => {
  const handlePayment = async () => {
    const response = await fetch("http://localhost:5000/api/payment", {
      method: "POST",
    });
    const data = await response.json();

    if (data.payment_link) {
      window.location.href = data.payment_link; // Redirect to Cashfree payment page
    } else {
      alert("Payment failed. Please try again.");
    }
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default Checkout;
