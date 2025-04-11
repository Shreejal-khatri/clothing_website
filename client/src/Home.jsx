import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Postcard from "./components/Postcard";
import { useNavigate } from "react-router-dom";
import LoginModal from "./components/LoginModal";

// Import custom images
import heroBg from "./images/hero-bg.jpg";
import mensBg from "/assets/Home_pic.jpg";
import womensBg from "./images/homewoman.jpg";
import aboutImg from "./images/about-us.jpg";

// Import brand logos
import nikeLogo from "./images/nike.png";
import adidasLogo from "./images/addiddass.png";
import pumaLogo from "./images/puma.png";
import gucciLogo from "./images/guccci.png";

const Home = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  //Check if the user is logged in
  const isLoggedIn = localStorage.getItem("user") !== null;

  const featuredProducts = [
    { id: 1, name: "Men's Section", image: mensBg, category: "men" },
    { id: 2, name: "Women's Section", image: womensBg, category: "women" },
  ];

  const brandLogos = [
    { id: 1, name: "Nike", logo: nikeLogo },
    { id: 2, name: "Adidas", logo: adidasLogo },
    { id: 3, name: "Puma", logo: pumaLogo },
    { id: 4, name: "Gucci", logo: gucciLogo },
  ];

  // Handle the "Shop Now" button click
  const handleShopNow = () => {
    if (isLoggedIn) {
      navigate("/item"); // Redirect to the Item.jsx page
    } else {
      setShowLoginModal(true); // Show the login modal
    }
  };

  // Handle the card click
  const handleCardClick = (category) => {
    if (isLoggedIn) {
      // Redirect to the respective page based on the category
      if (category === "men") {
        navigate("/item"); // Men's Section goes to /item
      } else if (category === "women") {
        navigate("/woman-item"); // Women's Section goes to /woman-item
      }
    } else {
      setShowLoginModal(true); // Show the login modal
    }
  };

  return (
    <>
      <Navbar />

      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

      <MDBContainer fluid className="p-0">
        {/* Hero Section */}
        <div
          className="p-5 text-center bg-image"
          style={{
            backgroundImage: `url(${heroBg})`,
            height: "400px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="8">
              <h1
                className="text-white mb-4"
                style={{ fontSize: "3rem", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
              >
                Welcome to KhatriShops
              </h1>
              <p
                className="text-white mb-4"
                style={{ fontSize: "1.5rem", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
              >
                Discover the latest trends in fashion
              </p>
              <div className= 'text-center'>
              <button
                onClick={handleShopNow}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "5px",
                  fontSize: "1.1rem",
                  transition: "background-color 0.3s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#ffffff")}
              >
                Shop Now
              </button>
              </div>
            </MDBCol>
          </MDBRow>
        </div>

        {/* About Us Section */}
        <MDBContainer className="mt-5 py-5">
          <MDBRow className="align-items-center">
            <MDBCol md="6">
              <h2 className="mb-4 pb-3" style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                About Us
              </h2>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
                At KhatriShops, we are dedicated to bringing you the latest fashion trends with quality and
                affordability. Whether you're looking for the latest styles or timeless classics, we have something for
                you.
              </p>
              <button
                onClick={() => (window.location.href = "/about")}
                style={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "5px",
                  fontSize: "1.1rem",
                  transition: "background-color 0.3s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#000000")}
              >
                Learn More
              </button>
            </MDBCol>
            <MDBCol md="6">
              <img
                src={aboutImg}
                alt="About Us"
                className="img-fluid rounded"
                style={{ boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        {/* Featured Sections */}
        <MDBContainer className="mt-5 py-5 ">
          <h2 className="text-center mb-4 pb-3">Featured Sections</h2>
          <MDBRow>
            {featuredProducts.map((product) => (
              <MDBCol md="6" key={product.id} className="mt-4">
                <Postcard
                  product={product}
                  onClick={() => handleCardClick(product.category)} // Pass the category
                />
              </MDBCol>
            ))}
          </MDBRow>
        </MDBContainer>

        {/* Affiliated Brands Section */}
        <MDBContainer className="mt-5 py-5">
          <h2 className="text-center mb-4 pb-3">Affiliated Brands</h2>
          <MDBRow className="justify-content-center">
            {brandLogos.map((brand) => (
              <MDBCol key={brand.id} md="3" sm="6" className="text-center mt-4">
                <div style={{ cursor: "default" }}>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="img-fluid"
                    style={{ maxWidth: "150px", transition: "transform 0.3s ease-in-out" }}
                    onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                  />
                </div>
                <p className="mt-2" style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  {brand.name}
                </p>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBContainer>
      </MDBContainer>

      <Footer />
    </>
  );
};

export default Home;