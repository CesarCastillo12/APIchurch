const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

mongoose.connect('mongodb+srv://cesar:123@cluster0.viwhkiu.mongodb.net/dbiglesia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));
app.use(cors());

const Usuario = mongoose.model('Usuario', {
  nombre: String,
  nombreUsuario: String,
  contraseña: String
});

app.use(bodyParser.json());

app.post('/registro', async (req, res) => {
  const nombreUsuarioExistente = await Usuario.findOne({ nombreUsuario: req.body.nombreUsuario });
  const nombreExistente = await Usuario.findOne({ nombre: req.body.nombre });

  if (nombreUsuarioExistente || nombreExistente) {
    if (
      (nombreUsuarioExistente && nombreUsuarioExistente.nombre === req.body.nombre) ||
      (nombreExistente && nombreExistente.nombreUsuario === req.body.nombreUsuario)
    ) {
      return res.status(409).json({ error: 'El nombre de usuario o el nombre ya existen' });
    }
  }

  const nuevoUsuario = new Usuario(req.body);
  nuevoUsuario.save()
    .then(() => res.status(201).json({ message: 'Usuario registrado con éxito' }))
    .catch(err => res.status(400).json({ error: 'Error al registrar usuario: ' + err }));
});

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor en ejecución en http://localhost:${puerto}`);
});
