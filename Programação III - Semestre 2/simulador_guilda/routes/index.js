var express = require('express');
var router = express.Router();

let AventureiroDAO = require('../modelo/AventureiroDAO');
let Aventureiro = require("../classes/Aventureiro");

let meuAveDAO = new AventureiroDAO();
//cria alguns objetos
let ave1 = new Aventureiro(1, "Aribaldo", "Pipoqueiro");
let ave2 = new Aventureiro(2, "Firmina", "Quentão Maker");
meuAveDAO.add(ave1);
meuAveDAO.add(ave2);

router.get('/digaOla', function(req, res){
  let resposta = {};
  resposta.msg = "Oi, Cliente!";
  resposta.horaDaResposta = Date.now().toLocaleString('pt-br');
  res.json(resposta); //deu td ok e aqui estão os dados em json
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ESTE É O NOSSO SITE' });
});

router.get('/pagina', function(req,res){
  let html = '<HTML><HEADER>SITE DE EXEMPLO</HEADER></HTML>';
  res.contentType = 'text/html'; //padrão MIME/TYPE
   res.send(html);
});

/*Rota que retorna todos os aventureiros, em json */
router.get('/aventureiro', function(req,res){
  const aventureiros = meuAveDAO.getAll();
  res.json(aventureiros);

});



module.exports = router;
