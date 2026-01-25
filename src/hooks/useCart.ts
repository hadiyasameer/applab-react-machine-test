import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { addToCart, removeFromCart, updateQuantity } from "../app/cartSlice";
import type { CartItem } from "../types";

const TAX_RATE = 0.05;
const DISCOUNT_RATE = 0.1;
const DISCOUNT_THRESHOLD = 100;
const MIN_CART_VALUE = 10;

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * TAX_RATE;

  const discount =
    subtotal > DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0;

  const total = subtotal + tax - discount;

  const isMinValueMet = subtotal >= MIN_CART_VALUE;

  const addItem = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  const removeItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const changeQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(productId));
      return;
    }

    if (quantity > 5) return;

    dispatch(updateQuantity({ productId, quantity }));
  };
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  return {
    items,
    subtotal,
    tax,
    discount,
    total,
    isMinValueMet,
    addItem,
    removeItem,
    changeQuantity,
  };
};
