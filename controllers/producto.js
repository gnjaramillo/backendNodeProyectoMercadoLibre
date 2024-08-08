const {storageModel, productoModel, categoriaModel } = require("../models")
const {handleHttpError} = require("../utils/handleError")
const PUBLIC_URL = process.env.PUBLIC_URL;

// Obtener todos los productos
const getProducto = async (req, res) => {
    try {
        const data = await productoModel.find({})
            .populate('categoria', 'nombre')
            .populate('foto', 'url filename');
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "Error al obtener datos de Producto");
    }
};



// Obtener producto por ID
const getProductoId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await productoModel.findById(id)
        .populate('categoria', 'nombre')
        .populate('foto', 'url filename');

        if (!data) {
            handleHttpError(res, "Producto no encontrado", 404);
            return;
        }
        res.send({ message: "Producto consultado exitosamente", data });
    } catch (error) {
        handleHttpError(res, "Error al consultar Producto");
    }
};

// Registrar nuevo producto
const postProducto = async (req, res) => {
    try {
        const { body, file } = req;

        let fotoId = null;
        if (file) {
            const fileData = {
                url: `${PUBLIC_URL}/${file.filename}`,
                filename: file.filename
            };
            console.log(fileData)
            const fileSaved = await storageModel.create(fileData);
            fotoId = fileSaved._id;
        }

        const data = {
            ...body,
            foto: fotoId
        };
        const productoData = await productoModel.create(data);
        res.send({ message: "Producto registrado exitosamente", productoData });
    } catch (error) {
        handleHttpError(res, "Error al registrar Producto");
    }
};

// Actualizar producto
const updateProducto = async (req, res) => {
    const { id } = req.params;
    const { body, file } = req;

    try {
        let updateData = { ...body };

        if (file) {
            const fileData = {
                url: `${PUBLIC_URL}/${file.filename}`,
                filename: file.filename
            };
            const fileSaved = await storageModel.create(fileData);
            updateData.foto = fileSaved._id;
        }

        const data = await productoModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!data) {
            handleHttpError(res, "Producto no encontrado", 404);
            return;
        }

        res.send({ message: `Producto ${id} actualizado exitosamente`, data });
    } catch (error) {
        handleHttpError(res, "Error al actualizar Producto");
    }
};

// Eliminar producto
const deleteProducto = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await productoModel.findByIdAndDelete(id);

        if (!data) {
            handleHttpError(res, "Producto no encontrado", 404);
            return;
        }

        res.send({ message: `Producto ${id} eliminado` });
    } catch (error) {
        handleHttpError(res, "Error al eliminar Producto");
    }
};


// Obtener productos por categoría
const getProductosByCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;
        const categoriaObj = await categoriaModel.findOne({ nombre: categoria });

        if (!categoriaObj) {
            handleHttpError(res, "Categoría no encontrada", 404);
            return;
        }

        const data = await productoModel.find({ categoria: categoriaObj._id })
            .populate('categoria', 'nombre')
            .populate('foto', 'url filename');
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "Error al obtener productos por categoría");
    }
};

module.exports = { getProducto, getProductoId, postProducto, updateProducto, deleteProducto, getProductosByCategoria };



