import React, { useEffect, useState } from "react";
import "./UserDashboard.css";

// Predefined Essentials, Pickup, and Vaccines
const essentialsKit = [
  "1. Food & Water Bowls",
  "2. High-Quality Pet Food",
  "3. Leash & Collar (for dogs) / Harness (for cats)",
  "4. Comfortable Bed or Blanket",
  "5. Toys (Chew Toys, Interactive Toys, etc.)",
  "6. Grooming Kit (Brush, Shampoo, Nail Clippers)",
  "7. Poop Bags & Waste Scooper / Litter Box & Litter (for cats)",
  "8. Training Pads or Pee Pads",
  "9. First Aid Kit",
  "10. Crate or Travel Carrier",
];

const pickupAddress = {
  name: "Happy Tails Adoption Center",
  street: "123 Paw Street, Koregaon Park",
  city: "Pune, Maharashtra - 411001",
  contact: "+91 98765 43210",
  timings: "8:00 AM - 10:00 PM",
};

const petVaccines = [
  "1. Rabies Vaccine",
  "2. Distemper Vaccine",
  "3. Parvovirus Vaccine",
  "4. Leptospirosis Vaccine",
  "5. Bordetella Vaccine",
  "6. Feline Leukemia Vaccine",
];

const UserDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showPickupDetails, setShowPickupDetails] = useState(false);
  const [showVaccineDetails, setShowVaccineDetails] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedback, setFeedback] = useState({
    ownerName: "",
    petName: "",
    image: "",
    message: "",
    rating: 0,
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const fetchRequests = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/adoption-requests/user/${userId}`);
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  // ✅ Validate Feedback Form
  const validateFeedback = () => {
    if (!feedback.ownerName.trim()) {
      alert("Please enter your name.");
      return false;
    }
    if (!feedback.petName.trim()) {
      alert("Please enter your pet's name.");
      return false;
    }
    if (!feedback.message.trim()) {
      alert("Please provide your feedback message.");
      return false;
    }
    if (!feedback.rating || feedback.rating < 1 || feedback.rating > 5) {
      alert("Please select a valid rating.");
      return false;
    }
    return true;
  };

  return (
    <div className="user-dashboard">
      <h2>Your Adoption Requests</h2>
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <div className="requests-list">
          {requests.map((req) => (
            <div className="request-item" key={req._id}>
              {req.petImage && (
                <img
                  src={req.petImage}
                  alt={req.petName}
                  className="request-pet-image"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px"
                  }}
                />
              )}
              <div>
                <h3>{req.petName}</h3>
                <p>{req.reason}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${req.status}`}>{req.status}</span>
                </p>
                {req.status === "approved" && (
                  <>
                    <p className="success-message">🎉 Congratulations! Your adoption request has been approved.</p>
                    <div className="action-buttons" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      <button className="btn" onClick={() => setSelectedPet(req)}>Pet Essential Kit</button>
                      <button className="btn" onClick={() => setShowVaccineDetails(true)}>Pet Vaccine Details</button>
                      <button className="btn" onClick={() => setShowPickupDetails(true)}>Pet Pickup Details</button>
                      <button
                        className="btn"
                        style={{ backgroundColor: "#3b6e22", color: "white" }}
                        onClick={() => {
                          setShowFeedbackModal(true);
                          setFeedback({ ...feedback, petName: req.petName });
                        }}
                      >
                        Give Feedback
                      </button>
                    </div>
                  </>
                )}
                {req.status === "rejected" && (
                  <p className="error-message">❌ Unfortunately, your request was not approved.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Pet Essential Kit */}
      {selectedPet && (
        <div className="modal-overlay" onClick={() => setSelectedPet(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Essential Kit for {selectedPet.petName}</h3>
            <ul>
              {essentialsKit.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <button className="btn close-btn" onClick={() => setSelectedPet(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Modal for Vaccine Details */}
      {showVaccineDetails && (
        <div className="modal-overlay" onClick={() => setShowVaccineDetails(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Pet Vaccine Details</h3>
            <ul>{petVaccines.map((v, i) => <li key={i}>{v}</li>)}</ul>
            <button className="btn close-btn" onClick={() => setShowVaccineDetails(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Modal for Pickup Details */}
      {showPickupDetails && (
        <div className="modal-overlay" onClick={() => setShowPickupDetails(false)} style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
            background: "#fff", padding: "25px", borderRadius: "10px", textAlign: "center", maxWidth: "400px", width: "90%"
          }}>
            <h3>Pet Pickup Details</h3>
            <p><strong>📍 {pickupAddress.name}</strong></p>
            <p>{pickupAddress.street}</p>
            <p>{pickupAddress.city}</p>
            <p><strong>📞 Contact:</strong> {pickupAddress.contact}</p>
            <p><strong>🕒 Timings:</strong> {pickupAddress.timings}</p>
            <button className="btn close-btn" onClick={() => setShowPickupDetails(false)} style={{
              marginTop: "15px", padding: "8px 16px", backgroundColor: "#5a3531", color: "white", border: "none", borderRadius: "5px", cursor: "pointer"
            }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="modal-overlay" onClick={() => {
          setShowFeedbackModal(false);
          setFeedbackSubmitted(false);
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ background: "#fff", padding: "25px", borderRadius: "10px", maxWidth: "450px", width: "90%" }}>
            {feedbackSubmitted ? (
              <div style={{ textAlign: "center" }}>
                <h3>🎉 Thank you for your feedback!</h3>
                <button className="btn" onClick={() => {
                  setShowFeedbackModal(false);
                  setFeedbackSubmitted(false);
                }} style={{
                  marginTop: "15px", padding: "8px 16px", backgroundColor: "#5a3531", color: "white", border: "none", borderRadius: "5px", cursor: "pointer"
                }}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ textAlign: "center" }}>Give Feedback</h3>
                <input type="text" placeholder="Owner Name" value={feedback.ownerName} onChange={(e) => setFeedback({ ...feedback, ownerName: e.target.value })} />
                <input type="text" placeholder="Pet Name" value={feedback.petName} onChange={(e) => setFeedback({ ...feedback, petName: e.target.value })} />
                <input type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFeedback((prev) => ({ ...prev, image: reader.result }));
                    };
                    reader.readAsDataURL(file);
                  }
                }} />
                <textarea placeholder="Your Feedback" value={feedback.message} onChange={(e) => setFeedback({ ...feedback, message: e.target.value })} />
                <label>Rating: </label>
                <select value={feedback.rating} onChange={(e) => setFeedback({ ...feedback, rating: parseInt(e.target.value) })}>
                  <option value={0}>Select Rating</option>
                  <option value={1}>⭐</option>
                  <option value={2}>⭐⭐</option>
                  <option value={3}>⭐⭐⭐</option>
                  <option value={4}>⭐⭐⭐⭐</option>
                  <option value={5}>⭐⭐⭐⭐⭐</option>
                </select>
                <button onClick={() => {
                  if (validateFeedback()) {
                    console.log("Feedback submitted:", feedback); // Replace with actual POST call
                    setFeedbackSubmitted(true);
                  }
                }} style={{
                  padding: "10px 16px", backgroundColor: "#5a3531", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", width: "100%"
                }}>
                  Submit Feedback
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
