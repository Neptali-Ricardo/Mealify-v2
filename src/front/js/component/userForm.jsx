import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const UserForm = ({ type, onSubmit }) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.user || !formData.email || !formData.password) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form__form row gap-3">
            <div className="contact-form__field p-0">
                <label htmlFor="user">User</label>
                <input
                    id="user"
                    type="text"
                    name="user"
                    placeholder="User"
                    value={formData.user}
                    onChange={handleChange}
                    className="contact-form__input"
                />
            </div>
            <div className="contact-form__field p-0">
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
            <div className="contact-form__field p-0">
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
            <button className="button--primary" type="submit">
                Register
            </button>
        </form>
    );
};
