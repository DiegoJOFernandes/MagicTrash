const Sequelize = require('sequelize')
const connection = require("./database")

const cadastro = connection.define('cadastro',{
  user:{
    type: Sequelize.STRING,
    allow: false
  },
  pass:{
    type: Sequelize.STRING,
    allow: false
  },
  nome:{
    type: Sequelize.STRING,
    allow: false
  },
  dataNasc:{
    type: Sequelize.STRING,
    allow: false
  },
  rg:{
    type: Sequelize.STRING,
    allow: false
  },
  endereco:{
    type: Sequelize.STRING,
    allow: false
  },
  email:{
    type: Sequelize.STRING,
    allow: false
  }
})

cadastro.sync({force: false}).then(()=>{
  console.log('Tabela criada')
}) // vai sincronizar o meu modelo com op banco de dados e se no meu nando cde dados não houver essas tabelas então o sequilçlize vai criar elas.
// o parm false caso a tabela já exista não vai forçar uma nova criação

module.exports = cadastro