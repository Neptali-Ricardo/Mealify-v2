import React from "react";

export const Filtro_Preferencias = ({ guests, allergens, medical }) => {

    return (
        <>
            <div className="filtro-form__form">
                <div className="filtro-form__field">
                    <label htmlFor="user">
                        Number of guests
                    </label>
                    <input
                        className="filtro-form__input"
                        type="text"
                        id="comensales"
                        name="comensales"
                        min="1"
                        max="100"
                        placeholder="0"
                        value={guests}
                        required
                    />
                </div>
                <div className="filtro-form__field">
                    <label htmlFor="user">
                        Allergens
                    </label>
                    <input
                        className="filtro-form__input"
                        type="text"
                        id="Allergens"
                        name="Allergens"
                        min="1"
                        max="100"
                        placeholder="0"
                        value={allergens}
                        required
                    />
                </div>
                <div className="filtro-form__field">
                    <label htmlFor="user">
                        Medical Conditions
                    </label>
                    <input
                        className="filtro-form__input"
                        type="text"
                        id="Medical-Conditions"
                        name="Medical-Conditions"
                        min="1"
                        max="100"
                        placeholder="0"
                        value={medical}
                        required
                    />
                </div>
            </div>
        </>
    )



}