const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const auth = require('../../config/auth');
const csurf = require('csurf');
const csrfProtection = csurf({cookie: {httpOnly: true}})
require('../../model/ClientModel')
const Client = mongoose.model('clients')

router.post('/registerClient', auth,(req,res)=>{
        const newClient = {
            date: req.body.date,
            hour: req.body.hour,
            name: req.body.name,
            tel: req.body.tel,
            date: req.body.date,
            address: req.body.address,
            document: req.body.document,
            equipment: req.body.equipment,
            brand: req.body.brand,
            defect: req.body.defect,
            service: req.body.service
}
  new Client(newClient).save()
  .then(()=>{
      console.log('Save')
      res.redirect('/consult')
  }).catch((err)=>{
      console.log('Error : ' + err)
  })
}
)

router.get('/consult', auth,(req,res)=>{
    Client.find().then((client)=>{
        res.render('request/consultClient',{client : client})
    })
})

router.get('/edit/:id',(req,res)=>{
    Client.findOne({_id:req.params.id}).then((client)=>{
        res.render('request/editClient',{client : client})
    }).catch((err)=>console.log(err))
})

router.post('/editClient',(req,res)=>{
    Client.findOne({_id:req.body.id}).then((client)=>{
        client.date = req.body.date
        client.name = req.body.name
        client.hour = req.body.hour
        client.tel = req.body.tel
        client.address = req.body.address
        client.document = req.body.document
        client.equipment = req.body.equipment
        client.brand = req.body.brand
        client.defect = req.body.defect
        client.service = req.body.service
        client.price = req.body.price
        client.save().then(()=>{
            console.log('Salvo com sucesso')
            res.redirect('/consult')
        }).catch()
    })
})

//deletando cliente
router.get('/deletar/:id',(req,res)=>{
    Client.deleteOne({_id:req.params.id}).then((client)=>{
        console.log('Excluído com sucesso!')
        res.redirect('/consult')
    })
})

module.exports = router;