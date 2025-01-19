import React, { useState } from "react";

const FoodPreferencesForm = () => {
  const [formData, setFormData] = useState({
    alergenos: [],
    restricciones: "",
    comensales: 1,
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevData) => {
      const alergenos = checked
        ? [...prevData.alergenos, value]
        : prevData.alergenos.filter((alergeno) => alergeno !== value);
      return { ...prevData, alergenos };
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulario enviado con los datos:", formData);
    alert("Preferencias guardadas con éxito.");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Configurar Preferencias Alimenticias</h1>
      <form onSubmit={handleSubmit}>
        {/* Alérgenos */}
        <div className="mb-3">
          <label className="form-label">Alérgenos:</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gluten"
              value="Gluten"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="gluten">
              Gluten
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="lactosa"
              value="Lactosa"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="lactosa">
              Lactosa
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="frutos_secos"
              value="Frutos Secos"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="frutos_secos">
              Frutos Secos
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="mariscos"
              value="Mariscos"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="mariscos">
              Mariscos
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="huevo"
              value="Huevo"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="huevo">
              Huevo
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="soja"
              value="Soja"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="soja">
              Soja
            </label>
          </div>
        </div>

        {/* Restricciones Dietéticas */}
        <div className="mb-3">
          <label htmlFor="restricciones" className="form-label">
            Restricciones Dietéticas:
          </label>
          <select
            className="form-select"
            id="restricciones"
            name="restricciones"
            value={formData.restricciones}
            onChange={handleInputChange}
          >
            <option value="">Seleccione una opción</option>
            <option value="Vegetariano">Vegetariano</option>
            <option value="Vegano">Vegano</option>
            <option value="Kosher">Kosher</option>
            <option value="Halal">Halal</option>
            <option value="Sin Azúcar">Sin Azúcar</option>
            <option value="Bajo en Sodio">Bajo en Sodio</option>
          </select>
        </div>

        {/* Número de Comensales */}
        <div className="mb-3">
          <label htmlFor="comensales" className="form-label">
            Número de Comensales:
          </label>
          <input
            type="number"
            className="form-control"
            id="comensales"
            name="comensales"
            min="1"
            value={formData.comensales}
            onChange={handleInputChange}
          />
        </div>

        {/* Botón */}
        <button type="submit" className="btn btn-primary">
          Guardar Preferencias
        </button>
      </form>
    </div>
  );
};

export default FoodPreferencesForm;
