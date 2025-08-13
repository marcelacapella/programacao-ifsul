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

formTime.addEventListener("subimit", function(event){
    event.preventDefault();

    // 2. Seleciona o formulário e adiciona o evento de "submit"
    const formTime = document.getElementById("form-time");

    // 3. Captura de dados usando FormData
    const dadosForm = new FormData(formTime);
    const nomeTime = dadosForm.get("nomeTime");
    const j1 = dadosForm.get("jogador1");
    const j2 = dadosForm.get("jogador2");
    const j3 = dadosForm.get("jogador3");
    const j4 = dadosForm.get("jogador4");
    const j5 = dadosForm.get("jogador5");

    // 4. Cria um objeto TimeFutsal
    const novoTime = new TimeFutsal(nomeTime, j1. j2, j3, j4, j5);

    //5. Puxa lista de times do LocalStorage
    const listaTimesJSON = localStorage.getItem("timesInscritos");
    let listaTimes = [];

    if(listaTimesJSON){
        listaTimes = JSON.parse(listaTimesJSON);
    }

    // 6. Adiciona novoTime à lista e salva de volta no LocalStorage
    listaTimes.push(nomeTime);
    localStorage.setItem("timesInscritos", JSON.stringify(listaTimes));

    // 7. Confirmação para o usuário
    alert("Time inscrito com sucesso: \n" + novoTime.descricao());

    //8. Limpa formulário
    formTime.reset();
    
});