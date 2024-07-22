const { compraModel, productoModel, usuariosModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

// Crear una nueva compra
const createCompra = async (req, res) => {
    try {
        const { usuario, producto, cantidad } = req.body;

        // Validar que el producto y el usuario existan
        const productoExistente = await productoModel.findById(producto);
        const usuarioExistente = await usuariosModel.findById(usuario);

        if (!productoExistente) return handleHttpError(res, "Producto no encontrado", 404);
        if (!usuarioExistente) return handleHttpError(res, "Usuario no encontrado", 404);
        if (cantidad <= 0) return handleHttpError(res, "la cantidad debe ser positiva", 404);

        // Crear nueva compra
        const body = new compraModel({
            usuario,
            producto,
            cantidad
        });
        const nuevaCompra = await compraModel.create(body);
        res.status(201).send({ message: "Compra registrada exitosamente", data: nuevaCompra });
    } catch (error) {
        console.error(error);
        handleHttpError(res, "Error al registrar la compra");
    }
};

// Obtener todas las compras de un usuario
const getComprasPorUsuario = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const compras = await compraModel.find({ usuario: usuarioId })
            .populate('producto', 'nombre descripcion precio')
            .populate('usuario', 'nombre cedula')
            .exec();

        if (compras.length === 0) return handleHttpError(res, "No se encontraron compras para este usuario", 404);

        res.send({ data: compras });
    } catch (error) {
        console.error(error);
        handleHttpError(res, "Error al obtener las compras del usuario");
    }
};

// Obtener todas las compras de un producto
const getComprasPorProducto = async (req, res) => {
    const { productoId } = req.params;

    try {
        const compras = await compraModel.find({ producto: productoId })
            .populate('usuario', 'nombre cedula')
            .populate('producto', 'nombre descripcion precio')

            .exec();

        if (compras.length === 0) return handleHttpError(res, "No se encontraron compras para este producto", 404);

        res.send({ data: compras });
    } catch (error) {
        console.error(error);
        handleHttpError(res, "Error al obtener las compras del producto");
    }
};


const getCompra = async (req, res) => {
    try {
        const data = await compraModel.find({})
            .populate('usuario', 'nombre cedula correo')
            .populate('producto', 'nombre descripcion precio');
            res.send({ data });
            console.log(data)

        if (!data) return handleHttpError(res, "Compra no encontrada", 404);

        res.send({ message: "Compras consultadas exitosamente", data });
    } catch (error) {
        console.error(error);
        handleHttpError(res, "Error al consultar compra");
    }
};



const getComprasId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await compraModel.findById(id)
            .populate('usuario', 'nombre cedula correo')
            .populate('producto', 'nombre descripcion precio');

            console.log(data)

        if (!data) return handleHttpError(res, "Compra no encontrada", 404);

        res.send({ message: "Compra consultada exitosamente", data });
    } catch (error) {
        console.error(error);
        handleHttpError(res, "Error al consultar compra");
    }
};



// Actualizar una compra
const updateCompra = async (req, res) => {
    const compraId  = req.params.id;
    const { body } = req;

    try {
        const data = {...body}
        const compraActualizada = await compraModel.findByIdAndUpdate({ _id:compraId  }, data, { new: true });

        if (!compraActualizada) return handleHttpError(res, "Compra no encontrada", 404);

        res.send({ message: `Compra ${compraId} actualizada exitosamente`, compraActualizada });
    } catch (error) {
        console.error(error);
        handleHttpError(res, "Error al actualizar la compra");
    }
};

// Eliminar una compra
const deleteCompra = async (req, res) => {
    const compraId  = req.params.id;

    try {
        const data = await compraModel.findByIdAndDelete({_id:compraId});

        if (!data) return handleHttpError(res, "Compra no encontrada", 404);

        res.send({ message: "Compra eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        handleHttpError(res, "Error al eliminar la compra");
    }
};

module.exports = { createCompra, getCompra, getComprasId, getComprasPorUsuario, getComprasPorProducto, updateCompra, deleteCompra };
