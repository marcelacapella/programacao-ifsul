var baseUrl = "http://localhost:3000";

async function getAventureiro(id){
    try{
        let url = '/aventureiro' + id;
        if(id == undefined){
            url = '/aventureiro';
        }
        const res = await fetch(baseUrl + url);
        const dados = await res.json();

        return dados;
    }catch(err){
        console.error("Erro no getAventureiro!");
    }
}

async function postAventureiro(a){
    try{
        let options = {
            method: "POST",
            headers: {"Content-Type": "aplication/json"},
            body:JSON.stringify(a)
        };
    
        const response = await fetch(baseUrl+"/aventureiro/", options);
        if(response.ok){
            const dados = response.json();
            return dados;
        }else{
            return null;
        }
    }catch(err){
        console.error("Erro no postAventureiro!");
    }
    
}

// Copiar outras funções
/*async function putAventureiro(id, dados){
    try{

    }catch(err){
        console.error(err);
    }
}*/

let a = {
    id: 3,
    nome: "teste",
    classe: "testeClasse"
}

let resultado = await postAventureiro(a);
console.log(`Resultado: ${JSON.stringify(resultado)}`);