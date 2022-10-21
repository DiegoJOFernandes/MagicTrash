const Sequelize = require('sequelize')
const connection = require("../database/database")

const User = connection.define('users', {
  email:{
    type: Sequelize.STRING,
    allowNull: false
  }, 
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstname:{
    type: Sequelize.STRING,
    allowNull: false
  },
  secondname:{
    type: Sequelize.STRING,
    allowNull: false
  },
  datanasc:{
    type: Sequelize.DATE,
    allowNull: false
  }
})

User.sync({force: false})

module.exports = User;