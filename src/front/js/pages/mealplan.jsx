import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { SecondaryJumbotron } from "../component/secondaryJumbotron.jsx";
import { Card_Detail_Component } from "../component/card_details_preparation/card_detail_menu_component.jsx";
import { Spinner } from "../component/spinner.jsx";
import { Accordion, Card, Button } from "react-bootstrap";

export const MealPlan = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [userPlans, setUserPlans] = useState(null); // Variable para guardar los planes
    const [desplegado, setDesplegado] = useState({});
    const [selectedRow, setSelectedRow] = useState(null); // Variable para la fila seleccionada
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        Obtener_planes();

        setTimeout(() => {
            setLoading(false);
        }, 1000);
        
    }, [store.token, navigate]);

    const Obtener_planes = async () => {
        await actions.getUserInfo();

        // Accede al objeto user en el store
        const user = store.user;

        if (user && user.id) {
            return;
        }

        await actions.getPlans();

        // Accedemos a los datos del store
        const store_obtained = store.userPlans;

        //console.log("Planes obtenidos:", JSON.stringify(store_obtained, null, 2));

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

    const [activeKey, setActiveKey] = useState(null);
    const handleToggle = (key) => {
        setActiveKey(activeKey === key ? null : key);
    };

    return (
        <>
            <SecondaryJumbotron />

            <div className="container">
                <div className="mealplan__container text-center">
                    <h3 className="menu__title">Weekly <strong>Meal Plan</strong></h3>
                    <p className="menu__description">Plan ahead and enjoy a variety of tasty dishes all week long.</p>
                </div>

                {loading && <Spinner />}

                <div className="mb-5">
                    <Accordion activeKey={activeKey}>
                        {userPlans && userPlans.map((plan, index) => (
                            <Card key={index}>
                                <Card.Header onClick={() => handleToggle(index)}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h3 className="plan-name__title">{plan.name}</h3>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={activeKey === index ? "https://res.cloudinary.com/dfhhq651o/image/upload/v1737888385/arrow-up_xbitmw.svg" : "https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-down-icon_yfmxyl.svg"}
                                                alt="toggle icon"
                                                className="ms-3"
                                            />
                                            <Button
                                                variant="link"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Evita que el evento de clic se propague al contenedor padre
                                                    eliminarPlan(plan.id);
                                                }}
                                            >
                                                <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888386/delete-icon_woqozv.svg" alt="delete icon" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey={index}>
                                    <Card.Body className="p-0">
                                        {/* Contenido del plan */}
                                        <p className="mealplan__time">{plan.description}{plan.create_at}</p>
                                        {/* Agrega más contenido aquí según sea necesario */}
                                
                                        <div className="menu-creator p-0">
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
                                                
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))}
                    </Accordion>
                </div>

                {!userPlans || userPlans.length === 0 ? (
                    <div className="text-center mb-5">
                        <h2 className="meal-menu__description">No Meal Plans Yet</h2>
                        <p className="menu__description">Start planning your meals effortlessly! <br/> Save your favorite meals and create a personalized plan to stay on track.</p>
                    </div>
                ) : null}

                <div className="modal fade" id="dataModal" tabIndex="-1" aria-labelledby="dataModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content d-flex flex-column content-space">
                            <div className="modal-body d-flex flex-column card-space">
                                {selectedRow ? (
                                    <>
                                        <div className="modal-header modal__header-custom">
                                            <h5 className="modal-title modal_title" id="dataModalLabel"> {selectedRow.mealType}</h5>
                                            <h5>{selectedRow.day}</h5>
                                        </div>
                                        <Card_Detail_Component comida={selectedRow.mealType} tipo_comida={selectedRow.day} ingredientes={selectedRow.ingredients} calorias={selectedRow.calories} />
                                    </>
                                ) : (
                                    <p>Selecciona una fila para ver los detalles.</p>
                                )}
                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button type="button" className="button button--modal" data-bs-dismiss="modal">
                                    <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-left-button_icwmqo.svg" alt="arrow  left" className="banner__icon" />
                                    Go Back to Meal Menu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};