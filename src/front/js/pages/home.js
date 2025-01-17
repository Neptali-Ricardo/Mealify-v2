import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { UserForm } from "../component/userForm.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const handleSubmit = async (formData) => {
		let success;
		success = await actions.register(formData);
		console.log("Datos del formulario enviados:", formData);
	};
	
	return (
		<div className="text-center mt-5">

			{/* Mostrar el formulario */}
			<UserForm type={"register"} onSubmit={handleSubmit} />
			
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
