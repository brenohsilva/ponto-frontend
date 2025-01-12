"use client";
import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { recordsService } from "../../services/recordsService";
import { employeeService } from "../../services/employeeService";


const Login: React.FC = () => {
  const [accessCode, setAccessCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recordsToday, setRecordsToday] = useState<string>("");
  const navigate = useNavigate();

    const getTodayRegister = async () => {
      try {
        const records = await recordsService.today();
        setRecordsToday(records.data);
      } catch (err: any) {
        console.error("Erro ao trazer os registros:", err);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const profile = await employeeService.profile();
        localStorage.setItem("username", profile.username);
        localStorage.setItem("code", profile.code);
      } catch (err: any) {
        console.error("Erro ao buscar o perfil:", err);
      }
    };

  const changingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(e.target.value.toUpperCase());
    setErrorMessage(null);
  };

  const confirmLogin = async () => {
    try {
      const response = await authService.login(accessCode);
      localStorage.setItem("token", response.access_token);
      await getTodayRegister()
      await fetchUserProfile()
      if (recordsToday === "first access") {
        navigate("/preview");
      } else {
        navigate("/home");
      }
    } catch (err: any) {
      console.log("Erro no login:", err.message);
      setErrorMessage("Código de acesso inválido. Tente novamente.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <img
        src="/logo-ilumeo.png"
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
          type="text"
          id="accessCode"
          value={accessCode}
          onChange={changingInput}
          className="form-control mb-2 py-3"
          style={{ backgroundColor: "#000", color: "#fff" }}
        />

        {errorMessage && (
          <div
            className="text-danger mb-3"
            style={{
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {errorMessage}
          </div>
        )}

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
