const API_BASE_URL = "http://localhost:4000";

export const employeeService = {
  async profile(): Promise<any> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/employees/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar perfil: " + response.statusText);
    }

    return response.json();
  },
};
