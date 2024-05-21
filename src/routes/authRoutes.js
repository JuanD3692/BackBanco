const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Ruta de registro
router.post('/register', async (req, res) => {
  try {
    arr.push(req.body);
    res.send(arr);

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    // Validar datos
    // ...

    // Verificar usuario
    const user = await User.findOne({ correo });
    if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Iniciar sesión (puedes usar sesiones, tokens, etc.)
    req.session.userId = user._id;

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

module.exports = router;
