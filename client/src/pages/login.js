import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        
      });
  
      // ✅ Check if response is not JSON
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        throw new Error("Invalid server response: " + text);
      }
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userType", data.user.role); // 'admin' or 'user'
      localStorage.setItem("userId", data.user._id); 
  
      if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/petList");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
    }
  };  

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url("/images/wall5.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="login-container"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>{isAdmin ? "Admin Login" : "User Login"}</h2>

        <button className="toggle-btn" onClick={() => setIsAdmin(!isAdmin)}>
          {isAdmin ? "Switch to User Login" : "Switch to Admin Login"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>} {/* ✅ Display error message */}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        {!isAdmin && (
          <p>
            Don't have an account? <Link to="/register">Register Here</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
