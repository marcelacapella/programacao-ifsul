class TimeFutsal{
    constructor(nomeTime, jogador1, jogador2, jogador3, jogador4, jogador5){
        this.nomeTime = nomeTime;
        this.jogadores = [jogador1, jogador2, jogador3, jogador4, jogador5];
        this.dataInscricao = new Date().toLocaleDateString("pt-BR");
    }

    descricao(){
        return `${this.nomeTime}:
        ${this.jogadores.joing(", ")} (${this.dataInscricao})`;
    }
}

const formTime = document.getElementById("form-time");