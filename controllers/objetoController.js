const express = require('express')
const Emprestimo = require('../models/Emprestimo')
const router = express.Router()
const Objeto = require('../models/Objeto')

router.get('/new',(req,res)=>{
   res.render('objetoForm',{objeto: null})
})

//Create <==================================

 router.post('/create',(req, res)=>{
   var data = req.body.data_aquisicao
   var valor = req.body.valor
   if(data=="") data = null
   if(valor=="") valor = null

   Objeto.create({                       //<-- usando o CRUD
      nome:             req.body.nome,
      descricao:        req.body.descricao,
      tipo:             req.body.tipo,
      data_aquisicao:   data,
      valor:            valor,
      observacoes:      req.body.observacoes,
      status:           true
      
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
   Objeto.findAll()
   .then((objetos)=>{                       
      objetos.forEach(objeto => {
         console.log(objeto.nome)
      });
      res.render('objetoLista',{objetos: objetos})
   })
   .catch((err)=>{
      console.log("deu errado: "+err) 
   })
})
  
router.get('/edit/:id', (req,res)=>{
   var id = req.params.id;
   console.log(id)
   if(id && !isNaN(id)){
      Objeto.findByPk(id)
      .then((objeto)=>{
         res.render('objetoForm',{objeto: objeto})
      }).catch((err)=>{
         console.log("Deu B.O. "+err)
         
      }).finally(()=>{
         res.redirect('/retrieve')
      })
   } else {
      console.log('Id inválido: '+id)
      res.redirect('/')
   }
})

//Update  <==================================

router.post('/update',(req, res)=>{
   var data = req.body.data_aquisicao
   var valor = req.body.valor
   if(data=="") data = null
   if(valor=="") valor = null
   Objeto.update(                       //<-- usando o CRUD
      {  
         nome:             req.body.nome,
         descricao:        req.body.descricao,
         tipo:             req.body.tipo,
         data_aquisicao:   data,
         valor:            valor,
         observacoes:      req.body.observacoes
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
      res.redirect('/retrieve')
   })
})

// Delete  <==================================

router.get('/delete/:id', (req,res)=>{
   var id = req.params.id;
   console.log(id)
   if(id && !isNaN(id)){
      Objeto.destroy({
         where: {id: id}
      }).then(()=>{
         console.log('Deletado')
      }).catch((err)=>{
         console.log("Deu B.O. "+err)
      }).finally(()=>{
         res.redirect('objeto/retrieve')
      })
   } else {
         console.log('Id inválido: '+id)
         res.redirect('/')
      }
})

module.exports = router