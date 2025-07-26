import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserDashboard.css"; // Ensure you create this CSS file

const UserDashboard = ({ userId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/adoption-requests/user/${userId}`)
      .then((response) => setRequests(response.data))
      .catch((error) => console.error("Error fetching user requests:", error));
  }, [userId]);

  return (
    <div className="user-dashboard">
      <h2>Your Adoption Requests</h2>
      {requests.length > 0 ? (
        <div className="requests-list">
          {requests.map((req) => (
            <div key={req._id} className="request-item">
              <h3>{req.petName}</h3>
              <p><strong>Status:</strong> <span className={`status ${req.status}`}>{req.status || "Pending"}</span></p>
              <p><strong>Reason:</strong> {req.reason}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No adoption requests found.</p>
      )}
    </div>
  );
};

export default UserDashboard;
