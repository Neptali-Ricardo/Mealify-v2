import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/index.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Jumbotron } from "../component/jumbotron.jsx";

export const Home = () => {

	return (
        <>
            <Jumbotron />
            
            <div className="text-center mt-5 mb-5">
                <h1 className="display-4">Bienvenido a nuestro sitio</h1>
                <p className="lead">Por favor, inicia sesión o regístrate para continuar.</p>          
            </div>
        </>
	);
};
