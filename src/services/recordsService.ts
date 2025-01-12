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

  async setRecord(): Promise<any> {
    const token = localStorage.getItem("token");
    const currentDateTime = new Date().toISOString(); 

    const response = await fetch(`${API_BASE_URL}/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ record: currentDateTime }), 
    });

    if (!response.ok) {
      throw new Error("Erro ao criar o registro: " + response.statusText);
    }

    return response.json();
  },
};
