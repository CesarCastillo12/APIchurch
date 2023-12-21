const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

mongoose.connect('mongodb+srv://cesar:123@cluster0.sopkzh6.mongodb.net/dbiglesia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

app.use(cors());
app.use(bodyParser.json());

const Usuario = mongoose.model('Usuario', {
  nombre: String,
  nombreUsuario: String,
  contraseña: String
});

const Administrador = mongoose.model('Administrador', {
  nombre: String,
  nombreUsuario: String,
  contraseña: String
});

app.post('/registro', async (req, res) => {
  // Código para registrar usuarios (ya proporcionado por ti)
});

app.post('/login', async (req, res) => {
  // Código para autenticación de usuarios (ya proporcionado por ti)
});

app.post('/agregar-administrador', async (req, res) => {
  const { nombre, nombreUsuario, contraseña } = req.body;

  const adminExistente = await Administrador.findOne({ nombreUsuario });
  if (adminExistente) {
    return res.status(409).json({ error: 'El nombre de usuario del administrador ya existe' });
  }

  const nuevoAdministrador = new Administrador({ nombre, nombreUsuario, contraseña });
  nuevoAdministrador.save()
    .then(() => res.status(201).json({ message: 'Administrador agregado con éxito' }))
    .catch(err => res.status(400).json({ error: 'Error al agregar administrador: ' + err }));
});

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor en ejecución en http://localhost:${puerto}`);
});
