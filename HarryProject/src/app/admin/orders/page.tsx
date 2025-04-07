"use client";

import { useEffect, useState } from 'react';
import { deleteOrder, fetchOrders } from '../../api/adminServices';
import { Order } from '../../../types';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchOrders();
                setOrders(data);
            } catch (error) {
                console.error('Failed to load orders', error);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteOrder(id);
                setOrders(prev => prev.filter(user => user._id !== id));
            } catch (error) {
                console.error("Failed to delete user", error);
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8">Loading orders...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Orders</h1>
            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">Order ID</th>
                            <th className="py-2 px-4 text-left">Customer</th>
                            <th className="py-2 px-4 text-left">Items</th>
                            <th className="py-2 px-4 text-left">Amount</th>
                            <th className="py-2 px-4 text-left">Status</th>
                            <th className="py-2 px-4 text-left">Seller</th>
                            <th className="py-2 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="border-t">
                                <td className="py-2 px-4">{order._id.slice(0, 8)}</td>
                                <td className="py-2 px-4">{order.user?.name}</td>
                                <td className="py-2 px-4">{order.items?.length} items</td>
                                <td className="py-2 px-4">₹{order.finalAmount}</td>
                                <td className="py-2 px-4">
                                    <span className={`px-2 py-1 rounded text-xs ${order.status === "Successful" ? "bg-green-100 text-green-800" :
                                            order.status === "Processing" ? "bg-blue-100 text-blue-800" :
                                                "bg-yellow-100 text-yellow-800"
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-2 px-4">{order.seller?.name}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleDelete(order._id)}
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
