import * as React from "react"

import { useRouter } from "next/navigation";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "./CardHome";
import { orderMeal } from "@/hooks/useOrder"; 
import { useState } from "react";

interface Meal {
  id: number;
  name: string;
  description?: string;
  image: string;
}

interface CardMealProps {
  meals: Meal[];
  userName: string;
}

export default function CardMeal({ meals, userName }: CardMealProps) {
  const router = useRouter();
  const [success, setSuccess] = useState<string | null>(null);

  const handleOrder = async (mealId: number, userName: string) => {
    try {
    const result = await orderMeal(mealId, userName);
    setSuccess(`Commande envoyée pour le plat #${mealId} ! (Commande #${result.id})`);
    setTimeout(() => setSuccess(null), 3000);
    // Redirection vers page de confirmation (optionnelle)
    router.push(`/order/confirmation?id=${result.id}`);
  } catch (err) {
    alert("Erreur lors de la commande.");
  }
  };

  if (!meals || meals.length === 0) {
    return <p>Aucun plat à afficher pour le moment.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {meals.map((meal) => (
        <div key={meal.id} 
        className="bg-white border border-black rounded-2xl shadow-md p-4 w-full flex flex-col justify-between hover:shadow-lg transition">
          <div className="flex items-start gap-4">
            <div className="text-4xl bg-gray-100 border border-black rounded-lg p-4 w-20 h-20 flex items-center justify-center">
              {meal.image}
            </div>
            <div className="flex flex-col flex-1">
              <div className="text-xl font-bold">{meal.name}</div>
              <div className="text-gray-600 text-sm mt-1">{meal.description}</div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleOrder(meal.id, userName)}
              className="bg-blue-500 text-white px-4 py-2 border border-black rounded-md hover:bg-blue-600 transition"
            >
              Commander
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}