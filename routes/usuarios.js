const express = require("express");
const router = express.Router();
const { getUsuarios, postUsuarios, updateUsuarios, deleteUsuarios, getUsuariosId } = require("../controllers/usuarios");
const uploadMiddleware = require("../utils/handleStorage");
const { validatorPostUsuarios, validatorUpdateUsuarios, validatorPostUsuariosId } = require("../validators/usuarios");

router.get("/", getUsuarios);
router.get("/:id", validatorPostUsuariosId, getUsuariosId);
router.post("/",  validatorPostUsuarios, postUsuarios);
router.put("/:id",  validatorUpdateUsuarios, updateUsuarios);
router.delete("/:id", deleteUsuarios);

module.exports = router;
