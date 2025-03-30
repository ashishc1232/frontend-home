"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash } from "lucide-react";

// Product interface for TypeScript
interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Fetch products for the current seller using the new endpoint
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products/mine", {
        credentials: "include", // Send cookies with the request
      });
      if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
      const data = await res.json();
      console.log("Fetched products:", data);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Delete Product
  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Filter products based on search and category
  const filteredProducts = products.filter(product =>
    (selectedCategory === "All" || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Product Management</h1>
        <Button className="bg-black text-white px-4 py-2 rounded-md">+ Add New Product</Button>
      </div>

      <div className="grid grid-cols-4 gap-4 bg-white p-6 shadow-md rounded-lg mb-6">
        <StatCard title="Total Products" value={products.length} />
        <StatCard title="Total Stock" value={products.reduce((sum, p) => sum + p.stock, 0)} />
        <StatCard title="Total Sold" value={products.reduce((sum, p) => sum + p.sold, 0)} />
        <StatCard title="Categories" value={[...new Set(products.map(p => p.category))].length} />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="w-1/4 border p-2 rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {[...new Set(products.map(p => p.category))].map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left bg-gray-100">
              <th className="p-3">Product Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price (₹)</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Sold</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product._id} className="border-b">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">₹{product.price}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">{product.sold}</td>
                <td className="p-3 flex gap-2">
                  <Button className="bg-gray-200 text-gray-800 px-2 py-1">
                    <Pencil size={16} />
                  </Button>
                  <Button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white px-2 py-1">
                    <Trash size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// StatCard Component
function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
