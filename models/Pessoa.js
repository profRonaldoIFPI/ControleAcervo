const Sequelize = require('sequelize')
const connection = require('../database/database')

//definição do modelo
const Pessoa = connection.define('pessoas',{
   nome:{
      type: Sequelize.STRING,
      allowNull: false
   },
   cpf:{
      type: Sequelize.STRING(11),
      allowNull: false
   },
   telefone:{
      type: Sequelize.STRING(11),
      allowNull: false
   },
   email:{
      type: Sequelize.STRING,
      allowNull: false
   },
   endereco:{
      type: Sequelize.STRING,
      allowNull: false
   }
})
//Pessoa.sync({force: true})

module.exports = Pessoa