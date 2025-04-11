import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const PaymentFailure = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const data = params.get("data");

    if (data) {
      try {
        const decodedData = JSON.parse(atob(data)); // Decode base64
        console.log("Payment Failure Data:", decodedData);
      } catch (error) {
        console.error("Failed to parse payment data:", error);
      }
    }

    // Redirect to home after 5 seconds
    setTimeout(() => navigate("/"), 5000);
  }, [location, navigate]);

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
          <XCircle size={80} className="text-red-500" />
        </motion.div>
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          Payment Failed ❌
        </h2>
        <p className="text-gray-600 mt-2">Something went wrong with your payment.</p>
        <p className="text-gray-500 text-sm mt-1">
          Redirecting to homepage in 5 seconds...
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentFailure;
