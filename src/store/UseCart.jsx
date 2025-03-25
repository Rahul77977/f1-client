import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) {
      const parsedCart = JSON.parse(existingCartItem);
      const updatedCart = parsedCart.map((item) => ({
        ...item,
        quantity: item.quantity ?? 1,
      }));
      setCart(updatedCart);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { useCart, CartProvider };
