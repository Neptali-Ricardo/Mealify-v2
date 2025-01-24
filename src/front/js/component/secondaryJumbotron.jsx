import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Separator } from "./separator.jsx";
import jumbotronImage from "../../img/jumbotron.jpg";
import { Context } from "../store/appContext.js";

export const SecondaryJumbotron = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation(); // Obtiene la ubicación actual

    useEffect(() => {
        actions.getUserInfo();
    }, []);

    // Determina el contenido en función de la ruta actual
    const isProfile = location.pathname === "/profile";
    const title = isProfile
        ? `Welcome Back, ${store.user?.user || "Guest"}! Let’s Craft Your Perfect Plate.`
        : `${store.user?.user} Your Culinary Creations Await!`;
    const description = isProfile
        ? "Personalize your profile, fine-tune your goals, and celebrate every milestone on your journey."
        : "Explore your saved menus, refine your recipes, and savor the journey of delicious possibilities.";

    return (
        <section className="banner__secondary" aria-labelledby="banner__title">
            <div className="banner__image-container">
                <img src={jumbotronImage} alt="Fondo del banner mostrando un paisaje" className="banner__image" />
                <div className="banner__overlay" aria-hidden="true"></div>
            </div>

            <div className="banner__content container gap-3">
                <h2 className="banner__secondary--title">{title}</h2>
                <Separator />
                <p className="banner__description">{description}</p>
            </div>
        </section>
    );
};
