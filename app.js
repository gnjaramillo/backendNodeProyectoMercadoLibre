// Importamos y configuramos el paquete dotenv para cargar las variables de entorno desde un archivo .env
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const dbConnect = require('./config/mongo')

// Creamos una instancia de la aplicación Express
const app = express();
// tu servidor Express permite solicitudes desde cualquier origen
app.use(cors());
// tengo que establecer a mi app que este preparado para recibir un post
app.use(express.json())
// los recursos publicos salen de la carpeta storage
app.use(express.static("storage"))
// Vamos a invocar las rutas 
app.use("/api", require("./routes"))
// Middleware para manejar FormData
const multer = require('multer');
const upload = multer(); 
app.use(upload.none()); // Esto es para manejar FormData sin archivos


const port = process.env.PORT || 8000;






app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

dbConnect()