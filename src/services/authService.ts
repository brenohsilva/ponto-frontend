const API_BASE_URL = "http://localhost:4000";

export const authService = {
  async login(code: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error("Erro no login: " + response.statusText);
    }

    return response.json();
  },
};
