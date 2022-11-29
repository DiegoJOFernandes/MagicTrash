const Sequelize = require('sequelize')
// require('dotenv').config('../.env')

const connection = new Sequelize(process.env.DATABASE, process.env.USER_DB, process.env.PASS_DB,{
  host: process.env.HOST_DB,
  dialect: 'mysql'
})

module.exports = connection