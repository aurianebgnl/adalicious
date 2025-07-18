import { useState } from "react";

type FetchMethod = RequestInit["method"];

interface UseFetchOptions extends RequestInit {
  body?: any;
};

/**
 * Hook pour gérer les requêtes HTTP
 * Gère automatiquement loading, error et data
 */
export const useFetcher = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>([]);

  const fetchData = async (
    url: string,
    method: FetchMethod,
    options?: UseFetchOptions
  ) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          // Spread des headers personnalisés (ils peuvent écraser les défauts)
          // options?.headers = si options existe ET si headers existe
          // || {} = sinon utilise un objet vide (évite les erreurs)
          ...(options?.headers || {}),
        },
        // Spread de toutes les autres options (credentials, cache, etc.)
        // Permet de passer n'importe quelle option supportée par fetch
        ...options,

        // Convertit automatiquement le body en JSON si présent
        body: options?.body ? JSON.stringify(options.body) : undefined,
      });

      const result = await res.json();

       // Vérifie si la requête a réussi
      if (!res.ok) {
        throw new Error(result.message || "Erreur réseau");
      }

      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchData,
    data,
    loading,
    error,
  };
};

/*
EXEMPLES D'UTILISATION :

// GET simple
const { fetchData, data, loading, error } = useFetcher();
fetchData('https://api.example.com/users', 'GET');

// POST avec données
fetchData('https://api.example.com/users', 'POST', {
  body: { name: 'John', email: 'john@example.com' }
});

// Avec headers personnalisés
fetchData('https://api.example.com/protected', 'GET', {
  headers: { 'Authorization': 'Bearer ' + token }
});
*/
