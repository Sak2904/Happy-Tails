import React, { useState, useEffect } from "react";
import axios from "axios";

const PetListings = () => {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({
    name: "",
    age: "",
    breed: "",
    type: "Dog",
    gender: "Male",
    image: "",
  });

  const fetchPets = () => {
    axios
      .get("http://localhost:5000/api/pets")
      .then((response) => {
        setPets(response.data);
        localStorage.setItem("pets", JSON.stringify(response.data));
      })
      .catch((error) => console.error("Error fetching pets:", error));
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleAddPet = async () => {
    const { name, age, breed, type, gender, image } = newPet;
    if (!name || !age || !breed || !type || !gender || !image) {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/pets", newPet, {
        headers: { "Content-Type": "application/json" },
      });
      fetchPets();
      setNewPet({
        name: "",
        age: "",
        breed: "",
        type: "Dog",
        gender: "Male",
        image: "",
      });
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  const handleDeletePet = async (petId) => {
    try {
      await axios.delete(`http://localhost:5000/api/pets/${petId}`);
      fetchPets();
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPet((prevPet) => ({ ...prevPet, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Pet Listings</h2>

      {/* 🔹 Add Pet Form */}
      <div className="product-form" style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
        <select value={newPet.type} onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>

        <input type="text" placeholder="Pet Name" value={newPet.name} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} />

        <input type="number" placeholder="Age (months)" value={newPet.age} onChange={(e) => setNewPet({ ...newPet, age: e.target.value })} />

        <input type="text" placeholder="Breed" value={newPet.breed} onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })} />

        <select value={newPet.gender} onChange={(e) => setNewPet({ ...newPet, gender: e.target.value })}>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <button onClick={handleAddPet}>Add Pet</button>
      </div>
      
      
      {/* 🔹 Pet Listings */}
      <ul className="product-list" style={{ display: "flex", flexWrap: "wrap", gap: "15px", listStyle: "none", padding: 0 }}>
        {pets.map((pet) => (
          <li key={pet._id} className="product-item" style={{
            width: "200px",
            background: "white",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <img src={pet.image} alt={pet.name} width="100%" style={{ borderRadius: "5px" }} />
            <h3>{pet.name}</h3>
            <p><strong>Age:</strong> {pet.age} months</p>
            <p><strong>Gender:</strong> {pet.gender}</p>
            <p><strong>Type:</strong> {pet.type}</p>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <button onClick={() => handleDeletePet(pet._id)} style={{ background: "#dc3545", color: "white", border: "none", padding: "6px 10px", borderRadius: "5px", marginTop: "8px" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default PetListings;
