"use client";
import React from "react";
import "./loading.css";

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Carregando...</p>
    </div>
  );
};

export default Loading;
