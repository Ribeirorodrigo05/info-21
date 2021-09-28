//dependencies
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const csurf = require('csurf');

//require modules
const User = require('../../model/UserModel');
const Client = require('../../model/ClientModel');
const keys = require('../../config/keys');
const auth = require('../../config/auth');
const search = require('../../search/searchApi')

//new instance of express
const router = express.Router();

//new instance of csurf for cross-site protection
const csrfProtection = csurf({cookie: {httpOnly: true}});

//route of Login
//route is public
router.get('/',(req,res)=>{
    res.render('request/login')
})

//route of Register
//route of public
//this route is just for demonstration how create a user and transform the password in hash 
//all user registrations in this application will be done directly in the database
router.post('/register',(req,res)=>{
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




//Login route
//route public
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
//dashboard route
//private route
router.get('/dashboard', csrfProtection, auth,(request, response) => {

    //let { serviceDashboard } = request
    
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
            response.render('request/dashboard', {csrf : request.csrfToken, services : services})
        })

       // response.render('request/dashboard', {csrf : request.csrfToken, services : services})
    })

module.exports = router;

