const express = require("express");
const router = express.Router();
const { encrypt, compare } = require("../utils/handlePassword");
const { usuariosModel, storageModel } = require("../models"); // Asegúrate de importar todos los modelos necesarios
const { tokenSign } = require("../utils/handleJwt");
const {handleHttpError} = require ("../utils/handleError.js");

const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:3010";

// registrar el usuario

const registerCtrl = async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        const passwordHash = await encrypt(password);
        const body = { ...rest, password: passwordHash };

        // Crear los datos del usuario sin la referencia al archivo
        const userData = {
            ...body
        };

        const dataUser = await usuariosModel.create(userData);
        dataUser.password = undefined; // Ocultar la contraseña en la respuesta

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        };

        res.send({ data });
        
    } catch (error) {
        handleHttpError(res, "error al registrar el usuario", 500);     }
}


// loguear el usuario
const loginCtrl = async (req, res) => {
    try {
        const { correo, password } = req.body;

        // Encontrar el usuario por su email y seleccionar la contraseña
        const user = await usuariosModel.findOne({ correo }).select('password correo cedula');
       
        console.log(user)

        if (!user) {
            return handleHttpError(res, "usuario no existe", 404);
        }

        // Comparar la contraseña proporcionada con la almacenada
        const passwordSave = user.password;
        const check = await compare(password, passwordSave);

        console.log("password recibido:", password);
        console.log("Password almacenada:", passwordSave);


        if (!check) {
            return handleHttpError(res, "contraseña incorrecta", 401);
        }

        // Si todo está bien, se devuelve el token de sesión y la data del usuario
        user.set('password', undefined, {strict:false}) // para q no devuelva la contraseña
        const dataUser = {
            token: await tokenSign(user),
            user
        };

        res.send({  message: "Usuario ha ingresado exitosamente", dataUser});
    } catch (error) {
        handleHttpError(res, "error login usuario");
    }
};



module.exports = {registerCtrl, loginCtrl }



/* undefined a la propiedad password del objeto user. 
Esto efectivamente elimina la propiedad password del objeto en memoria 
(no en la base de datos). Uso común: Esto es útil para evitar 
que la contraseña sea incluida en las respuestas HTTP o se registre 
en los logs.  { strict: false } permite esta modificación incluso si el 
esquema de Mongoose tiene restricciones estrictas.
 */


