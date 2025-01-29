import React, { useState } from "react";

const WeeklyMealPlan = () => {
  // Estado inicial con recetas sugeridas para cada día
  const initialPlan = {
    lunes: {
      nombre: "Ensalada César",
      imagen: "https://imag.bonviveur.com/ensalada-cesar-casera.jpg",
      descripcion: "Una ensalada fresca con pollo, crutones y aderezo.",
    },
    martes: {
      nombre: "Pasta al Pesto",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_oPk77Jw2Ydcj8P5yXwUoYi9xJFx49E_f9Q&s",
      descripcion: "Deliciosa pasta con salsa de pesto casera.",
    },
    miercoles: {
      nombre: "Tacos de Pollo",
      imagen: "https://imag.bonviveur.com/tacos-de-pollo.jpg",
      descripcion: "Tacos crujientes rellenos de pollo sazonado.",
    },
    jueves: {
      nombre: "Sopa de Tomate",
      imagen: "https://images.cookforyourlife.org/wp-content/uploads/2015/08/tomato-soup-with-basil-and-pesto.jpg",
      descripcion: "Sopa cremosa hecha con tomates frescos.",
    },
    viernes: {
      nombre: "Pizza Margarita",
      imagen: "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x900.jpg",
      descripcion: "Pizza clásica con albahaca y mozzarella.",
    },
    sabado: {
      nombre: "Sushi Variado",
      imagen: "https://content-cocina.lecturas.com/medio/2018/07/19/sushi-variado-tradicional_91be2c41_800x800.jpg",
      descripcion: "Rollos de sushi frescos con pescado y vegetales.",
    },
    domingo: {
      nombre: "Asado de Res",
      imagen: "https://cdn7.kiwilimon.com/recetaimagen/37163/640x640/46699.jpg.webp",
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
                width={"120px"}
                height={"240px"}
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
