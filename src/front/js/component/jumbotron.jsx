import React from "react";
import { Separator } from "./separator.jsx";
import jumbotronImage from "../../img/jumbotron.jpg";

export const Jumbotron = () => {

    const handleClick = () => {
        const section = document.getElementById("MenuCreator");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
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

                <button href="#" onClick={handleClick} className="button button--medium" aria-label="Descubre más sobre nuestros destinos">
                    Discover
                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2257_5910)">
                            <path d="M1.61919 6.95293C1.75461 6.81768 1.93818 6.74171 2.12958 6.74171C2.32098 6.74171 2.50455 6.81768 2.63998 6.95293L6.22237 10.5353L6.22238 0.722258C6.22238 0.530704 6.29847 0.346994 6.43392 0.211545C6.56937 0.0760952 6.75308 1.05539e-06 6.94463 1.08051e-06C7.13619 1.10563e-06 7.3199 0.0760953 7.45535 0.211545C7.5908 0.346994 7.66689 0.530704 7.66689 0.722259L7.66689 10.5353L11.2493 6.95293C11.3154 6.88197 11.3951 6.82506 11.4837 6.78558C11.5723 6.74611 11.668 6.72488 11.765 6.72317C11.8619 6.72146 11.9583 6.7393 12.0482 6.77562C12.1381 6.81195 12.2198 6.86602 12.2884 6.9346C12.357 7.00318 12.4111 7.08488 12.4474 7.17481C12.4837 7.26475 12.5016 7.36108 12.4998 7.45805C12.4981 7.55503 12.4769 7.65067 12.4374 7.73927C12.398 7.82786 12.341 7.9076 12.2701 7.97372L7.45503 12.7888C7.3196 12.924 7.13603 13 6.94463 13C6.75323 13 6.56966 12.924 6.43424 12.7888L1.61919 7.97372C1.48393 7.8383 1.40796 7.65473 1.40796 7.46333C1.40796 7.27193 1.48393 7.08836 1.61919 6.95293Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2257_5910">
                                <rect width="13" height="13" fill="white" transform="translate(13.5) rotate(90)" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
        </section>
    );
}

