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
    const [datosPerfil, setDatosPerfil] = useState({})

    const [desplegar, setDesplegar] = useState("");
    const handleDesplegar = () => {
        setDesplegar(desplegar === "Desplegado" ? "" : "Desplegado");
    };

    const Obtener_Datos_Profile = async () => {

        await actions.getUserInfo();

        // Accede al objeto user en el store
        const user = store.user;

        if (user && user.id) {
            console.log("El id de usuario es (profile):", user.id);

            // Si necesitas incluir el ID del usuario en el JSON
        } else {
            console.log("No se encontró el id de usuario en la información del usuario:", user);
        }

        await actions.getUserProfile(user.id)

        const profile_obtained = store.userProfile;
        console.log(profile_obtained);

        let personas = 0;
        let alergenos = 0;
        let condiciones = 0;

        profile_obtained.forEach(profile => {
            alergenos += profile.alergenos ? profile.alergenos.length : 0;
            condiciones += profile.condicion ? profile.condicion.length : 0;
            personas += profile.comensales || 0;
        });

        // Actualizar los estados
        setDatosPerfil(profile_obtained);
        setCantidadPersonas(personas);
        setCantidadAlergenos(alergenos);
        setCantidadCondiciones(condiciones);

        console.log("Cantidad total de alergenos:", alergenos);
        console.log("Cantidad total de condiciones:", condiciones);
        console.log("Cantidad total de personas:", personas);

    }

    useEffect(() => {
        // Redirige al login si no hay un token válido
        if (!store.token) {
            navigate("/loginRegister");
        }
        Obtener_Datos_Profile();
    }, [store.token, navigate]); // Asegura que se ejecute cuando cambie el token o navigate

    return (
        <>
            <SecondaryJumbotron />

            <div class="container mt-5 mb-5">

                <h2 className="text-center profile__subtitle">Basic Profile Information</h2>

                <EditProfile />

                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div className="d-flex justify-content-between align-items-center">
                        <Filtro_Preferencias guests={cantidadPersonas} allergens={cantidadAlergenos} medical={cantidadCondiciones} />
                        <div onClick={handleDesplegar}>
                            <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 12.4994H8.97189M3.31438 12.4994H1M3.31438 12.4994C3.31438 11.7494 3.61234 11.03 4.14271 10.4997C4.67309 9.9693 5.39243 9.67134 6.14249 9.67134C6.89255 9.67134 7.61189 9.9693 8.14226 10.4997C8.67263 11.03 8.97059 11.7494 8.97059 12.4994C8.97059 13.2495 8.67263 13.9689 8.14226 14.4992C7.61189 15.0296 6.89255 15.3276 6.14249 15.3276C5.39243 15.3276 4.67309 15.0296 4.14271 14.4992C3.61234 13.9689 3.31438 13.2495 3.31438 12.4994ZM25 21.0707H17.5431M17.5431 21.0707C17.5431 21.8209 17.2445 22.5411 16.714 23.0716C16.1835 23.6021 15.464 23.9001 14.7137 23.9001C13.9637 23.9001 13.2443 23.6008 12.714 23.0705C12.1836 22.5401 11.8856 21.8208 11.8856 21.0707M17.5431 21.0707C17.5431 20.3205 17.2445 19.6016 16.714 19.0711C16.1835 18.5406 15.464 18.2426 14.7137 18.2426C13.9637 18.2426 13.2443 18.5405 12.714 19.0709C12.1836 19.6013 11.8856 20.3206 11.8856 21.0707M11.8856 21.0707H1M25 3.92821H20.9719M15.3144 3.92821H1M15.3144 3.92821C15.3144 3.17815 15.6123 2.4588 16.1427 1.92843C16.6731 1.39806 17.3924 1.1001 18.1425 1.1001C18.5139 1.1001 18.8816 1.17325 19.2248 1.31537C19.5679 1.4575 19.8796 1.66582 20.1423 1.92843C20.4049 2.19105 20.6132 2.50281 20.7553 2.84594C20.8974 3.18906 20.9706 3.55681 20.9706 3.92821C20.9706 4.2996 20.8974 4.66735 20.7553 5.01048C20.6132 5.3536 20.4049 5.66537 20.1423 5.92798C19.8796 6.19059 19.5679 6.39891 19.2248 6.54104C18.8816 6.68316 18.5139 6.75631 18.1425 6.75631C17.3924 6.75631 16.6731 6.45835 16.1427 5.92798C15.6123 5.39761 15.3144 4.67827 15.3144 3.92821Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                            </svg>
                        </div>
                    </div>
                    {desplegar === 'Desplegado' ? <Algerenos_Condiciones_Medicas Objectx={datosPerfil} /> : null}
                </div>
            </div>
        </>
    );
};

