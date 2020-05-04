const TAM_TAB = 3;
const X = 1;
const O = 2;
const VAZIO = 0;  

let numMovimentos = 0;
let jogador = X;
let vitoria = false;
let tabuleiro = [];

let jogo = 0;
let nivel = 0;

/**
 * Inicializa o jogo
 *
 * @return void
 */
function iniciar() {
    numMovimentos = 0;
    jogador = X;
    vitoria = false;
    $('.tb-item').removeClass(['img-x', 'img-o', 'cor-vitoria', 'cor-derrota']);
    nivel = $('#nivel').val();
    inicializarTabuleiro();
}

/**
 * Inicializa o tabuleiro do jogo com vazio para todas
 * as posições.
 *
 * @return void
 */
function inicializarTabuleiro() {
    tabuleiro = [TAM_TAB];
    for (let i = 0; i < TAM_TAB; i++) {
        tabuleiro[i] = [VAZIO, VAZIO, VAZIO];
    }
}

/**
 * Lógica que possui a "IA" necessaria para retornar a proxima jogada.
 * 
 * Algoritmo baseado na "Jogada Perfeita"
 * descrita em 'http://pt.wikipedia.org/wiki/Jogo_da_velha#Jogada_perfeita'.
 * 
 * @return void
 */
function jogadaPerfeita() {
    // posiçoes disponiveis para jogar
    let jogadas = posicoesDisponiveis();
    
    /**
     *  Jogada Perfeita: primeiro passo.
     *  Ganhar: Se você tem duas peças numa linha, ponha a terceira.
     */
    let jogada = [];
    jogada = obterJogada(jogador);
    if (jogada.length) {
        cpuJogar(jogada[0], jogada[1]);
        return
    }

    /** 
     * Jogada Perfeita: segundo passo. 
     * Bloquear: Se o oponente tiver duas peças em linha, ponha a terceira para bloqueá-lo. 
     */
    jogada = obterJogada(getOponente(jogador));
    if (jogada.length) {
        cpuJogar(jogada[0], jogada[1]);
        return
    }

    /** 
     * Jogada Perfeita: terceiro passo. 
     * Triângulo: Crie uma oportunidade em que você poderá ganhar de duas maneiras.
     */
    jogadas.forEach(element => {        
        jogada = jogadaTriangulo(element[0], element[1], jogador);
        if (jogada.length) {
            cpuJogar(jogada[0], jogada[1]);
            return
        }
    });

    /** 
     * Jogada Perfeita: quarto passo.
     * Bloquear o Triângulo do oponente:
     * 
     * Opção 1: Crie 2 peças em linha para forçar o oponente a se defender, contanto que não resulte nele criando um triângulo ou vencendo.
     * Por exemplo, se 'X' tem dois cantos opostos do tabuleiro e 'O' tem o centro, 'O' não pode jogar num canto
     * (Jogar no canto nesse cenário criaria um triângulo em que 'X' vence).
    */
    if (
        (tabuleiro[0][0] === getOponente(jogador) && tabuleiro[2][2] === getOponente(jogador) && jogadas.length === 6) ||
        (tabuleiro[0][2] === getOponente(jogador) && tabuleiro[2][0] === getOponente(jogador) && jogadas.length === 6)
    ) {
        jogada = jogadaBorda();
        if (jogada.length) {
            cpuJogar(jogada[0], jogada[1]);
            return
        }
    }

    // Opção 2: Se existe uma configuração em que o oponente pode formar um triângulo, bloqueiem-no.
    jogadas.forEach(element => {      
        jogada = jogadaTriangulo(element[0], element[1], getOponente(jogador));
        if (jogada.length) {
            cpuJogar(jogada[0], jogada[1]);
            return
        }
    });

    /** 
     * Jogada Perfeita: quinto passo.
     * Centro: Jogue no centro. 
    */
    if (tabuleiro[1][1] == VAZIO) {
        cpuJogar(1, 1);
        return
    }

    /** Jogada Perfeita: sexto passo
     *  Canto vazio: jogue num canto vazio. 
     */
    jogada = jogadaCanto();
    if (jogada.length) {
        cpuJogar(jogada[0], jogada[1]);
        return
    } 

    /** 
     * Última opção: jogar nas bordas.
     */
    jogada = jogadaBorda();
    if (jogada.length) {
        cpuJogar(jogada[0], jogada[1]);
        return
    }
}

