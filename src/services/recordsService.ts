const API_BASE_URL = "http://localhost:4000";

export const recordsService = {
  async today(): Promise<any> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/records/today`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar os registros: " + response.statusText);
    }

    return response.json();
  },
};
