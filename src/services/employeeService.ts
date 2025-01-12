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

  async recordByMonth(month?: number, year?: number): Promise<any> {
    const token = localStorage.getItem("token"); 
    const queryParams = new URLSearchParams();
    if (month) queryParams.append("month", month.toString());
    if (year) queryParams.append("year", year.toString());
  
    const response = await fetch(`${API_BASE_URL}/employees/records?${queryParams.toString()}`, {
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
  
  async balances(month?: number, year?: number): Promise<any> {
    const token = localStorage.getItem("token");

    const queryParams = new URLSearchParams();
    if (month) queryParams.append("month", month.toString());
    if (year) queryParams.append("year", year.toString());

    const response = await fetch(`${API_BASE_URL}/employees/balances?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar o balanço: " + response.statusText);
    }

    return response.json();
  },
};
