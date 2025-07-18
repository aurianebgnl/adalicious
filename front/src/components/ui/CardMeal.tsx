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
    <div>
      {success && (
        <div className="bg-green-100 text-green-800 text-sm p-2 mb-4 rounded">
          {success}
        </div>
      )}

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {meals.map((meal) => (
        <Card key={meal.id} className="w-60 bg-white">
          <CardHeader className="p-0 h-30">
            <p>{meal.image}</p>
          </CardHeader>

          <CardTitle className="flex justify-between py-4 px-3">
            <p>{meal.name}</p>
          </CardTitle>

          <CardDescription className="px-3 pb-4 text-sm text-gray-600">
            {meal.description}
          </CardDescription>

          <CardAction className="flex justify-center pb-4">
              <button
                className="cursor-pointer bg-blue-300 text-gray-900 hover:bg-blue-400 px-4 py-2 rounded-md"
                onClick={() => handleOrder(meal.id, userName)}
              >
                Commander
              </button>
            </CardAction>
        </Card>
      ))}
      </div>
    </div>
  );
}