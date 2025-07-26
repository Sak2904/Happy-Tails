import React, { useState, useEffect } from "react";
import PetList from "./petList";
import ServiceList from "./servicesList";
import axios from "axios";
import "./AdminDashboard.css"; // Import CSS for styling'
import PetListings from "./PetListings";


const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("pets"); // Default to Products Tab

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className={selectedTab === "pets" ? "active" : ""} onClick={() => setSelectedTab("pets")}>
            {/* eslint-disable-next-line */}
            🐶 Manage Pet Listings
          </li>
          <li className={selectedTab === "services" ? "active" : ""} onClick={() => setSelectedTab("services")}>
            {/* eslint-disable-next-line */}
            🏥 Manage Services
          </li>
          <li className={selectedTab === "products" ? "active" : ""} onClick={() => setSelectedTab("products")}>
            {/* eslint-disable-next-line */}
            🛒 Manage Products
          </li>
          <li className={selectedTab === "adoption" ? "active" : ""} onClick={() => setSelectedTab("adoption")}>
            {/* eslint-disable-next-line */}
            📜 Adoption Requests
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content">
        {selectedTab === "pets" && <PetListings />}
        {selectedTab === "services" && <ServiceManagement />}
        {selectedTab === "products" && <ProductManagement />}
        {selectedTab === "adoption" && <AdoptionRequests />}
      </div>
    </div>
  );
};

// 📌 Manage Pet Listings
// const fetchPets = () => {
//   // your logic to fetch pets
// };

// const PetListings = () => {
//   const [pets, setPets] = useState(() => JSON.parse(localStorage.getItem("pets")) || []);
//   const [newPet, setNewPet] = useState({ name: "", age: "", breed: "", type: "Dog", gender:"Male", image: "" });

//   // ✅ Fetch pets from backend
//   const fetchPets = () => {
//     axios.get("http://localhost:5000/api/pets")
//       .then((response) => {
//         console.log("Pets received in Admin Dashboard:", response.data);
//         setPets(response.data);
//         localStorage.setItem("pets", JSON.stringify(response.data)); // Optional local cache
//       })
//       .catch((error) => console.error("Error fetching pets:", error));
//   };

//   // ✅ Fetch on component mount
//   useEffect(() => {
//     fetchPets();
//   }, []);

//   // ✅ Add new pet
//   const handleAddPet = async () => {
//     if (!newPet.name || !newPet.age || !newPet.breed || !newPet.type || !newPet.gender || !newPet.image) {
//       console.error("All fields are required!");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/pets", newPet, {
//         headers: { "Content-Type": "application/json" }
//       });

//       if (!response.data) throw new Error("Failed to add pet");

//       console.log("Newly added pet:", response.data);
//       fetchPets(); // ✅ Refresh list after adding
//       setNewPet({ name: "", age: "", breed: "", type: "Dog", gender:"Male", image: "" }); // Clear inputs

//     } catch (error) {
//       console.error("Error adding pet:", error);
//     }
//   };

//   // ✅ Delete a pet
//   const handleDeletePet = async (petId) => {
//     console.log("Deleting pet with ID:", petId);

//     try {
//       const response = await axios.delete(`http://localhost:5000/api/pets/${petId}`);
//       console.log("Delete response:", response.data);
//       fetchPets(); // ✅ Refresh after delete
//     } catch (error) {
//       console.error("Error deleting pet:", error);
//     }
//   };

//   // ✅ Handle image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewPet((prevPet) => ({ ...prevPet, image: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Pet Listings</h2>

//       {/* Form */}
//<div className="product-form">
  //<select
    //value={newPet.type}
    //onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
  //>
    //<option value="Dog">Dog</option>
    //<option value="Cat">Cat</option>
  //</select>

