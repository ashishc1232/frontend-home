"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { toast } from "sonner";
import { useAuth } from "./auth-context";

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartContextProps {
  cartItems: CartItem[];
  refreshCart: () => Promise<void>;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
}

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  refreshCart: async () => {},
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateCartItem: async () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Refresh the cart from the backend for the logged-in user.
  const refreshCart = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }
    try {
      const res = await fetch("/api/cart", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        // Expect the returned data to have an "items" array
        setCartItems(data.items || []);
      } else {
        toast.error("Failed to load cart.");
      }
    } catch (error) {
      toast.error("Error loading cart.");
    }
  };

  useEffect(() => {
    refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addToCart = async (item: CartItem) => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(item),
      });
      if (res.ok) {
        toast.success("Added successfully!");
        refreshCart();
      } else {
        toast.error("Failed to add item.");
      }
    } catch (error) {
      toast.error("Error adding item.");
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;
    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        toast.success("Item removed.");
        refreshCart();
      } else {
        toast.error("Failed to remove item.");
      }
    } catch (error) {
      toast.error("Error removing item.");
    }
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    if (!user) return;
    try {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });
      if (res.ok) {
        toast.success("Cart updated.");
        refreshCart();
      } else {
        toast.error("Failed to update item.");
      }
    } catch (error) {
      toast.error("Error updating cart.");
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, refreshCart, addToCart, removeFromCart, updateCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
