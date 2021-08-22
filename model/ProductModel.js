const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    code:{
        type:String,
        require:true
    },
    name:{
        type:String,
        uppercase:true,
        require:true
    },
    unit:{
        type:Number,
        require:true
    },
    price:{
        type:Number,
        require:true
    }   
})

module.exports = Product = mongoose.model('products', ProductSchema)