/**
 * Lógica que possui a "IA" necessaria para retornar a proxima jogada aleatória
 * 
 * @return void
 */
function jogadaAleatoria() {
    // Ganhar: Se você tem duas peças numa linha, ponha a terceira.
    jogada = obterJogada(jogador);
    if (jogada.length) {
        cpuJogar(jogada[0], jogada[1]);
        return
    }

    // Bloquear: Se o oponente tiver duas peças em linha, ponha a terceira para bloqueá-lo.
    jogada = obterJogada(getOponente(jogador));
    if (jogada.length) {
        cpuJogar(jogada[0], jogada[1]);
        return
    }

    // posiçoes disponiveis para jogada aleatoria
    let jogadas = posicoesDisponiveis();
    let k = Math.floor((Math.random() * (jogadas.length - 1)));
    jogada = [jogadas[k][0], jogadas[k][1]];
    cpuJogar(jogada[0], jogada[1]);
}

/**
 * Realiza a jogada da CPU dado as coordenadas do tabuleiro.
 * 
 * @param number x 
 * @param number y 
 * 
 * @return void
 */
function cpuJogar(x, y){
    // fazer a jogada
    tabuleiro[x][y] = jogador;

    // exibe X
    if(exibirX(x, y)){
        $("#" + x + "_" + y).addClass("img-x");
    }

    // exibe O
    if(exibirO(x, y)){
        $("#" + x + "_" + y).addClass("img-o");
    }

    // incrementa o numero de jogadas    
    numMovimentos++;
    
    // salva no banco de dados a jogada
    salvarJogada("CPU", x, y);
  
    // verifica se o jogo terminou
    vitoria = fimJogo(x, y, tabuleiro, jogador);

    // houve derrota
    if (vitoria !== false) {
        vitoria.forEach(element => {
            $("#" + element[0] + "_" + element[1]).addClass("cor-derrota");
        });
      
        toastr.error('Ops! Você perdeu o jogo.');
        atualizarJogo('derrota');
    }

    // inverte o jogador
    jogador = (jogador === X) ? O : X;
}

/**
 * Posiçoes disponiveis para CPU jogar
 * 
 * @return array
 */
function posicoesDisponiveis() {
    let jogadas = [];
    for (let i = 0; i < TAM_TAB; i++) {
        for (let j = 0; j < TAM_TAB; j++) {
            if (tabuleiro[i][j] === VAZIO) {
                jogadas.push([i, j]);
            }
        }
    }
    return jogadas;
}

/**
 * Retorna a dificuldade do jogo sendo no maximo 70% de chance  para 
 * utilizar a Lógica que possui a "IA" da "Jogada Perfeita"
 * 
 * @return number
 */
function getDificuldade() { 
    if (nivel == 1) {
        return 0;
    }
    
    if (nivel == 2) {
        return 5;
    }

    if (nivel == 3) {
        return 7;
    }
}

/**
 * Realiza a jogada do player dado as coordenadas do tabuleiro.
 *
 * @param number x
 * @param number y
 * 
 * @return void
 */
function jogar(x, y) {
    if (tabuleiro.length === 0) {
        return;
    }

    // jogada inválida   
    if (tabuleiro[x][y] !== VAZIO || vitoria) {
        return;
    }
  
    // preenche a posição no tabuleiro
    tabuleiro[x][y] = jogador;

    // exibe X
    if(exibirX(x, y)){
        $("#" + x + "_" + y).addClass("img-x");
    }

    // exibe O
    if(exibirO(x, y)){
        $("#" + x + "_" + y).addClass("img-o");
    }

    // incrementa o numero de jogadas
    numMovimentos++;

    // salva no banco de dados a jogada
    salvarJogada("Player", x, y);

    // verifica se o jogo terminou
    vitoria = fimJogo(x, y, tabuleiro, jogador);

    // houve vitoria
    if (vitoria !== false) {
        vitoria.forEach(element => {
            $("#" + element[0] + "_" + element[1]).addClass("cor-vitoria");
        });

        toastr.success('Parabéns você ganhou o jogo.');
        atualizarJogo('vitória');
    }

    // inverte o jogador
    jogador = (jogador === X) ? O : X;

    if (!vitoria && numMovimentos < 9) {
        let random = Math.floor(Math.random() * 10) + 1; // retorna um número inteiro aleatório de 1 a 10

        if (getDificuldade() >= random) {
            jogadaPerfeita();
        } else {
            jogadaAleatoria();
        }
    }

    // empate
    if (!vitoria && numMovimentos === 9) {
        jogador = 0;
        toastr.warning('Jogo empatado.');
        atualizarJogo('empate');
    }
}

