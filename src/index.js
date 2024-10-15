import app from './app.js';

const PORT = process.env.PORT || 443;

app.listen(PORT, () => {
  console.log('Servidor iniciado ' + (PORT));
});