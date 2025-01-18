import React, { useState } from "react";

export const LoginForm = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		identifier: "", // Puede ser usuario o email
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
		await onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<input
					type="text"
					name="identifier"
					placeholder="Usuario o Email"
					value={formData.identifier}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<input
					type="password"
					name="password"
					placeholder="Contraseña"
					value={formData.password}
					onChange={handleChange}
					required
				/>
			</div>
			<button type="submit">Iniciar sesión</button>
		</form>
	);
};

