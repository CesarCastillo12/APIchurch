const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); // Importa cors

// Conexión a MongoDB
mongoose.connect('mongodb+srv://cesar:123@cluster0.viwhkiu.mongodb.net/dbiglesia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));
app.use(cors());





// Modelo de usuario
const Usuario = mongoose.model('Usuario', {
  nombre: String,
  nombreUsuario: String,
  contraseña: String
});






// Middleware para procesar datos JSON
app.use(bodyParser.json());

/// Ruta para registrar un usuario
app.post('/registro', (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  nuevoUsuario.save()
    .then(() => res.status(201).json({ message: 'Usuario registrado con éxito' })) // Respuesta JSON
    .catch(err => res.status(400).json({ error: 'Error al registrar usuario: ' + err })); // Respuesta JSON
});


// Iniciar el servidor
const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor en ejecución en http://localhost:${puerto}`);
});
