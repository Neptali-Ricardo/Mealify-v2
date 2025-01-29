import React, { useState } from "react";
import { Form_Inicio } from "../component/forms/form_iniciar_sesion.jsx";
import { Form_Registro } from "../component/forms/form_registro.jsx";

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
    >
      <div className="card w-100 bg-white bg-opacity-95" style={{maxWidth: '400px'}}>
        <div className="card-header text-center border-0 bg-transparent">
          <h2 className="card-title">Welcome to RecipeMagic</h2>
        </div>
        <div className="card-body">
          <ul className="nav nav-pills nav-justified mb-3" role="tablist">
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === "register" ? "active" : ""}`}
                onClick={() => setActiveTab("register")}
              >
                Register
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === "login" && (
              <Form_Inicio/>
            )}

            {activeTab === "register" && (
              <Form_Registro />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

