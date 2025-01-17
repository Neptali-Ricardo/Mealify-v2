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

					const resp = await fetch(process.env.BACKEND_URL + '/api/register', 
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(formData),
						}
					);

					if (!resp.ok) {
						const errorMessage = await resp.text();
						const errorJson = JSON.parse(errorMessage);
						console.error(`Error del servidor: ${resp.status} - ${resp.statusText}`);
						console.error("Detalles del error:", errorJson);

						if (resp.status === 409 && errorJson.msg === "El correo ya existe!") {
							alert("Este correo ya está registrado. Por favor, usa otro correo o inicia sesión.");
						} else {
							throw new Error(`Error al registrar usuario: ${errorMessage}`);
						}
					} else {
						const data = await resp.json();
						console.log("Datos recibidos del servidor:", data);
						alert("Usuario registrado exitosamente.");
					}
				} catch (error) {
					console.error("Error al registrar usuario:", error.message);

					if (error.message.includes("El correo ya existe")) {
						alert("El correo ya está registrado. Por favor, usa otro correo o inicia sesión.");
					} else if (error.message.includes("El nombre de usuario ya existe")) {
						alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
					} else {
						alert("Ocurrió un problema al registrarte. Por favor, intenta de nuevo.");
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
			
					if (!resp.ok) throw new Error('Error al autenticar usuario');
			
					const data = await resp.json();
			
					if (data.token) {
						// Actualizar el store con el token
						setStore({ token: data.token });
			
						// Guardar el token en localStorage
						localStorage.setItem('token', data.token);
			
						return true; // Login exitoso
					} else {
						throw new Error('Token no recibido');
					}
				} catch (error) {
					console.error(error);
					alert('Ocurrió un problema al iniciar sesión. Por favor, intenta de nuevo.');
					return false; // Error en el login
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
			}
		}
	};
};

export default getState;
