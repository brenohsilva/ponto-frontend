"use client";
import React, { useEffect, useState } from "react";
import Timeline from "../../components/timeline/timeline";
import MonthlyRegisters from "../../components/monthly-registers/monthlyRegisters";
import './home.css'

const Home: React.FC = () => {
  const [date, setDate] = useState(new Date());

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
            <img
              src="src/assets/logo-ilumeo.png"
              alt="Ilumeo Logo"
              width={150}
              height={58}
              className=""
            />
          </div>
          <div className="d-flex align-content-center align-items-center border-white border-sm-end border-o pe-4 ">
            <h4 className="d-flex d-lg-none m-0 pb-3">
              Breno Henrique da Silva
            </h4>
          </div>
          <div className="d-flex flex-column gap-1 mt-lg-4">
            <span className="fw-bold">ILUMEO01</span>
            <label htmlFor="Codigo de acesso">Código de acesso</label>
          </div>
        </div>
      </header>
      <div className="mt-5 mt-lg-1 d-flex flex-column border-bottom">
        <div className="w-100 d-lg-flex d-none justify-content-center mb-2">
          <h4 className="m-0 pb-3 border-bottom  text-center mb-2 w-25">
            Breno Henrique da Silva
          </h4>
        </div>
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-dark">PONTO DO DIA</button>
          <button className="btn text-white">FOLHA DE PONTO MENSAL</button>
        </div>
      </div>
      <div className="d-flex flex-column d-lg-none d-md-none p-2 mb-4 rounded-2">
        <div className="d-flex justify-content-center mt-4">
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

      <div className=" d-flex justify-content-center p-2 mb-4 rounded-2  ">
        <div className="d-lg-flex flex-column d-none w-50 py-4 px-4 point-container ">
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

      {/* <div className="d-sm-flex d-md-none d-lg-none mb-4">
        <MonthlyRegisters />
      </div>

      <div className="d-none d-lg-flex mb-4 justify-content-center">
        <div style={{
            backgroundColor: "#212E3E",
            color: "#fff",
            width: '920px'
          }} className="mt-3 rounded-2" >
      <MonthlyRegisters/>
        </div>
      </div> */}

      <div className="d-flex flex-column gap-3 ">
        <span className="text-center">
          Horas trabalhadas: <strong>09:04</strong>
        </span>
        <button className="btn btn-warning text-white"> Registrar ponto</button>
      </div>
    </div>
  );
};

export default Home;
