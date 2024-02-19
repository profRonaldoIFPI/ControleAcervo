const Sequelize = require('sequelize')
const connection = require('../database/database')
const Pessoa = require('./Pessoa')
const Objeto = require('./Objeto')

//definição do modelo
const Emprestimo = connection.define('emprestimo',{
   id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
   },
   data_devolucao:{
      type: Sequelize.DATEONLY,
      allowNull: false
   },
   devolvido: {
      type: Sequelize.BOOLEAN,
      allowNull: false
   }
})

/*
   A.belongsToMany(B, { through: 'C' })
   associação significa que existe um relacionamento
   muitos-para-muitos entre A e B, usando 
   tabela C como tabela de junção
 */
Objeto.belongsToMany(Pessoa,{through: Emprestimo})
Pessoa.belongsToMany(Objeto,{through: Emprestimo})
/*
   isso não permite consultar nada em emprestimo, mas
   adicionando mais relações podemos contornar o problema
 */
Pessoa.hasMany(Emprestimo)
Emprestimo.belongsTo(Pessoa)
Objeto.hasMany(Emprestimo)
Emprestimo.belongsTo(Objeto)


module.exports = Emprestimo