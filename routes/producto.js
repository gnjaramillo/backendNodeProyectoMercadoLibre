const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { getProducto, getProductoId, postProducto, updateProducto, deleteProducto, getProductosByCategoria }= require("../controllers/producto");


router.get("/", getProducto);
router.get("/:id",  getProductoId);
router.post("/", uploadMiddleware.single('foto'), postProducto);
router.put("/:id",uploadMiddleware.single('foto'),  updateProducto);
router.delete("/:id", deleteProducto);

// Nueva ruta para obtener productos por categoría
router.get('/categoria/:categoria', getProductosByCategoria);


module.exports = router;

