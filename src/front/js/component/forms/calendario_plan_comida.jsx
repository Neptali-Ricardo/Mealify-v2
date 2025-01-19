import React, { useState } from "react";

const WeeklyMealPlan = () => {
  // Estado inicial con recetas sugeridas para cada día
  const initialPlan = {
    lunes: {
      nombre: "Ensalada César",
      imagen: "https://via.placeholder.com/100",
      descripcion: "Una ensalada fresca con pollo, crutones y aderezo.",
    },
    martes: {
      nombre: "Pasta al Pesto",
      imagen: "https://via.placeholder.com/100",
      descripcion: "Deliciosa pasta con salsa de pesto casera.",
    },
    miercoles: {
      nombre: "Tacos de Pollo",
      imagen: "https://via.placeholder.com/100",
      descripcion: "Tacos crujientes rellenos de pollo sazonado.",
    },
    jueves: {
      nombre: "Sopa de Tomate",
      imagen: "https://via.placeholder.com/100",
      descripcion: "Sopa cremosa hecha con tomates frescos.",
    },
    viernes: {
      nombre: "Pizza Margarita",
      imagen: "https://via.placeholder.com/100",
      descripcion: "Pizza clásica con albahaca y mozzarella.",
    },
    sabado: {
      nombre: "Sushi Variado",
      imagen: "https://via.placeholder.com/100",
      descripcion: "Rollos de sushi frescos con pescado y vegetales.",
    },
    domingo: {
      nombre: "Asado de Res",
      imagen: "https://via.placeholder.com/100",
      descripcion: "Carne asada al horno con hierbas y especias.",
    },
  };

  const [mealPlan, setMealPlan] = useState(initialPlan);

  // Función para regenerar el plan semanal
  const regeneratePlan = () => {
    // Aquí podrías usar lógica más compleja para obtener recetas aleatorias
    alert("El plan semanal ha sido regenerado.");
    setMealPlan(initialPlan); // Cambiar recetas si se usan dinámicas
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Plan Semanal de Comidas</h1>
      <div className="row">
        {Object.keys(mealPlan).map((dia) => (
          <div key={dia} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={mealPlan[dia].imagen}
                className="card-img-top"
                alt={mealPlan[dia].nombre}
              />
              <div className="card-body">
                <h5 className="card-title">{mealPlan[dia].nombre}</h5>
                <p className="card-text">{mealPlan[dia].descripcion}</p>
                <p className="card-text text-muted">
                  Día: <strong>{dia.charAt(0).toUpperCase() + dia.slice(1)}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={regeneratePlan}>
          Regenerar Plan
        </button>
      </div>
    </div>
  );
};

export default WeeklyMealPlan;
