const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const UserSchema = new Schema({
    name:{
        type:String,
        uppercase:true,
        required:true
    },
    tel:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    admin:{
        type:Boolean,
        default:false
    },
    created_at:{
        type:Date,
        default:Date.now
    }   
})

module.exports = User = mongoose.model('users', UserSchema)