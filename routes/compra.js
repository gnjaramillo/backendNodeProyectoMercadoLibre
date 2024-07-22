const express = require("express");
const router = express.Router();
const { createCompra, getCompra, getComprasId, getComprasPorUsuario, getComprasPorProducto, updateCompra, deleteCompra } = require("../controllers/compra");
const { validatorPostCompra, validatorUpdateCompra} = require("../validators/compra");



// Rutas para las compras
router.post('/', validatorPostCompra, createCompra); 
router.get('/:id', getComprasId); 
router.get('/', getCompra); 
router.get('/usuario/:usuarioId', getComprasPorUsuario); 
router.get('/producto/:productoId', getComprasPorProducto); 
router.put("/:id", validatorUpdateCompra, updateCompra); 
router.delete("/:id", deleteCompra); 

module.exports = router;


/* Estructura de Rutas
Crear una nueva compra: POST /api/compras/
Obtener todas las compras de un usuario: GET /api/compras/usuario/:usuarioId
Obtener todas las compras de un producto: GET /api/compras/producto/:productoId
Actualizar una compra: PUT /api/compras/:compraId
Eliminar una compra: DELETE /api/compras/:compraId
 */


