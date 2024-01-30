// index.js
const express = require('express');
const OpenAI = require('openai');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();
const port = 3000;
const openai = new OpenAI('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'); // Reemplaza 'tu_clave_de_api' con tu clave de API de OpenAI
app.use(express.json());

app.post('/traducir', async (req, res) => {
  try {
    const { texto, modelo } = req.body;

    // Llamada a la API de GPT para obtener la traducción utilizando fetch
    const respuestaGPT = await fetch('URL_DE_TU_MODELO_GPT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texto, modelo }),
    });

    const datosTraduccion = await respuestaGPT.json();

    // Devolver la traducción al cliente
    res.json({ traduccion: datosTraduccion.traduccion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


app.get('/entrenar', async (req, res) => {    
    const workbook = xlsx.readFile('file/traduccion.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
    const stream = await OpenAI.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'Say this is a test' }],
        stream: true,
      });
      for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || '');
      }
  });

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});