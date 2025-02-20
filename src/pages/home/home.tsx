"use client";
import React, { useEffect, useState } from "react";
import Timeline from "../../components/timeline/timeline";
import MonthlyRegisters from "../../components/monthly-registers/monthlyRegisters";
import "./home.css";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>("PONTO_DO_DIA");
  const [date, setDate] = useState(new Date());
  const username = localStorage.getItem("username");
  const code = localStorage.getItem("code");

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getDay = (date: Date) => date.getDate();
  const getMonth = (date: Date) =>
    date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const getWeekday = (date: Date) =>
    date.toLocaleDateString("pt-BR", { weekday: "long" });
  const getTime = (date: Date) => date.toLocaleTimeString("pt-BR");

  return (
    <div className="container my-4 px-3 px-lg-0 my-lg-2 ">
      <header>
        <div className="d-flex justify-content-md-between gap-2">
          <div className="d-none d-md-flex flex-column ">
            <Link to={"/"}>
              <img
                src="/logo-ilumeo.png"
                alt="Ilumeo Logo"
                width={150}
                height={58}
                className=""
              />
            </Link>
          </div>
          <div className="d-flex align-content-center align-items-center border-white border-sm-end border-o pe-4 ">
            <h4 className="d-flex d-lg-none m-0 pb-3">{username || ""}</h4>
          </div>
          <div className="d-flex flex-column gap-1 mt-lg-4">
            <span className="fw-bold">{code || ""}</span>
            <label htmlFor="Codigo de acesso">Código de acesso</label>
          </div>
        </div>
      </header>
      <div className="mt-5 mt-lg-1 d-flex flex-column mb-3">
        <div className="w-100 d-lg-flex d-none justify-content-center mb-2">
          <h4 className="m-0 pb-3 border-bottom  text-center mb-2 w-25">
            {username || ""}
          </h4>
        </div>
        <div className="d-flex gap-2 justify-content-center">
          <button
            className={`btn ${activeMenu === "PONTO_DO_DIA" ? "btn-dark" : "text-white"}`}
            onClick={() => setActiveMenu("PONTO_DO_DIA")}
          >
            PONTO DO DIA
          </button>
          <button
            className={`btn ${activeMenu === "FOLHA_DE_PONTO_MENSAL" ? "btn-dark" : "text-white"}`}
            onClick={() => setActiveMenu("FOLHA_DE_PONTO_MENSAL")}
          >
            FOLHA DE PONTO MENSAL
          </button>
        </div>
      </div>
      {activeMenu === "PONTO_DO_DIA" && (
        <div>
          {/* DESKTOP */}
          <div className="d-flex justify-content-center p-2 mb-4 rounded-2 ">
            <div className=" point-container d-lg-flex d-md-flex flex-column py-2 px-4  ">
              <div className="d-flex justify-content-center mt-4 ">
                <div className=" d-flex gap-4">
                  <div className="d-flex flex-column bg-white text-black fw-bold px-3 py-2 align-items-center border border-1 rounded-4">
                    <span>{getMonth(date)}</span>
                    <span>{getDay(date)}</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span>{getWeekday(date)}</span>
                    <span>|</span>
                    <span>{getTime(date)}</span>
                  </div>
                </div>
              </div>
              <div>
                <Timeline />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeMenu === "FOLHA_DE_PONTO_MENSAL" && (
        <div>
          {/* MOBILE */}
          <div className="d-sm-flex d-md-none d-lg-none mb-4">
            <MonthlyRegisters />
          </div>
          {/* DESKTOP */}
          <div className="d-none d-md-flex d-lg-flex mb-4 justify-content-center">
            <div
              style={{
                backgroundColor: "#212E3E",
                color: "#fff",
                width: "920px",
              }}
              className="mt-3 rounded-2"
            >
              <MonthlyRegisters />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
