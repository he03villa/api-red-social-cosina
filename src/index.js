import app from './app.js';

const PORT = process.env.PORT || 443;

app.listen(PORT, () => {
  console.log(process.env.GEMINI_API_KEY);
  console.log('Servidor iniciado ' + (PORT));
});