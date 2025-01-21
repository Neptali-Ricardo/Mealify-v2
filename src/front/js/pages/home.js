import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import "../../styles/index.css";
import { UserForm } from "../component/userForm.jsx";
import { LoginForm } from "../component/loginForm.jsx";
import { Navigate, useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
	const [isLogin, setIsLogin] = useState(true);
    const [formType, setFormType] = useState("register"); // Controla el formulario que se muestra

	// Manejar el envío del formulario Register
    const handleRegister = async (formData) => {
        let success;
        success = await actions.register(formData);

        if (success) {
            setToken(localStorage.getItem("token")); // Actualiza el estado local con el nuevo token
        } 
    };

	// Manejar el envío del formulario Login
    const handleLogin = async (formData) => {
        let success;
        success = await actions.login(formData);

        if (success) {
            setToken(localStorage.getItem("token")); // Actualiza el estado local con el nuevo token
        } 
    };
	
	// Redirigir al perfil si está logueado
    const handleClick = () => {
        if (token) navigate("/profile");
    };

	useEffect(() => {
        console.log("isLogin state changed:", isLogin); // Verifica si el estado cambia correctamente
    }, [isLogin]);

	return (
		<div className="text-center mt-5">

			{/* Botones para alternar entre registro y login */}
            <div>
                <button onClick={() => setFormType("register")}>Registrarse</button>
                <button onClick={() => setFormType("login")}>Iniciar sesión</button>
            </div>

            {/* Mostrar el formulario correspondiente */}
            {formType === "register" ? (
                <UserForm onSubmit={handleRegister} />
            ) : (
                <LoginForm onSubmit={handleLogin} />
            )}
			
			{/* Mostrar mensaje de bienvenida si el token está presente */}
			{token && <h2 className="mt-5">Welcome to the home page!</h2>}
		</div>
	);
};
