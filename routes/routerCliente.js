const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Clientes');
const Cliente = mongoose.model('clientes');


router.use(express.static(__dirname + "/public"))
//cadastrar cliente

router.post('/cadcliente',(req,res)=>{
    const novoCliente = {
        data: req.body.date,
        nome: req.body.nome,
        telefone: req.body.tel,
        equipamento: req.body.equipamento,
        marca: req.body.marca,
        CPU: req.body.CPU,
        memoria: req.body.memoria,
        quantidade: req.body.quantidade,
        defeito: req.body.defeito,
        servico: req.body.servico,
        valor: req.body.valor
}
  new Cliente(novoCliente).save()
  .then(()=>{
      res.render('request/form')

  })
  .catch((err)=>{
      console.log('não salvo '+ err) 
  })
}
)

//consultar cliente
router.get('/clientes',(req,res)=>{
    Cliente.find().then((cliente)=>{
        res.render('request/consultaClientes',{cliente : cliente})
    })
})



//editando cliente
router.get('/edit/:id',(req,res)=>{
    Cliente.findOne({_id:req.params.id}).then((cliente)=>{
        res.render('request/alterarCliente',{cliente : cliente})
    }).catch((err)=>console.log(err))
})

router.post('/editCliente',(req,res)=>{
  
    Cliente.findOne({_id:req.body.id}).then((cliente)=>{
        cliente.data = req.body.date
        cliente.nome = req.body.nome
        cliente.telefone = req.body.tel
        cliente.equipamento = req.body.equipamento
        cliente.marca = req.body.marca
        cliente.CPU = req.body.CPU
        cliente.memoria = req.body.memoria
        cliente.quantidade = req.body.quantidade
        cliente.defeito = req.body.defeito
        cliente.servico = req.body.servico
        cliente.valor = req.body.valor 
        cliente.save().then(()=>{
            console.log('Salvo com sucesso')
            res.redirect('/clientes')
        }).catch()
    })
})

//deletando cliente
router.get('/deletar/:id',(req,res)=>{
    Cliente.deleteOne({_id:req.params.id}).then((cliente)=>{
        console.log('Excluído com sucesso!')
        res.redirect('/clientes')
    })
})

module.exports = router