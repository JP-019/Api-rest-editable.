module.exports = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ msg: 'No tienes permisos para realizar esta acción' });
        }
        next();
    };
};
