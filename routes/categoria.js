const express = require("express");
const router = express.Router();
const { getCategoria, getCategoriaId, postCategoria, updateCategoria, deleteCategoria } = require("../controllers/categoria");


// Rutas para la manipulación de Categoria
router.get("/", getCategoria);
router.get("/:id",  getCategoriaId);
router.post("/", postCategoria);
router.put("/:id",  updateCategoria);
router.delete("/:id", deleteCategoria);

module.exports = router;