/**
 * Verifica e retorna se o jogo terminou.
 *
 * @param number linha
 * @param number coluna
 * @param array tabuleiro
 * @param number jogador
 * 
 * @return array
 */
function fimJogo(linha, coluna, tabuleiro, jogador) {
    let fim = false;
    // valida a linha
    if (tabuleiro[linha][0] === jogador && tabuleiro[linha][1] === jogador && tabuleiro[linha][2] === jogador) {
        fim = [[linha, 0], [linha, 1], [linha, 2]];
    }
    // valida a coluna
    if (tabuleiro[0][coluna] === jogador && tabuleiro[1][coluna] === jogador && tabuleiro[2][coluna] === jogador) {
        fim = [[0, coluna], [1, coluna], [2, coluna]];
    }
    // valida as diagonais
    if (tabuleiro[0][0] === jogador && tabuleiro[1][1] === jogador && tabuleiro[2][2] === jogador) {
        fim = [[0, 0], [1, 1], [2, 2]];
    }
    if (tabuleiro[0][2] === jogador && tabuleiro[1][1] === jogador && tabuleiro[2][0] === jogador) {
        fim = [[0, 2], [1, 1], [2, 0]];
    }
    return fim;
}

/**
 * Método que retorna uma possível jogada para formar triangulo
 * 
 * @param number x 
 * @param number y 
 * @param number jogador 
 * 
 * @return array
 */
function jogadaTriangulo(x, y, jogador) {
    // 0, 0 - 1, 1 - 0, 2
    if ((x === 0 && y === 0) && (tabuleiro[1][1] === jogador) && (tabuleiro[0][2] === jogador)) {
        return [x, y];
    }
    if ((tabuleiro[0][0] === jogador) && (x === 1 && y === 1) && (tabuleiro[0][2] === jogador)) {
        return [x, y];
    }
    if ((tabuleiro[0][0] === jogador) && (tabuleiro[1][1] === jogador) && (x === 0 && y === 2)) {
        return [x, y];
    }

    // 0, 2 - 1, 1 - 2, 2
    if ((x === 0 && y === 2) && (tabuleiro[1][1] === jogador) && (tabuleiro[2][2] === jogador)) {
        return [x, y];
    }
    if ((tabuleiro[0][2] === jogador) && (x === 1 && y === 1) && (tabuleiro[2][2] === jogador)) {
        return [x, y];
    }
    if ((tabuleiro[0][2] === jogador) && (tabuleiro[1][1] === jogador) && (x === 2 && y === 2)) {
        return [x, y];
    }

    // 2, 0 - 1, 1 - 2, 2
    if ((x === 2 && y === 0) && (tabuleiro[1][1] === jogador) && (tabuleiro[2][2] === jogador)) {
        return [x, y];
    }
    if ((tabuleiro[2][0] === jogador) && (x === 1 && y === 1) && (tabuleiro[2][2] === jogador)) {
        return [x, y];
    }
    if ((tabuleiro[2][0] === jogador) && (tabuleiro[1][1] === jogador) && (x === 2 && y === 2)) {
        return [x, y];
    }

    // 0, 0 - 1, 1 - 2, 0
    if ((x === 0 && y === 0) && (tabuleiro[1][1] === jogador) && (tabuleiro[2][0] === jogador)) {
        return [x, y];
    }
    if ((tabuleiro[0][0] === jogador) && (x === 1 && y === 1) && (tabuleiro[2][0] === jogador)) {
        return [x, y];
    }
    if ((tabuleiro[0][0] === jogador) && (tabuleiro[1][1] === jogador) && (x === 2 && y === 0)) {
        return [x, y];
    }
    return [];
}

