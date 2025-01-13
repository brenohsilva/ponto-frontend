"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { recordsService } from "../../services/recordsService";
import { employeeService } from "../../services/employeeService";
import "./login.css";

const Login: React.FC = () => {
  const [accessCode, setAccessCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recordsToday, setRecordsToday] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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
    setIsLoading(true);
    try {
      const response = await authService.login(accessCode);
      localStorage.setItem("token", response.access_token);

      const records = await recordsService.today();
      setRecordsToday(records.data);
      console.log(recordsToday);

      await fetchUserProfile();

      if (records.data === "first access") {
        navigate("/preview");
      } else {
        navigate("/home");
      }
    } catch (err: any) {
      console.error("Erro no login:", err.message);
      setErrorMessage("Código de acesso inválido. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container ">
      <div className="card rounded">
        <div className="d-flex flex-column justify-content-center ">
          <div className="d-flex flex-column align-items-center ">
            <img
              src="/logo-ilumeo.png"
              alt="Ilumeo Logo"
              width={274}
              height={106}
              className=" x"
            />
          </div>
          <label className="text-white text-center mb-5 fs-4 mt-0 ">
            Ponto <strong>Ilumeo</strong>
          </label>
        </div>

        <div className="login-box py-3 px-4">
          <label className="text-white fs-5 " htmlFor="">
            Login
          </label>
          <label
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
            className="form-control mb-5 py-3"
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
            disabled={isLoading}
          >
            {isLoading ? (
              <span>
                Entrando<span className="dot-animate">...</span>
              </span>
            ) : (
              "Confirmar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
