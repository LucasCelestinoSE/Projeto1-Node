const Sequelize = require('sequelize')
const connection = require('./database')

// criando model

const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull:false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull:false
    }
})
// Passa o model para meu banco de dados para que uma tabela seja criada
Pergunta.sync({force: false}).then(() => {})
module.exports = Pergunta;