const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
    
    //donde guardamos el archivo
    destination:function (req, file, cb) {
        const pathStorage = path.join(__dirname, "../storage");
        cb(null, pathStorage);
    },

    // nombre archivo
    filename: function (req, file, cb) {
        
        const extFile = file.originalname.split(".").pop();
        const filename = `producto-${req.body.codigo}-${req.body.nombre}.${extFile}`;
        cb(null, filename)
        
    }
});

const uploadMiddleware = multer({storage});


module.exports = uploadMiddleware;

/* Cuando configuras un almacenamiento personalizado con multer.diskStorage(), 
se configura el almacenamiento de los archivos en el disco.
Multer espera que proporciones funciones para destination y filename.
hay una convención en la API de Multer que define los 
parámetros que se pasan a las funciones destination y filename. 
donde el segundo parámetro siempre representa el 
archivo que se está subiendo.  */