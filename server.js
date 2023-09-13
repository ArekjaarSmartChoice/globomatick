const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Configura CORS para permitir solicitudes desde todas las fuentes
app.use(cors());

// URL de la segunda API
const secondApiUrl = process.env.SECOND_API_URL || 'https://webservice.globomatik.com';

// Ruta principal para redirigir las solicitudes a la segunda API
app.all('*', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: secondApiUrl + req.path,
      headers: req.headers,
      data: req.method === 'GET' ? undefined : req.body,
    });

    // Devuelve la respuesta de la segunda API al cliente
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error en la solicitud' });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor API en ejecución en el puerto ${port}`);
});
