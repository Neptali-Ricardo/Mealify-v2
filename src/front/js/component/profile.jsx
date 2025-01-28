import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { SecondaryJumbotron } from "./secondaryJumbotron.jsx";
import { EditProfile } from "./editProfile.jsx";
import { Filtro_Preferencias } from "./items/filtro.jsx";
import { Algerenos_Condiciones_Medicas } from "./items/alergenos_condicionesMedicas.jsx";

export const Profile = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [cantidadPersonas, setCantidadPersonas] = useState(0);
    const [cantidadAlergenos, setCantidadAlergenos] = useState(0);
    const [cantidadCondiciones, setCantidadCondiciones] = useState(0);
    const [datosPerfil, setDatosPerfil] = useState([]);

    const [desplegar, setDesplegar] = useState("");
    const handleDesplegar = () => {
        setDesplegar(desplegar === "Desplegado" ? "" : "Desplegado");
    };

    const Obtener_Datos_Profile = async () => {
        try {
            await actions.getUserInfo();
            const user = store.user;

            if (user && user.id) {
                console.log("El id de usuario es (profile):", user.id);
            } else {
                console.error("No se encontró el id de usuario.");
                return;
            }

            await actions.getUserProfile();

            const profile_obtained = store.userProfile || [];
            console.log(profile_obtained);

            // Cálculo de datos
            let personas = 0, alergenos = 0, condiciones = 0;

            profile_obtained.forEach(profile => {
                alergenos += profile.alergenos ? profile.alergenos.length : 0;
                condiciones += profile.condicion ? profile.condicion.length : 0;
                personas += profile.comensales || 0;
            });

            // Actualización de estados
            setDatosPerfil(profile_obtained);
            setCantidadPersonas(personas || 0);
            setCantidadAlergenos(alergenos || 0);
            setCantidadCondiciones(condiciones || 0);
        } catch (error) {
            console.error("Error obteniendo datos del perfil:", error);
        }
    };

    useEffect(() => {
        if (!store.token) navigate("/loginRegister");
        Obtener_Datos_Profile();
    }, [store.token, navigate]);

    return (
        <>
            <SecondaryJumbotron />

            <div class="container mt-5 mb-5">

                <h2 className="text-center profile__subtitle">Basic Profile Information</h2>

                <EditProfile />

            </div>
        </>
    );
};

