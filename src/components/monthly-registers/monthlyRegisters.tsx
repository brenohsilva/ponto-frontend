"use client";
import React, { useState } from "react";
import "./monthlyRegisters.css";

const MonthlyRegisters: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("Janeiro");
  const [selectedYear, setSelectedYear] = useState<string>("2025");

  const history = [
    { date: "JAN 02", workedHours: "09:11", balance: "+00:11" },
    { date: "JAN 03", workedHours: "08:45", balance: "-00:15" },
    { date: "JAN 04", workedHours: "FOLGA", balance: "-" },
    { date: "JAN 05", workedHours: "FOLGA", balance: "-" },
    { date: "JAN 06", workedHours: "09:32", balance: "+00:32" },
    { date: "JAN 07", workedHours: "09:00", balance: "-" },
    { date: "JAN 07", workedHours: "09:00", balance: "-" },
    { date: "JAN 07", workedHours: "FOLGA", balance: "-" },
    { date: "JAN 07", workedHours: "09:00", balance: "-" },
    { date: "JAN 07", workedHours: "09:00", balance: "-" },
    { date: "JAN 07", workedHours: "FOLGA", balance: "-" },
    { date: "JAN 07", workedHours: "09:00", balance: "-" },
  ];

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const years = ["2024", "2025"];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <select
          className="form-select text-white bg-dark"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          className=" form-select text-white bg-dark"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Saldos */}
      <div className="row d-flex justify-content-center mb-4">
        <div
          className="d-flex col-5 col-lg-2 flex-column align-items-center border-end border-black justify-content-center p-3"
          style={{
            backgroundColor: "#F28B04",
            color: "#fff",
          }}
        >
          <span>Saldo do Mês</span>
          <strong>+00:36</strong>
        </div>
        <div
          className="d-flex col-5 col-lg-2 flex-column align-items-center justify-content-center p-3 "
          style={{
            backgroundColor: "#F28B04",
            color: "#fff",
          }}
        >
          <span>Saldo Geral</span>
          <strong>+40:15</strong>
        </div>
      </div>

      {/* Histórico de pontos */}
<div className="d-flex justify-content-between mb-2 px-4">
  <span style={{ width: "30%" }}>Dias</span>
  <span style={{ width: "35%", textAlign: "center" }}>Horas trabalhadas</span>
  <span style={{ width: "35%", textAlign: "right" }}>Saldo</span>
</div>
<div
  className="rounded p-3"
  style={{
    height: "340px",
    overflowY: "scroll",
  }}
>
  {history.map((item, index) => (
    <div key={index}className={`p-2 border-bottom ${item.workedHours === "FOLGA" ? "bg-light-gray" : ""}`}>
      <div className="d-flex justify-content-between">
        <span style={{ width: "30%" }}>{item.date}</span>
        <span style={{ width: "35%", textAlign: "center" }}>{item.workedHours}</span>
        <span
          style={{ width: "35%", textAlign: "right" }}
          className={
            item.balance.startsWith("+")
              ? "text-success"
              : item.balance.startsWith("-")
              ? "text-danger"
              : ""
          }
        >
          {item.balance}
        </span>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default MonthlyRegisters;
