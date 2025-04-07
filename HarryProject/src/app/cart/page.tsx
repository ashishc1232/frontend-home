"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    discountPrice?: number;
    images: string[];
  };
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Function to decide which price to use (discountPrice if available)
  const getUnitPrice = (item: CartItem) => {
    return item.product.discountPrice || item.product.price;
  };

  // Calculate the grand total amount
  const calculateGrandTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce((total, item) => {
      return total + getUnitPrice(item) * item.quantity;
    }, 0);
  };

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        credentials: "include",
      });
      const data = await res.json();
      setCart(data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Cart updated successfully!");
        fetchCart();
      } else {
        setMessage(data.message || "Failed to update cart");
      }
    } catch (error: any) {
      setMessage(error.message || "Server error");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Cart</h1>
      {message && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 text-center rounded">
          {message}
        </div>
      )}
      {cart?.items.length ? (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 border p-4 rounded"
            >
              <div className="relative h-20 w-20">
                <Image
                  src={`http://localhost:5000${item.product.images[0]}`}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-medium">{item.product.name}</h2>
                <p className="text-sm text-gray-600">
                  Unit Price: ₹{getUnitPrice(item).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  Line Total: ₹{(getUnitPrice(item) * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity + 1)
                  }
                >
                  +
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold">
              Grand Total: ₹{calculateGrandTotal().toFixed(2)}
            </h2>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
