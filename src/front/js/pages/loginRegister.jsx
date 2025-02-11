import React, { useContext, useEffect, useRef, useState } from "react";
import { LoginForm } from "../component/loginForm.jsx";
import { UserForm } from "../component/userForm.jsx";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../component/spinner.jsx";

export default function LoginRegister() {

    const { store, actions } = useContext(Context);
    const [isLogin, setIsLogin] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Alternar entre Login y Register
    const toggleForm = () => setIsLogin(!isLogin);

    // Manejar el envío del formulario
    const handleSubmit = async (formData) => {
        let success;
        let response;
        setLoading(true);
        if (isLogin) {
            // Intentar iniciar sesión
            response = await actions.login(formData);
            success = response.success;
            await actions.getUserInfo();
        } else {
            // Intentar registrar un nuevo usuario
            response = await actions.register(formData);
            success = response.success;
        }

        if (success) {
            // Actualizar el token si el login o registro fue exitoso
            if (isMounted.current) {
                setToken(localStorage.getItem("token"));
            }

            // Si fue un registro exitoso, cambiar automáticamente a login
            if (!isLogin) {
                if (isMounted.current) {
                    setIsLogin(true);
                }
            } else {
                navigate("/");
            }
        } else {
            // Si no fue exitoso, asegurarse de mantenerse en la página de registro
            if (!isLogin) {
                if (isMounted.current) {
                    setMessage({ type: "success", text: response.message });
                    setIsLogin(false);
                }
            } else {
                if (isMounted.current) {
                    setMessage({ type: "error", text: response.message });
                }
            }
        }
        if (isMounted.current) {
            setLoading(false); // Detener el spinner al finalizar
        }
    };

    useEffect(() => {
        //console.log("Token actual:", token);
    }, [token]);

    return (
        <section className="banner__login" aria-labelledby="banner__title">

            {loading && <Spinner />}

            <div className="banner__image-container">
                <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888561/women-banner-2_aqfefy.png" alt="Fondo del banner mostrando un paisaje" className="banner__image-login" />
            </div>

            {/* Mostrar el formulario con la lógica de tipo login/register */}
            {isLogin ?
                <div className="banner__login-content container">
                    <div className="banner__column-login col-sm-12 col-md-12 col-lg-6">
                        <div className="login__text">
                            <h2 className="login__heading m-0" id="banner__title">Join Us and Start Planning!</h2>
                        </div>
                        <LoginForm onSubmit={handleSubmit} />
                        <p className="login-form__text">
                            Don't have an account? <button className="login-form__highlight" onClick={toggleForm}>Register</button>
                        </p>
                    </div>
                </div>
                :
                <div className="banner__login-content container">
                    <div className="banner__column-login col-sm-12 col-md-12 col-lg-6">
                        <div className="login__text">
                            <h2 className="login__heading m-0" id="banner__title">Welcome Back! <br /> Ready to Plan Your Next Meal?</h2>
                        </div>
                        <UserForm onSubmit={handleSubmit} />
                        <p className="login-form__text">
                            Already have an account? <button className="login-form__highlight" onClick={toggleForm}>Login</button>
                        </p>
                    </div>
                </div>
            }
        </section>
    );
}