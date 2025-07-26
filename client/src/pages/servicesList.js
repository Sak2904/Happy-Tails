import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ServiceList = ({ isAdmin }) => {
  const { serviceType } = useParams(); // Get selected service type from URL
  const [services, setServices] = useState([]);

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/services?type=${serviceType}`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [serviceType]); // Refetch when serviceType changes

  // Delete service function (only for admin)
  const handleDelete = async (id) => {
    if (!isAdmin) return;

    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      setServices(services.filter((service) => service._id !== id)); // Update UI
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="service-list-container">
      <h1>{serviceType} Centers</h1>
      <ul className="service-list">
        {services.map((service) => (
          <li key={service._id} className="service-item">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>{service.name}</h3>
          {serviceType === "grooming" && <p style={{ margin: 0 }}>💰 From ₹{service.price}</p>}
          {serviceType === "daycare" && <p style={{ margin: 0 }}>💰 ₹{service.price}/hour</p>}
        </div>

            {/* eslint-disable-next-line */}
            <p>📍 {service.address}</p>
            {/* eslint-disable-next-line */}
            <p>📞 {service.contact}</p>

            {/* 💰 Pricing Display Logic */}
              {serviceType === "grooming" && (
                <p>💰 From ₹{service.price}</p>
              )}
              {serviceType === "daycare" && (
                <p>💰 ₹{service.price}/hour</p>
              )}
            {isAdmin && (
              <button onClick={() => handleDelete(service._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
