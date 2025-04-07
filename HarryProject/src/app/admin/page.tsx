// app/admin/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchDashboardData } from '../api/adminServices';
import { DashboardSummary } from '../../types/index';

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        const loadDashboard = async () => {
            try {
                const data = await fetchDashboardData();
                setDashboardData(data);
            } catch (error) {
                console.error('Failed to load dashboard data', error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, [router]);

    if (loading) {
        return <div className="flex justify-center p-8">Loading dashboard...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            {dashboardData && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatCard
                            title="Total Users"
                            value={dashboardData.counts.users}
                            icon="👤"
                        />
                        <StatCard
                            title="Total Sellers"
                            value={dashboardData.counts.sellers}
                            icon="🏪"
                        />
                        <StatCard
                            title="Total Products"
                            value={dashboardData.counts.products}
                            icon="📦"
                        />
                        <StatCard
                            title="Total Orders"
                            value={dashboardData.counts.orders}
                            icon="📋"
                        />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Revenue</h2>
                        <p className="text-3xl font-bold">
                            ₹{dashboardData.revenue ? dashboardData.revenue.toLocaleString() : '0'}
                        </p>

                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                        <div className="bg-white rounded shadow overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-2 px-4 text-left">Order ID</th>
                                        <th className="py-2 px-4 text-left">Customer</th>
                                        <th className="py-2 px-4 text-left">Items</th>
                                        <th className="py-2 px-4 text-left">Amount</th>
                                        <th className="py-2 px-4 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dashboardData.recentOrders.map(order => (
                                        <tr key={order._id} className="border-t">
                                            <td className="py-2 px-4">{order._id.substring(0, 8)}</td>
                                            <td className="py-2 px-4">{order.user.name}</td>
                                            <td className="py-2 px-4">{order.items.length} items</td>
                                            <td className="py-2 px-4">₹{order.finalAmount}</td>
                                            <td className="py-2 px-4">
                                                <span className={`px-2 py-1 rounded text-xs ${order.status === "Successful" ? "bg-green-100 text-green-800" :
                                                        order.status === "Processing" ? "bg-blue-100 text-blue-800" :
                                                            "bg-yellow-100 text-yellow-800"
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

const StatCard = ({ title, value, icon }: { title: string, value: number, icon: string }) => (
    <div className="bg-white p-4 rounded shadow flex items-center">
        <div className="text-3xl mr-4">{icon}</div>
        <div>
            <p className="text-gray-600 text-sm">{title}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
    </div>
);