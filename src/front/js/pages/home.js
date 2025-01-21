import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import "../../styles/index.css";
import { UserForm } from "../component/userForm.jsx";
import { LoginForm } from "../component/loginForm.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import { Jumbotron } from "../component/jumbotron.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
	const [isLogin, setIsLogin] = useState(true);
    const [formType, setFormType] = useState("register"); // Controla el formulario que se muestra

	// Redirigir al perfil si está logueado
    const handleClick = () => {
        if (token) navigate("/loginRegister");
    };

	useEffect(() => {
        console.log("isLogin state changed:", isLogin); // Verifica si el estado cambia correctamente
    }, [isLogin]);

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
