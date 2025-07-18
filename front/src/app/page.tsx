"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      router.push(`/menu?name=${encodeURIComponent(name.trim())}`);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-center p-6">
      <div className="max-w-md w-full border border-gray-200 rounded-xl shadow-md p-8">
        <div className="text-4xl mb-4">🥦</div>
        <h1 className="text-2xl font-bold mb-2">Bienvenue sur <span className="text-green-600">Adalicious</span></h1>
        <p className="mb-6">Pour commencer, peux-tu me donner ton prénom :</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Ton prénom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-4 py-2 text-lg"
          />
          <button
            type="submit"
            className="bg-blue-300 hover:bg-blue-400 text-white font-semibold py-2 rounded-lg transition"
          >
            valider
          </button>
        </form>
      </div>
    </main>
  );
}
