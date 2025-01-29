import React, { useContext, useEffect } from "react";
import { SecondaryJumbotron } from "../component/secondaryJumbotron.jsx";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Menu_GPT } from "../gpt/gpt_crear_menu.jsx";

export const MenuCreator = () => {
    const navigate = useNavigate();
    const { store } = useContext(Context);

    useEffect(() => {
        // Redirige al login si no hay un token válido
        if (!store.token) {
            navigate("/loginRegister");
        }
    }, [store.token, navigate]); // Asegura que se ejecute cuando cambie el token o navigate

    return (
        <>
            <SecondaryJumbotron />

            <Menu_GPT />
        </>
    );
};