import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const navigate = useNavigate();
    const { store } = useContext(Context);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        setIsMenuOpen(false); // Cerrar el menú al cerrar sesión
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, [store.token]);

    // Función para cerrar el menú al hacer clic en un enlace o botón
    const closeMenu = () => setIsMenuOpen(false);

    // Función para alternar el menú al hacer clic en el botón del navbar
    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" onClick={closeMenu}>
                    <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888386/Mealify-logo_ao4ifn.svg" alt="Mealify logotipo" className="navbar-icon" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="navbarSupportedContent"
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation"
                    onClick={toggleMenu} // Alternar estado del menú al hacer clic en el botón
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={closeMenu}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/menucreator" onClick={closeMenu}>MenuCreator</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about" onClick={closeMenu}>About</Link>
                        </li>
                        {token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/mealplan" onClick={closeMenu}>Mealplan</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile" onClick={closeMenu}>Profile</Link>
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
                                <button className="btn btn-outline-dark" onClick={() => { navigate("/loginRegister"); closeMenu(); }}>
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