/**
 * Método que retorna uma possível jogada no canto.
 * 
 * @return array
 */
function jogadaCanto() {
    if (tabuleiro[0][0] === VAZIO) {
        return [0, 0];
    }
    if (tabuleiro[0][2] === VAZIO) {
        return [0, 2];
    }
    if (tabuleiro[2][0] === VAZIO) {
        return [2, 0];
    }
    if (tabuleiro[2][2] === VAZIO) {
        return [2, 2];
    }
    return [];
}

/**
 * Método que retorna uma possível jogada na borda.
 * 
 * @return array
 */
function jogadaBorda() {
    if (tabuleiro[0][1] === VAZIO) {
        return [0, 1];
    }

    if (tabuleiro[1][0] === VAZIO) {
        return [1, 0];
    }

    if (tabuleiro[1][2] === VAZIO) {
        return [1, 2];
    }

    if (tabuleiro[2][1] === VAZIO) {
        return [2, 1];
    }
}

/**
 * Obtém uma jogada válida para vitória de um jogador.
 *
 * @param number jogador
 * @return nomber[]
 */
function obterJogada(jogador) {
    let tab = tabuleiro;
    for (let lin = 0; lin < TAM_TAB; lin++) {
        for (let col = 0; col < TAM_TAB; col++) {
            if (tab[lin][col] !== VAZIO) {
                continue;
            }
            tab[lin][col] = jogador;
            if (fimJogo(lin, col, tab, jogador)) {
                return [lin, col];
            }
            tab[lin][col] = VAZIO;
        }
    }
    return [];
}

/**
 * Retorna se a peça X deve ser exibida para a
 * coordena informada.
 *
 * @param number x
 * @param number y
 * @return boolean
 */
function exibirX(x, y) {
    return tabuleiro[x][y] === X;
}

/**
 * Retorna se a peça O deve ser exibida para a
 * coordena informada.
 *
 * @param number x
 * @param number y
 * 
 * @return boolean
 */
function exibirO(x, y) {
    return tabuleiro[x][y] === O;
}

/**
 * Método que retorna o oponente do jogador atual.
 */
function getOponente(jogador_atual) {    
    switch (jogador_atual) {
        case X: {
            return O;
        }
        case O: {
            return X;
        }
        default: {
            return VAZIO;
        }
    }
}

/**
 * Salva a partida na tabela jogos
 *
 * @return void
 */
function salvarJogo() {
    $.ajax({
        'url': _url_jogo,
        'method': "POST",
        'dataType': "json",
        data: {
            'nivel': $('#nivel').val(),
            '_token': _token
        },
        success: function (result) {
            if (result) {
                iniciar();
                toastr.info('Partida iniciada.');
                jogo = result.jogo;
            } else {
                toastr.error('Não foi possível iniciar a Partida');
            }
        }
    });
}

/**
 * Atualizar a partida na tabela jogos
 *
 * @return void
 */
function atualizarJogo(resultado) {
    if (jogo) {
        let url = "/jogos/" + jogo.id; 
        
        $.ajax({
            'url': url, 
            'method': "POST",
            'dataType': "json",
            data: {
                'resultado': resultado,
                '_token': _token,
                '_method': 'PATCH',
            },
            success: function (result) {
                if (result) {
                    jogo = result.jogo;
                }
            }
        });
    }
}

/**
 * Salva as jogadas na tabela jogadas
 *
 * @return void
 */
function salvarJogada(jogador, x, y) {
    $.ajax({
        'url': _url_jogada,
        'method': "POST",
        'dataType': "json",
        data: {
            'jogo_id': jogo.id,
            'jogador': jogador,
            'x': x,
            'y': y,
            'numero_movimento': numMovimentos,
            '_token': _token
        },
        success: function (result) {
            if (!result) {
                toastr.error('Não foi possível efetuar a Jogada');
            }
        }
    });
}