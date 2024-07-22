const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },    
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    stockDisponible: {
        type: Number,
        required: true
    },
    foto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage',
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema);
