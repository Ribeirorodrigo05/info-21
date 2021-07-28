const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClientSchema = new Schema({
    date:{
        type:String,
        require:true
    },
    hour:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    tel:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:false
    },
    document:{
        type:String,
        require:false
    },
    equipment:{
        type:String,
        require:true
    },
    brand:{
        type:String,
        require:true
    },
    defect:{
        type:String,
        require:true
    },
    service:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        required:false
    }

})

module.exports = Client = mongoose.model('clients', ClientSchema)
