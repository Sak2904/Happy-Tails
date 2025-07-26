import React, { useEffect, useState } from "react";

const AdoptionRequestForm = ({ pet, onClose }) => {
  const [formData, setFormData] = useState({
    petName: "",
    ownername: "",
    email: "",
    phone: "",
    address: "",
    commitment: "",
    ownedBefore: ""
  });

  useEffect(() => {
    if (pet) {
      setFormData((prev) => ({
        ...prev,
        petName: pet.name || ""
      }));
    }
  }, [pet]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");

      const res = await fetch("http://localhost:5000/api/adoption-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          petId: pet._id,
          petImage: pet.image,
          reason: `Commitment: ${formData.commitment}, Owned Before: ${formData.ownedBefore}`,
          userId
        })
      });

      if (res.ok) {
        alert("✅ Adoption request submitted!");
        onClose();
      } else {
        const error = await res.json();
        alert(`❌ ${error.message}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("❌ Server error");
    }
  };

  if (!pet) return null;

  return (
    <>
      <style>{`
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .modal {
  background-image: url("/formbg.jpg");
  background-repeat: repeat;
  background-size: 120px;
  background-color: #fff; /* fallback */
  padding: 10px;
  width: 60%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  position: relative;
}
  .modal h2 {
    text-align: center;
    margin-bottom: 10px;
  }
  .close-button {
    position: absolute;
    top: 10px;
    right: 16px;
    font-size: 24px;
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
  }
  .close-button:hover {
    color: #000;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px 20px;
  }

  form label {
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
  }

  form input,
  form select,
  form textarea {
    width: 100%;
    padding: 6px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  .full-width {
    grid-column: span 2;
  }

  .form-actions {
    grid-column: span 2;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
  }

  .submit-btn,
  .cancel-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .cancel-btn {
    background: #ccc;
    color: #333;
  }

  .submit-btn {
    background: #5a3531;
    color: white;
  }
`}</style>

<div className="modal-overlay">
  <div className="modal">
    <button className="close-button" onClick={onClose}>&times;</button>
    <h2>Adoption Request for <span>{pet.name}</span></h2>

    <form onSubmit={handleSubmit}>
      {/* Row 1 */}
      <div>
        <label>🐾Pet Name</label>
        <input type="text" name="petName" value={formData.petName} readOnly />
      </div>
      <div>
        <label>👤Your Name</label>
        <input type="text" name="ownername" value={formData.ownername} onChange={handleChange} required />
      </div>

      {/* Row 2 */}
      <div>
        <label>📧Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>📱Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>

      {/* Row 3 */}
      <div className="full-width">
        <label>🏠Address</label>
        <textarea name="address" value={formData.address} onChange={handleChange} required />
      </div>

      {/* Row 4 */}
      <div className="full-width">
        <label>Are you willing to provide long-term care and commitment for this pet?</label>
        <select name="commitment" value={formData.commitment} onChange={handleChange} required>
          <option value="">-- Select --</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Row 5 */}
      <div className="full-width">
        <label>Have you ever owned a pet before?</label>
        <select name="ownedBefore" value={formData.ownedBefore} onChange={handleChange} required>
          <option value="">-- Select --</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        <button type="submit" className="submit-btn">Submit</button>
      </div>
    </form>
  </div>
</div>

    </>
  );
};

export default AdoptionRequestForm;
