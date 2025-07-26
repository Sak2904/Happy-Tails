import React, { useEffect, useState } from "react";

const testimonials = [
  {
    image: "/images/rev2.jpeg",
    message: "Adopting Bruno changed our lives. Thank you, HappyTails!",
    name: "Aditi & Family",
    rating: 3,
  },
  {
    image: "/images/rev4.jpeg",
    message:
      "Mittens is a bundle of love. Best decision ever! The adoption process is very easy and quick.",
    name: "Pooja",
    rating: 4,
  },
  {
    image: "/images/rev5.jpeg",
    message:
      "Rusty is the most playful pup. We can't imagine life without him now! I would recommend HappyTails to my friends.",
    name: "Neha & Raj",
    rating: 4,
  },
  {
    image: "/images/rev3.jpeg",
    message: "Tiny the kitten has brought joy and cuddles into my life.",
    name: "Akshay",
    rating: 4,
  },
  {
    image: "/images/rev6.jpeg",
    message:
      "Thank you for helping us find our forever companion! My daughter has a cute lil bestfriend now.",
    name: "Sarthak",
    rating: 3,
  },
  {
    image: "/images/rev7.jpeg",
    message: "Our little Simba is now the king of our home!",
    name: "Zaveri Family",
    rating: 3,
  },
  {
    image: "/images/rev.jpeg",
    message: "Adopting through HappyTails was seamless and full of love!",
    name: "Singh Family",
    rating: 3,
  },
];

const Home = () => {
  const [startIndex, setStartIndex] = useState(0);

  // Auto-slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 3) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Show 2 at a time
  const visibleTestimonials = [
    testimonials[startIndex],
    testimonials[(startIndex + 1) % testimonials.length],
    testimonials[(startIndex + 2) % testimonials.length],
  ];

  return (
    <div>
      {/* Hero Section */}
      <div
        className="home-container"
        style={{
          backgroundImage: "url('/images/wall4.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div className="home-content">
          <h1>HappyTails - Adopt, Care & Love</h1>
          <p>Find your perfect furry friend today!</p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div
        style={{
          backgroundColor: "#f8f8f8",
          padding: "20px 20px",
          borderTop: "2px solid #ccc",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px",marginTop: "10px", color: "#5a3531", fontSize: "2rem" }}>
          Tails of Joy 🐾❤️
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {visibleTestimonials.map((t, idx) => (
            <div
              key={idx}
              style={{
                maxWidth: "300px",
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={t.image}
                alt={t.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              />
              <p style={{ fontStyle: "italic" }}>“{t.message}”</p>
              <strong style={{ display: "block", marginTop: "10px" }}>{t.name}</strong>
              <div style={{ color: "#ffbb00", fontSize: "18px" }}>
                {"★".repeat(t.rating) + "☆".repeat(5 - t.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
