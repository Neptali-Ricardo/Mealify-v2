import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const navigate = useNavigate();
    const { store } = useContext(Context); // Accede a store para verificar el estado global del token
    const [isLogin, setIsLogin] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Funciones para manejar la navegación
    const goToHome = () => navigate("/");
    const goToLogin = () => navigate("/loginRegister");
    const goToMealPlan = () => navigate("/mealplan");
    const goToMenuCreator = () => navigate("/menucreator");
    const goToAbout = () => navigate("/about");

    // Redirigir al perfil si está logueado
    const goToProfile = () => {
        if (token) {
            // Si hay un token válido, redirige al perfil
            navigate("/profile");
        } else {
            // Si no hay token, redirige a login
            navigate("/loginRegister");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(""); // Limpia el estado local
        navigate("/");
    };

    useEffect(() => {
        // Escucha cambios en el token del almacenamiento local
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, [store.token]); // Se asegura de actualizar el token global

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" onClick={goToHome}>
                    <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888386/Mealify-logo_ao4ifn.svg" alt="Mealify logotipo" className="navbar-icon" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a class="nav-link" aria-current="page" href="#" onClick={goToHome}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a class="nav-link" aria-current="page" href="#" onClick={goToMenuCreator}>MenuCreator</a>
                        </li>
                        <li className="nav-item">
                            <a class="nav-link" aria-current="page" href="#" onClick={goToAbout}>About</a>
                        </li>
                        {token ? (
                            <>
                                <li className="nav-item">
                                    <a class="nav-link" aria-current="page" href="#" onClick={goToMealPlan}>Mealplan</a>
                                </li>
                                <li className="nav-item">
                                    <a class="nav-link" aria-current="page" href="#" onClick={goToProfile}>Profile</a>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-dark button-custon" onClick={handleLogout}>
                                        Logout
                                        <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/login-icon_hzpaq9.svg" alt="user icon" className="navbar-icon" />
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="btn btn-outline-dark " onClick={goToLogin}>
                                    Login
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
