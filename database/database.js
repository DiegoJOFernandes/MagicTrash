const Sequelize = require('sequelize')

const connection = new Sequelize('heroku_3468ecc22ef6778','bc0a454d59f96f','9a6735db',{
  host: 'us-cdbr-east-06.cleardb.net',
  dialect: 'mysql'
})

module.exports = connection