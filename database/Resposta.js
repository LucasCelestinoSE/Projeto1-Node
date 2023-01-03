const Sequelize = require('sequelize')
const connection = require('./database')

const Resposta = connection.define('resposta',{
    corpo:{
        type: Sequelize.TEXT,
        allowNull:false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
// Passa o model para meu banco de dados para que uma tabela seja criada
Resposta.sync({force: false}).then(() => {})
module.exports = Resposta;