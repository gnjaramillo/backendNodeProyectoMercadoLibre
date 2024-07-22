const {handleHttpError} = require("../utils/handleError")

const authMiddleware = (req, res, next) => {
    try {
        // toca capturar el token de la base de datos

        
    } catch (error) {
        return handleHttpError(res, "error en ingreso de sesion", 401);
    }
    
}
module.exports = authMiddleware