import React, { useContext, useState } from "react";
import { LoginForm } from "../component/loginForm.jsx";
import { UserForm } from "../component/userForm.jsx";
import { Context } from "../store/appContext.js";

export default function LoginRegister() {

    const { store, actions } = useContext(Context);

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

    return (
        <div className="container">

            <div className="row" >
                <div className="col-6 col-md-6">
                    
                </div>

                <div className="col-6 col-md-6">
                    <UserForm onSubmit={handleRegister} />
                </div>      
            </div>

            <div className="row mt-5 mb-5">
                <div className="col-6 col-md-6">
                    
                </div>

                <div className="col-6 col-md-6">
                    <LoginForm onSubmit={handleLogin}/>
                </div>      
            </div>

        </div>
    );
}
