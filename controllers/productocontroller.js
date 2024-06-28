const Producto = require('../models/productos');

// Crear un nuevo producto
exports.CrearProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).send(producto);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Hubo un error al crear el producto");
    }
};

// Obtener todos los productos
exports.ObtenerProducto = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Hubo un error al obtener los productos");
    }
};

// Actualizar un producto por ID
exports.Actualizar = async (req, res) => {
    try {
        const { rol, nombre, mensaje } = req.body;

        // Buscar el producto por su ID
        let producto = await Producto.findById(req.params.id);

        // Verificar si el producto existe
        if (!producto) {
            return res.status(404).json({ mensaje: "El producto no existe" });
        }

        // Actualizar los campos del producto
        producto.rol = rol;
        producto.nombre = nombre;
        producto.mensaje = mensaje;

        // Actualizar el producto en la base de datos
        producto = await Producto.findByIdAndUpdate(req.params.id, producto, { new: true });

        res.status(200).json(producto); // Devolver el producto actualizado
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Hubo un error al actualizar el producto");
    }
};

// Obtener un producto por ID
exports.ObtenerProductos = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        // Verificar si el producto existe
        if (!producto) {
            return res.status(404).json({ mensaje: "El producto no existe" });
        }

        res.status(200).json(producto); // Devolver el producto encontrado
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Hubo un error al obtener el producto");
    }
};

// Eliminar un producto por ID
exports.EliminarProductos = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        // Verificar si el producto existe
        if (!producto) {
            return res.status(404).json({ mensaje: "El producto no existe" });
        }

        await Producto.findByIdAndDelete(req.params.id);

        res.status(200).json({ mensaje: "Producto eliminado con éxito" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Hubo un error al eliminar el producto");
    }
};
