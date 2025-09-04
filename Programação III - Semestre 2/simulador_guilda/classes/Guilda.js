class Guilda {
    constructor(id, nome, membros = []) {
        this.id = id;
        this.nome = nome;
        this.membros = membros; // agora pode vir preenchido
    }

    recrutarAventureiro(aventureiro) {
        if (aventureiro instanceof Aventureiro) {
            // verificar duplicado
            if (this.membros.find(m => m.nome === aventureiro.nome)) {
                console.warn(`Aventureiro ${aventureiro.nome} já faz parte da Guilda`);
                return false;
            }
            this.membros.push(aventureiro);
            aventureiro.addGuilda(this);
            return true;
        } else {
            console.warn("Objeto não é um Aventureiro para ser inserido à Guilda");
            return false;
        }
    }

    apresentar() {
        let strApresenta = `Somos a Guilda ${this.nome}: \n`;
        // ordenar por nome
        this.membros
            .sort((a, b) => a.nome.localeCompare(b.nome))
            .forEach(e => {
                strApresenta += e.apresentar() + '\n';
            });
        return strApresenta;
    }
}

module.exports = Guilda;