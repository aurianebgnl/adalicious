export async function orderMeal(mealId: number, userName: string) {
  try {
    const response = await fetch("http://localhost:8080/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        menu: { id: mealId },
        status: { id: 1 } // statut initial (ex: en cours)
      }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la commande");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la commande :", error);
    throw error;
  }
}
