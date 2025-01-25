import React from "react";

export const Filtro_Preferencias = () => {

    return (
        <div>
            <h2 class="accordion-header">
                <button class="accordion-button collapsed gap-2" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    Number of guests
                    <input
                        className="contact-form__input-acoordion"
                        type="text"
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
                        type="text"
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
                        type="text"
                        id="Medical-Conditions"
                        name="Medical-Conditions"
                        min="1"
                        max="100"
                        placeholder="0"
                        required
                    />
                </button>
            </h2>
        </div>
    )



}