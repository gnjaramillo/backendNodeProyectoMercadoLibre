const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorPostCompra = [
    check("usuario").exists().isMongoId().withMessage("El ID del usuario es requerido y debe ser un ID válido"),
    check("producto").exists().isMongoId().withMessage("El ID del producto es requerido y debe ser un ID válido"),
    check("cantidad").exists().isInt({ min: 1 }).withMessage("La cantidad es requerida y debe ser al menos 1"),
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

const validatorUpdateCompra = [
    check("usuario").exists().isMongoId().withMessage("El ID del usuario es requerido y debe ser un ID válido"),
    check("producto").exists().isMongoId().withMessage("El ID del producto es requerido y debe ser un ID válido"),
    check("cantidad").exists().isInt({ min: 1 }).withMessage("La cantidad es requerida y debe ser al menos 1"),
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

module.exports = { validatorPostCompra, validatorUpdateCompra };
