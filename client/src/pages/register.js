import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when typing
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    // Phone Number Validation (10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
      valid = false;
    }

    // Password Validation (At least 8 chars, 1 letter, 1 number, 1 special char)
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters with 1 letter, 1 number, and 1 special character";
      valid = false;
    }

    // Confirm Password Match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
          }),
        });
  
        const data = await response.json();
        if (response.ok) {
          alert("✅ Registration Successful!");
          navigate("/login");
        } else {
          alert(`❌ Error: ${data.message || data.error || "Something went wrong"}`);
        }
      } catch (error) {
        console.error("❌ Registration Error:", error);
        alert("❌ Server Error! Try again later.");
      }
    }
  };
  

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url("/images/wall5.png")`,  // ✅ Direct reference to public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
    <div className="register-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Enter Phone No." value={formData.phone} onChange={handleChange} required />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />
        {errors.password && <p className="error">{errors.password}</p>}

        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
    </div>
  );
};

export default Register;
