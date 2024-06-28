const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

// Conectar a la base de datos
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', require('./routes/productos'));
app.use('/api/usuarios', require('./routes/usuario'));

// Ruta para devolver un JSON
app.get('/', (req, res) => {
  res.json({ message: '¡Bienvenido a mi API!' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
});
