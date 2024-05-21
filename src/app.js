const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
//const authenticationMiddleware = require('./utils/authenticationMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Coloca tu contraseña si la has configurado
  database: 'data_bank',
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
  } else {
    console.log('Conexión a MySQL establecida');
  }
});

// Cierra la conexión a MySQL al cerrar la aplicación
process.on('exit', () => {
  connection.end();
});

// Configuración de middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
app.use(
  session({
    secret: 'secreto-para-la-sesion',
    resave: true,
    saveUninitialized: true,
  })
);
*/

// ruta de bienvenida
app.get('/', (req, res) => {
  res.send('Prueba practica desarrollador fullstack');
});

// Rutas públicas (registro, inicio de sesión)
app.use('/auth', authRoutes);

// Middleware de autenticación para rutas protegidas
//app.use(authenticationMiddleware);

// Rutas protegidas (dashboard, consulta de saldo, transferencias, registro de movimientos)
app.use('/user', userRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
