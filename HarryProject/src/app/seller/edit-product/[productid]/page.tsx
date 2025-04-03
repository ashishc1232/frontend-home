"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { categories, subcategories } from "../../../components/sell-your-product/categories";
import { Button } from "@/components/ui/button";
export default function EditProductForm() {
  const router = useRouter();
  const params = useParams();
  const productid = params.productid as string; // ✅ Ensure productid is a string

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
    images: [] as File[],
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null); // ✅ Added success/error messages
  
  const handleBack = () => {
    router.push("/seller/product") // Back to the main categories page
  }
  // ✅ Fetch existing product details
  useEffect(() => {
    if (!productid) return;

    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productid}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        setProduct((prev) => ({ ...prev, ...data.product })); // ✅ Corrected state update
  // Set success message
  setMessage("Product Updated successfully!");

  // Clear message after 3 seconds
  setTimeout(() => {
    setMessage("");
  }, 3000);

      } catch (error) {
        console.error("Error fetching product:", error);
        setMessage("Error fetching product details.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productid]);

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ✅ Handle file input change (Fixed)
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setProduct((prev) => ({
  //       ...prev,
  //       images: Array.from(e.target.files), // ✅ Correctly update images
  //     }));
  //   }
  // };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // ✅ Append text fields
    Object.keys(product).forEach((key) => {
      if (key !== "images" && product[key as keyof typeof product]) {
        formData.append(key, product[key as keyof typeof product] as string);
      }
    });

    // ✅ Append images correctly
    product.images.forEach((file) => formData.append("images", file));

    try {
      const response = await fetch(`http://localhost:5000/api/products/update/${productid}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Product updated successfully!");
        setTimeout(() => router.push("/seller/product"), 2000); // ✅ Redirect after success
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-white pt-16 pb-16">
         {/* Back to Category Button */}
         <div>
         <div className="absolute  top-4 right-14">
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-300"
          >
            ⬅ Back to Your Product
          </button>
        </div>
         </div>
         

        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              {/* Success Message Display */}
      {message && (
        <div className="text-center w-full bg-yellow-500 text-white py-2 rounded-md mb-4">
          {message}
        </div>
      )}
          <h2 className="text-2xl font-bold text-yellow-800 text-center mb-6">
            Update Your Product
          </h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" className="w-full px-4 py-2 border rounded-lg" required />
            <textarea name="description" value={product.description} onChange={handleChange} placeholder="Product Description" className="w-full px-4 py-2 border rounded-lg" required />
            <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="w-full px-4 py-2 border rounded-lg" required />
            <input type="number" name="discountPrice" value={product.discountPrice} onChange={handleChange} placeholder="Discount Price (Optional)" className="w-full px-4 py-2 border rounded-lg" />
            <input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Stock Quantity" className="w-full px-4 py-2 border rounded-lg" required />
            <select
              name="unit"
              onChange={handleChange}
              value={product. unit}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="piece">Piece</option>
              <option value="kg">Kg</option>
              <option value="liter">Liter</option>
            </select>

            <select
              name="deliveryTime"
              value={product.deliveryTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="2-3 days">2-3 Days</option>
              <option value="Same-day">Same-day</option>
              <option value="1 week">1 Week</option>
            </select>

            <select name="category" value={product.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.id}</option>
              ))}
            </select>

            
                        <select
                          name="subcategory"
                           value={product. subcategory}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg"
                          disabled={!product.category}
                          required
                        >
                          <option value="">Select Subcategory</option>
                          {product.category &&
                            subcategories[product.category]?.map((sub: string) => (
                              <option key={sub} value={sub}>
                                {sub}
                              </option>
                            ))}
                        </select>
            
                        <select
                          name="returnPolicy"
                           value={product. returnPolicy}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg"
                        >
                          <option value="No Return">No Return</option>
                          <option value="7 Days Return">7 Days Return</option>
                          <option value="30 Days Return">30 Days Return</option>
                        </select>
            
                        <select
                          name="paymentMode"
                           value={product. paymentMode}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg"
                        >
                          <option value="COD">COD</option>
                          <option value="Online Payment">Online Payment</option>
                          <option value="Both">Both</option>
                        </select>
            
                        <input
                          type="text"
                          name="contact"
                          placeholder="Seller Contact Number"
                           value={product. contact}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg"
                          required
                        />
                        <input
                          type="text"
                          name="location"
                          placeholder="Seller Location"
                           value={product. location}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg"
                          required
                        />
            
                        {/* <input
                          type="file"
                          name="images"
                          multiple
                          accept="image/*"
                           value={product. images}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg"
                          required
                        /> */}
            

            {/* <input type="file" name="images" multiple accept="image/*" onChange={handleFileChange} className="w-full px-4 py-2 border rounded-lg" /> */}

            <button type="submit" className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700">
              Save Changes
            </button>
          </form>
        )}
      </div>
      </div>
  );
}
