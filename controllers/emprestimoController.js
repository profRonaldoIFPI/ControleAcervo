const express =      require('express')
const router =       express.Router()
const Objeto =       require('../models/Objeto')
const Pessoa =       require('../models/Pessoa')
const Emprestimo =   require('../models/Emprestimo')
const Sequelize =    require('sequelize')
const { where } = require('sequelize')
const Op =           Sequelize.Op

router.post('/buscarPessoa', async (req,res)=>{
   try{
      let pessoas = null
      if(req.body.nomePessoa){
         pessoas = await Pessoa.findAll({ 
            where: { nome: {[Op.like]: '%'+req.body.nomePessoa+'%'} }
          })
      } else {   
         pessoas = await Pessoa.findAll()
      }
      let objeto = await Objeto.findByPk(req.body.id)
      if (objeto && pessoas){ 
            res.render('emprestimo',{
            pessoas: pessoas,
            objeto:  objeto
         })
      }else{
         throw "Algo falhou!"
      }
   } catch(err){
      console.log("B.O.: "+err)
   }
})

//Create <==================================

 router.post('/loan', async (req, res)=>{           //emprestar
   var pessoaId =    req.body.pessoaId
   var objetoId =    req.body.objetoId
   var devolucao =   req.body.devolucao
   try{
      var pessoa = await Pessoa.findByPk(pessoaId)
      var objeto = await Objeto.findByPk(objetoId)
      if (objeto && pessoa){ 
         await objeto.addPessoa(pessoa.id,{through:
            {
               data_devolucao: devolucao,
               devolvido: false
            } 
         })
         await Objeto.update({  
               status: false
            },
            {
               where:{
                  id: objeto.id
               }
            })
         res.redirect('/')
      }else{
         throw "Algo falhou!"
      }
   }catch(err){
      console.log(err)
   }
})

//Retreave  <==================================
 
router.get('/loanReport',async (req,res)=>{
   try{
      let objetos = await Objeto.findAll( //obter lista dos objetos 'emprestados'
         {
            where: {
               status: false,   //false = emprestado (nao disponivel)
               '$emprestimos.devolvido$': false //filtra emprestimos ativos
            }, 
            include: [{
               model: Emprestimo,
               as: 'emprestimos', //alias é igual a associação
               include: Pessoa
            }]
         }
      )
      res.render('emprestadosLista',{objetos: objetos})
   }catch(err){
      console.log("-\n!!!!! deu errado: "+err+" <<<<<<<<<<<!!\n-") 
   }
})

//Update  <==================================

router.post('/giveBack/', async (req, res)=>{ //devolver
   try{
      let objetoId = req.body.objetoId
      let emprestimoId = req.body.emprestimoId
      if (emprestimoId==undefined){
         let emprestimo = await Emprestimo.findOne({
            where: {
               objetoId: objetoId,
               devolvido: false
            }
         })  
         emprestimoId = emprestimo.id
      }
      await Objeto.update({
                  status: true
               },{
                  where: {id: objetoId}
               })
      await Emprestimo.update({
                  devolvido: true
               },{
                  where: {id: emprestimoId}
            })
      
      res.redirect('/')
   }catch(err){
      console.log("-\n!!!!! deu errado: "+err+" <<<<<<<<<<<!!\n-") 
   }
})

module.exports = router