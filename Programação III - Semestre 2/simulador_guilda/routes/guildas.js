var express = require("express");
var router = express.Router();

let GuildaDAO = require("../modelo/GuildaDAO");
let Guilda = require("../classes/Guilda");

let AventureiroDAO = require("../modelo/AventureiroDAO");
let Aventureiro = require("../classes/Aventureiro");

// instanciando os DAOs primeiro
let meuGuildaDAO = new GuildaDAO();
let meuAveDAO = new AventureiroDAO();

// aventureiros teste
let a1 = new Aventureiro(1, "Aventureiro1", "Guerreiro", 5, []);
let a2 = new Aventureiro(2, "Aventureiro2", "Arqueira", 3, []);

// adiciona ao DAO (para poder buscar por ID depois)
meuAveDAO.add(a1);
meuAveDAO.add(a2);

// objetos de exemplo
let g1 = new Guilda(1, "Guilda 1", [a1]);
let g2 = new Guilda(2, "Guilda 2", [a2]);

meuGuildaDAO.add(g1);
meuGuildaDAO.add(g2);

/*
 * GET /guildas
 * Retorna todas as guildas
*/
router.get("/guildas", function (req, res) {
  try {
    const guildas = meuGuildaDAO.getAll();
    res.status(200).json(guildas);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao buscar guildas. " + erro });
  }
});

/*
 * POST /guildas
 * Cria uma nova guilda
*/
router.post("/guildas", function (req, res) {
  try {
    let dados = req.body;

    if (!dados.id || !dados.nome) {
      return res.status(400).json({ mensagem: "Os campos id e nome são obrigatórios!" });
    }

    let guilda = new Guilda(dados.id, dados.nome, []);
    meuGuildaDAO.add(guilda);

    res.status(201).json({ mensagem: "Guilda criada com sucesso!", guilda });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao criar guilda. " + error });
  }
});

/*
 * GET /guildas/:id
 * Retorna uma guilda pelo ID
*/
router.get("/guildas/:id", function (req, res) {
  try {
    let id = req.params.id;
    let guilda = meuGuildaDAO.get(id);

    if (!guilda) {
      return res.status(404).json({ mensagem: "Guilda não encontrada." });
    }

    res.status(200).json(guilda);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar guilda. " + error });
  }
});

/*
 * PUT /guildas/:id
 * Atualiza apenas o nome da guilda
*/
router.put("/guildas/:id", function (req, res) {
  try {
    let id = req.params.id;
    let dados = req.body;

    if (!dados.nome) {
      return res.status(400).json({ mensagem: "O campo nome é obrigatório." });
    }

    let guildaAtualizada = meuGuildaDAO.update(id, dados);

    if (!guildaAtualizada) {
      return res.status(404).json({ mensagem: "Guilda não encontrada." });
    }

    res.status(200).json({
      mensagem: "Guilda atualizada com sucesso!",
      guilda: guildaAtualizada,
    });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao atualizar guilda. " + error });
  }
});

/*
 * DELETE /guildas/:id
 * Remove uma guilda
*/
router.delete("/guildas/:id", function (req, res) {
  try {
    let id = req.params.id;

    if (!meuGuildaDAO._procuraGuilda(id)) {
      return res.status(404).json({ mensagem: "Guilda não encontrada." });
    }

    let retorno = meuGuildaDAO.delete(id);

    if (!retorno) {
      return res.status(500).json({ mensagem: "Erro ao realizar exclusão." });
    }

    res.status(200).json({ mensagem: "Guilda removida com sucesso!", retorno });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao processar delete. " + erro });
  }
});

/*
 * POST /guildas/:id/membros
 * Recruta um aventureiro existente para uma guilda existente
 * Body esperado: { "aventureiroId": 2 }
*/
router.post("/guildas/:id/membros", function (req, res) {
  try {
    let guildaId = req.params.id;
    let aventureiroId = req.body.aventureiroId;

    if (!aventureiroId) {
      return res.status(400).json({ mensagem: "É necessário informar o aventureiroId." });
    }

    let guilda = meuGuildaDAO.get(guildaId);
    let aventureiro = meuAveDAO.get(aventureiroId);

    if (!guilda) {
      return res.status(404).json({ mensagem: "Guilda não encontrada." });
    }

    if (!aventureiro) {
      return res.status(404).json({ mensagem: "Aventureiro não encontrado." });
    }

    let sucesso = guilda.recrutarAventureiro(aventureiro);

    if (!sucesso) {
      return res.status(400).json({ mensagem: "Aventureiro já faz parte da guilda." });
    }

    res.status(200).json({
      mensagem: `Aventureiro ${aventureiro.nome} recrutado com sucesso para a guilda ${guilda.nome}!`,
      guilda,
    });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao processar recrutamento. " + erro });
  }
});

module.exports = router;