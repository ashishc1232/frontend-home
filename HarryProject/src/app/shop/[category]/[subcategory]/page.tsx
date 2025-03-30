"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/app/components/After_log_homepage/ProductCard";
import Image from "next/image";
import notfound from '../../../../../public/shop/notfound.png'
import { div } from "framer-motion/client";

export default function SubcategoryPage() {
  const params = useParams();
  const category = params?.category as string | undefined;
  const subcategory = params?.subcategory as string | undefined;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!category || !subcategory) {
      console.log("Category or subcategory not available yet");
      return;
    }

    async function fetchProducts() {
      const apiURL = `http://localhost:5000/api/products?category=${encodeURIComponent(category ?? "")}&subcategory=${encodeURIComponent(subcategory ?? "")}`;

      console.log("🔍 API Call URL:", apiURL);

      try {
        const response = await fetch(apiURL);
        console.log("✅ API Response Status:", response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch products. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("📦 Fetched Data:", data);

        setProducts(data.products || []);
      } catch (err: any) {
        console.error("❌ Error fetching products:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, subcategory]);

  if (loading) 
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="lg:px-12 mx-auto px-4 py-8">
      <h1 className="text-3xl  mx-auto font-bold mb-6 capitalize">
        {subcategory?.replace("-", " ")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => {
            const productId = product._id || product.id;
            return <ProductCard key={productId} id={productId} {...product} />;
          })
        ) : (
          <div className="col-span-full flex justify-center items-center h-[50vh]">
          <Image src={notfound || "/placeholder.svg"} alt="No products found" />
        </div>

          
        )}

      </div>
    </div>
  );
}
