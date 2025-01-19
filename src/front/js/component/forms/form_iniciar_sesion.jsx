import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";

export const Form_Inicio = () => {
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.identifier || !formData.password) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        await actions.login(formData);
    };

    return (
        <div className="tab-pane fade show active">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Usuario o Email"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none"
                        style={{ color: "#6f42c1" }}
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn w-100 text-white"
                    style={{ backgroundColor: "#6f42c1" }}
                >
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};