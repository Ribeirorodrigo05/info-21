const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cliente = new Schema({
    data: {
        type: String,
        require: true,
        
    },
    nome: {
        type: String,
        require: true
    },
    telefone: {
        type: String,
        require: true
    },
    equipamento: {
        type: String,
        require: true
    },
    marca: {
        type: String,
        require: true
    },
    CPU: {
        type: String,
        require: true
    },
    memoria: {
        type: String,
        require: true
    },
    quantidade: {
        type: String,
        require: true
    },
    defeito: {
        type: String,
        require: true
    },
    servico: {
        type: String,
        require: true
    },
    valor: {
        type: String,
    }
})
 mongoose.model('clientes', Cliente)
