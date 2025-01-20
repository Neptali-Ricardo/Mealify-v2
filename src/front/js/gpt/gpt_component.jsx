import React, { useState } from 'react';
import { getChatGPTResponse } from './api';


const ChatGPTComponent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mensajes para la API
    const messages = [
      { role: 'system', content: 'Eres un asistente útil.' },
      { role: 'user', content: input },
    ];

    
    try {
      const result = await getChatGPTResponse(messages);
      setResponse(result.content); // Actualiza el estado con la respuesta de ChatGPT
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
    }
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>
      <div>
        <h3>Respuesta:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatGPTComponent;