import { Cart } from "@/api";
import { createContext, useEffect, useState } from "react";

const cartCrtl = new Cart();

export const CartContext = createContext();

export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(cartCrtl.count());

  useEffect(() => {
    const response = cartCrtl.getAll();
    setCart(response);
  }, []);

  const addCart = (gameId) => {
    cartCrtl.add(gameId);
    refleshTotalCart();
  };

  const changeQuantityItem = (gameId, quantity) => {
    cartCrtl.changeQuantity(gameId, quantity);
    refleshTotalCart();
  };

  const refleshTotalCart = () => {
    setTotal(cartCrtl.count());
    setCart(cartCrtl.getAll());
  };

  const deleteItem = (gameId) => {
    cartCrtl.delete(gameId);
    refleshTotalCart();
  };

  const deleteAllItems = () => {
    cartCrtl.deleteAll();
    refleshTotalCart();
  };

  const data = {
    cart,
    addCart,
    total,
    deleteItem,
    deleteAllItems,
    changeQuantityItem,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
