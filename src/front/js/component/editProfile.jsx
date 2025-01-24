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
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_339_31545)">
                            <path d="M7.45293 12.3808C7.31768 12.2454 7.24171 12.0618 7.24171 11.8704C7.24171 11.679 7.31768 11.4954 7.45293 11.36L11.0353 7.77763L1.22226 7.77763C1.0307 7.77763 0.846994 7.70153 0.711544 7.56608C0.576095 7.43063 0.5 7.24692 0.5 7.05537C0.500001 6.86381 0.576095 6.6801 0.711545 6.54466C0.846994 6.40921 1.0307 6.33311 1.22226 6.33311L11.0353 6.33311L7.45293 2.75071C7.38197 2.68459 7.32506 2.60485 7.28558 2.51626C7.24611 2.42766 7.22488 2.33202 7.22317 2.23504C7.22146 2.13806 7.2393 2.04174 7.27562 1.9518C7.31195 1.86187 7.36602 1.78017 7.4346 1.71159C7.50318 1.643 7.58488 1.58894 7.67481 1.55261C7.76475 1.51629 7.86108 1.49845 7.95805 1.50016C8.05503 1.50187 8.15067 1.52309 8.23927 1.56257C8.32786 1.60205 8.4076 1.65896 8.47372 1.72992L13.2888 6.54497C13.424 6.6804 13.5 6.86397 13.5 7.05537C13.5 7.24677 13.424 7.43034 13.2888 7.56576L8.47372 12.3808C8.3383 12.5161 8.15473 12.592 7.96333 12.592C7.77193 12.592 7.58836 12.5161 7.45293 12.3808Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_339_31545">
                                <rect width="13" height="13" fill="white" transform="translate(0.5 0.5)" />
                            </clipPath>
                        </defs>
                    </svg>
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
