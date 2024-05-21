const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Ruta de dashboard del usuario
router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ usuario: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// Ruta de consulta de saldo
router.get('/saldo', async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ saldo: user.saldo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// Ruta de transferencias
router.post('/transferir', async (req, res) => {
  try {
    // Lógica de transferencias
    // ...

    res.status(200).json({ mensaje: 'Transferencia exitosa' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// Ruta de registro de movimientos
router.get('/movimientos', async (req, res) => {
  try {
    const userId = req.session.userId;
    const movimientos = await Transaction.find({ userId });

    res.status(200).json({ movimientos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

module.exports = router;
