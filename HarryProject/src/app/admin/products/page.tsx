"use client";

import { useEffect, useState } from 'react';
import { deleteProduct, fetchProducts } from '../../api/adminServices';
import { Product } from '../../../types';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to load products', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteProduct(id);
                setProducts(prev => prev.filter(user => user._id !== id));
            } catch (error) {
                console.error("Failed to delete user", error);
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8">Loading products...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Products</h1>
            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Price</th>
                            <th className="py-2 px-4 text-left">Category</th>
                            <th className="py-2 px-4 text-left">Seller</th>
                            <th className="py-2 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className="border-t">
                                <td className="py-2 px-4">{product.name}</td>
                                <td className="py-2 px-4">₹{product.price}</td>
                                <td className="py-2 px-4">{product.category}</td>
                                <td className="py-2 px-4">{product.sellerId?.name}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
