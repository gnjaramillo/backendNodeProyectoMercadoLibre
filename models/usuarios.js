const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
}, 
{
    timestamps: true // Configuración de timestamps para createdAt y updatedAt
});

module.exports = mongoose.model('Usuario', usuarioSchema);
