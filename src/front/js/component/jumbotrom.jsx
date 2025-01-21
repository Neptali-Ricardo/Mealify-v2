import React from "react";
import { Separator } from "./separator.jsx";
import jumbotronImage from "../../img/jumbotron.jpg";

export const Jumbotron = () => {
    return (
        <section className="banner" aria-labelledby="banner__title">
            <div className="banner__image-container">
                <img src={jumbotronImage} alt="Fondo del banner mostrando un paisaje" className="banner__image" />
                <div className="banner__overlay" aria-hidden="true"></div>
            </div>

            <div className="banner__content container">
                <h1 id="banner__title" className="banner__title">What’s on your menu this week?</h1>
                
                <Separator />

                <h2 className="banner__subtitle">Smart Meal Planning With AI</h2>
                <p className="banner__description">Discover delicious recipes, optimize your shopping list, and create meal plans tailored to your lifestyle <br />
                with AI-powered suggestions from ChatGPT. Start planning today!</p>

                <a href="#" className="button--primary" aria-label="Descubre más sobre nuestros destinos">
                    Descubre
                    <img src="assets/icons/RightIcon.svg" alt="" aria-hidden="true"/>
                </a>
            </div>
        </section>
    );
}