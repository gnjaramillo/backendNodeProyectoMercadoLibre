const {categoriaModel} = require("../models")
const {handleHttpError} = require("../utils/handleError")


const getCategoria= async (req, res) => {
    try {
        const data = await categoriaModel.find({}) 
        res.send({data})

    } catch (error) {
        handleHttpError(res, "error al obtener datos de categoria");
    }
}



const getCategoriaId = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await categoriaModel.findById(id)
        if (!data) {
            handleHttpError(res, "categoria no encontrado", 404);
            return;
        }
        res.send({message: "categoria consultado exitosamente", data})
    } catch (error) {
        handleHttpError(res, "Error al consultar el categoria")
    }
}



const postCategoria = async (req, res) => {
    const {body} = req
    try {  
        const data ={
            ...body
        }
        const dataCat = await categoriaModel.create(data);
        console.log(data)
        res.send({message: "categoria registrada exitosamente", dataCat})
    } catch (error) {
        handleHttpError(res, "Error al registrar la categoria")
    }
}



const updateCategoria = async (req, res) => {
    const Id = req.params.id;
    const { body } = req;

    try {
        let updateData = { ...body };  
        const data = await categoriaModel.findOneAndUpdate({ _id:Id}, updateData, { new: true });
        console.log(updateData)

        if (!data) {
            handleHttpError(res, "categoria no encontrada", 404);
            return;
        }

        res.send({ message: `categoria ${Id} actualizada exitosamente`, data });
    } catch (error) {
        handleHttpError(res, "Error al actualizar la categoria");
    }
};





const deleteCategoria = async (req, res) => {
    const Id = req.params.id;

    try {
        const data = await categoriaModel.findOneAndDelete({_id: Id})
        if (!data) {
            handleHttpError(res, "categoria no encontrada", 404);
            return;
        }
        res.send({ message: `categoria ${Id} eliminado` });
    } catch (error) {
        handleHttpError(res, "Error al eliminar la categoria")
    }
}





module.exports = { getCategoria, getCategoriaId, postCategoria, updateCategoria, deleteCategoria };
