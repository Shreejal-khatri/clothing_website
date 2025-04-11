import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.heading}>About Us</h1>
        <div style={styles.content}>
          {/* Left Image (Slightly Higher) */}
          <div style={styles.leftImageContainer}>
            <img
              src="/assets/aboutus-1.jpg" 
              alt="About Us"
              style={styles.image}
            />
          </div>

          {/* Text Content */}
          <div style={styles.textContainer}>
            <p style={styles.text}>
              At KhatriShops, we are dedicated to bringing you the latest fashion trends with quality and affordability.
              Whether you're looking for the latest styles or timeless classics, we have something for you. Our mission
              is to provide a seamless shopping experience for our customers, offering a wide range of products that
              cater to all your fashion needs.
            </p>
            <p style={styles.text}>
              Founded in 2024, KhatriShops has quickly become a trusted name in the fashion industry. We source our
              products from the best brands and designers around the world, ensuring that you get the best quality at
              competitive prices. Our team is passionate about fashion and committed to helping you look and feel your
              best.
            </p>
            <p style={styles.text}>
              We believe that fashion is more than just clothing—it's a way to express yourself and make a statement.
              That's why we offer a diverse collection of products, from casual wear to formal attire, so you can find
              the perfect outfit for any occasion. Our customer service team is always here to assist you, ensuring that
              your shopping experience is smooth and enjoyable.
            </p>
          </div>

          {/* Right Image (Slightly Lower) */}
          <div style={styles.rightImageContainer}>
            <img
              src="/assets/aboutus-2.jpg" // Replace with your image path
              alt="About Us"
              style={styles.image}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

// Styles
const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: "30px",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    gap: "30px",
    alignItems: "flex-start", // Align items to the top
  },
  leftImageContainer: {
    flex: 1,
    marginTop: "-50px", // Move the left image slightly higher
  },
  rightImageContainer: {
    flex: 1,
    marginTop: "150px", // Move the right image slightly lower
  },
  textContainer: {
    flex: 2,
  },
  text: {
    fontSize: "1.1rem",
    lineHeight: "1.8",
    color: "#555",
    marginBottom: "20px",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default AboutUs;