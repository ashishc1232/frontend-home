"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SellerDashboard() {
  const [totalSales] = useState(45600);
  const [totalOrders] = useState(62);
  const [totalProducts] = useState(24);
  const [pendingOrders] = useState(8);
  const [recentOrders] = useState([
    { id: "ORD-004", customer: "Sneha Desai", amount: "₹998", status: "Pending" },
    { id: "ORD-003", customer: "Riya Patil", amount: "₹848", status: "Delivered" },
  ]);

  const [topProducts] = useState([
    { name: "Handmade Spice Set", sales: "₹13972" },
    { name: "Cotton Dress - Blue", sales: "₹15588" },
    { name: "Ceramic Vase", sales: "₹13485" },
  ]);

  const [customerInsights] = useState({
    totalCustomers: 42,
    repeatCustomers: "68%",
    avgOrderValue: "₹735",
  });

  // Function to generate CSV Report
  const downloadReport = () => {
    const csvData = [
      ["Order ID", "Customer", "Amount", "Status"],
      ...recentOrders.map(order => [order.id, order.customer, order.amount, order.status]),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "seller_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Seller Dashboard</h1>
        <div className="flex gap-4">
          <Button onClick={downloadReport} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
            Download Report
          </Button>
          <Button className="bg-black text-white px-4 py-2 rounded-md">Add New Product</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Sales" value={`₹${totalSales}`} change="+12% from last month" />
        <StatCard title="Total Orders" value={totalOrders} change="+12% this month" />
        <StatCard title="Total Products" value={totalProducts} change="+3% this month" />
        <StatCard title="Pending Orders" value={pendingOrders} change="-2 from yesterday" />
      </div>

      {/* Orders & Top Products */}
      <div className="grid grid-cols-2 gap-6">
        <RecentOrders orders={recentOrders} />
        <TopProducts products={topProducts} />
      </div>

      {/* Customer Insights */}
      <CustomerInsights insights={customerInsights} />
    </div>
  );
}

// StatCard Component
function StatCard({ title, value, change }: { title: string; value: string | number; change: string }) {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-sm text-green-500">{change}</p>
    </div>
  );
}

// Recent Orders Component
function RecentOrders({ orders }: { orders: { id: string; customer: string; amount: string; status: string }[] }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold">Recent Orders</h3>
      {orders.map(order => (
        <div key={order.id} className="border-b py-2">
          <p className="text-sm font-medium">{order.id} - {order.customer}</p>
          <p className="text-sm text-gray-500">{order.amount} - <span className="text-yellow-500">{order.status}</span></p>
        </div>
      ))}
      <Button className="mt-3 text-white">View All Orders →</Button>
    </div>
  );
}

// Top Products Component
function TopProducts({ products }: { products: { name: string; sales: string }[] }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold">Top Products</h3>
      {products.map(product => (
        <div key={product.name} className="border-b py-2">
          <p className="text-sm font-medium">{product.name}</p>
          <p className="text-sm text-gray-500">{product.sales}</p>
        </div>
      ))}
      <Button className="mt-3 text-white">View All Products →</Button>
    </div>
  );
}

// Customer Insights Component
function CustomerInsights({ insights }: { insights: { totalCustomers: number; repeatCustomers: string; avgOrderValue: string } }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <h3 className="text-lg font-semibold">Customer Insights</h3>
      <div className="grid grid-cols-3 gap-4 mt-3">
        <div className="text-center">
          <p className="text-xl font-bold">{insights.totalCustomers}</p>
          <p className="text-sm text-gray-500">Total Customers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{insights.repeatCustomers}</p>
          <p className="text-sm text-gray-500">Repeat Customers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{insights.avgOrderValue}</p>
          <p className="text-sm text-gray-500">Avg. Order Value</p>
        </div>
      </div>
      <Button className="mt-3 text-white">View Customer Details →</Button>
    </div>
  );
}
