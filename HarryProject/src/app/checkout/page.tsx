"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  deliveryTime: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const quantityParam = searchParams.get("quantity");
  const quantity = quantityParam ? parseInt(quantityParam) : 1;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD"); // default to COD
  const [message, setMessage] = useState("");
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;
      try {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product details");
        const data = await res.json();
        setProduct(data.product);
      } catch (err: any) {
        setMessage(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  // Calculate final amount: subtotal + tax + service fee
  const calculateFinalAmount = () => {
    if (!product) return 0;
    const unitPrice = product.discountPrice || product.price;
    const subtotal = unitPrice * quantity;
    const tax = subtotal * 0.05; // 5% tax
    const serviceFee = 50; // fixed service fee
    return subtotal + tax + serviceFee;
  };

  const finalAmount = calculateFinalAmount();

  // Dummy Razorpay Payment Simulation
  const handleDummyRazorpayPayment = () => {
    // Prepare dummy options similar to Razorpay integration
    const options = {
      key: "dummy_key", // Dummy key for simulation
      amount: finalAmount * 100, // amount in paise
      currency: "INR",
      name: "Dummy Razorpay",
      description: "Test Transaction",
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      notes: {
        address,
      },
      theme: {
        color: "#F37254",
      },
      // Handler to simulate a successful payment response
      handler: function (response: { razorpay_payment_id: string }) {
        toast.success("Payment successful via Razorpay (dummy)!");
        createOrder(); // Create order after dummy payment success
      },
    };

    setProcessingPayment(true);
    // Simulate delay like a real Razorpay checkout process
    setTimeout(() => {
      // Directly call the handler with a dummy payment id
      options.handler({ razorpay_payment_id: "dummy_payment_id_123" });
      setProcessingPayment(false);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!address.trim()) {
      setMessage("Shipping address is required");
      return;
    }

    if (paymentMethod === "Online Payment (Dummy)") {
      // Start dummy Razorpay simulation
      handleDummyRazorpayPayment();
    } else {
      // COD, directly create order
      await createOrder();
    }
  };

  const createOrder = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          items: [{ productId, quantity }],
          paymentMethod,
          address,
          finalAmount, 
        }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push(`/order-summary?orderId=${data.order._id}`);
      } else {
        setMessage(data.message || "Failed to create order");
      }
    } catch (error: any) {
      setMessage(error.message || "Server error");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  const unitPrice = product.discountPrice || product.price;
  const subtotal = unitPrice * quantity;
  const tax = subtotal * 0.05;
  const serviceFee = 50;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {message && <div className="mb-4 text-red-600">{message}</div>}
      
      <div className="border p-4 rounded mb-6">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p>Quantity: {quantity}</p>
        <p>
          Price: ₹{unitPrice.toFixed(2)} x {quantity} = ₹{subtotal.toFixed(2)}
        </p>
        <p>Tax (5%): ₹{tax.toFixed(2)}</p>
        <p>Service Fee: ₹{serviceFee.toFixed(2)}</p>
        <hr className="my-2" />
        <p className="font-bold">
          Final Amount: ₹{finalAmount.toFixed(2)}
        </p>
        <p>Estimated Delivery: {product.deliveryTime || "3-5 business days"}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Shipping Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border p-2 rounded"
            placeholder="Enter your shipping address"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Online Payment">Online Payment </option>
          </select>
        </div>

        <Button type="submit" className="w-full" disabled={processingPayment}>
          {processingPayment ? "Processing Payment..." : "Confirm Order"}
        </Button>
      </form>
    </div>
  );
}
