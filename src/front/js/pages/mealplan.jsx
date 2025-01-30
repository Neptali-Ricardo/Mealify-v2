import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { SecondaryJumbotron } from "../component/secondaryJumbotron.jsx";
import { Card_Detail_Component } from "../component/card_details_preparation/card_detail_menu_component.jsx";

export const MealPlan = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [userPlans, setUserPlans] = useState(null); // Variable para guardar los planes
    const [desplegado, setDesplegado] = useState({});
    const [selectedRow, setSelectedRow] = useState(null); // Variable para la fila seleccionada

    const desplegar = (index) => {
        setDesplegado((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    useEffect(() => {
        // Redirige al login si no hay un token válido
        if (!store.token) {
            navigate("/loginRegister");
        }
        Obtener_planes();
    }, [store.token, navigate]);

    const Obtener_planes = async () => {
        await actions.getUserInfo();

        // Accede al objeto user en el store
        const user = store.user;

        if (user && user.id) {
            console.log("El id de usuario es (profile):", user.id);
        } else {
            console.log("No se encontró el id de usuario en la información del usuario:", user);
        }

        await actions.getPlans();

        // Accedemos a los datos del store
        const store_obtained = store.userPlans;

        console.log("Planes obtenidos:", JSON.stringify(store_obtained, null, 2));

        // Guardar los datos en el estado local
        setUserPlans(store_obtained);
    };

    const eliminarPlan = async (planId) => {
        const success = await actions.deletePlans(planId);
        if (success) {
            // Si la eliminación fue exitosa, actualiza la lista local de planes
            const planesActualizados = userPlans.filter((plan) => plan.id !== planId);
            setUserPlans(planesActualizados);
        } else {
            console.error("Error al eliminar el plan");
        }
        location.reload(true);
    };

    return (
        <>
            <SecondaryJumbotron />

            <div className="separator">
                <h2>Meal Plan</h2>
            </div>

            <div id="mealPlanAccordion">
                {userPlans ? (
                    userPlans.map((plan, index) => (
                        <div key={index} className="card mb-3">
                            <div className="card-header" onClick={() => desplegar(index)}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3>{plan.name}</h3>
                                    <button
                                        className="btn btn-danger btn-sm rounded-circle ms-3"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita que el evento de clic se propague al contenedor padre
                                            eliminarPlan(plan.id);
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                            {desplegado[index] && (
                                <div className="card-body">
                                    <p><strong>Creado en:</strong> {plan.create_at}</p>
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
                                            {plan.plan.map((detalle, idx) => (
                                                <tr key={idx} onClick={() => setSelectedRow(detalle)} data-bs-toggle="modal" data-bs-target="#dataModal">
                                                    <td>{detalle.day}</td>
                                                    <td>{detalle.mealType}</td>
                                                    <td>{detalle.ingredients}</td>
                                                    <td>{detalle.calories}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Cargando planes...</p>
                )}
            </div>

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
        </>
    );
};