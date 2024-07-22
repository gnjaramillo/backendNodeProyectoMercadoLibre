const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorPostUsuarios = [
    check("nombre").exists().notEmpty().trim().escape().withMessage("El nombre es requerido"),
    check("cedula").exists().notEmpty().trim().escape().withMessage("La cédula es requerida"),
    check("correo").exists().notEmpty().isEmail().normalizeEmail().withMessage("El correo electrónico no es válido"),
    check("telefono").exists().notEmpty().trim().escape().isNumeric().withMessage("El teléfono debe ser un número"),
    check("direccion").exists().notEmpty().trim().escape().withMessage("Ingresa tu dirección"),
    check("password").exists().isLength({ min: 6 }).notEmpty().trim().escape().withMessage("La contraseña es requerida"),
    (req, res, next) => {
        validateResults(req, res, next); // Usa validateResults como middleware de validación
    }
];

const validatorUpdateUsuarios = [
    check("nombre").optional().notEmpty().trim().escape().withMessage("El nombre es requerido"),
    check("cedula").optional().notEmpty().trim().escape().withMessage("La cédula es requerida"),
    check("correo").optional().notEmpty().isEmail().normalizeEmail().withMessage("El correo electrónico no es válido"),
    check("telefono").optional().notEmpty().trim().escape().isNumeric().withMessage("El teléfono debe ser un número"),
    check("direccion").optional().notEmpty().trim().escape().withMessage("Ingresa tu dirección"),
    check("password").optional().isLength({ min: 6 }).notEmpty().trim().escape().withMessage("La contraseña es requerida"),
    (req, res, next) => {
        validateResults(req, res, next); 
    }
];

const validatorPostUsuariosId = [
    check("id").isMongoId().exists().notEmpty().trim().escape().withMessage("El id es requerido"),
    (req, res, next) => {
        validateResults(req, res, next); 
    }
];

module.exports = { validatorPostUsuarios, validatorUpdateUsuarios, validatorPostUsuariosId };

/* Estas validaciones se usan para validar y sanitizar los datos de las solicitudes HTTP. 
   Se aplican antes de que los datos lleguen a tu base de datos o se procesen en tu controlador. */
