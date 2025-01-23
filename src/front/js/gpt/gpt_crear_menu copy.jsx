import React, { useState } from "react";
import { getChatGPTResponse } from "./api"; // Asegúrate de ajustar la ruta según tu estructura

export const Menu_GPT = () => {
    const [desplegar, setDesplegar] = useState("");
    const [alergenos, setAlergenos] = useState([]);
    const [condicionesMedicas, setCondicionesMedicas] = useState([]);
    const [inputAlergenos, setInputAlergenos] = useState("");
    const [inputCondiciones, setInputCondiciones] = useState("");
    const [consulta, setConsulta] = useState("");
    const [resultado, setResultado] = useState("");

    const handleDesplegar = () => {
        setDesplegar(desplegar === "Desplegado" ? "" : "Desplegado");
    };

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

    const generarConsulta = async () => {
        if (consulta.trim() === "") {
            alert("Por favor, escribe una consulta.");
            return;
        }

        const fullConsulta = `
      ${consulta}.
      Considera estos alérgenos: ${alergenos.join(", ")}.
      Considera estas condiciones médicas: ${condicionesMedicas.join(", ")}.
    `;

        try {
            const response = await getChatGPTResponse([
                { role: "user", content: fullConsulta.trim() },
            ]);
            setResultado(response.content); // Mostramos el contenido de la respuesta
        } catch (error) {
            console.error("Error al obtener la respuesta de ChatGPT:", error);
            setResultado("Hubo un error al procesar la consulta.");
        }
    };

    return (
        <div>
            <h1>What are cooking today</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="d-flex flex-column">
                    <input
                        type="text"
                        placeholder="Start typing to plan your meals"
                        value={consulta}
                        onChange={(e) => setConsulta(e.target.value)}
                    />
                    <button type="button" onClick={generarConsulta}>
                        Generate your meal plan
                    </button>
                </div>
                <div className="d-flex justify-content-between">
                    <h5>Allergens and Medical Conditions</h5>
                    <button type="button" onClick={handleDesplegar}>
                        {desplegar === "Desplegado" ? "Hide" : "Desplegar"}
                    </button>
                </div>

                {desplegar === "Desplegado" ? (
                    <>
                        <div>
                            <h5>Manage your Allergens</h5>
                            <p>
                                Add your allergens to the list by typing them below. Click on
                                any allergen to remove it.
                            </p>
                            <form onSubmit={addAlergenos}>
                                <input
                                    type="text"
                                    placeholder="Add your Allergens"
                                    value={inputAlergenos}
                                    onChange={(e) => setInputAlergenos(e.target.value)}
                                />
                                <button type="submit">Add</button>
                            </form>
                            <div className="d-flex flex-wrap gap-2 mt-3">
                                {alergenos.map((alergeno, index) => (
                                    <button
                                        key={index}
                                        className="btn btn-outline-danger"
                                        onClick={() => removeAlergeno(index)}
                                    >
                                        {alergeno}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h5>Manage your Medical Conditions</h5>
                            <p>
                                Add your Medical Conditions to the list by typing them below.
                                Click on any condition to remove it.
                            </p>
                            <form onSubmit={addCondiciones}>
                                <input
                                    type="text"
                                    placeholder="Add your Medical Conditions"
                                    value={inputCondiciones}
                                    onChange={(e) => setInputCondiciones(e.target.value)}
                                />
                                <button type="submit">Add</button>
                            </form>
                            <div className="d-flex flex-wrap gap-2 mt-3">
                                {condicionesMedicas.map((condicion, index) => (
                                    <button
                                        key={index}
                                        className="btn btn-outline-warning"
                                        onClick={() => removeCondicion(index)}
                                    >
                                        {condicion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                ) : null}
            </form>

            <div className="resultado_GPT">
                <h5>Response:</h5>
                <p>{resultado}</p>
            </div>
        </div>
    );
};
