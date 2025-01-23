import React, { useContext, useState } from "react";
import { getChatGPTResponse } from "./api"; // Asegúrate de ajustar la ruta según tu estructura
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Menu_GPT = () => {
    const [desplegar, setDesplegar] = useState("");
    const [alergenos, setAlergenos] = useState([]);
    const [condicionesMedicas, setCondicionesMedicas] = useState([]);
    const [inputAlergenos, setInputAlergenos] = useState("");
    const [inputCondiciones, setInputCondiciones] = useState("");
    const [inputComensales, setInputComensales] = useState(1); // Número de comensales
    const [consulta, setConsulta] = useState("");
    const [resultado, setResultado] = useState("");
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleGuardar = async () => {
        if (!store.token) {
            alert("Tienes que iniciar sesión para guardar esta receta");
            navigate("/loginRegister");
        } else {
            console.log("Receta guardada:", resultado);

            // Crea el JSON con todos los datos del formulario
            const recetaData = {
                "alergenos": alergenos,
                "comensales": inputComensales,
                "condicion": condicionesMedicas,
            };

            console.log("Datos del formulario en formato JSON:", recetaData);

            // Asegúrate de esperar a que la información del usuario sea cargada
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
    };

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
            alert("Por favor, escribe tus preferencias alimenticias.");
            return;
        }

        const fullConsulta = `Hazme un menú semanal.
Desayuno, comida y cena  
Preferencias: ${consulta.trim()}.
Número de comensales: ${inputComensales}.
Considera estos alérgenos: ${alergenos.join(", ")}.
Considera estas condiciones médicas: ${condicionesMedicas.join(", ")}.
De lunes a domingo
Incluye los ingredientes, cantidades en peso y calorías totales de cada plato separados en |.`;

        try {
            const response = await getChatGPTResponse([
                { role: "user", content: fullConsulta.trim() },
            ]);
            setResultado(response.content);
        } catch (error) {
            console.error("Error al obtener la respuesta de ChatGPT:", error);
            setResultado("Hubo un error al procesar la consulta.");
        }
    };

    const parseResult = (result) => {
        const rows = result.split("\n").filter((row) => row.trim() !== "");
        return rows.map((row) => {
            const [dayAndMeal, ingredients, calories] = row.split("|").map((item) => item.trim());
            const [day, mealType] = dayAndMeal.split(":").map((item) => item.trim());
            return {
                day,
                mealType,
                ingredients,
                calories,
            };
        });
    };

    const parsedData = parseResult(resultado);

    return (
        <div>
            <h1>What are cooking today</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="d-flex flex-column">
                    <input
                        type="text"
                        placeholder="Write your dietary preferences (e.g., vegetarian, high protein)"
                        value={consulta}
                        onChange={(e) => setConsulta(e.target.value)}
                    />
                    <button type="button" onClick={generarConsulta}>
                        Generate your meal plan
                    </button>
                </div>
                <div className="mt-3">
                    <label htmlFor="numComensales">Number of diners:</label>
                    <input
                        type="number"
                        id="numComensales"
                        min="1"
                        value={inputComensales}
                        onChange={(e) => setInputComensales(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-between mt-4">
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

            <div className="resultado_GPT mt-4">
                <h5>Response:</h5>
                {parsedData.length > 0 ? (
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Meal Type</th>
                                    <th>Ingredients</th>
                                    <th>Calories</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parsedData.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.day}</td>
                                        <td>{row.mealType}</td>
                                        <td>{row.ingredients}</td>
                                        <td>{row.calories}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="button" onClick={handleGuardar}>Guardar receta</button>
                    </div>

                ) : (
                    <p>{resultado}</p>
                )}
            </div>
        </div>
    );
};
