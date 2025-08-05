📺 API de Frases de Los Simpsons

Una REST API desarrollada con Node.js, Express y MySQL para consultar y gestionar frases icónicas de los personajes de la serie The Simpsons.

🚀 Endpoints disponibles

📌 Frases

🔹 GET /frases
Obtiene todas las frases, incluyendo información del personaje.

**Respuesta:**
```json
{
  "info": { "count": 5 },
  "results": [
    {
      "id": 1,
      "texto": "D'oh!",
      "marca_tiempo": "00:00:05",
      "descripcion": "Frase icónica de Homer Simpson.",
      "personaje_id": 1,
      "nombre": "Homer",
      "apellido": "Simpson",
      "ocupacion": "Nuclear Safety Inspector",
      "descripcion": "El padre de la familia Simpson."
    }
    // ...
  ]
}

🔹 GET /frases/:id
Obtiene una frase por su ID.

🔹 POST /frases
Crea una nueva frase. Body:
{
  "texto": "¡Ejemplo!",
  "marca_tiempo": "00:01:00",
  "descripcion": "Descripción de la frase",
  "personaje_id": 1
}

🔹 PUT /frases/:id
Actualiza una frase existente.
Body: igual que POST.

🔹 DELETE /frases/:id
Elimina una frase.

🔹  GET /frases/personaje/:personaje_id
Obtiene todas las frases de un personaje específico.

📌 Personajes
🔹  GET /personajes
Obtiene todos los personajes.

📌 Capítulos
🔹  GET /capitulos
Obtiene todos los capítulos.


ℹ️ Notas
Todas las respuestas son en formato JSON.
Si ocurre un error, se devuelve un mensaje de error y el código HTTP correspondiente.
Puedes probar los endpoints usando Postman o cualquier cliente HTTP.
