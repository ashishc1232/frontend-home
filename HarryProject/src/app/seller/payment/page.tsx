"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PaymentTracking() {
  const [transactions, setTransactions] = useState([
    { id: "PAY-001", date: "2023-03-16", description: "Payout for order ORD-001", orderId: "ORD-001", type: "Payout", status: "Completed", amount: 1234.50 },
    { id: "PAY-002", date: "2023-03-19", description: "Payout for order ORD-002", orderId: "ORD-002", type: "Payout", status: "Completed", amount: 805.60 },
    { id: "PAY-003", date: "2023-03-21", description: "Payout for order ORD-003", orderId: "ORD-003", type: "Payout", status: "Pending", amount: 854.05 },
    { id: "FEE-001", date: "2023-03-16", description: "Platform fee for order ORD-001", orderId: "ORD-001", type: "Platform Fee", status: "Completed", amount: -64.50 },
    { id: "FEE-002", date: "2023-03-19", description: "Platform fee for order ORD-002", orderId: "ORD-002", type: "Platform Fee", status: "Completed", amount: -42.40 },
    { id: "FEE-003", date: "2023-03-21", description: "Platform fee for order ORD-003", orderId: "ORD-003", type: "Platform Fee", status: "Pending", amount: -44.95 },
  ]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Payment Tracking</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <Input type="text" placeholder="Search payments..." className="w-1/3 border p-2 rounded-md" />
          <select className="w-1/4 p-2 border rounded-md">
            <option value="All">All Types</option>
            <option value="Payout">Payout</option>
            <option value="Platform Fee">Platform Fee</option>
          </select>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left bg-gray-100">
              <th className="p-3">Transaction ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Order ID</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(txn => (
              <tr key={txn.id} className="border-b">
                <td className="p-3">{txn.id}</td>
                <td className="p-3">{txn.date}</td>
                <td className="p-3">{txn.description}</td>
                <td className="p-3">{txn.orderId}</td>
                <td className="p-3 font-medium">{txn.type}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-md text-white font-medium text-sm ${
                    txn.status === "Completed" ? "bg-green-500" : "bg-yellow-500"}`}>{txn.status}</span>
                </td>
                <td className={`p-3 font-bold ${txn.amount >= 0 ? "text-green-500" : "text-red-500"}`}>₹{txn.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
