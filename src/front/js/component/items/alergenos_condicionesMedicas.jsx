import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
// Asegúrate de ajustar la ruta según tu estructura

export const Algerenos_Condiciones_Medicas = ({ Objectx }) => {

    const { store, actions } = useContext(Context)
    const [alergenos, setAlergenos] = useState([]);
    const [condicionesMedicas, setCondicionesMedicas] = useState([]);
    const [inputAlergenos, setInputAlergenos] = useState("");
    const [inputCondiciones, setInputCondiciones] = useState("");
    const [inputComensales, setInputComensales] = useState(1);

    useEffect(() => {
        if (Objectx.length > 0) {
            const newAlergenos = Objectx.flatMap(profile => profile.alergenos) || [];
            const newCondiciones = Objectx.flatMap(profile => profile.condicion) || [];
            const totalComensales = Objectx.reduce((acc, profile) => acc + (profile.comensales || 0), 0);

            setAlergenos(newAlergenos);
            setCondicionesMedicas(newCondiciones);
            setInputComensales(totalComensales);
        }
    }, [Objectx]);

    const guardar_Alergenos_Condiciones = async () => {
        const recetaData = {
            "alergenos": alergenos,
            "comensales": inputComensales,
            "condicion": condicionesMedicas,
        };

        await actions.getUserInfo();

        // Accede al objeto user en el store
        const user = store.user;

        if (user && user.id) {
            //console.log("El id de usuario es:", user.id);

            // Si necesitas incluir el ID del usuario en el JSON
            recetaData.userId = user.id;
        } else {
            console.log("No se encontró el id de usuario en la información del usuario:", user);
        }
        await actions.uploadProfile(recetaData);

        location.reload(true)
    }

    const addAlergenos = (e) => {
        e.preventDefault();
        if (inputAlergenos.trim() !== "") {
            setAlergenos([...alergenos, inputAlergenos]);
            setInputAlergenos("");
        }
    };

    const addCondiciones = (e) => {
        e.preventDefault();
        if (inputCondiciones.trim() !== "") {
            setCondicionesMedicas([...condicionesMedicas, inputCondiciones]);
            setInputCondiciones("");
        }
    };

    const removeAlergeno = (index) => {
        setAlergenos(alergenos.filter((_, i) => i !== index));
    };

    const removeCondicion = (index) => {
        setCondicionesMedicas(condicionesMedicas.filter((_, i) => i !== index));
    };

    return (
        <div className="alergenos-condiciones container">
            <div className="alergenos-condiciones__header">
                <h3 className="alergenos-condiciones__title">Your health come first</h3>
                <p className="alergenos-condiciones__description">
                    Let use know your alergens or medical conditions to tailor your meal plans perfectly. Click on any item to remove it
                </p>
            </div>
            <div className="alergenos-condiciones__content row">
                {/* Columna izquierda */}
                <div className=" col-sm-12 col-lg-6">
                    <div className="medical-condiciones__section">
                        <div className="alergenos-condiciones__section">
                            {/* Formulario de alérgenos */}
                            <div className="alergenos-condiciones__container">
                                <form onSubmit={addAlergenos} className="alergenos-condiciones__form form__form">
                                    <div className=" form__field">
                                        <label htmlFor="allergens" className=" form__label">Allergens</label>
                                        <input
                                            type="text"
                                            id="allergens"
                                            className="form__input"
                                            placeholder="Add your Allergens"
                                            value={inputAlergenos}
                                            onChange={(e) => setInputAlergenos(e.target.value)}
                                        />
                                    </div>
                                </form>
                                {/* Input para número de comensales */}
                                <div className="dinners__section form__field">
                                    <label htmlFor="numComensales" className="form__label">Number of diners</label>
                                    <input
                                        type="number"
                                        id="numComensales"
                                        className="form__input"
                                        min="1"
                                        value={inputComensales}
                                        onChange={(e) => setInputComensales(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Lista de alérgenos */}
                        <div className="alergenos-condiciones__list">
                            {alergenos.map((alergeno, index) => (
                                <button
                                    key={index}
                                    className="alergenos-condiciones__item button button--small"
                                    onClick={() => removeAlergeno(index)}
                                >
                                    {alergeno}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Columna derecha */}
                <div className=" col-sm-12 col-lg-6">
                    <div className="medical-condiciones__section">
                        <label className="form__label">Medical Conditions</label>
                        {/* Formulario para condiciones médicas */}
                        <form onSubmit={addCondiciones} className="medical-condiciones__form form__form">
                            <input
                                className="medical-condiciones__input form__input"
                                type="text"
                                placeholder="Add your Medical Conditions"
                                value={inputCondiciones}
                                onChange={(e) => setInputCondiciones(e.target.value)}
                            />
                        </form>
                        {/* Lista de condiciones médicas */}
                        <div className="alergenos-condiciones__list">
                            {condicionesMedicas.map((condicion, index) => (
                                <button
                                    key={index}
                                    className="button button--small"
                                    onClick={() => removeCondicion(index)}
                                >
                                    {condicion}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <button className="button button--primary" onClick={guardar_Alergenos_Condiciones}>Guardar Preferencias</button>
            </div>
        </div>
    )


}