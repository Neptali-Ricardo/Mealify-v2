import React, { useContext, useEffect, useState } from "react";
import { getChatGPTResponse } from "./api"; // Asegúrate de ajustar la ruta según tu estructura
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Filtro_Preferencias } from "../component/items/filtro.jsx";
import { Algerenos_Condiciones_Medicas } from "../component/items/alergenos_condicionesMedicas.jsx";
import { Card_Detail_Component } from "../component/card_details_preparation/card_detail_menu_component.jsx";

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
    const [cantidadPersonas, setCantidadPersonas] = useState(0);
    const [cantidadAlergenos, setCantidadAlergenos] = useState(0);
    const [cantidadCondiciones, setCantidadCondiciones] = useState(0);
    const [datosPerfil, setDatosPerfil] = useState([]);
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        Obtener_Datos_Profile()
    }, [])

    useEffect(() => {
        // Este efecto se ejecutará cada vez que cambien las variables
        console.log("Datos actualizados:", {
            cantidadPersonas,
            cantidadAlergenos,
            cantidadCondiciones,
        });
    }, [cantidadPersonas, cantidadAlergenos, cantidadCondiciones]);

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

            const today = new Date();
            const formattedDate = `${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;

            const plan = {
                "plan": parsedData,
                "create_at": formattedDate,
                "name": consulta
            }

            await actions.uploadProfile(recetaData);
            await actions.uploadPlan(user.id, plan);
        }
    };

    const Obtener_Datos_Profile = async () => {
        try {
            await actions.getUserInfo();
            const user = store.user;

            if (user && user.id) {
                console.log("El id de usuario es (profile):", user.id);
            } else {
                console.error("No se encontró el id de usuario.");
                return;
            }

            await actions.getUserProfile();

            const profile_obtained = store.userProfile || [];
            console.log(profile_obtained);

            // Cálculo de datos
            let personas = 0, alergenos = 0, condiciones = 0;

            profile_obtained.forEach(profile => {
                alergenos += profile.alergenos ? profile.alergenos.length : 0;
                condiciones += profile.condicion ? profile.condicion.length : 0;
                personas += profile.comensales || 0;
            });

            if (profile_obtained.length > 0) {
                const newAlergenos = profile_obtained.flatMap(profile => profile.alergenos) || [];
                const newCondiciones = profile_obtained.flatMap(profile => profile.condicion) || [];
                const totalComensales = profile_obtained.reduce((acc, profile) => acc + (profile.comensales || 0), 0);

                setAlergenos(newAlergenos);
                setCondicionesMedicas(newCondiciones);
                setInputComensales(totalComensales);
            }

            // Actualización de estados
            setDatosPerfil(profile_obtained);
            setCantidadPersonas(personas || 0);
            setCantidadAlergenos(alergenos || 0);
            setCantidadCondiciones(condiciones || 0);
        } catch (error) {
            console.error("Error obteniendo datos del perfil:", error);
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
Que no tenga estos alimentos: ${alergenos.join(", ")}.
Tengo estas condiciones médicas: ${condicionesMedicas.join(", ")}.
De lunes a domingo
Incluye los ingredientes, cantidades en peso y calorías totales de cada plato separados en |.`;

        try {
            const response = await getChatGPTResponse([
                { role: "user", content: fullConsulta.trim() },
            ]);
            console.log(response.content)
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
    console.log(parsedData)

    const mealPlans = () => {
        navigate('/mealplan')
    }

    return (
        <div className="menu__container container text-center mt-5 mb-5">
            <div className="text-center">
                <h2 className="menu__title">What are <strong>cooking today</strong></h2>
                <p className="menu__description">Tell us what you need, and let AI create the perfect weekly menu for you.</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="contact-form__form">
                <div className="menu-form__field">
                    <input
                        type="text"
                        className="contact-form__input"
                        placeholder="Write your dietary preferences (e.g., vegetarian, high protein)"
                        value={consulta}
                        onChange={(e) => setConsulta(e.target.value)}
                    />
                    <div class="btn-group button-groupe--primary" role="group" aria-label="Large button group">
                        <button type="button" class="button button--primary__left" onClick={generarConsulta}>
                            Generate Your Meal Plan
                            <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                        </button>
                        <button type="button" class="button button--primary__right" onClick={handleDesplegar}>
                            <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1738087672/filter-icon-white_iy1jw2.svg" alt="arrow icon" className="button__icon" />
                        </button>
                    </div>
                </div>
                <Filtro_Preferencias guests={cantidadPersonas || 0} allergens={cantidadAlergenos || 0} medical={cantidadCondiciones || 0} />
                {desplegar === "Desplegado" ? (
                    <Algerenos_Condiciones_Medicas Objectx={datosPerfil} />
                ) : null}
            </form>
            <div className="resultado_GPT mt-4">
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
                                    <tr key={index} onClick={() => setSelectedRow(row)} data-bs-toggle="modal" data-bs-target="#dataModal">
                                        <td>{row.day}</td>
                                        <td>{row.mealType}</td>
                                        <td>{row.ingredients}</td>
                                        <td>{row.calories}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="modal fade" id="dataModal" tabIndex="-1" aria-labelledby="dataModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        {selectedRow ? (
                                            <>
                                                <div className="modal-header">
                                                    <div className="d-flex flex-column">
                                                        <h5 className="modal-title" id="dataModalLabel"> {selectedRow.mealType}</h5>
                                                        <h5>{selectedRow.day}</h5>
                                                    </div>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <Card_Detail_Component comida={selectedRow.mealType} tipo_comida={selectedRow.day} ingredientes={selectedRow.ingredients} calorias={selectedRow.calories} />
                                            </>
                                        ) : (
                                            <p>Selecciona una fila para ver los detalles.</p>
                                        )}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button className="button button--secondary" type="button" onClick={handleGuardar}>
                                Save recipe
                            </button>
                            <button onClick={mealPlans} className="button button--secondary" type="button">
                                Go to MealPlans
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>{resultado}</p>
                )}
            </div>
        </div>
    );
};
