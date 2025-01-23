import React from "react";
import { Separator } from "./separator.jsx";
import jumbotronImage from "../../img/jumbotron.jpg";
import jumbotronArrow from "../../img/arrow-right.png";
import { Navigate, useNavigate } from "react-router-dom";

export const Jumbotron = () => {

    const navigate = useNavigate();

    // Redirigir al perfil si está logueado
    const handleClick = () => {
        navigate ("/loginRegister");
    };

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

                <button href="#" onClick={handleClick} className="button button--jumbotron" aria-label="Descubre más sobre nuestros destinos">
                    Register
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_339_31545)">
                            <path d="M7.45293 12.3808C7.31768 12.2454 7.24171 12.0618 7.24171 11.8704C7.24171 11.679 7.31768 11.4954 7.45293 11.36L11.0353 7.77763L1.22226 7.77763C1.0307 7.77763 0.846994 7.70153 0.711544 7.56608C0.576095 7.43063 0.5 7.24692 0.5 7.05537C0.500001 6.86381 0.576095 6.6801 0.711545 6.54466C0.846994 6.40921 1.0307 6.33311 1.22226 6.33311L11.0353 6.33311L7.45293 2.75071C7.38197 2.68459 7.32506 2.60485 7.28558 2.51626C7.24611 2.42766 7.22488 2.33202 7.22317 2.23504C7.22146 2.13806 7.2393 2.04174 7.27562 1.9518C7.31195 1.86187 7.36602 1.78017 7.4346 1.71159C7.50318 1.643 7.58488 1.58894 7.67481 1.55261C7.76475 1.51629 7.86108 1.49845 7.95805 1.50016C8.05503 1.50187 8.15067 1.52309 8.23927 1.56257C8.32786 1.60205 8.4076 1.65896 8.47372 1.72992L13.2888 6.54497C13.424 6.6804 13.5 6.86397 13.5 7.05537C13.5 7.24677 13.424 7.43034 13.2888 7.56576L8.47372 12.3808C8.3383 12.5161 8.15473 12.592 7.96333 12.592C7.77193 12.592 7.58836 12.5161 7.45293 12.3808Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_339_31545">
                            <rect width="13" height="13" fill="white" transform="translate(0.5 0.5)"/>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
        </section>
    );
}

