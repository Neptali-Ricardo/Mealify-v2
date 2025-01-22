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
			
			
						if (resp.status === 409 && errorJson.msg === "El correo ya existe!") {
							alert("Este correo ya está registrado. Por favor, usa otro correo o inicia sesión.");
						} else {
							console.error("Detalles del error:", errorJson);
							console.error("Detalles del error:", errorJson);
							throw new Error(`Error al registrar usuario: ${errorMessage}`);
						}
						return false; // Registro fallido
					}
			
					const data = await resp.json();
					console.log("Datos recibidos del servidor:", data);
					alert("Usuario registrado exitosamente.");
					return true; // Registro exitoso
						return false; // Registro fallido
					}
			
					const data = await resp.json();
					console.log("Datos recibidos del servidor:", data);
					alert("Usuario registrado exitosamente.");
					return true; // Registro exitoso
				} catch (error) {
					console.error("Error al registrar usuario:", error.message);
			
			
					if (error.message.includes("El correo ya existe")) {
						alert("El correo ya está registrado. Por favor, usa otro correo o inicia sesión.");
					} else if (error.message.includes("El nombre de usuario ya existe")) {
						alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
					} else {
						alert("Ocurrió un problema al registrarte. Por favor, intenta de nuevo.");
					}
					return false; // Registro fallido
					return false; // Registro fallido
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
						alert('Ocurrió un problema al iniciar sesión. Por favor, intenta de nuevo.');
						return false; // Login fallido
						console.error("Error en el login:", errorMessage);
						alert('Ocurrió un problema al iniciar sesión. Por favor, intenta de nuevo.');
						return false; // Login fallido
					}
			
			
					const data = await resp.json();
					if (data.token) {
						setStore({ token: data.token });
						localStorage.setItem('token', data.token);
						return true; // Login exitoso
						return true; // Login exitoso
					} else {
						throw new Error('Token no recibido');
					}
				} catch (error) {
					console.error("Error en el login:", error.message);
					alert('Ocurrió un problema al iniciar sesión. Por favor, intenta de nuevo.');
					return false; // Login fallido
				}
			},
			
			getUserInfo: async () => {
				try {
					console.log("Iniciando solicitud para obtener información del usuario...");

					const token = localStorage.getItem("token");
					if (!token) {
						throw new Error("Token no encontrado en localStorage");
					}

					console.log("Token obtenido:", token);

					const resp = await fetch(process.env.BACKEND_URL + '/api/user_info',
						{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
						}
					);

				  	console.log("Respuesta completa:", resp);

					if (!resp.ok) {
						console.error("Error en la respuesta del servidor:", resp.status, resp.statusText);
						if (resp.status === 401) {
						alert("El token ha expirado o no es válido. Por favor, inicia sesión nuevamente.");
						} else if (resp.status === 404) {
						alert("Usuario no encontrado.");
						} else {
						alert("Ocurrió un error al obtener la información del usuario.");
						}
						throw new Error(`Error al obtener información del usuario: ${resp.status}`);
					}

					const data = await resp.json();
					console.log("Datos obtenidos:", data);

					setStore({ user: data.payload });
				} catch (error) {
					console.error("Error obteniendo la información del usuario:", error.message);
					alert("No se pudo obtener la información del usuario. Por favor, verifica tu conexión.");
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
					if (!resp.ok) throw new Error("Error al obtener el menú");

					// Procesa la respuesta del backend
					const data = await resp.json();
					console.log("Datos recibidos del servidor:", data);

					// Extrae la información relevante del menú
					const menu = data.choices[0].message.content;

					// Guarda el menú en el store
					setStore({ menu });
				} catch (error) {
					console.error("Error al obtener el menú:", error.message);
					alert("No se pudo obtener el menú semanal. Inténtalo más tarde.");
				}
			}
		


		}
	};
};

export default getState;
