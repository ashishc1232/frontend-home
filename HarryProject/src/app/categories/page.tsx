"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SellYourProduct from "../components/sell-your-product/SellYourProduct";
import { useSellerAuth } from "@/context/authContextSeller";

export default function CategoriesPage() {
 
  const { seller, loading } = useSellerAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !seller) {
      router.replace("/Sell-log-in"); // use replace instead of push
    }
  }, [seller, loading, router]);

  <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>

  if (!seller) {
    return null;
  }

  return (
    <div>
     <SellYourProduct />
    </div>
  );
}
