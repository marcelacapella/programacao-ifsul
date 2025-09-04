// Define a URL base do backend. Todas as requisições fetch vão se referir a este endereço.
var baseUrl = "http://localhost:3000";


// Função assíncrona para obter a lista de aventureiros do servidor
async function getAventureiros(event) {
  try {
    let path = "/aventureiro"; // caminho relativo da rota REST no backend
    let response =  await fetch(baseUrl + path); // faz a requisição GET
    let aventureiros = await response.json(); // converte a resposta JSON em objeto JS
    console.log(JSON.stringify(aventureiros)); // loga no console para depuração
    renderizaAventureiros(aventureiros); // chama função para exibir os dados no HTML
  } catch (error) {
    console.log(`Erro getAventureiros: ${error}`); // captura e mostra erros de rede ou JSON
  }
}


/**
 * Renderiza todos os aventureiros no HTML
 * @param aventureiros Array de objetos JSON retornado do backend
 */
function renderizaAventureiros(aventureiros){
    // Seleciona a lista UL no HTML onde os cards serão inseridos
    let lista = document.querySelector('#lista-aventureiros');

    // Limpa a lista antes de renderizar novamente, evitando duplicação
    lista.innerHTML = ""; 

    // Para cada aventureiro do array
    aventureiros.forEach(a => {
        let card = criaCardAventueiro(a); // cria o HTML do card do aventureiro
        let li = document.createElement("li"); // cria um elemento <li> para conter o card
        li.id = "cardAventureiro" + a.id; // define um ID único baseado no ID do aventureiro
        li.innerHTML = card; // insere o conteúdo do card dentro do <li>
        lista.appendChild(li); // adiciona o <li> na lista UL do HTML
        console.log(lista); // loga a lista atualizada para depuração
    });
}


// Cria o HTML do card de um aventureiro individual
function criaCardAventueiro(aventueiro){
    /** Exemplo de objeto de entrada: 
     * {"id":1,"nome":"Aribaldo","classe":"Pipoqueiro","nivel":1}
     */
    let card = `<div class=card-aventureiro> 
     <p>${aventueiro.id} - ${aventueiro.nome} Classe: ${aventueiro.classe} </p>
     </div> `; 

     return card; // retorna a string HTML do card
}

// Aguarda o carregamento completo do DOM antes de executar getAventureiros
// Garante que os elementos HTML já existam antes de manipulá-los
window.addEventListener("DOMContentLoaded", getAventureiros);