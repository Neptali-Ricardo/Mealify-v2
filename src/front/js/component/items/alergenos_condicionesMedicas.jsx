import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
// Asegúrate de ajustar la ruta según tu estructura

export const Algerenos_Condiciones_Medicas = ({ Objectx }) => {

    const { store, actions } = useContext(Context)
    const [alergenos, setAlergenos] = useState([]);
    const [condicionesMedicas, setCondicionesMedicas] = useState([]);
    const [inputAlergenos, setInputAlergenos] = useState("");
    const [inputCondiciones, setInputCondiciones] = useState("");
    const [inputComensales, setInputComensales] = useState(1);

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
            console.log("El id de usuario es:", user.id);

            // Si necesitas incluir el ID del usuario en el JSON
            recetaData.userId = user.id;
        } else {
            console.log("No se encontró el id de usuario en la información del usuario:", user);
        }
        await actions.uploadProfile(user.id, recetaData);
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
        <div className="border border-rounded gap-2">
            <div className="d-flex flex-column justify-content-center align-items-center text-center">
                <h3>You health come first</h3>
                <p>
                    Let use know your alergens or medical conditions to tailor your meal plans perfectly. Click on any item to remove it
                </p>
            </div>
            <div className="container-fluid">
                <div className="row">
                    {/* Columna izquierda */}
                    <div className="col-6">
                        <div className="p-3">
                            <div className="d-flex gap-4">
                                {/* Formulario de alérgenos */}
                                <form onSubmit={addAlergenos} className="w-100">
                                    <div className="mb-3">
                                        <label htmlFor="allergens" className="form-label">Allergens</label>
                                        <input
                                            type="text"
                                            id="allergens"
                                            className="form-control"
                                            placeholder="Add your Allergens"
                                            value={inputAlergenos}
                                            onChange={(e) => setInputAlergenos(e.target.value)}
                                        />
                                    </div>
                                </form>
                                {/* Input para número de comensales */}
                                <div className="mb-3 w-100">
                                    <label htmlFor="numComensales" className="form-label">Number of diners:</label>
                                    <input
                                        type="number"
                                        id="numComensales"
                                        className="form-control"
                                        min="1"
                                        value={inputComensales}
                                        onChange={(e) => setInputComensales(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Lista de alérgenos */}
                            <div className="d-flex flex-wrap gap-2 mt-4">
                                {alergenos.map((alergeno, index) => (
                                    <button
                                        key={index}
                                        className="button button--small"
                                        onClick={() => removeAlergeno(index)}
                                    >
                                        {alergeno}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha */}
                    <div className="col-6">
                        <div className="p-3">
                            <label className="mb-2">Medical Conditions</label>
                            {/* Formulario para condiciones médicas */}
                            <form onSubmit={addCondiciones} className="w-100">
                                <input
                                    className="form-control mb-3"
                                    type="text"
                                    placeholder="Add your Medical Conditions"
                                    value={inputCondiciones}
                                    onChange={(e) => setInputCondiciones(e.target.value)}
                                />
                            </form>
                            {/* Lista de condiciones médicas */}
                            <div className="d-flex flex-wrap gap-4">
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
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <button className="button button--primary" onClick={guardar_Alergenos_Condiciones}>Guardar Preferencias</button>
            </div>
        </div>
    )


}