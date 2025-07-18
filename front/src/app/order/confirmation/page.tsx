"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Order {
  id: number;
  userName: string;
  createdAt: string;
  status: { id: number; name: string | null };
  menu: { id: number; name: string | null };
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      const res = await fetch(`http://localhost:8080/order/${id}`);
      const data = await res.json();
      setOrder(data);
      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!order) return <p>Commande introuvable</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Confirmation de commande</h1>
      <p className="mb-2">Commande n° <strong>{order.id}</strong></p>
      <p className="mb-2">Nom : {order.userName}</p>
      <p className="mb-2">Plat : {order.menu?.name ?? `#${order.menu.id}`}</p>
      <p className="mb-2">Statut : {order.status?.name ?? `#${order.status.id}`}</p>
      <p className="mb-2">Créée le : {new Date(order.createdAt).toLocaleString()}</p>
    </div>
  );
}
