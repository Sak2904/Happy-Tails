import { useState } from "react";
import axios from "axios";

const Managing = () => {
  const [pet, setPet] = useState({ name: "", breed: "", age: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/pets", pet);
    alert("Pet added successfully!");
  };

  return (
    <div>
      <h1>Manage Pets</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setPet({ ...pet, name: e.target.value })} />
        <input type="text" placeholder="Breed" onChange={(e) => setPet({ ...pet, breed: e.target.value })} />
        <input type="number" placeholder="Age" onChange={(e) => setPet({ ...pet, age: e.target.value })} />
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
};

export default Managing;
