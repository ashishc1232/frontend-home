// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import StatCard from "../order/statcard";

// export default function OrderTracking() {
//   const [orders, setOrders] = useState([
//     { id: "ORD-001", customer: "Rahul Sharma", date: "2023-03-15", total: 1299, status: "Delivered" },
//     { id: "ORD-002", customer: "Priya Patel", date: "2023-03-18", total: 848, status: "Processing" },
//     { id: "ORD-003", customer: "Amit Singh", date: "2023-03-20", total: 899, status: "Shipped" },
//     { id: "ORD-004", customer: "Sneha Desai", date: "2023-03-22", total: 998, status: "Pending" },
//   ]);

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <h1 className="text-3xl font-bold mb-6">Order Tracking</h1>

//       {/* Order Statistics */}
//       <div className="grid grid-cols-5 gap-4 bg-white p-6 shadow-md rounded-lg mb-6">
//         <StatCard title="Total Orders" value={orders.length} />
//         <StatCard title="Pending" value={orders.filter(order => order.status === "Pending").length} />
//         <StatCard title="Processing" value={orders.filter(order => order.status === "Processing").length} />
//         <StatCard title="Shipped" value={orders.filter(order => order.status === "Shipped").length} />
//         <StatCard title="Delivered" value={orders.filter(order => order.status === "Delivered").length} />
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <div className="flex justify-between items-center mb-4">
//           <Input type="text" placeholder="Search orders..." className="w-1/3 border p-2 rounded-md" />
//           <select className="w-1/4 p-2 border rounded-md">
//             <option value="All">All Statuses</option>
//             <option value="Pending">Pending</option>
//             <option value="Processing">Processing</option>
//             <option value="Shipped">Shipped</option>
//             <option value="Delivered">Delivered</option>
//           </select>
//         </div>

//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="border-b text-left bg-gray-100">
//               <th className="p-3">Order ID</th>
//               <th className="p-3">Customer</th>
//               <th className="p-3">Date</th>
//               <th className="p-3">Total (₹)</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               <tr key={order.id} className="border-b">
//                 <td className="p-3">{order.id}</td>
//                 <td className="p-3">{order.customer}</td>
//                 <td className="p-3">{order.date}</td>
//                 <td className="p-3">₹{order.total}</td>
//                 <td className="p-3">
//                   <span className={`px-2 py-1 rounded-md text-white font-medium text-sm ${
//                     order.status === "Delivered" ? "bg-green-500" :
//                     order.status === "Processing" ? "bg-blue-500" :
//                     order.status === "Shipped" ? "bg-purple-500" : "bg-yellow-500"}`}>{order.status}</span>
//                 </td>
//                 <td className="p-3">
//                   <Button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md">View</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
