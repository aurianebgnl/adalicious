"use client";

import React, { useEffect, useState } from 'react';
import { useFetcher } from "@/hooks/useFetcher";
import { useSearchParams, useRouter } from "next/navigation";
import { Manrope } from "next/font/google";
import CardMeal from "@/components/ui/CardMeal";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

// Interface pour les types de données
interface Meal {
  id: number;
  name: string;
  description?: string;
  image: string;
}

export default function MenuPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userName = searchParams.get("name") ?? "Inconnu";

    const { fetchData, loading, error } = useFetcher();
    const [meals, setMeals] = useState<Meal[]>([]);
    
    useEffect(() => { 
        const getMeals = async () => {
            const data = await fetchData(`http://localhost:8080/menu`, "GET");
            console.log("Données reçues:", data);
            setMeals(data); // mettre à jour le state
        };

        getMeals();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    console.log("meals:", meals);

    return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
      {/* Grande carte sur desktop uniquement */}
      <div className="hidden sm:flex flex-col bg-white border border-black rounded-3xl shadow-lg w-full max-w-2xl h-[90vh] p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Adalicious 🥦</h1>
        <h2 className="text-xl text-center mb-4">Bonjour {userName} 👋</h2>

        {/* Zone scrollable pour les cartes */}
        <div className="overflow-y-auto flex-1 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          <CardMeal meals={meals} userName={userName} />
        </div>
      </div>

      {/* Affichage mobile (pas de carte) */}
      <div className="sm:hidden w-full">
        <h1 className="text-2xl font-bold text-center mb-2">Adalicious</h1>
        <h2 className="text-lg text-center mb-4">Bonjour {userName} 👋</h2>
        <CardMeal meals={meals} userName={userName} />
      </div>
    </div>
  );
}
