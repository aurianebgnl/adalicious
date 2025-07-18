"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Order {
  id: number;
  userName: string;
  createdAt: string;
  status: { id: number; name: string | null };
  menu: { id: number; name: string; image: string | null };
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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
      {/* Grande carte sur desktop uniquement */}
      <div className="hidden sm:flex flex-col bg-white border border-black rounded-3xl shadow-lg w-full max-w-2xl h-[90vh] p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Adalicious 🥦</h1>
        <h2 className="text-xl text-center mb-4">Merci pour ta commande {order.userName} 👋</h2>
        <h2 className="text-xl text-left mb-4">Suivi :</h2>
        <div className="bg-gray-100 border border-black rounded-lg p-4 items-center  ">
          <div className="mb-2">Commande n° <strong>{order.id}</strong></div>
          <div className="text-4xl bg-gray-100 border border-black rounded-lg p-4 w-20 h-20 flex items-center justify-center">
              {order.menu?.image}
            </div>
          <p className="mb-2">{order.menu?.name ?? `#${order.menu.id}`} x1</p>
          <p className="mb-2">Statut : {order.status?.name ?? `#${order.status.id}`}</p>
          <p className="mb-2">Créée le : {new Date(order.createdAt).toLocaleString()}</p>
        </div>
     </div>
      
    </div>
  );
}
