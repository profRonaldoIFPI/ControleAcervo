const express = require('express')
const app = express()
const connection = require('./database/database')
const pessoaController = require('./controllers/pessoaController')
const objetoController = require('./controllers/objetoController')
const emprestimoController = require('./controllers/emprestimoController')

app.set('view engine','ejs')

app.use(express.urlencoded({extended:true})) //para usar post
app.use(express.json()) //para usar json
app.use(express.static('public')) //diretorio do conteúdo estático (css, js)

app.use('/pessoa',pessoaController)
app.use('/objeto', objetoController)
app.use('/emprestimo', emprestimoController)

connection.authenticate()
   .then(()=>{
      connection.sync({force: false})  //(re)cria as tabelas (models)[true = drop & create]
      console.log('Conexão com SGDB:\t[ok]')
   })
   .catch((err)=>{
      console.log('Conexão com SGDB:\t[falhou]\n'+err)
   })

app.get('/',(req, res)=>{ 
   res.render('index')
})

app.listen(8080,()=>{
   console.log('Servidor on-line!')
})