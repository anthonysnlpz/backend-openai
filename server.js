const { OpenAI } = require("openai");
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(cors({
  origin: ['http://localhost:5173', 'https://frontend-openai-six.vercel.app/'], // Permite solicitudes desde estos orígenes
  methods: 'GET,POST', // Permite solo los métodos GET y POST
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Permitir solo estos encabezados en las solicitudes
  credentials: true // Habilitar el intercambio de cookies entre dominios
}));

app.use(express.json());
// Puerto
const port = process.env.PORT || 3001;
// Almacena la clave de la API en una variable
const apiKey = process.env.OPENAI_API_KEY;

// Proporciona la clave de la API al instanciar el cliente de OpenAI
const openai = new OpenAI({ apiKey });

app.post('/openai', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
    });
    const imageUrl = response.data[0].url;
    res.json({ url: imageUrl });
  } catch (error) {
    console.error('Error al generar la imagen:', error);
    res.status(500).json({ error: 'Error al generar la imagen' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
