import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id && cartItem.size === item.size);
      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        return prevCart.map((cartItem) =>
          cartItem._id === item._id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      // If the item is not in the cart, add it with the selected quantity
      return [...prevCart, { ...item }];
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem._id !== itemId));
  };

  // Increase item quantity
  const increaseQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  // Decrease item quantity
  const decreaseQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem._id === itemId && cartItem.quantity > 1
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0) // Remove if quantity is 0
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };


  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        calculateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};