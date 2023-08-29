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
app.use(bodyParser.json());

const Usuario = mongoose.model('Usuario', {
  nombre: String,
  nombreUsuario: String,
  contraseña: String
});

app.post('/registro', (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  nuevoUsuario.save()
    .then(() => res.status(201).json({ message: 'Usuario registrado con éxito' }))
    .catch(err => res.status(400).json({ error: 'Error al registrar usuario: ' + err }));
});

app.post('/login', async (req, res) => {
  const { nombreUsuario, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ nombreUsuario, contraseña });
    if (usuario) {
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor en ejecución en http://localhost:${puerto}`);
});
