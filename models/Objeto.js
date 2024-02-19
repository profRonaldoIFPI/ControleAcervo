const Sequelize = require('sequelize')
const connection = require('../database/database')

//definição do modelo
const Objeto = connection.define('objetos',{
   nome:{
      type: Sequelize.STRING,
      allowNull: false
   },
   descricao:{
      type: Sequelize.STRING,
      allowNull: false
   },
   tipo: Sequelize.STRING,
   data_aquisicao: Sequelize.DATEONLY,
   valor: Sequelize.DECIMAL,
   observacoes: Sequelize.STRING,
   status: {
      type: Sequelize.BOOLEAN,  //true = disponivel | false = emprestado
      allowNull: false
   }
})

module.exports = Objeto