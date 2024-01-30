const OpenAI = require('openai');
const xlsx = require('xlsx');
const fs = require('fs');

const openai = new OpenAI({apiKey:'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'}); // Reemplaza 'tu_clave_de_api' con tu clave de API de OpenAI

// Lee el archivo Excel
const workbook = xlsx.readFile('file/traduccion.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
// Convierte los datos del archivo Excel a un formato adecuado
const excelData = xlsx.utils.sheet_to_json(sheet);
const trainingData = excelData.map(row => (
    {role: "system",
    content: `${row.guna_word} significa ${row.spanish_word}`
    }
));
const jsonlData = trainingData.map(objeto => JSON.stringify(objeto)).join('\n');

// Guarda el contenido en el archivo
fs.writeFile('file/training_data.jsonl', jsonlData, 'utf8', (err) => {
  if (err) {
    console.error('Error al escribir en el archivo:', err);
  } else {
    console.log(`Datos guardados en training_data.jsonl`);
  }
});
async function GenerateGPT(){
    // Entrenar a tu propio modelo GPT con los datos de entrenamiento
    const completion = await openai.chat.completions.create({
        messages: trainingData,
        model: "gpt-3.5-turbo",
      });    
      console.log(completion.choices[0]);
}

//const gpt = GenerateGPT();
  // Luego puedes generar texto en español proporcionando un texto en kuna como entrada
  const inputText = "Tu texto en kuna aquí";
  //generateText(inputText);

