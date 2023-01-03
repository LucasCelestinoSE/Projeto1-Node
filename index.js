const express = require("express"); // importando express
const app = express(); // Iniciando o express
const bodyParser = require("body-parser")
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')
// DataBase

connection.authenticate().then(() => {
    console.log('conexão feita com o banco de dados')
}).catch((msgErro) => {
    console.log(msgErro)
})

//configuração de bodyparser
app.use(bodyParser.urlencoded({extended: false})) // para usar o bdypasser
app.use(bodyParser.json())
// Estou dizendo para o express usar o EJS como view Engine.

app.set('view engine','ejs');
app.use(express.static('public'))
// ordenando
app.get('/',(req,res) => {
    Pergunta.findAll({raw:true, order:[
        ['id', 'DESC'] // ASC FOR CRESCENTE
    ]}).then(perguntas => {res.render("index",{
        perguntas: perguntas
    })})
    
});
// Busca condicional
app.post('/save', (req,res)=> {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({ // cria a tabela no banco de dados
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
})
//busca bando de dados
app.get('/pergunta/:id', (req,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined) { // pergunta achada
            Resposta.findAll({
                where: {perguntaId: id},
                order: [['id', 'DESC']],
                raw: true
            }).then(respostas  => {
                res.render('pergunta',{
                    pergunta:pergunta,
                    respostas: respostas
                });
            })

        }else{
            res.redirect("/")
        }
    })
})
app.get('/perguntar', (req,res)=>{
    res.render('perguntar')
})

app.post('/responder', (req,res)=>{
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect('/pergunta/' + perguntaId);
    })
})

app.listen(4000,(error) => {
    if(error) {
        console.log("Ocorreu um error!")
    }else{
        console.log("Server inciado com sucesso")
    }
})
