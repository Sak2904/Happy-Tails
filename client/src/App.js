import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import AddPetForm from "./pages/addPet";
import Home from "./pages/home";
import PetList from "./pages/petList"; 
import Services from "./pages/service";
import ServiceList from "./pages/servicesList";
import Products from "./pages/product";
import Login from "./pages/login";
import Register from "./pages/register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Card from "./components/ui/Card";
import Button from "./components/ui/Button";
import AdoptionRequestForm from "./pages/adoptionForm";
import "./styles.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/petList" element={<PetList />} /> 
        <Route path="/addPet" element={<AddPetForm />} />
        <Route path="/service" element={<Services />} />
        <Route path="/services/:serviceType" element={<ServiceList isAdmin={true} />} />
        <Route path="/product" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/card" element={<Card />} />
        <Route path="/button" element={<Button />} />
        <Route path="/adoption-form/:petId" element={<AdoptionRequestForm />} />

      </Routes>
    </Router>
  );
}

export default App;
