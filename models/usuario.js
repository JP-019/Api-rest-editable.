const mongoose = require('mongoose');

// Definir el esquema del usuario
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['admin', 'normal', 'vista'], 
        default: 'vista'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;

