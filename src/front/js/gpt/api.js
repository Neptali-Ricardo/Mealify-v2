const API_KEY = process.env.API_KEY_GPT; // Usa la clave desde el archivo .env
const BASE_URL = 'https://api.openai.com/v1/chat/completions';

export const getChatGPTResponse = async (messages) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Cambia a otro modelo si es necesario
        messages: messages, // Mensajes para la conversación
        max_tokens: 1000, // Ajusta los tokens según tus necesidades
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message; // Retorna el mensaje generado por ChatGPT
  } catch (error) {
    console.error('Error al obtener la respuesta de ChatGPT:', error);
    throw error;
  }
};
