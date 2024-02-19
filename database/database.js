const Sequelize = require('sequelize')
const connection = new Sequelize('controle','root','root',{
   host: 'localhost',
   dialect: 'mysql'
})
module.exports = connection