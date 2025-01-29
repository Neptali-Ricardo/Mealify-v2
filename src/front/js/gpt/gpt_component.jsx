import React, { useState } from 'react';
import { getChatGPTResponse } from './api';

const AllergensAndConditions = () => {
  const [showDetails, setShowDetails] = useState(false); // Controla el despliegue del filtro
  const [allergens, setAllergens] = useState([]); // Lista de alérgenos
  const [conditions, setConditions] = useState([]); // Lista de condiciones médicas
  const [mealPlan, setMealPlan] = useState(''); // Resultado generado

  const [inputAllergen, setInputAllergen] = useState('');
  const [inputCondition, setInputCondition] = useState('');

  // Añade un nuevo alérgeno
  const addAllergen = () => {
    if (inputAllergen && !allergens.includes(inputAllergen)) {
      setAllergens([...allergens, inputAllergen]);
      setInputAllergen('');
    }
  };

  // Añade una nueva condición médica
  const addCondition = () => {
    if (inputCondition && !conditions.includes(inputCondition)) {
      setConditions([...conditions, inputCondition]);
      setInputCondition('');
    }
  };

  // Elimina un alérgeno
  const removeAllergen = (allergen) => {
    setAllergens(allergens.filter((item) => item !== allergen));
  };

  // Elimina una condición médica
  const removeCondition = (condition) => {
    setConditions(conditions.filter((item) => item !== condition));
  };

  // Genera el plan de comidas utilizando la API de ChatGPT
  const generateMealPlan = async () => {
    const messages = [
      { role: 'system', content: 'Eres un asistente que genera planes de comidas.' },
      { 
        role: 'user', 
        content: `Genera un plan de comidas para las siguientes restricciones: 
                  Alérgenos: ${allergens.join(', ')}. 
                  Condiciones médicas: ${conditions.join(', ')}.` 
      },
    ];

    try {
      const response = await getChatGPTResponse(messages);
      setMealPlan(response.content);
    } catch (error) {
      console.error('Error al generar el plan:', error);
      setMealPlan('Error al generar el plan. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <div className="header">
        <h2>Allergens & Medical Conditions</h2>
        <button onClick={() => setShowDetails(!showDetails)}>⚙️</button>
      </div>

      {showDetails && (
        <div>
          <div>
            <h3>Manage Your Allergens</h3>
            <input
              type="text"
              placeholder="Add your allergens"
              value={inputAllergen}
              onChange={(e) => setInputAllergen(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addAllergen()}
            />
            <div>
              {allergens.map((allergen, index) => (
                <button key={index} onClick={() => removeAllergen(allergen)}>
                  {allergen} ✖
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3>Manage Your Medical Conditions</h3>
            <input
              type="text"
              placeholder="Add your medical condition"
              value={inputCondition}
              onChange={(e) => setInputCondition(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCondition()}
            />
            <div>
              {conditions.map((condition, index) => (
                <button key={index} onClick={() => removeCondition(condition)}>
                  {condition} ✖
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button onClick={generateMealPlan}>Generate Your Meal Plan</button>

      {mealPlan && (
        <div>
          <h3>Your Meal Plan:</h3>
          <p>{mealPlan}</p>
        </div>
      )}
    </div>
  );
};

export default AllergensAndConditions;
