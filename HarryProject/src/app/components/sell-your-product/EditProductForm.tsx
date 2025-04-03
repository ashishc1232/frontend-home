"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import { categories, subcategories } from "./categories";

export default function EditProductForm({ productId }: { productId: string }) {
  const router = useRouter();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    unit: "piece",
    deliveryTime: "2-3 days",
    category: "",
    subcategory: "",
    returnPolicy: "No Return",
    paymentMode: "COD",
    contact: "",
    location: "",
    images: [] as File[], // Stores an array of files
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing product details
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (response.ok) {
          setProduct((prev) => ({
            ...prev,
            ...data.product, // Set fetched product data
          }));
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Something went wrong while fetching the product!");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  // Handle text, select, and textarea inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setProduct((prev) => ({
        ...prev,
        [name]: Array.from(files), // Convert FileList to an array
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all non-image fields
    Object.keys(product).forEach((key) => {
      if (key !== "images" && product[key as keyof typeof product]) {
        formData.append(key, product[key as keyof typeof product] as string);
      }
    });

    // Append each image file
    product.images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(`http://localhost:5000/api/products/update/${productId}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        alert("Product updated successfully!");
        router.push("/seller-dashboard"); // Redirect to dashboard or product list
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-white pt-16 pb-16">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-yellow-800 text-center mb-6">
            Edit Your Product
          </h2>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={product.name}
                placeholder="Product Name"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <textarea
                name="description"
                value={product.description}
                placeholder="Product Description"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              ></textarea>
              <input
                type="number"
                name="price"
                value={product.price}
                placeholder="Price"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="number"
                name="discountPrice"
                value={product.discountPrice}
                placeholder="Discount Price (Optional)"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                name="stock"
                value={product.stock}
                placeholder="Stock Quantity"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />

              <select name="category" value={product.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select name="subcategory" value={product.subcategory} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required>
                <option value="">Select Subcategory</option>
                {product.category &&
                  subcategories[product.category]?.map((sub: string) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
              </select>

              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-lg"
              />

              <button type="submit" className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700">
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
