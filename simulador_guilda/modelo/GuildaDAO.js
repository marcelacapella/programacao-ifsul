const Guilda = require("../classes/Guilda");

class GuildaDAO {
  constructor() {
    this.guildasBD = [];
  }

  get(id) {
    return this._procuraGuilda(id);
  }

  getAll() {
    return this.guildasBD;
  }

  add(guilda) {
    if (guilda instanceof Guilda) {
      const g = this._procuraGuilda(guilda.id);
      if (g == null) {
        this.guildasBD.push(guilda);
        return guilda;
      }
    }
    return null;
  }

  update(id, novosDados) {
    let dadoAtual = this._procuraGuilda(id);
    if (dadoAtual == null) {
      return null;
    }

    if (novosDados.nome != undefined && novosDados.nome != null) {
      dadoAtual.nome = novosDados.nome;
    }
    if (novosDados.localizacao != undefined && novosDados.localizacao != null) {
      dadoAtual.localizacao = novosDados.localizacao;
    }
    if (novosDados.membros != undefined && Array.isArray(novosDados.membros)) {
      dadoAtual.membros = novosDados.membros;
    }

    return dadoAtual;
  }

  delete(id) {
    let g = this._procuraGuilda(id);
    if (g == null) {
      return null;
    }
    const i = this._findIndex(id);
    this.guildasBD.splice(i, 1);
    return g;
  }

  // Métodos "privados"
  _procuraGuilda(id) {
    for (let i = 0; i < this.guildasBD.length; i++) {
      if (this.guildasBD[i].id == id) {
        return this.guildasBD[i];
      }
    }
    return null;
  }

  _findIndex(id) {
    for (let i = 0; i < this.guildasBD.length; i++) {
      if (this.guildasBD[i].id == id) {
        return i;
      }
    }
  }
}

module.exports = GuildaDAO;
