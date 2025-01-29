import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const WeeklyMenu = () => {
  const { store, actions } = useContext(Context);

  // Al montar el componente, carga el menú
  useEffect(() => {
    actions.fetchMenu();
  }, []);

  // Si no hay datos del menú, muestra un mensaje de carga
  if (!store.menu || store.menu.length === 0) {
    return <div>Cargando menú semanal...</div>;
  }

  // Extraer el título y el contenido del menú
  const [title, ...menuLines] = store.menu.split("\n").filter((line) => line.trim() !== "");
  
  // Procesar los datos del menú
  const menuData = [];
  let currentDay = {};

  menuLines.forEach((line) => {
    if (line.startsWith("**")) {
      if (currentDay.dia) {
        menuData.push(currentDay);
      }
      currentDay = { dia: line.replace(/\*\*/g, "").trim() };
    } else if (line.startsWith("- Comida:")) {
      currentDay.comida = line.replace("- Comida:", "").trim();
    } else if (line.startsWith("  - Ingredientes:")) {
      currentDay.ingredientes = line.replace("  - Ingredientes:", "").trim();
    } else if (line.startsWith("  - Calorías:")) {
      currentDay.calorias = line.replace("  - Calorías:", "").trim();
    }
  });
  if (currentDay.dia) {
    menuData.push(currentDay);
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{title}</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Día</th>
              <th scope="col">Comida</th>
              <th scope="col">Ingredientes</th>
              <th scope="col">Calorías</th>
            </tr>
          </thead>
          <tbody>
            {menuData.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.dia}</th>
                <td>{item.comida}</td>
                <td>{item.ingredientes}</td>
                <td>{item.calorias}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="alert alert-info mt-4" role="alert">
        Para esta propuesta, puedes anticipar la compra de al menos 3kg de carne (pollo, bistec, carne molida, chuletas, carne para tacos, lomo de res y carne para estofado), 2kg de arroz (blanco e integral) y las verduras y/o frutas que prefieras para las ensaladas y guarniciones.
      </div>
    </div>
  );
};

export default WeeklyMenu;