import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const UserForm = ({ type, onSubmit }) => {
    const { actions } = useContext(Context);
    const [message, setMessage] = useState(null);

    const [formData, setFormData] = useState({
        user: "",
        email: "",
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
        const response = await actions.register(formData);

        if (response.success) {
            setMessage({ type: "success", text: response.message });
            setTimeout(() => {
                onSubmit(formData); // Redirige al formulario de login
            }, 2000); // Espera 2 segundos para mostrar el mensaje de éxito
        } else {
            setMessage({ type: "error", text: response.message });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form__form">
            <div className="contact-form__field">
                <label htmlFor="user">Username</label>
                <input
                    id="user"
                    type="text"
                    name="user"
                    placeholder="Username"
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
                Register
                <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
            </button>
            {message && (
                <div className={`${message.type === "success" ? "alert-success" : "alert-error"}`}>
                    {message.text}
                </div>
            )}
        </form>
    );
};
