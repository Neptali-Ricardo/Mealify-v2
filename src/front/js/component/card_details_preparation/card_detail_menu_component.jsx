import React, { useState, useEffect } from "react";
import { getChatGPTResponse } from "../../gpt/api";

export const Card_Detail_Component = ({ comida, dia, tipo_comida, ingredientes, calorias }) => {
    const [preparacion, setPreparacion] = useState([]);

    useEffect(() => {
        const messages = [
            {
                role: "system",
                content: "Eres un asistente de cocina que genera instrucciones de recetas.",
            },
            {
                role: "user",
                content: `Genera los pasos para preparar un plato llamado "${comida}" utilizando los siguientes ingredientes: ${ingredientes}. Devuelve los pasos numerados como una lista.`,
            },
        ];

        const fetchData = async () => {
            try {
                const response = await getChatGPTResponse(messages);
                const steps = response.content.split("\n").filter(step => step.trim() !== ""); // Divide por líneas y elimina vacías
                setPreparacion(steps);
            } catch (error) {
                console.error("Error al obtener los pasos de preparación:", error);
            }
        };

        fetchData();
    }, [comida, ingredientes]);

    return (
        <div className="father-space">
            <div className="modal__separator--line"></div>
            <div className="d-flex flex-column child-space">
                <div className="d-flex justify-content-between">
                    <div className="d-flex gap-1">
                        <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1738333828/basket_qjortt.svg" alt="arrow  left" className="banner__icon" />
                        <p className="plan-name__description">Ingredients</p>
                    </div>
                    <div className="d-flex gap-1">
                        <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1738333811/kcal_zt1rze.svg" alt="arrow  left" className="banner__icon" />
                        <p className="plan-name__description">kcal</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between gap-2">
                    <p>{ingredientes}</p>
                    <p>{calorias}</p>
                </div>
            </div>
            <div className="modal__separator--line"></div>
            <div className="d-flex flex-column gap-4">
                <div className="d-flex gap-1">
                    <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1738333859/preparation_p2lsaq.svg" alt="arrow  left" className="banner__icon" />
                    <p className="plan-name__description">Preparation mode</p>
                </div>
                <ul>
                    {preparacion.length > 0 ? (
                        preparacion.map((step, index) => <li key={index}>{step}</li>) // Mapea cada paso en un <li>
                    ) : (
                        <li>Generando pasos para la preparación...</li>
                    )}
                </ul>
            </div>
        </div>
    );
};
