const { OpenAI } = require("openai");
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Configurar CORS manualmente para permitir solicitudes desde cualquier origen
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

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
