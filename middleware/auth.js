const jwt = require('jsonwebtoken');
const { token } = require('../controllers/usuarioController'); // Importar el token generado

module.exports = function (req, res, next) {
    try {
        // Leer el token del header de autorización
        const tokenRecibido = req.body('Authorization');

        // Verificar si no hay token
        if (!tokenRecibido) {
            return res.status(401).json({ msg: 'No hay token, permiso no válido' });
        }
 
        // Extraer el token de la cabecera "Bearer <token>"
        const tokenPartes = tokenRecibido.split(' ');
        const tokenUsuario = tokenPartes[1];

        // Verificar y descifrar el token
        const cifrado = jwt.verify(tokenUsuario, token);
        req.usuario = cifrado.usuario;
        next(); // El usuario está autenticado, continuar con la ejecución
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};
