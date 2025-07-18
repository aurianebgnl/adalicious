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
        <div className={`${manrope.className} font-sans min-h-screen p-8 pb-20`}>
            <h1 className="text-2xl font-bold mb-6 text-center">Bonjour {userName} 👋</h1>
            <main className="flex flex-col gap-8 items-center">
                <CardMeal meals={meals} userName={userName} />
            </main>
        </div>
  );
}
