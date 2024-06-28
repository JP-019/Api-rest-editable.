const express = require('express');
const router = express.Router();
const productoController = require("../controllers/productocontroller");

let authMiddleware;

// Verificar si el middleware de autenticación está definido
try {
    authMiddleware = require('../middleware/auth');
} catch (error) {
    console.error('No se pudo cargar el middleware de autenticación:', error);
}

// Definir las rutas
try {
    router.post('/', productoController.CrearProducto);
    router.get('/',  productoController.ObtenerProducto);
    router.put('/:id',  productoController.Actualizar);
    router.get('/:id', productoController.ObtenerProductos);
    router.delete('/:id',  productoController.EliminarProductos);
} catch (error) {
    console.error('Error al definir las rutas:', error);
}

module.exports = router;
