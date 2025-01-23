const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: localStorage.getItem("token") || null, // Cargar el token si existe
		},
		actions: {

			register: async (formData) => {
				try {
					console.log("Datos enviados al servidor:", formData);
			
					const resp = await fetch(process.env.BACKEND_URL + '/api/register', {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(formData),
					});
			
					if (!resp.ok) {
						const errorMessage = await resp.text();
						const errorJson = JSON.parse(errorMessage);
			
			
						if (resp.status === 409 && errorJson.msg === "The email already exists!") {
							return { success: false, message: "This email is already registered. Please use another email or log in." };
						} else {
							console.error("Error details:", errorJson);
							throw new Error(`Error registering user: ${errorMessage}`);
						}
					}
			
					const data = await resp.json();
					console.log("Data received from the server:", data);
					return { success: true, message: "User successfully registered." };

				} catch (error) {
					console.error("Error registering user:", error.message);
			
					if (error.message.includes("The email already exists.")) {
						return { success: false, message: "The email is already registered. Please use another email or log in." };
					} else if (error.message.includes("The username already exists.")) {
						return { success: false, message: "The username is already in use. Please choose another one." };
					} else {
						return { success: false, message: "There was a problem registering you. Please try again." };
					}
				}
			},
			
			login: async (formData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/login', {
						method: 'POST',
						body: JSON.stringify(formData),
						headers: {
							'Content-Type': 'application/json'
						}
					});
			
					if (!resp.ok) {
						const errorMessage = await resp.text();
						console.error("Error en el login:", errorMessage);
						return { success: false, message: errorMessage.message || 'There was a problem logging in. Please try again.' };
					}
			
					const data = await resp.json();
					if (data.token) {
						setStore({ token: data.token });
						localStorage.setItem('token', data.token);
						return { success: true, message: 'Login successful.' }; // Login exitoso
					} else {
						return { success: false, message: 'Token not received. Please try again.' };
					}
				} catch (error) {
					console.error("Login error:", error.message);
					return { success: false, message: 'There was a problem logging in. Please try again.' };
				}
			},
			
			getUserInfo: async () => {
				try {
					console.log("Initiating request to retrieve user information...");

					const token = localStorage.getItem("token");
					if (!token) {
						throw new Error("Token not found in localStorage.");
					}

					console.log("Token obtained:", token);

					const resp = await fetch(process.env.BACKEND_URL + '/api/user_info',
						{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
						}
					);

				  	console.log("Complete response:", resp);

					if (!resp.ok) {
						console.error("Server response error:", resp.status, resp.statusText);
						if (resp.status === 401) {
						alert("The token has expired or is invalid. Please log in again.");
						} else if (resp.status === 404) {
						alert("User not found.");
						} else {
						alert("An error occurred while retrieving the user information.");
						}
						throw new Error(`Error retrieving user information: ${resp.status}`);
					}

					const data = await resp.json();
					console.log("Data retrieved:", data);

					setStore({ user: data.payload });
				} catch (error) {
					console.error("Error retrieving user information:", error.message);
					alert("Could not retrieve user information. Please check your connection.");
					return false;
				}
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			fetchMenu: async () => {
				try {
					// Realiza la solicitud al backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/static-data");
					if (!resp.ok) throw new Error("Error retrieving the menu.");

					// Procesa la respuesta del backend
					const data = await resp.json();
					console.log("Data received from the server:", data);

					// Extrae la información relevante del menú
					const menu = data.choices[0].message.content;

					// Guarda el menú en el store
					setStore({ menu });
				} catch (error) {
					console.error("Error retrieving the menu:", error.message);
					alert("Could not retrieve the weekly menu. Please try again later.");
				}
			}
		


		}
	};
};

export default getState;
