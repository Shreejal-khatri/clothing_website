import React from "react";

export default function Postcard({ product, onClick }) {
  return (
    <div
      className="card shadow-sm"
      style={{
        backgroundImage: `url(${product.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "transform 0.3s ease",
      }}
      onClick={onClick} // Use the onClick prop passed from the parent
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div className="card-body text-center" style={{ padding: "20px" }}>
        <h5
          className="card-title"
          style={{
            color: "#fff",
            fontSize: "2rem",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          {product.name}
        </h5>
      </div>

      {/* Explore Button at the Bottom */}
      <div className="text-center p-3">
        <button
          className="btn btn-dark"
          onClick={(e) => {
            e.stopPropagation(); // Prevents card click from triggering when clicking the button
            onClick(); // Call the onClick prop
          }}
          style={{
            padding: "12px 20px",
            fontSize: "1.1rem",
            borderRadius: "5px",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
        >
          Explore
        </button>
      </div>
    </div>
  );
}