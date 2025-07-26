import React, { useState, useEffect } from "react";
import axios from "axios";
import "./service.css";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState({ Grooming: [], Daycare: [] });
  const [centers, setCenters] = useState([]);
  const [visibleContact, setVisibleContact] = useState(null); // holds the selected center

  useEffect(() => {
    axios.get("http://localhost:5000/api/services")
      .then((res) => {
        const grooming = res.data.filter(service => service.type.toLowerCase() === "grooming");
        const daycare = res.data.filter(service => service.type.toLowerCase() === "daycare");
        setServices({ Grooming: grooming, Daycare: daycare });
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  useEffect(() => {
    if (selectedService) {
      axios.get(`http://localhost:5000/api/services?type=${selectedService}`)
        .then((res) => setCenters(res.data))
        .catch((err) => console.error("Error fetching centers:", err));
    }
  }, [selectedService]);

  return (
    <div className="services-container">
      <h2>Our Services</h2>

      {!selectedService ? (
        <div className="service-options">
          <button className="service-btn" onClick={() => setSelectedService("Grooming")}>
            <img src="./images/dg.jpg" alt="Grooming" width="100" />
            <p>Grooming</p>
          </button>
          <button className="service-btn" onClick={() => setSelectedService("Daycare")}>
            <img src="./images/dc.jpg" alt="Daycare" width="100" />
            <p>Daycare</p>
          </button>
          {Object.keys(services)
            .filter((s) => s !== "Grooming" && s !== "Daycare")
            .map((s) => (
              <button key={s} className="service-btn" onClick={() => setSelectedService(s)}>
                <p>{s}</p>
              </button>
            ))}
        </div>
      ) : (
        <div>
          <button className="back-btn" onClick={() => setSelectedService(null)}>⬅ Back</button>
          <h3>{selectedService} Centers</h3>
          <ul className="service-list">
            {centers.map((center) => (
              <li
                key={center._id}
                className="service-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  marginBottom: "15px",
                  background: "#f9f9f9",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ textAlign: "center", marginBottom: "10px" }}>
                    <h3 style={{ margin: 0 }}>{center.name}</h3>
                    <p style={{ margin: "5px 0" }}>📍 {center.address}</p>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  💰 {selectedService.toLowerCase() === "daycare"
                    ? `₹${center.price || "N/A"}/hour`
                    : `From ₹${center.price || "N/A"}`}
                </p>

                  <button
                    style={{
                      marginTop: "8px",
                      padding: "6px 12px",
                      backgroundColor: "#5a3531",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                    onClick={() => setVisibleContact(center)}
                  >
                    Book Appointment
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 🔹 Call Now Modal */}
      {visibleContact && (
        <div
          onClick={() => setVisibleContact(null)}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "25px 30px",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)"
            }}
          >
            <h3>For appointment :</h3>
            <p>Please call on </p>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
  {visibleContact.contact}{" -"}
  <a
    href={`https://wa.me/91${visibleContact.contact}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{ marginLeft: "8px" }}
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
      alt="WhatsApp"
      width="22"
      height="22"
      style={{ verticalAlign: "middle" }}
    />
  </a>
</p>

          {/*   <p>Kindly provide information about food habbits and given vaccinations of your pet</p> */}
            <button
              onClick={() => setVisibleContact(null)}
              style={{
                marginTop: "15px",
                padding: "8px 16px",
                backgroundColor: "#5a3531",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
