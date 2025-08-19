var express = require("express");
var router = express.Router();

let GuildaDAO = require("../modelo/GuildaDAO");
let Guilda = require("../classes/Guilda");

let meuGuildaDAO = new GuildaDAO();

// cria alguns objetos de exemplo
let g1 = new Guilda(1, "Guilda 1", []);
let g2 = new Guilda(2, "Guilda 2", []);
meuGuildaDAO.add(g1);
meuGuildaDAO.add(g2);

/**
 * GET /guildas
 * Retorna todas as guildas
 */
router.get("/guildas", function (req, res) {
  try {
    const guildas = meuGuildaDAO.getAll();
    res.json(guildas);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar guildas." });
  }
});

/**
 * POST /guildas
 * Cria uma nova guilda
 * Exemplo de body: { "id": 3, "nome": "Nova Guilda", "localizacao": "Vale Verde" }
 */
router.post("/guildas", function (req, res) {
  try {
    let dados = req.body;

    if (!dados.id || !dados.nome) {
      return res.status(400).json({ mensagem: "Campos obrigatórios não preenchidos." });
    }

    let guilda = new Guilda(dados.id, dados.nome, dados.localizacao || "Local desconhecido", []);
    let retorno = meuGuildaDAO.add(guilda);

    if (retorno == null) {
      res.status(400).json({ mensagem: "Já existe uma guilda com este ID." });
    } else {
      res.status(201).json({ mensagem: "Guilda criada com sucesso!", guilda });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao criar guilda." });
  }
});

/**
 * GET /guildas/:id
 * Retorna uma guilda pelo ID
 */
router.get("/guildas/:id", function (req, res) {
  try {
    let id = req.params.id;
    let guilda = meuGuildaDAO.get(id);

    if (guilda) {
      res.json(guilda);
    } else {
      res.status(404).json({ mensagem: "Guilda não encontrada." });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar guilda." });
  }
});

/**
 * PUT /guildas/:id
 * Atualiza apenas o nome da guilda
 * Exemplo body: { "nome": "Novo Nome da Guilda" }
 */
router.put("/guildas/:id", function (req, res) {
  try {
    let id = req.params.id;
    let novosDados = req.body;

    let guildaAtualizada = meuGuildaDAO.update(id, novosDados);

    if (guildaAtualizada == null) {
      res.status(404).json({ mensagem: "Guilda não encontrada." });
    } else {
      res.json({ mensagem: "Guilda atualizada com sucesso!", guilda: guildaAtualizada });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao atualizar guilda." });
  }
});

/**
 * DELETE /guildas/:id
 * Remove uma guilda
 */
router.delete("/guildas/:id", function (req, res) {
  try {
    let id = req.params.id;
    let retorno = meuGuildaDAO.delete(id);

    if (retorno != null) {
      res.status(200).json({ mensagem: "Guilda removida com sucesso.", guilda: retorno });
    } else {
      res.status(404).json({ mensagem: "Guilda não encontrada." });
    }
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao excluir guilda. " + erro });
  }
});

module.exports = router;