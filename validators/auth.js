const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorRegister = [
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

const validatorLogin = [
    check("correo").exists().notEmpty().isEmail().normalizeEmail().withMessage("El correo electrónico no es válido"),
    check("password").exists().isLength({ min: 6 }).notEmpty().trim().escape().withMessage("La contraseña es requerida"),
    (req, res, next) => {
        validateResults(req, res, next); // Usa validateResults como middleware de validación
    }
];

module.exports = { validatorRegister, validatorLogin };
