class Carro{
    constructor(nome, modelo){
        this.nome = nome;
        this.modelo = modelo;
        this.nomPortas = 2;
    }

    andar(){
        console.log(`O carro ${this.nome} está andando.`);
    }
}

module.exports = Carro;