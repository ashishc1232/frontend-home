"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
}

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartItem } = useContext(CartContext);
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);

  // Fetch product details for each cart item
  useEffect(() => {
    async function fetchProducts() {
      const newProducts: Record<string, Product> = {};
      for (const item of cartItems) {
        const res = await fetch(`http://localhost:5000/api/products/${item.productId}`);
        if (res.ok) {
          const data = await res.json();
          newProducts[item.productId] = data.product;
        }
      }
      setProducts(newProducts);
      setLoading(false);
    }
    if (cartItems.length > 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [cartItems]);

  const handleQuantityChange = (productId: string, change: number) => {
    const item = cartItems.find((item) => item.productId === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      updateCartItem(productId, newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link href="/shop" className="text-primary underline">
            Continue shopping
          </Link>
          .
        </p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => {
            const product = products[item.productId];
            if (!product) return null;
            const itemPrice = product.discountPrice ?? product.price;
            return (
              <div
                key={item.productId}
                className="flex items-center p-4 border rounded-md"
              >
                <div className="w-24 h-24 relative">
                  {product.images && product.images.length > 0 && (
                    <Image
                      src={`http://localhost:5000${product.images[0]}`}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 ml-4">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-lg font-bold">₹{itemPrice.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.productId, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.productId, 1)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-lg font-bold">
                    ₹{(itemPrice * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>
            );
          })}
          <Separator />
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Total:</h2>
            <h2 className="text-2xl font-bold">
              ₹
              {cartItems
                .reduce((total, item) => {
                  const product = products[item.productId];
                  const itemPrice = product ? product.discountPrice ?? product.price : 0;
                  return total + itemPrice * item.quantity;
                }, 0)
                .toFixed(2)}
            </h2>
          </div>
          <Button className="w-full mt-4">Proceed to Checkout</Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
