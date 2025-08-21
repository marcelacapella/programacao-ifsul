var express = require("express");
var router = express.Router();

let GuildaDAO = require("../modelo/GuildaDAO");
let Guilda = require("../classes/Guilda");

let AventureiroDAO = require("../modelo/AventureiroDAO");

let meuGuildaDAO = new GuildaDAO();
let meuAveDAO = new AventureiroDAO();

// cria alguns objetos de exemplo
let g1 = new Guilda(1, "Guilda 1", []);
let g2 = new Guilda(2, "Guilda 2", []);
meuGuildaDAO.add(g1);
meuGuildaDAO.add(g2);

/*
 * GET /guildas
 * Retorna todas as guildas
*/
router.get("/guildas", function (req, res) {
  const guildas = meuGuildaDAO.getAll();
  res.json(guildas);
});

/*
 * POST /guildas
 * Cria uma nova guilda
*/
router.post("/guildas", function (req, res) {
  try {
    let dados = req.body;

    if (!dados.id || !dados.nome) {
      return res.status(400).json({ mensagem: "Os campos não estão completos!" });
    }

    let guilda = new Guilda(dados.id, dados.nome, []);
    meuGuildaDAO.add(guilda);
    res.status(201).json({ mensagem: "Guilda criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao criar guilda." });
  }
});

/*
 * GET /guildas/:id
 * Retorna uma guilda pelo ID
*/
router.get("/guildas/:id", function (req, res) {
  try {
    let id = req.params.id;
    let retorno = meuGuildaDAO.get(id);

    if (retorno != null) {
      res.status(200).json(retorno);
    } else {
      res.status(404).json({ mensagem: "Guilda não encontrada." });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar guilda." });
  }
});

/*
 * PUT /guildas/:id
 * Atualiza apenas o nome da guilda
*/
router.put("/guildas/:id", function (req, res) {
  try {
    let { id } = req.params;
    let dados = req.body;

    let guildaAtualizada = meuGuildaDAO.update(id, dados);

    if (guildaAtualizada == null) {
      res.status(404).json({ mensagem: "Guilda não encontrada." });
    } else {
      res.json({
        mensagem: "Guilda atualizada com sucesso!",
        guilda: guildaAtualizada,
      });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao atualizar guilda." });
  }
});

/*
 * DELETE /guildas/:id
 * Remove uma guilda
*/
router.delete("/guildas/:id", function (req, res) {
  try {
    let id = req.params.id;
    let queries = req.query.varQuery;
    console.log(`Esta é a query que veio na requisição: ${queries} `);

    if (meuGuildaDAO._procuraGuilda(id)) {
      let retorno = meuGuildaDAO.delete(id);
      if (retorno != null) {
        res.status(200).json({ mensagem: "Guilda removida com sucesso!", retorno });
      } else {
        res.status(500).json({ mensagem: "Erro ao realizar exclusão." });
      }
    } else {
      res.status(404).json({ mensagem: "Guilda não encontrada." });
    }
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