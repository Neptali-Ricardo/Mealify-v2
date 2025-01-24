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

            <div class="container mt-5 mb-5">

                <h2 className="text-center profile__subtitle">Basic Profile Information</h2>

                <EditProfile />

                <div class="accordion accordion-flush" id="accordionFlushExample">

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed gap-2" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Number of guests
                                <input
                                    className="contact-form__input-acoordion"
                                    type="number"
                                    id="comensales"
                                    name="comensales"
                                    min="1"
                                    max="100"
                                    placeholder="0"
                                    required
                                />
                                Allergens
                                <input
                                    className="contact-form__input-acoordion"
                                    type="number"
                                    id="Allergens"
                                    name="Allergens"
                                    min="1"
                                    max="100"
                                    placeholder="0"
                                    required
                                />
                                Medical Conditions
                                <input
                                    className="contact-form__input-acoordion"
                                    type="number"
                                    id="Medical-Conditions"
                                    name="Medical-Conditions"
                                    min="1"
                                    max="100"
                                    placeholder="0"
                                    required
                                />
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body text-center">
                                <h2>Aquí los Allergens and Medical Conditions</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

