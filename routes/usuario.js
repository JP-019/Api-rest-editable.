const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuariocontroller");

// Registro de usuario
router.post("/registrar", usuarioController.registrarUsuario);


// Autenticar usuario (login)
router.post("/login", usuarioController.autenticarUsuario);

module.exports = router;
