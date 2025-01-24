import React, { useContext, useEffect } from "react";
import { Separator } from "./separator.jsx";
import jumbotronImage from "../../img/jumbotron.jpg";
import { Context } from "../store/appContext.js";

export const SecondaryJumbotron = () => {

    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getUserInfo();
    }, []);

    return (
        <section className="banner__secondary" aria-labelledby="banner__title">
            <div className="banner__image-container">
                <img src={jumbotronImage} alt="Fondo del banner mostrando un paisaje" className="banner__image" />
                <div className="banner__overlay" aria-hidden="true"></div>
            </div>

            <div className="banner__content container">
                <h2 className="banner__secondary--title">Welcome Back, {store.user?.user || "Guest"}! Let’s Craft Your Perfect Plate.</h2>
                <Separator />
                <p className="banner__description">Personalize your profile, fine-tune your goals, and celebrate every milestone on your journey.</p>
            </div>
        </section>
    );
}

