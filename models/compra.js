const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    fechaDeCompra: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Compra', compraSchema);
