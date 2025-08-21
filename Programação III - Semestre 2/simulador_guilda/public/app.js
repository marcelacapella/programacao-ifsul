var baseUrl = 'http://localhost:3000'

try{
    //capturar botão
    let btnGetAventureiro = document.querySelector('#btn-getAventureiro');

    // adicionar ent handler
    btnGetAventureiro.addEventListener('click', getAventureiro);
}catch(error){
    console.log('Erro na criação do eventos:' + error);
}

// await fetch -> espera a resposta (síncrono)

async function getAventureiro(event){
    try{
        let path = '/aventureiro';
        let response = await fetch(baseUrl + path);
        let aventureiros = await response.json();
        console.log(JSON.stringify(aventureiros));

    }catch(error){
        console.log(`Erro getAventureiros: ${error}`);
    }  
}

/*renderiza no html todos os aventureiros obtidos
 * @param aventureiros JSON de aventureiros
*/
function renderizaAventureiros(aventureiros){
    let sectinAventureiro = document.querySelector('#section-aventureiro');
    aventureiros.array.forEach(a => {
        let card = criaCardAventureiro(a);
        let divCard = document.createElement('div');
        divCard.id = "cardAventureiro" + a.id;
        divCard.innerHTML = card;
        sectinAventureiro.appendChild(divCard);
    });
}

function criaCardAventureiro(aventureiro){
    let card = `<div class="card-aventureiro"> <p>${aventureiro.id} - ${aventureiro.nome} - ${aventureiro.classe} - ${aventureiro.nivel} - ${aventureiro.guildas}</p> </div>`;

}