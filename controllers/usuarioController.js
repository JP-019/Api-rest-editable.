const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        // Verificar si el usuario ya existe
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crear nuevo usuario
        usuario = new Usuario(req.body);

        // Hashear la contraseña
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        // Guardar usuario en la base de datos
        await usuario.save();

        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id,
                rol: usuario.rol
            }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if (error) throw error;

            // Mensaje de confirmación
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Hubo un error al registrar el usuario');
    }
};


// Autenticar un usuario
exports.autenticarUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        // Verificar la contraseña
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        // Si la autenticación es exitosa, generar un token JWT
        const payload = {
            usuario: {
                id: usuario.id,
                rol: usuario.rol
            }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if (error) throw error;

            // Enviar una respuesta positiva con el token JWT
            module.exports.token = token;
            res.json({ token }
                
                
            );
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al autenticar el usuario');
    }
};
