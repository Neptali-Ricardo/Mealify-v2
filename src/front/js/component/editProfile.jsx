import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./spinner.jsx";
import { Modal } from "bootstrap";


export const EditProfile = () => {
    const { actions, store } = useContext(Context);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Inicializar el estado del formulario con los datos del usuario
    const [formData, setFormData] = useState({
        user: "",
        email: "",
        password: "",
        repeat_password: "",
    });

    useEffect(() => {
        if (store.user) {
            setFormData({
                user: store.user.user || "",
                email: store.user.email || "",
                password: "",
                repeat_password: "",
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
        setLoading(true);

        // Obtener el ID del usuario autenticado
        const userId = store?.user?.id;
        if (!userId) {
            setMessage({ type: "error", text: "User ID not found. Please log in again." });
            setLoading(false);
            return;
        }

        // Filtrar los campos modificados
        const updatedFields = {};
        if (formData.user && formData.user !== store.user.user) {
            updatedFields.user = formData.user;
        }
        if (formData.email && formData.email !== store.user.email) {
            updatedFields.email = formData.email;
        }
        if (formData.password && formData.password === formData.repeat_password) {
            updatedFields.password = formData.password;
        } else if (formData.password && formData.password !== formData.repeat_password) {
            setMessage({ type: "error", text: "Passwords do not match. Please try again." });
            setLoading(false);
            return;
        }

        // Validar que haya al menos un campo modificado
        if (Object.keys(updatedFields).length === 0) {
            setMessage({ type: "error", text: "No changes detected. Please modify at least one field." });
            setLoading(false);
            return;
        }

        // Llamar a la acción para editar el perfil
        const response = await actions.editProfile(userId, updatedFields);

        if (response.success) {
            setMessage({ type: "success", text: response.message });
            // Recargar la vista
            await actions.getUserInfo();
            setFormData({
                user: store.user.user || "",
                email: store.user.email || "",
                password: "",
                repeat_password: "",
            });
        } else {
            setMessage({ type: "error", text: response.message });
        }
        setLoading(false); // Detener el spinner al finalizar
    };

    // Definir la función handleLogout
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/loginRegister");
    };

    // Manejar la eliminación del usuario
    const handleDelete = async () => {
        setLoading(true);
        const userId = store?.user?.id;
        if (!userId) {
            setMessage({ type: "error", text: "User ID not found. Please log in again." });
            setLoading(false);
            return;
        }

        const response = await actions.deleteUser(userId);

        if (response.success) {
            setMessage({ type: "success", text: response.message });
            // Cerrar el modal
            const modalElement = document.getElementById('exampleModal');
            const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
            modal.hide();
            setTimeout(() => {
                setLoading(false); // Ocultar el spinner
                document.body.classList.remove('modal-open'); // Eliminar la clase 'modal-open' del body
                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.remove(); // Eliminar la capa oscura
                }
                handleLogout(); // Llamar a handleLogout para desconectar al usuario
            }, 2000); // Mostrar el mensaje durante 2 segundos
        } else {
            setMessage({ type: "error", text: response.message });
            setLoading(false);
        }
    };

    return (
        <div className="container container-edit-form">

            {loading && <Spinner />}

            <form onSubmit={handleSubmit} className="edit-form__form mb-5 mt-5">
                <h2 className="text-center profile__subtitle">Basic Profile Information</h2>
                <div className="form__field">
                    <label htmlFor="user">Username</label>
                    <input
                        id="user"
                        type="text"
                        name="user"
                        placeholder="username"
                        value={formData.user}
                        onChange={handleChange}
                        className="form__input"
                    />
                </div>
                <div className="form__field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form__input"
                    />
                </div>
                <div className="edit-form__form--password">
                    <h2 className="text-center profile__subtitle">Update password</h2>
                    <div className="form__field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form__input"
                        />
                    </div>
                    <div className="form__field">
                        <label htmlFor="password">Repeat Password</label>
                        <input
                            id="repeat_password"
                            type="password"
                            name="repeat_password"
                            placeholder="Repeat Password"
                            value={formData.repeat_password}
                            onChange={handleChange}
                            className="form__input"
                        />
                    </div>
                </div>
                <button className="button button--primary" type="submit" aria-label="Save Changes">
                    Save Changes
                    <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="profile__subtitle" id="exampleModalLabel">Are you sure?</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>This action is irreversible. Once your account is deleted, all your history, settings, and associated data will be lost.</p>
                            </div>
                            <div className="modal-footer modal-custom">
                                <button type="button" className="button button--secondary w-100" onClick={handleDelete} aria-label="Confirm Delete Account">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" className="button button--secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" aria-label="Delete Account">
                    Delete Account
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
