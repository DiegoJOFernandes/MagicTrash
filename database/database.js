const Sequelize = require('sequelize')

const connection = new Sequelize('heroku_e62c344498550cc','b4eb4b06af5623','3c1985d8',{
  host: 'us-cdbr-east-06.cleardb.net',
  dialect: 'mysql'
})

module.exports = connection