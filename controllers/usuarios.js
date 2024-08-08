const {usuariosModel} = require("../models") // aqui llama al index.js de models
const {handleHttpError} = require ("../utils/handleError.js")
const PUBLIC_URL = process.env.PUBLIC_URL;



//traer usuarios bd
 const getUsuarios = async (req, res) => {
    try {
        const data = await usuariosModel.find({}).select('-password');
        res.send({ data });
    } catch (error) {
        res.status(500).send({ message: "Error al obtener datos", error });
    }
};



//traer usuario por id
const getUsuariosId = async (req, res) => {
    try {
        const { id } = req.params;  
        const data = await usuariosModel.findById(id).select('-password');
        res.send({  message: "Usuario consultado exitosamente", data});
    } catch (error) {
        handleHttpError(res, "Error al consultar el usuario")
    }
};



// crear usuario
const postUsuarios = async (req, res) => {
    const { body } = req;

    try {
        const data = await usuariosModel.create(body);

        // Log para verificar los datos guardados
        console.log("Usuario creado:", data);

        res.status(201).send({ message: "Usuario creado exitosamente", data });
    } catch (error) {
        handleHttpError(res, "Error al crear el usuario");
    }
};




// Actualizar un usuario existente
const updateUsuarios = async (req, res) => {
    const userId = req.params.id;
    const { body } = req;

    try {
        const data ={...body}
        const dataUser = await usuariosModel.findOneAndUpdate({ _id: userId }, data, { new: true });
        res.send({ message: `Usuario ${userId} actualizado`, dataUser });
    } catch (error) {
        res.status(500).send({ message: "Error al actualizar el usuario", error });
    }
};



// Eliminar un usuario
const deleteUsuarios = async (req, res) => {
    const userId = req.params.id;

    try {
        await usuariosModel.findOneAndDelete({ _id: userId });
        res.send({ message: `Usuario ${userId} eliminado` });
    } catch (error) {
        //console.log(error)
        res.status(500).send({ message: "Error al eliminar el usuario", error });
    }
};

module.exports = { getUsuarios, postUsuarios, updateUsuarios, deleteUsuarios, getUsuariosId };



//req.params es parte de Express.js y se utiliza para acceder a los parámetros de ruta en una solicitud HTTP.