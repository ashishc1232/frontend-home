"use client";

import { useEffect, useState } from 'react';
import { deleteSeller, fetchSellers } from '../../api/adminServices';
import { Seller } from '../../../types';

export default function SellersPage() {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSellers = async () => {
            try {
                const data = await fetchSellers();
                setSellers(data);
            } catch (error) {
                console.error('Failed to load sellers', error);
            } finally {
                setLoading(false);
            }
        };

        loadSellers();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteSeller(id);
                setSellers(prev => prev.filter(user => user._id !== id));
            } catch (error) {
                console.error("Failed to delete user", error);
            }
        }
    };


    if (loading) {
        return <div className="flex justify-center p-8">Loading sellers...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Sellers</h1>
            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Email</th>
                            <th className="py-2 px-4 text-left">Mobile</th>
                            <th className="py-2 px-4 text-left">Joined</th>
                            <th className="py-2 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map(seller => (
                            <tr key={seller._id} className="border-t">
                                <td className="py-2 px-4">{seller.name}</td>
                                <td className="py-2 px-4">{seller.email}</td>
                                <td className="py-2 px-4">{seller.mobile}</td>
                                <td className="py-2 px-4">
                                    {new Date(seller.createdAt).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleDelete(seller._id)}
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
