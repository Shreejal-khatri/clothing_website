
// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "30px",
    color: "#333",
  },
  cartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  cartItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  image: {
    width: "150px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  itemDetails: {
    flex: 1,
    textAlign: "center",
  },
  itemName: {
    fontSize: "1.4rem",
    color: "#333",
    marginBottom: "10px",
  },
  itemPrice: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "10px",
  },
  itemSize: {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "10px",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  quantityButton: {
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  removeButton: {
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginLeft: "10px",
  },
  totalPrice: {
    fontSize: "1.8rem",
    marginTop: "30px",
    fontWeight: "bold",
  },
  emptyCart: {
    fontSize: "1.5rem",
    color: "#666",
    marginTop: "20px",
  },
  shopLink: {
    fontSize: "1.2rem",
    color: "#007bff",
    textDecoration: "none",
    marginTop: "10px",
    display: "block",
  },
  orderButton: {
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2rem",
    marginTop: "20px",
  },
};

import React from "react";
import { useEffect } from "react";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext"; // Import useAuth
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CryptoJS from "crypto-js";

const Cart = () => {
  
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const { userId } = useAuth(); // Get currentUser from AuthContext

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  

  useEffect(() => {
    if (!userId) {
      ("Please log in to proceed with your order.");
    }
  }, [userId]);

  const handleEsewaPayment = async (amount) => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items before proceeding.");
      return;
    }
    
    const transactionUUID = `txn_${Date.now()}`;
    const productCode = "EPAYTEST";
    const totalAmount = amount.toFixed(2);

    try {
      // Save order to database
      const orderResponse = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({
          userId: userId, // Include the user ID
          items: cart,
          totalPrice: totalAmount,
          paymentStatus: "Pending",
          paymentDetails: {
            transaction_uuid: transactionUUID,
            paymentMethod: "eSewa",
          },
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

      const orderData = await orderResponse.json();
      localStorage.setItem("pendingOrderId", orderData.order._id);

      clearCart();

      // Proceed to eSewa payment
      const signature = CryptoJS.HmacSHA256(
        `total_amount=${totalAmount},transaction_uuid=${transactionUUID},product_code=${productCode}`,
        "8gBm/:&EnhH.1/q"
      ).toString(CryptoJS.enc.Base64);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      const formData = {
        amount: totalAmount,
        tax_amount: "0",
        total_amount: totalAmount,
        transaction_uuid: transactionUUID,
        product_code: productCode,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: "http://localhost:5173/payment-success",
        failure_url: "http://localhost:5173/payment-failed",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: signature,
      };

      Object.entries(formData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.heading}>🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <div>
            <p style={styles.emptyCart}>Your cart is empty.</p>
            <Link to="/" style={styles.shopLink}>
              🛍 Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div style={styles.cartGrid}>
              {cart.map((item) => (
                <div key={`${item._id}-${item.size}`} style={styles.cartItem}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={styles.image} 
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                  <div style={styles.itemDetails}>
                    <h3 style={styles.itemName}>{item.name}</h3>
                    <p style={styles.itemPrice}>Price: {item.price}</p>
                    <p style={styles.itemSize}>Size: {item.size}</p>
                    <div style={styles.quantityControls}>
                      <button
                        style={styles.quantityButton}
                        onClick={() => decreaseQuantity(item._id, item.size)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        style={styles.quantityButton}
                        onClick={() => increaseQuantity(item._id, item.size)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        style={styles.removeButton}
                        onClick={() => removeFromCart(item._id, item.size)}
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 style={styles.totalPrice}>
                Total: NPR {totalPrice.toFixed(2)}
              </h3>
              <button
                style={styles.orderButton}
                onClick={() => handleEsewaPayment(totalPrice)}
                disabled={cart.length === 0}
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};


export default Cart;