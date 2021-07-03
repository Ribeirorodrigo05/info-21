const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Produto = new Schema({
    data: {
        type: String,
        require: true,
        default: Date.now()
    },
    produto: {
        type: String,
        require: true
    },
    quantidade: {
        type: String,
        require: true
    },
    medida: {
        type: String,
        require: true
    },
    valor: {
        type: Number,
        require: true
    }

})
 mongoose.model('produto', Produto)
