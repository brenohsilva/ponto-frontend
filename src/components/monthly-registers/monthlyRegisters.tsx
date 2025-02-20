"use client";
import React, { useState, useEffect } from "react";

import "./monthlyRegisters.css";
import { employeeService } from "../../services/employeeService";
import Loading from "../loading/loading";
import { formatBalance } from "../../utils/formatBalance";

const MonthlyRegisters: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [history, setHistory] = useState<
    { date: string; workedHours: string; balance: string }[]
  >([]);
  const [monthlyBalance, setMonthlyBalance] = useState<string>("");
  const [generalBalance, setGeneralBalance] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const getRecords = async () => {
      try {
        const response = await employeeService.recordByMonth(
          selectedMonth,
          selectedYear
        );
        const data = response;

        const formatWorkedHours = (workedHours: number): string => {
          const totalMinutes = Math.round(workedHours * 60);
          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;
          return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;
        };

        const formattedHistory = Array.from({ length: 31 }, (_, day) => {
          const record = data.find((item: any) => item.day === day + 1);

          if (record) {
            return {
              date: `${months[record.month - 1]
                .slice(0, 3)
                .toUpperCase()} ${record.day.toString().padStart(2, "0")}`,
              workedHours: record.workedHours
                ? formatWorkedHours(record.workedHours)
                : "FOLGA",
              balance: formatBalance(record.balanceHours || 0),
            };
          } else {
            return {
              date: `${months[selectedMonth - 1]
                .slice(0, 3)
                .toUpperCase()} ${(day + 1).toString().padStart(2, "0")}`,
              workedHours: "NÃO REGISTRADO",
              balance: "-",
            };
          }
        });

        setHistory(formattedHistory);
        setLoading(false);
      } catch (err: any) {
        console.error("Erro ao buscar registros:", err);
        setError("Erro ao carregar os registros. Tente novamente.");
      }
    };

    const getBalances = async () => {
      try {
        const balancesResponse = await employeeService.balances(
          selectedMonth,
          selectedYear
        );
        const generalBalanceResponse = await employeeService.balances();
        setMonthlyBalance(formatBalance(balancesResponse.totalBalance));
        setGeneralBalance(formatBalance(generalBalanceResponse.totalBalance));
      } catch (err: any) {
        console.error("Erro ao buscar saldos:", err);
        setError("Erro ao carregar os saldos. Tente novamente.");
      }
    };

    getRecords();
    getBalances();
  }, [selectedMonth, selectedYear]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <select
          className="form-select text-white"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>

        <select
          className="form-select text-white"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="row d-flex justify-content-center mb-4">
        <div
          className="d-flex col-5 col-lg-2 flex-column align-items-center border-end border-black justify-content-center p-3"
          style={{
            backgroundColor: "#F28B04",
            color: "#fff",
          }}
        >
          <span>Saldo do Mês</span>
          <strong>{monthlyBalance}</strong>
        </div>
        <div
          className="d-flex col-5 col-lg-2 flex-column align-items-center justify-content-center p-3"
          style={{
            backgroundColor: "#F28B04",
            color: "#fff",
          }}
        >
          <span>Saldo Geral</span>
          <strong>{generalBalance}</strong>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-2 px-4">
        <span style={{ width: "30%" }}>Dias</span>
        <span style={{ width: "35%", textAlign: "center" }}>
          Horas trabalhadas
        </span>
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
          <div
            key={index}
            className={`p-2 border-bottom ${
              item.workedHours === "FOLGA" ? "bg-light-gray" : ""
            }`}
          >
            <div className="d-flex justify-content-between">
              <span style={{ width: "30%" }}>{item.date}</span>
              <span style={{ width: "35%", textAlign: "center" }}>
                {item.workedHours}
              </span>
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

      {error && <div className="text-danger mt-3">{error}</div>}
    </div>
  );
};

export default MonthlyRegisters;
