import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useCart } from "./context/CartContext"; // Adjust the import path as needed

const PaymentSuccess = () => {
  const { clearCart } = useCart(); // Access the clearCart function
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const data = params.get("data");

    if (data) {
      try {
        const decodedData = JSON.parse(atob(data)); // Decode base64
        console.log("Payment Success Data:", decodedData);

        // Update payment status in the backend
        const updatePaymentStatus = async () => {
          const orderId = localStorage.getItem("pendingOrderId"); // Get stored order ID
          if (!orderId) return;

          const paymentData = {
            orderId,
            paymentDetails: {
              transaction_uuid: decodedData.transaction_uuid,
              paymentMethod: "eSewa",
              paymentDate: new Date(),
            },
            paymentStatus: "Completed",
          };

          try {
            const response = await fetch("http://localhost:3000/orders/update-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(paymentData),
            });

            const result = await response.json();
            if (response.ok) {
              console.log("Payment status updated successfully:", result);
              localStorage.removeItem("pendingOrderId"); // Clear stored order ID
              clearCart(); // Clear the cart after successful payment
            } else {
              console.error("Error updating payment:", result.message);
            }
          } catch (error) {
            console.error("Error updating payment:", error);
          }
        };

        updatePaymentStatus();
      } catch (error) {
        console.error("Failed to parse payment data:", error);
      }
    }

    // Redirect to home after 5 seconds
    setTimeout(() => navigate("/"), 5000);
  }, [location, navigate, clearCart]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex justify-center"
        >
          <CheckCircle size={80} className="text-green-500" />
        </motion.div>
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          Payment Successful 🎉
        </h2>
        <p className="text-gray-600 mt-2">Thank you for your purchase!</p>
        <p className="text-gray-500 text-sm mt-1">
          Redirecting to homepage in 5 seconds...
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;