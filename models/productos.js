const mongoose = require('mongoose');

// Definir el esquema del producto
const productSchema = new mongoose.Schema({
    rol: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
    // Otros campos relevantes para tu producto
});

const Product = mongoose.model('Producto', productSchema);

module.exports = Product;
