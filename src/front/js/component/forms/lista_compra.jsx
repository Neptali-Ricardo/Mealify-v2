import React, { useState } from "react";

const ShoppingList = () => {
  const [items, setItems] = useState([
    { ingrediente: "", cantidad: "", unidad: "", precio: "" },
  ]);

  // Manejar cambios en los campos de la tabla
  const handleInputChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Agregar una nueva fila
  const addItem = () => {
    setItems([
      ...items,
      { ingrediente: "", cantidad: "", unidad: "", precio: "" },
    ]);
  };

  // Exportar lista como archivo de texto
  const exportList = () => {
    const formattedList = items
      .map(
        (item, index) =>
          `#${index + 1} Ingrediente: ${item.ingrediente}, Cantidad: ${
            item.cantidad
          } ${item.unidad}, Precio: ${item.precio} €`
      )
      .join("\n");
    const blob = new Blob([formattedList], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "lista_de_compras.txt";
    link.click();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Lista de Compras</h1>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Ingrediente</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Precio (€)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={item.ingrediente}
                  onChange={(e) =>
                    handleInputChange(index, "ingrediente", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={item.cantidad}
                  onChange={(e) =>
                    handleInputChange(index, "cantidad", e.target.value)
                  }
                />
              </td>
              <td>
                <select
                  className="form-select"
                  value={item.unidad}
                  onChange={(e) =>
                    handleInputChange(index, "unidad", e.target.value)
                  }
                >
                  <option value="">Seleccione</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="l">l</option>
                  <option value="ml">ml</option>
                  <option value="pza">pza</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={item.precio}
                  onChange={(e) =>
                    handleInputChange(index, "precio", e.target.value)
                  }
                  placeholder="€"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={addItem}>
          Agregar Fila
        </button>
        <button className="btn btn-primary" onClick={exportList}>
          Exportar Lista
        </button>
      </div>
    </div>
  );
};

export default ShoppingList;
