console.log("eu sou uma calculadora e estou iniciando...");

function soma(a, b){
    if(ehNumero(a) && ehNumero(b)){
        return a + b;
    }else{
        return "erro";
    }
}

function sub(a, b){
    if(ehNumero(a) && ehNumero(b)){
        return a - b;
    }else{
        return "erro";
    }
}

function ehNumero(a){
    if(Number.isNaN(a)){
        return false;
    }else{
        return true;
    }
}

console.log("eu sou uma calculadora e estou encerrando...");

//exportação dos objetos que quero deixar visível ou acessível em outros módulos
module.exports = {sub, soma}; 