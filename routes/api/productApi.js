const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../../model/ProductModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const auth = require('../../config/auth');
const csurf = require('csurf');
const csrfProtection = csurf({cookie: {httpOnly: true}})

/*router.get('/product', csrfProtection, auth, (req,res)=>{
    res.render('request/product', {csrf : req.csrfToken}) 
})*/



router.get('/inventory', csrfProtection, auth, (req,res)=>{
    res.render('request/inventory', {csrf : req.csrfToken}) 
})


router.post('/registerProduct', auth,(req,res)=>{
    Product.findOne({code:req.body.code}).then((code)=>{
        const errors = [];
        if(code){
            errors.push({failregister :'O código já está sendo utilizado'})
        }
        
        if(errors.length >0){
            res.render('request/inventory',{errors: errors})

        }
        else{
        const newProduct = {
            code: req.body.code,
            name: req.body.name,
            unit: req.body.unit,
            price: req.body.price
    }
    new Product(newProduct).save()
    .then(()=>{
      req.flash("success_msg", "Produto cadastrado")
      res.redirect('/consultProduct')
    }).catch((err)=>{
      console.log('Error : ' + err)
    })
    }
})
    }
    )
    

router.get('/consultProduct', auth,(req,res)=>{
    Product.find().then((product)=>{
        res.render('request/inventory',{product : product})
    })
})


router.get('/deleteProduct/:id',(req,res)=>{
    Product.deleteOne({_id:req.params.id}).then((product)=>{
        console.log('Excluído com sucesso!')
        res.redirect('/consultProduct')
    })
})
module.exports = router;