const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Clientes');
const Cliente = mongoose.model('clientes');
require('../models/Produto');
const Produto = mongoose.model('produto')


router.get('/',(req,res)=>{
    res.render('request/dashboard')
})

router.get('/form',(req,res)=>{
    res.render('request/form')
})










router.get('/inventario',(req,res)=>{
    res.render('request/inventario')
})

router.get('/produto',(req,res)=>{
    Produto.find().then((produto)=>{
        res.render('request/produto',{produto : produto})
    })
})
router.post('/cadInventario',(req,res)=>{
    const novoProduto = {
        produto: req.body.produto,
        quantidade: req.body.quantidade,
        medida: req.body.medida,
        valor: req.body.valor      
}
  new Produto(novoProduto)
  .save().then(()=>{
      req.flash('sucess_msg', 'Cadastrado com sucesso!')
      res.redirect('/')
  })
  
})

router.get('/deletar-produto/:id',(req,res)=>{
    Produto.remove({_id:req.params.id}).then((Produto)=>{
        console.log('Excluído com sucesso!')
        res.redirect('/')
    }).catch((err)=>{
        console.log('não foi possível excluir' + err)
    })
})

router.get('/vendas',(req,res)=>{
    res.render('request/venda')
})
module.exports = router