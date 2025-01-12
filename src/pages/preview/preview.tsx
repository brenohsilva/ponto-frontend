"use client";
import React, { useEffect, useState } from "react";
import { useRegisterPoint } from "../../hooks/useRegisterPoint";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  username: string;
  code: string;
}

const Preview: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const { registerPoint } = useRegisterPoint();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("pt-BR", { hour12: false });
      const formattedDate = now.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
      });
      setCurrentTime(formattedTime);
      setCurrentDate(formattedDate);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const username = localStorage.getItem("username");
      const code = localStorage.getItem("code");
      if (username && code) {
        const profile: UserProfile = {
          username,
          code,
        };
        setUserProfile(profile);
      }

    };

    fetchUserProfile();
  }, []);

  const redirectToMonhtlyRegisters = () => {
    navigate("/home");
  }

  return (
    <div
      className="d-flex flex-column justify-content-between align-items-center vh-100 p-3"
      style={{ backgroundColor: "#0D1B2A", color: "#fff" }}
    >
      <header className="d-flex justify-content-between w-100 align-items-center mb-4">
        <div className="d-flex flex-column ">
          <img
            src="src/assets/logo-ilumeo.png"
            alt="Ilumeo Logo"
            width={155}
            height={63}
          />
        </div>
        <div className="text-end">
          <span className="fw-bold">
            {userProfile ? userProfile.code : "Carregando..."}
          </span>
          <small className="d-block">Código de acesso</small>
        </div>
      </header>

      <div
        className="d-flex flex-column flex-lg-row gap-lg-4 align-items-center justify-content-center justify-content-lg-between rounded-4"
        style={{
          backgroundColor: "#1B263B",
          padding: "40px ",
        }}
      >
        <div>
          <p className="text-center mb-4">
            Olá,{" "}
            <strong className="fs-5">
              {userProfile ? userProfile.username : "Carregando..."}
            </strong>
            ,<br /> registre o seu ponto agora!
          </p>
          <div className="d-flex flex-column text-center">
            <p className="mb-2 fs-3">{currentDate}</p>
            <p className="fs-3">{currentTime}</p>
          </div>
          <button
            className="btn fw-bold mt-4"
            onClick={registerPoint}
            style={{
              backgroundColor: "#F28B04",
              color: "#fff",
              width: "100%",
              padding: "15px",
              borderRadius: "8px",
              fontSize: "18px",
            }}
          >
            Registrar ponto
          </button>
        </div>
        <div className="image-container d-md-flex d-lg-flex d-none w-50">
          <img
            className="rounded-3"
            src="src/assets/people.png"
            width="85%"
            alt="people"
          />
        </div>
      </div>

      <div className="text-center">
        <button 
        onClick={redirectToMonhtlyRegisters}
          className="btn p-2 px-3"
          style={{
            backgroundColor: "#2B3A4A",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Folha mensal
        </button>
      </div>

    </div>
  );
};

export default Preview;