//  <input
  //  type="text"
    //placeholder="Pet Name"
  //  value={newPet.name}
   // onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
 // />

  //<input
   // type="number"
  //  placeholder="Age"
  //  value={newPet.age}
   /// onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
  //>

 // <input
  //  type="text"
 //   placeholder="Breed"
  //  value={newPet.breed}
   // onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
 // />

  //{/* 🔹 Gender Radio Buttons */}
 // <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
   // <label>
  //    <input
    //    type="radio"
      //  name="gender"
        //value="Male"
       // checked={newPet.gender === "Male"}
       // onChange={(e) => setNewPet({ ...newPet, gender: e.target.value })}
    //  /> Male
  //  </label>
    //<label>
  //    <input
   //     type="radio"
     //   name="gender"
       // value="Female"
    //    checked={newPet.gender === "Female"}
    //    onChange={(e) => setNewPet({ ...newPet, gender: e.target.value })}
     // /> Female
  //  </label>
 // </div>

 // <input
 //   type="file"
 //   accept="image/*"
 //   onChange={handleImageUpload}
 // />

//  <button onClick={handleAddPet}>Add Pet</button>
//</div>

//{/* List */}
//<ul className="product-list">
//  {pets.map((pet) => (
 //   <li key={pet._id} className="product-item">
   //   <p>Type: {pet.type}</p>
  //    <img src={pet.image} alt={pet.name} width="100" />
  //    <h3>{pet.name}</h3>
  //    <p>Age: {pet.age} years</p>
  //    <p>Gender: {pet.gender || "N/A"}</p>
  //    <p>Breed: {pet.breed}</p>
  //    <button onClick={() => handleDeletePet(pet._id)}>Delete</button>
  //  </li>
  
 // ))}
//</ul>



// 📌 Manage Services
const ServiceManagement = () => {
  const [services, setServices] = useState({ Grooming: [], Daycare: [] });
  const [newService, setNewService] = useState({ type: "Grooming", name: "", address: "", contact: "", price: "" });

  // Fetch services from the backend on mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/services")
      .then((res) => {
        const grooming = res.data.filter(service => service.type.toLowerCase() === "grooming");
        const daycare = res.data.filter(service => service.type.toLowerCase() === "daycare");
        setServices({ Grooming: grooming, Daycare: daycare });
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Handle adding a new service center
  const handleAddService = async () => {
    if (newService.name && newService.address && newService.contact && newService.price) {
      try {
        const res = await axios.post("http://localhost:5000/api/services", newService);
        setServices(prevServices => ({
          ...prevServices,
          [newService.type]: [...prevServices[newService.type], res.data] // Add new center to correct category
        }));
        setNewService({ type: "Grooming", name: "", address: "", contact: "", price: "" }); // Reset form
      } catch (error) {
        console.error("Error adding service:", error);
      }
    }
  };

  // Handle deleting a service center
  const handleDeleteService = (serviceId, type) => {
    axios.delete(`http://localhost:5000/api/services/${serviceId}`)
      .then(() => {
        setServices(prevServices => ({
          ...prevServices,
          [type]: prevServices[type].filter(service => service._id !== serviceId)
        }));
      })
      .catch((err) => console.error("Error deleting service:", err));
  };

  return (
    <div className="service-management">
      <h2>Manage Services</h2>

      {/* Add Service Center Form */}
<div className="service-form">
  <select
    value={newService.type}
    onChange={(e) => setNewService({ ...newService, type: e.target.value })}
  >
    <option value="Grooming">Grooming</option>
    <option value="Daycare">Daycare</option>
  </select>

  <input
    type="text"
    placeholder="Center Name"
    value={newService.name}
    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
  />

  <input
    type="text"
    placeholder="Address"
    value={newService.address}
    onChange={(e) => setNewService({ ...newService, address: e.target.value })}
  />

  <input
    type="text"
    placeholder="Contact Number"
    value={newService.contact}
    onChange={(e) => setNewService({ ...newService, contact: e.target.value })}
  />

  <input
    type="number"
    placeholder="Price"
    value={newService.price === 0 ? 0 : newService.price || ""}
    onChange={(e) => {
      const value = e.target.value;
      setNewService({
        ...newService,
        price: value === "" ? "" : Number(value)
      });
    }}
  />

  <button onClick={handleAddService}>Add Center</button>
</div>


      {/* Display Service Centers */}
      <div className="service-list-container">
        {["Grooming", "Daycare"].map((type) => (
          <div key={type} className="service-category">
            <h3>{type} Centers</h3>
            <ul className="service-list">
              {services[type].map((service) => (
                <li key={service._id} className="service-item">
                  <h4>{service.name}</h4>
                  {/* eslint-disable-next-line */}
                  <p>📍 {service.address}</p>
                  {/* eslint-disable-next-line */}
                  <p>📞 {service.contact}</p>
                  {/* eslint-disable-next-line */}
                  <p>
                      💰{" "}
                      {type === "Grooming"
                        ? `From ₹${service.price}`
                        : `₹${service.price}/hour`}
                    </p>

                  <button className="delete-btn" onClick={() => handleDeleteService(service._id, type)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};



// 📌 Product Management
const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ type: "Food", name: "", image: "", price: "" });
    const [selectedProducts, setSelectedProducts] = useState([]); // Track selected products for deletion
  
    useEffect(() => {
      axios.get("http://localhost:5000/api/products")
        .then((res) => setProducts(res.data))
        .catch((err) => console.error("Error fetching products:", err));
    }, []);
  
    const handleAddProduct = async () => {
      if (!newProduct.name || !newProduct.image || !newProduct.price || !newProduct.type) {
        console.error("All fields are required");
        return;
      }
    
      try {
        const response = await axios.post("http://localhost:5000/api/products", newProduct, {
          headers: { "Content-Type": "application/json" },
        });
    
        setProducts([...products, response.data]); // Add the new product to the list
        setNewProduct({ type: "Food", name: "", image: "", price: "" }); // Reset form
      } catch (error) {
        console.error("Error adding product:", error.response?.data || error.message);
      }
    };       

  // ✅ Delete a single product
  const handleDeleteProduct = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };
  

  // ✅ Bulk delete selected products
  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) {
      alert("❌ No products selected for deletion!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/products/bulk-delete", { productIds: selectedProducts });
      setProducts(products.filter((product) => !selectedProducts.includes(product._id)));
      setSelectedProducts([]); // Clear selection after deletion
    } catch (error) {
      console.error("❌ Error deleting selected products:", error.response?.data || error.message);
    }
  };

  // ✅ Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewProduct({ ...newProduct, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Manage Pet Products</h2>

      {/* Product Form */}
      <div className="product-form">
        <select value={newProduct.type} onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}>
          <option value="Food">Food</option>
          <option value="Clothes">Clothes</option>
          <option value="Toys">Toys</option>
          <option value="Accessory">Accessory</option>
        </select>
        <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Product List */}
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id} className="product-item">
            <input
              type="checkbox"
              checked={selectedProducts.includes(product._id)}
              onChange={() =>
                setSelectedProducts((prev) =>
                  prev.includes(product._id) ? prev.filter((id) => id !== product._id) : [...prev, product._id]
                )
              }
            />
            <p>Type: {product.type}</p>
            <img src={product.image} alt={product.name} width="100" />
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Bulk Delete Button */}
      {selectedProducts.length > 0 && <button onClick={handleBulkDelete}>Delete Selected</button>}
    </div>
  );
};



