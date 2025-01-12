"use client";
import React, { useState } from "react";
import { authService } from "../services/authService";

const Login: React.FC = () => {
  const [accessCode, setAccessCode] = useState<string>("");

  const changingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(e.target.value.toUpperCase());
  };

  const confirmLogin = async () => {
    try {
      const response = await authService.login(accessCode);
      console.log("Login bem-sucedido:", response);
      alert("Login realizado com sucesso!");
      localStorage.setItem("token", response.token);
    } catch (err: any) {
      console.log("Erro no login:", err.message);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <img
        src="src/assets/logo-ilumeo.png"
        alt="Ilumeo Logo"
        width={274}
        height={106}
        className="mb-1"
      />
      <label className="text-white mb-5 fs-4 mt-0">
        Ponto <strong>Ilumeo</strong>
      </label>
      <div
        className="card p-4"
        style={{
          width: "360px",
          backgroundColor: "#1b263b",
          borderRadius: "10px",
        }}
      >
        <label
          style={{ fontSize: "16px" }}
          htmlFor="accessCode"
          className="bg-none d-flex justify-content-start text-white mt-1 mb-2"
        >
          Código de Acesso
        </label>
        <input
          type="text text-white"
          id="accessCode"
          value={accessCode}
          onChange={changingInput}
          className="form-control mb-4 py-3"
          style={{ backgroundColor: "#000", color: "#fff" }}
        />

        <button
          style={{ backgroundColor: "#F28B04" }}
          className="btn w-100 fw-bold text-white"
          onClick={confirmLogin}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Login;
