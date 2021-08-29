const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../model/UserModel');
const Client = require('../../model/ClientModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const auth = require('../../config/auth');
const csurf = require('csurf');
const csrfProtection = csurf({cookie: {httpOnly: true}})

//rota de login
//rota publica
router.get('/',(req,res)=>{
    res.render('request/login')
})
//rota de registro 
//rota publica login
//nao visível
router.get('/register',(req,res)=>{
    User.findOne({email: req.body.email}).then(user=>{
     if(user){
            return res.status(400).json('O email já está cadastrado!');
     }else{
        const newUser = new User({
            name: req.body.name,
            tel: req.body.tel,
            email: req.body.email,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err,hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => res.json(user))
                        .catch(err => console.log(err));
                })
          })
     }
    })
})




//rota de login
//rota publica
router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;   
    User.findOne({email}).then((user)=>{
        const errors =[];
        if(!user){
            errors.push({invalidEmailOrPassword:'Email/Password invalid!'})   
        }
        if(errors.length > 0){
            res.render('request/login', {errors: errors})
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    admin: user.admin
                    }
                    res.cookie("cookieToken", jwt.sign( payload, keys.secretOrKey,{expiresIn:3600},), { httpOnly: true })
                    res.redirect("/dashboard")
            }else{
                req.flash('msg_error','Email/Password invalid')
                res.render('request/login')


            }
        })
    })
})
//rota privada 
router.get(
    '/dashboard', csrfProtection, auth , (req, res) => {

    let services = {};
  
        Client.countDocuments({},(err, result)=>{
            if(err){
                console.log(err)
            }else{
                services.allServices = result;
            }
        })

        Client.countDocuments({status:'open'},(err, result)=>{
            if(err){
                console.log(err)
            }else{
                services.openServices = result;
            }
        })

        Client.countDocuments({status:'close'},(err, result)=>{
            if(err){
                console.log(err)
            }else{
                services.closeServices = result;
            }
        })
        .then(user => {
            res.render('request/dashboard', {csrf : req.csrfToken, services : services})
        })
        

    })

    


        



module.exports = router;

//create a array for count the number of service 
        /*const service = [];
         service.push({numberOfService : Client.countDocuments({},(err, result)=>{
            if(err){
                console.log(err)
            }else{
                service.push({theValue:result}) 
            }
        })})

        service.push({openServices: Client.countDocuments({status:'open'},(err, result)=>{
            if(err){
                console.log(err)
            }else{
                service.push({openServicesValue:result})
            }
        })})

        service.push({openServices: Client.countDocuments({status:'close'},(err, result)=>{
            if(err){
                console.log(err)
            }else{
                service.push({closeServicesValue:result})
            }
        })})
        
        
        if(service.length >= 0){
        res.render('request/dashboard', {csrf : req.csrfToken, service : service}) 
        }

       })*/




///////////////////////////////////////////////////////////////////////////////////////////////////////


       /* const service = {};
        Client.find().then(user =>{ 
        service.NumberOfService =  Client.countDocuments({},(err, result)=>{
            if(err){
                console.log(err);
            }else{
                service.theValue = result ;
            }
        })

        service.openServices =  Client.countDocuments({status:'open'},(err, result)=>{
            if(err){
                console.log(err)
            }else{
                service.openServicesValue = result
            }
        })
        
        service.openServices = Client.countDocuments({status:'close'},(err, result)=>{
            if(err){
                console.log(err)
            }else{
                service.closeServicesValue = result
            }

        })
        
        res.render('request/dashboard', {csrf : req.csrfToken, service : service}) */





        //retornando dados para a dashboard
     /*const services = [];

        Client.countDocuments({},(err, result)=>{
            if(err){
                console.log(err)
            }
            else{
                services.push({allServices : result})
            }
        })

        Client.countDocuments({status:'open'},(err, result)=>{
            if(err){
                console.log(err)
            }
            else{
                services.push({openServices : result})
            }
        })

        Client.countDocuments({status:'close'},(err, result)=>{
            if(err){
                console.log(err)
            }
            else{
                services.push({closeServices : result})
            }
        })
        .then(user => {
            if(services.length >= 0 ){
                res.render('request/dashboard', {csrf : req.csrfToken, services : services})
            }
        })
      
        




    })*/