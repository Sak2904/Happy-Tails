import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddPetForm from "./addPet";
import AdoptionRequestForm from "./adoptionForm";
import "./petList.css";

function PetList() {
  const [pets, setPets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [filterGender, setFilterGender] = useState("All");
  const navigate = useNavigate();

  const fetchPets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/pets");
      const availablePets = response.data.filter((pet) => !pet.adopted); // ✅ Hide adopted
      setPets(availablePets);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleAdoptClick = (pet) => {
    setSelectedPet(pet);
    setShowForm(true);
  };

  // ✅ Combine both filters
  const filteredPets = pets.filter((pet) => {
    const typeMatch = filterType === "All" || pet.type === filterType;
    const genderMatch = filterGender === "All" || pet.gender === filterGender;
    return typeMatch && genderMatch;
  });

  return (
    <div className="pets-page">
      <AddPetForm onPetAdded={fetchPets} />

      <div className="pet-list-container">
        <h2>Available Pets for Adoption</h2>

        {/* Filters */}
        <div style={{ textAlign: "center", marginBottom: "20px", display: "flex", gap: "20px", justifyContent: "center" }}>
          <div>
            <label style={{ marginRight: "10px", fontWeight: "bold" }}>
              Filter by Type:
            </label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">All</option>
              {[...new Set(pets.map((pet) => pet.type))].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ marginRight: "10px", fontWeight: "bold" }}>
              Filter by Gender:
            </label>
            <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* Pet Grid */}
        <div className="pet-container">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <div key={pet._id} className="pet-card">
                <img
                  src={pet.image || "/default-pet.jpg"}
                  alt={pet.name || "Unnamed Pet"}
                  className="pet-image"
                />
                <h3>{pet.name || "Unnamed Pet"}</h3>
                <p><strong>Breed:</strong> {pet.breed || "Unknown"}</p>
                <p><strong>Gender:</strong> {pet.gender || "Unknown"}</p>
                <p><strong>Age:</strong> {pet.age ? `${pet.age} months` : "Unknown"}</p>
                <button onClick={() => handleAdoptClick(pet)}>Adopt</button>
              </div>
            ))
          ) : (
            <p>No pets available for selected filters.</p>
          )}
        </div>
      </div>

      {/* Modal Form */}
      {showForm && selectedPet && (
        <AdoptionRequestForm
          pet={selectedPet}
          onClose={() => {
            setShowForm(false);
            setSelectedPet(null);
          }}
        />
      )}
    </div>
  );
}

export default PetList;
