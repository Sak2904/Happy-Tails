import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

const UserDashboard = () => {
  const { user } = useAuth(); // Get logged-in user data
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/adoption-requests/user/${user._id}`)
        .then(response => setRequests(response.data))
        .catch(error => console.error("Error fetching requests:", error));
    }
  }, [user]);

  return (
    <div>
      <h2>Your Adoption Requests</h2>
      <ul>
        {requests.map(req => (
          <li key={req._id}>
            {req.petName} - <strong>{req.status || "Pending"}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
