// Seleciona o campo de exibição do resultado
const resultado = document.getElementById('resultado');

// Seleciona todos os botões numéricos
const botoesNumero = document.querySelectorAll('.numero');

// Seleciona todos os botões de operadores
const botoesOperador = document.querySelectorAll('.operador');

// Seleciona o botão de limpar (C)
const btnLimpar = document.querySelector('.limpar');

// Seleciona o botão de igual (=)
const btnIgual = document.querySelector('.igual');

// Seleciona a tabela do histórico
const historico = document.querySelector('#historico tbody');

// Variável que armazena a expressão atual da calculadora
let expressao = '';

// Adiciona evento de clique aos botões numéricos
botoesNumero.forEach(botao => {
    botao.addEventListener('click', () => {
        // Adiciona o número clicado à expressão e atualiza o display
        expressao += botao.textContent;
        resultado.value = expressao;
    });
});

// Adiciona evento de clique aos botões de operadores
botoesOperador.forEach(botao => {
    botao.addEventListener('click', () => {
        const operador = botao.textContent;
        if (operador === '!') { // Se o operador for fatorial (!)
            try {
                const numero = parseInt(expressao);
                if (isNaN(numero) || numero < 0) throw 'Número inválido';
                const fat = fatorial(numero);
                adicionarHistorico(`${numero}!`, fat);
                resultado.value = fat;
                expressao = fat.toString(); // Atualiza a expressão com o resultado
            } catch (e) {
                resultado.value = 'Erro';
                expressao = '';
            }

        // Se o operador for "primo"
        } else { // Para os demais operadores matemáticos
            expressao += operador;
            resultado.value = expressao;
        }
    });
});

// Evento do botão "C" (limpar)
btnLimpar.addEventListener('click', () => {
    expressao = '';
    resultado.value = '';
});

// Evento do botão "=" (igual), que avalia a expressão
btnIgual.addEventListener('click', () => {
    try { // Substitui ^ por ** (potenciação) e avalia a expressão
        const expressaoConvertida = expressao.replace(/\^/g, '**');
        const resultadoCalc = eval(expressaoConvertida);
        adicionarHistorico(expressao, resultadoCalc);
        resultado.value = resultadoCalc;
        expressao = resultadoCalc.toString(); // Atualiza com o resultado
    } catch (e) {
        resultado.value = 'Erro';
        expressao = '';
    }
});

// Função recursiva para calcular fatorial de um número
function fatorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * fatorial(n - 1);
}

// Função para verificar se um número é primo
function isPrimo(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// Adiciona uma linha na tabela de histórico com a operação e resultado
function adicionarHistorico(operacao, resultado) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `<td>${operacao}</td><td>${resultado}</td>`;
    historico.prepend(novaLinha); // Insere no topo da tabela
}

// Seleciona o botão "primo"
const btnPrimo = document.querySelector('.operador_primo');

// Adiciona evento de clique no botão "primo"
btnPrimo.addEventListener('click', () => {
    try {
        const numero = parseInt(expressao);
        if (isNaN(numero) || numero < 0) throw 'Número inválido';

        // Verifica se o número é primo
        const ehPrimo = isPrimo(numero);

        // Adiciona a operação e o resultado no histórico
        adicionarHistorico(`${numero} é primo?`, ehPrimo ? 'Sim' : 'Não');

        // Atualiza o campo de resultado com a resposta
        resultado.value = ehPrimo ? 'Sim' : 'Não';
        expressao = ''; // Limpa a expressão para futuras entradas
    } catch (e) {
        resultado.value = 'Erro';
        expressao = '';
    }
});

// Função para verificar se um número é primo
function isPrimo(n) {
    for (let i = 2; i * i <= n; i++) {
        let q = Math.floor(n / i);
        if (n % i === 0 || n % q == 0){
            return false;
        }      
    }
    return true;
}

// Função para adicionar uma operação e seu resultado ao histórico
function adicionarHistorico(operacao, resultado) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `<td>${operacao}</td><td>${resultado}</td>`;
    historico.prepend(novaLinha); // Adiciona no topo da tabela
}

// Seleciona o botão "Limpar Histórico"
const btnLimparHistorico = document.querySelector('.limpar_historico');

// Evento do botão "Limpar Histórico"
btnLimparHistorico.addEventListener('click', () => {
    historico.innerHTML = ''; // Limpa todas as linhas do histórico
});