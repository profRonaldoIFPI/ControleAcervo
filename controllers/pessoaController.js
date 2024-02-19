const express = require('express')
const router = express.Router()
const Pessoa = require('../models/Pessoa')

router.get('/new',(req,res)=>{
   res.render('pessoaForm',{pessoa: null})
})

//Create <==================================

 router.post('/create',(req, res)=>{
   //TODO verificar se tem campo nulo
   Pessoa.create({                       //<-- usando o CRUD
      nome: req.body.nome,
      cpf: req.body.cpf,
      endereco: req.body.endereco,
      telefone: req.body.telefone,
      email: req.body.email
   }).then(()=>{
      res.redirect('/')
      console.log("dados recebidos") //será alterado
   }).catch((err)=>{
      res.redirect('/')
      console.log("deu errado: "+err) 
   })
})

//Retreave  <==================================
 
router.get('/retreave',(req,res)=>{
   Pessoa.findAll()                       //<-- usando o CRUD
   .then((pessoas) => {
     // console.log(JSON.parse(pessoas))
      res.render('pessoaLista',{pessoas: pessoas})
   })
   .catch((err)=>{
      console.log("deu errado: "+err) 
      
   })
})
  
router.get('/edit/:id', (req,res)=>{
   var id = req.params.id;
   console.log(id)
   if(id && !isNaN(id)){
      Pessoa.findByPk(id)
      .then((pessoa)=>{
         res.render('pessoaForm',{pessoa: pessoa})
      }).catch((err)=>{
         console.log("Deu B.O. "+err)
      }).finally(()=>{
         res.redirect('/pessoa/retreave')
      })
   } else {
      console.log('Id inválido: '+id)
      res.redirect('/')
   }
})

//Update  <==================================

router.post('/update',(req, res)=>{
   //TODO verificar se tem campo nulo
   Pessoa.update(                       //<-- usando o CRUD
      {  
         nome:       req.body.nome,
         cpf:        req.body.cpf,
         endereco:   req.body.endereco,
         telefone:   req.body.telefone,
         email:      req.body.email
      },
      {
         where:{
            id: req.body.id
         }
      }
   ).then(()=>{
      console.log("dados recebidos") //será alterado
   }).catch((err)=>{
      console.log("deu errado: "+err) 
   }).finally(()=>{
      res.redirect('/pessoa/retreave')
   })
})

// Delete  <==================================

router.get('/delete/:id', (req,res)=>{
   var id = req.params.id;
   console.log(id)
   if(id && !isNaN(id)){
      Pessoa.destroy({
         where: {id: id}
      }).then(()=>{
         console.log('Deletado')
      }).catch((err)=>{
         console.log("Deu B.O. "+err)
      }).finally(()=>{
         res.redirect('/pessoa/retreave')
      })
   } else {
         console.log('Id inválido: '+id)
         res.redirect('/')
      }
})

module.exports = router