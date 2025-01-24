import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { SecondaryJumbotron } from "./secondaryJumbotron.jsx";
import { EditProfile } from "./editProfile.jsx";

export const Profile = () => {
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

            <EditProfile />

            <div className="separator">
                <h1>Perfil</h1>
            </div>
        </>
    );
};

