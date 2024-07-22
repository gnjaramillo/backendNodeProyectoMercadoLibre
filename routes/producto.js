const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { getProducto, getProductoId, postProducto, updateProducto, deleteProducto }= require("../controllers/producto");


// Rutas para la manipulación de Categoria
router.get("/", getProducto);
router.get("/:id",  getProductoId);
router.post("/", uploadMiddleware.single('foto'), postProducto);
router.put("/:id",uploadMiddleware.single('foto'),  updateProducto);
router.delete("/:id", deleteProducto);

module.exports = router;

