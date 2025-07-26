import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // This will trigger useEffect when route changes

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("isLoggedIn"));
  const [userType, setUserType] = useState(localStorage.getItem("userType")?.toLowerCase());

  useEffect(() => {
    // Re-check localStorage on route change
    setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
    setUserType(localStorage.getItem("userType")?.toLowerCase());
  }, [location]); // ✅ triggers on any route change

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    setUserType(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="Happy Tails Logo" className="logo-img" />
        <h1>Happy Tails</h1>
      </Link>

      <ul>
        <li><Link to="/">Home</Link></li>

        {!isLoggedIn && <li><Link to="/login">Login</Link></li>}

        {isLoggedIn && (
          <>
            <li><Link to="/petlist">Pets</Link></li>
            <li><Link to="/service">Services</Link></li>
            <li><Link to="/product">Products</Link></li>

            {userType === "admin" && <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>}
            {userType === "user" && <li><Link to="/user-dashboard">User Dashboard</Link></li>}

            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
