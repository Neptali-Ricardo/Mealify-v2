import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export const EditProfile = () => {
    const { actions, store } = useContext(Context);
    const [message, setMessage] = useState(null);

    // Inicializar el estado del formulario con los datos del usuario
    const [formData, setFormData] = useState({
        user: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (store.user) {
            setFormData({
                user: store.user.user || "",
                email: store.user.email || "",
                password: "",
            });
        }
    }, [store.user]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Obtener el ID del usuario autenticado
        const userId = store?.user?.id;
        if (!userId) {
            setMessage({ type: "error", text: "User ID not found. Please log in again." });
            return;
        }

        // Filtrar los campos modificados
        const updatedFields = {};
        if (formData.user && formData.user !== store.user.username) {
            updatedFields.user = formData.user;
        }
        if (formData.email && formData.email !== store.user.email) {
            updatedFields.email = formData.email;
        }
        if (formData.password) {
            updatedFields.password = formData.password;
        }

        // Validar que haya al menos un campo modificado
        if (Object.keys(updatedFields).length === 0) {
            setMessage({ type: "error", text: "No changes detected. Please modify at least one field." });
            return;
        }

        // Llamar a la acción para editar el perfil
        const response = await actions.editProfile(userId, updatedFields);

        if (response.success) {
            setMessage({ type: "success", text: response.message });
        } else {
            setMessage({ type: "error", text: response.message });
        }
    };

    return (
        <div className="container container-edit-form">
            <form onSubmit={handleSubmit} className="edit-form__form">
                <div className="contact-form__field">
                    <label htmlFor="user">Username</label>
                    <input
                        id="user"
                        type="text"
                        name="user"
                        placeholder="username"
                        value={formData.user}
                        onChange={handleChange}
                        className="contact-form__input"
                    />
                </div>
                <div className="contact-form__field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="contact-form__input"
                    />
                </div>
                <div className="contact-form__field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="contact-form__input"
                    />
                </div>
                <button className="button button--primary" type="submit">
                    Save Changes
                    <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                </button>
                {message && (
                    <div className={`mb-2 ${message.type === "success" ? "alert-success" : "alert-error"}`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
};
