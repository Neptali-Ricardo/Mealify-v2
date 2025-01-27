import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { SecondaryJumbotron } from "../component/secondaryJumbotron.jsx";

export const MealPlan = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [userPlans, setUserPlans] = useState([]); // Estado inicial como array vacío

    useEffect(() => {
        if (!store.token) {
            navigate("/loginRegister");
        } else {
            obtenerPlanes();
        }
    }, [store.token]);

    const obtenerPlanes = async () => {
        await actions.getUserInfo();
        await actions.getPlans();

        // Verifica si store.userPlans contiene datos válidos
        const planes = store.userPlans || []; // Si es undefined, usa un array vacío
        console.log("Datos obtenidos en userPlans:", planes);

        setUserPlans(planes); // Actualiza el estado local con los datos
    };

    const eliminarPlan = async (planId) => {
        try {
            const success = await actions.deletePlans(planId); // Acción para eliminar el plan
            if (success) {
                // Filtrar los planes eliminando el que tenga el ID indicado
                const planesActualizados = userPlans.filter((plan) => plan.id !== planId);
                setUserPlans(planesActualizados); // Actualiza el estado local
                console.log("Planes actualizados después de eliminar:", planesActualizados);
            } else {
                console.error("Error al eliminar el plan en el servidor.");
            }
        } catch (error) {
            console.error("Error al eliminar el plan:", error);
        }
    };

    return (
        <>
            <SecondaryJumbotron />

            <div className="separator">
                <h2>Meal Plan</h2>
            </div>

            <div className="accordion" id="mealPlanAccordion">
                {userPlans.length > 0 ? ( // Muestra los planes si hay datos
                    userPlans.map((plan) => (
                        <div key={plan.id} className="accordion-item">
                            <h2 className="accordion-header" id={`heading${plan.id}`}>
                                <button
                                    className="accordion-button d-flex justify-content-between align-items-center"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${plan.id}`}
                                    aria-expanded="true"
                                    aria-controls={`collapse${plan.id}`}
                                >
                                    {plan.name}
                                    <button
                                        className="btn btn-danger btn-sm rounded-circle ms-3"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita que se active el toggle del accordion
                                            eliminarPlan(plan.id);
                                        }}
                                    >
                                        X
                                    </button>
                                </button>
                            </h2>
                            <div
                                id={`collapse${plan.id}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`heading${plan.id}`}
                                data-bs-parent="#mealPlanAccordion"
                            >
                                <div className="accordion-body">
                                    <p><strong>Creado en:</strong> {plan.create_at}</p>
                                    <ul>
                                        {plan.plan.map((detalle, idx) => (
                                            <li key={idx}>
                                                <strong>{detalle.day}:</strong> {detalle.calories || detalle.ingredients || detalle.mealType}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay planes disponibles.</p> // Mensaje si no hay planes
                )}
            </div>
        </>
    );
};
