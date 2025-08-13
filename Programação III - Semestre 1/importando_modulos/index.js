// como acessar um "módulo" (em outro arquivo)
let calc = require('./calc');

// importando uma classe
let Carro = require('./carro');

let objetoCarro = new Carro ("fusca", "clássico");
objetoCarro.andar();

let outroCarro = new Carro ("camionete", "4x4");
outroCarro.andar();

let sub = calc.sub(10, 5);
console.log(calc.sub);

// começou aqui
console.log("Hello World!");

let x = 5;
let y = 10;

console.log("Soma:", x + y);
console.warn("Isso é um aviso");
console.error("Isso é um erro!");

function soma(a, b){
    const result = a + b;
    return result;
}

let meuResultado = soma(1, 2);
console.log(meuResultado);