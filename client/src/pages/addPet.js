import React, { useState } from "react";
import axios from "axios";

function AddPetForm({ onPetAdded }) {
  const [newPet, setNewPet] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    gender: "Male",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPet((prevPet) => ({ ...prevPet, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, type, breed, age, gender, image } = newPet;
    if (!name || !type || !breed || !age || !gender || !image) {
      alert("Please fill in all details before adding a pet!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/pets", newPet);
      alert("Pet added successfully!");
      setNewPet({
        name: "",
        type: "",
        breed: "",
        age: "",
        gender: "Male",
        image: null,
      });
      onPetAdded();
    } catch (error) {
      console.error("Error adding pet:", error);
      alert("Failed to add pet.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#5a3531ba",
        color: "white",
        padding: "15px",
        borderRadius: "10px",
        width: "250px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>Add a New Pet</h3>

      <input
        type="text"
        name="name"
        value={newPet.name}
        placeholder="Pet Name"
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <select
        name="type"
        value={newPet.type}
        onChange={handleChange}
        required
        style={inputStyle}
      >
        <option value="">Select Pet Type</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
      </select>

      <input
        type="text"
        name="breed"
        value={newPet.breed}
        placeholder="Breed"
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        type="number"
        name="age"
        value={newPet.age}
        placeholder="Age (months)"
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* Gender radio buttons */}
      <div style={{ display: "inline-table", flexDirection: "column", gap: "5px", width: "90%" }}>
        <label style={{ fontWeight: "bold" }}>Gender:</label>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={newPet.gender === "Male"}
              onChange={handleChange}
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={newPet.gender === "Female"}
              onChange={handleChange}
            />{" "}
            Female
          </label>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{
          width: "90%",
          padding: "5px",
          background: "#555",
          color: "white",
          borderRadius: "5px",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "10px",
          background: "#5a3531",
          border: "none",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Pet
      </button>
    </form>
  );
}

const inputStyle = {
  width: "90%",
  padding: "8px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  background: "#c7c7c7",
  color: "black",
};

export default AddPetForm;
