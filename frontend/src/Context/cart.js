import React, { createContext, useContext, useEffect, useState } from "react";
const CartContext = createContext();
const Cart = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    let existingCartItems = localStorage.getItem("cart");
    if (existingCartItems) setCart(JSON.parse(existingCartItems));
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
const useCart = () => useContext(CartContext);

export { useCart, Cart };
