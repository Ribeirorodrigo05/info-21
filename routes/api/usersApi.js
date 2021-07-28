const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../model/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const auth = require('../../config/auth');
const csurf = require('csurf');
const csrfProtection = csurf({cookie: {httpOnly: true}})

/*router.get('/register',(req,res)=>{
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
})*/



router.get('/',(req,res)=>{
    res.render('request/login')
})

//rota de login
//rota publica
router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;   
    User.findOne({email}).then((user)=>{
        if(!user){
            res.status(400).json('The email is invalid')
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                    }
                    res.cookie("cookieToken", jwt.sign( payload, keys.secretOrKey,{expiresIn:3600},), { httpOnly: true })
                    res.redirect("/dashboard")
            }else{
                res.status(400).json({msg:'Login/Password is not correct!'})

            }


           
        })
    })
})
//rota privada (passport and jwt)
router.get(
    '/dashboard', csrfProtection, auth , (req, res) => {
        res.render('request/dashboard', {csrf : req.csrfToken}) 
    }
  );

router.get('/registerClient', csrfProtection, auth, (req,res)=>{
    res.render('request/form', {csrf : req.csrfToken}) 
})

module.exports = router