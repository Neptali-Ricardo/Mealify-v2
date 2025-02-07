import React, { useContext, useEffect, useState } from "react";
import { getChatGPTResponse } from "./api"; // Asegúrate de ajustar la ruta según tu estructura
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Filtro_Preferencias } from "../component/items/filtro.jsx";
import { Algerenos_Condiciones_Medicas } from "../component/items/alergenos_condicionesMedicas.jsx";
import { Card_Detail_Component } from "../component/card_details_preparation/card_detail_menu_component.jsx";
import "../../styles/components/_menuCreatorTable.css";
import { Spinner } from "../component/spinner.jsx";

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
        cantidadPersonas;
        cantidadAlergenos;
        cantidadCondiciones;
        
    }, [cantidadPersonas, cantidadAlergenos, cantidadCondiciones]);

    const handleGuardar = async () => {
        if (!store.token) {
            alert("Tienes que iniciar sesión para guardar esta receta");
            navigate("/loginRegister");
        } else {
            //console.log("Receta guardada:", resultado);

            // Crea el JSON con todos los datos del formulario
            const recetaData = {
                "alergenos": alergenos,
                "comensales": inputComensales,
                "condicion": condicionesMedicas,
            };

            //console.log("Datos del formulario en formato JSON:", recetaData);

            // Asegúrate de esperar a que la información del usuario sea cargada
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
                return;
            }

            await actions.getUserProfile();

            const profile_obtained = store.userProfile || [];
            //console.log(profile_obtained);

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
        setLoading(true);
        const fullConsulta = `Create a weekly menu for me.
        Breakfast, lunch, and dinner  
        Preferences: ${consulta.trim()}.
        Number of diners: ${inputComensales}.
        Exclude these foods: ${alergenos.join(", ")}.
        I have these medical conditions: ${condicionesMedicas.join(", ")}.
        From Monday to Sunday
        Include the ingredients, quantities in weight, and total calories of each dish separated by |.`;

        try {
            const response = await getChatGPTResponse([
                { role: "user", content: fullConsulta.trim() },
            ]);
            //console.log(response.content)
            setResultado(response.content);
        } catch (error) {
            //console.error("Error al obtener la respuesta de ChatGPT:", error);
            setResultado("Hubo un error al procesar la consulta.");
        }
        setLoading(false);
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
    //console.log(parsedData)

    const mealPlans = () => {
        navigate('/mealplan')
    }

    return (
        <div className="menu__container container text-center mt-5">
            {loading && <Spinner />}
            <div className="text-center">
                <h2 className="menu__title">What are <strong>cooking today</strong></h2>
                <p className="menu__description">Tell us what you need, and let AI create the perfect weekly menu for you.</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="form__form">
                <div className="menu-form__field">
                    <input
                        type="text"
                        className="form__input"
                        placeholder="Write your dietary preferences (e.g., vegetarian, high protein)"
                        value={consulta}
                        onChange={(e) => setConsulta(e.target.value)}
                    />
                    <div className="btn-group button-groupe--primary" role="group" aria-label="Large button group">
                        <button type="button" className="button button--primary__left" onClick={generarConsulta}>
                            Generate Your Meal Plan
                            <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                        </button>
                        <button type="button" className="button button--primary__right" onClick={handleDesplegar}>
                            <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1738087672/filter-icon-white_iy1jw2.svg" alt="arrow icon" className="button__icon" />
                        </button>
                    </div>
                </div>
            </form>
            
            <Filtro_Preferencias guests={cantidadPersonas || 0} allergens={cantidadAlergenos || 0} medical={cantidadCondiciones || 0} />
            {desplegar === "Desplegado" ? (
                <Algerenos_Condiciones_Medicas Objectx={datosPerfil} />
            ) : null}

            {parsedData.length > 0 && (
                <div className="text-center">
                    <h3 className="menu__title">Weekly <strong>Meal Plan</strong></h3>
                    <p className="menu__description">Plan ahead and enjoy a variety of tasty dishes all week long.</p>
                </div>
            )}

            <div className="resultado_GPT">
                {parsedData.length > 0 ? (
                    <>
                        <div className="menu-creator">
                            <table className="menu-creator__table">
                                <thead className="menu-creator__thead">
                                    <tr className="menu-creator__tr">
                                        <th className="menu-creator__th">Day</th>
                                        <th className="menu-creator__th">Meal Type</th>
                                        <th className="menu-creator__th">Ingredients</th>
                                        <th className="menu-creator__th">Calories</th>
                                    </tr>
                                </thead>
                                <tbody className="menu-creator__tbody">
                                    {parsedData.map((row, index) => (
                                        <tr key={index} className="menu-creator__tr" onClick={() => setSelectedRow(row)} data-bs-toggle="modal" data-bs-target="#dataModal">
                                            <td className="menu-creator__td">{row.day}</td>
                                            <td className="menu-creator__td">{row.mealType}</td>
                                            <td className="menu-creator__td">{row.ingredients}</td>
                                            <td className="menu-creator__td">{row.calories}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="modal fade" id="dataModal" tabIndex="-1" aria-labelledby="dataModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content d-flex flex-column content-space">
                                        <div className="modal-body d-flex flex-column card-space">
                                            {selectedRow ? (
                                                <>
                                                    <div className="modal-header modal__header-custom">
                                                        <div className="d-flex flex-column">
                                                            <h5 className="modal-title modal_title" id="dataModalLabel"> {selectedRow.mealType}</h5>
                                                            <h5>{selectedRow.day}</h5>
                                                        </div>
                                                    </div>
                                                    <Card_Detail_Component comida={selectedRow.mealType} tipo_comida={selectedRow.day} ingredientes={selectedRow.ingredients} calorias={selectedRow.calories} />
                                                </>
                                            ) : (
                                                <p>Selecciona una fila para ver los detalles.</p>
                                            )}
                                        </div>
                                        <div className="modal-footer d-flex justify-content-center">
                                            <button type="button" className="button button--primary w-100" data-bs-dismiss="modal">
                                                <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-left-button_icwmqo.svg" alt="arrow  left" className="banner__icon" />
                                                Go Back to Meal Menu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="button-group__table">
                                <button className="button button--primary" type="button" onClick={handleGuardar}>
                                    Save MealPlans
                                    <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                                </button>
                                <button onClick={mealPlans} className="button button--primary" type="button">
                                    Go to MealPlans
                                    <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>{resultado}</p>
                )}
            </div>
        </div>
    );
};
