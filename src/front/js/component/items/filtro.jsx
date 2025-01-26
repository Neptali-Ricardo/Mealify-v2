import React from "react";

export const Filtro_Preferencias = ({ guests, allergens, medical }) => {

    return (
        <div>
            <h2>
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
                        value={guests}
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
                        value={allergens}
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
                        placeholder="0" value={medical}
                        required
                    />
                </button>
            </h2>
        </div>
    )



}