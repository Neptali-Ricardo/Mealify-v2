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

            <div className="mealplan__container text-center">
                <h3 className="menu__title">Weekly <strong>Meal Plan</strong></h3>
                <p className="menu__description">Plan ahead and enjoy a variety of tasty dishes all week long.</p>
            </div>

            <div id="mealPlanAccordion">
                {userPlans ? (
                    userPlans.map((plan, index) => (
                        <div key={index} className="card- mb-3">
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
                                <div className="">

                                    <p><strong>Creado en:</strong> {plan.create_at}</p>

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
                                                {plan.plan.map((detalle, idx) => (
                                                    <tr className="menu-creator__tr" key={idx} onClick={() => setSelectedRow(detalle)} data-bs-toggle="modal" data-bs-target="#dataModal">
                                                        <td className="menu-creator__td">{detalle.day}</td>
                                                        <td className="menu-creator__td">{detalle.mealType}</td>
                                                        <td className="menu-creator__td">{detalle.ingredients}</td>
                                                        <td className="menu-creator__td">{detalle.calories}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center mb-5">
                        <p className="meal-menu__description">No Meal Plans Yet</p>
                        <p className="menu__description">Start planning your meals effortlessly! <br/> Save your favorite meals and create a personalized plan to stay on track.</p>
                    </div>
                )}
            </div>

            <div className="modal fade" id="dataModal" tabIndex="-1" aria-labelledby="dataModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content d-flex flex-column content-space">
                        <div className="modal-body d-flex flex-column card-space">
                            {selectedRow ? (
                                <>
                                    <div className="modal-header p-0">
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
        </>
    );
};