// 📌 Adoption Requests Placeholder

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all"); // ✅ Default to "all"

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/adoption-requests")
      .then((response) => setRequests(response.data))
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/adoption-requests/${id}`, { status });
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req))
      );
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  const filteredRequests = filter === "all"
    ? requests
    : requests.filter((req) => req.status === filter);

  return (
    <div className="adoption-requests-container" style={{ padding: "20px" }}>
      <h2>Adoption Requests</h2>

      {/* 🔽 Filter Dropdown */}
      <div style={{ marginBottom: "15px" }}>
        <label><strong>Filter by status:</strong>{" "}</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filteredRequests.length > 0 ? (
        <div className="requests-list">
          {filteredRequests.map((req, index) => (
            <div
              key={req._id}
              className="request-item"
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "flex-start",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "10px",
              }}
            >
              <div>
                <h3>• {index + 1} - {req.petName}</h3>
                <p><strong>User:</strong> {req.ownername || req.userName}</p>
                <p><strong>Email:</strong> {req.email}</p>
                <p><strong>Phone:</strong> {req.phone}</p>
                <p><strong>Address:</strong> {req.address}</p>
                <p>{req.reason}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${req.status || "pending"}`}>
                    {req.status || "Pending"}
                  </span>
                </p>
                <div className="actions" style={{ marginTop: "10px" }}>
                  <button
                    className="approve"
                    onClick={() => handleStatusChange(req._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="reject"
                    onClick={() => handleStatusChange(req._id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No {filter === "all" ? "" : filter} requests available.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
