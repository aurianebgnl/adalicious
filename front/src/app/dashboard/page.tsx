// app/dashboard/page.tsx

"use client";

import React, { useEffect, useState } from "react";

interface Order {
  id: number;
  userName: string;
  createdAt: string;
  status: { id: number; name: string | null };
  menu: { id: number; name: string | null };
}

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8080/order"); //TODO changer dans le back pour avoir en route /orders
    const data = await res.json();
    setOrders(data.content ?? data); // adapte selon la forme exacte
    setLoading(false);
  };

  const updateStatus = async (orderId: number, newStatusId: number) => {
    await fetch(`http://localhost:8080/order/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: { id: newStatusId } }),
    });
    fetchOrders(); // refresh
  };

  const deleteOrder = async (orderId: number) => {
    await fetch(`http://localhost:8080/order/${orderId}`, { method: "DELETE" });
    fetchOrders(); // refresh
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Commandes en cours</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Utilisateur</th>
            <th className="border p-2">Plat</th>
            <th className="border p-2">Créé le</th>
            <th className="border p-2">Statut</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.userName}</td>
              <td className="border p-2">{order.menu?.name ?? `#${order.menu.id}`}</td>
              <td className="border p-2">{new Date(order.createdAt).toLocaleString()}</td>
              <td className="border p-2">{order.status?.name ?? `#${order.status.id}`}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="bg-green-200 px-2 py-1 rounded"
                  onClick={() => updateStatus(order.id, 2)} // ex: 2 = "en cours"
                >
                  En cours
                </button>
                <button
                  className="bg-blue-200 px-2 py-1 rounded"
                  onClick={() => updateStatus(order.id, 3)} // ex: 3 = "livrée"
                >
                  Livrée
                </button>
                <button
                  className="bg-red-200 px-2 py-1 rounded"
                  onClick={() => deleteOrder(order.id)}
                >
                  Annuler
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

