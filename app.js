const celulas = document.querySelectorAll(".celula");
const estatus = document.querySelector("#status");
const reiniciarBotao = document.querySelector("#reiniciarBotao");
const verificarCondicaoDoVencedor = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let opcoes = ["", "", "", "", "", "", "", "", ""];
let jogadorAtual = "X";
let começarJogo = false;

iniciarJogo();

function iniciarJogo(){
    celulas.forEach(celula => celula.addEventListener("click", celulaClicada))

    reiniciarBotao.addEventListener("click", reiniciarJogo);
    estatus.textContent = `${jogadorAtual}'s time`;
    começarJogo = true;
}

function celulaClicada(){
    const indexDaCelula = this.getAttribute("posicaoDaCelula");

    if(opcoes[indexDaCelula] != "" || !começarJogo) return;

    atualizarCelula(this, indexDaCelula);
    verificarVencedor();
}

function atualizarCelula(celula, index){
    opcoes[index] = jogadorAtual;
    celula.textContent = jogadorAtual;
}

function mudarJogador(){
    jogadorAtual = (jogadorAtual == "X") ? "O" : "X";
    estatus.textContent = `${jogadorAtual}'s time`;
}

function verificarVencedor(){
    let roundWon = false;

    for(let i = 0; i < verificarCondicaoDoVencedor.length; i++){
        const condicao = verificarCondicaoDoVencedor[i];
        const cellulaA = opcoes[condicao[0]];
        const cellulaB = opcoes[condicao[1]];
        const cellulaC = opcoes[condicao[2]];

        if(cellulaA == "" || cellulaB == "" || cellulaC == "") continue;

        if(cellulaA == cellulaB && cellulaB == cellulaC){
            roundWon = true;
            condicao.forEach(index => celulas[index].classList.add("cross"));
            break;
        }
    }

    if (roundWon){
        estatus.textContent = `${jogadorAtual} won!!! congrtsss`;
        começar = false;
        confetti({
            particleCount: 100,
            spread: 700,
            origin: { y: 0.6 }
        });
    }
    else if (!opcoes.includes("")){
        estatus.textContent = `The game ended in a tie!!!`;
        começar = false;
    }
    else{
        mudarJogador();
    }
}

function reiniciarJogo(){
    jogadorAtual = "X";
    opcoes = ["", "", "", "", "", "", "", "", ""];
    estatus.textContent = `${jogadorAtual}'s time`;
    celulas.forEach(celula => {
        celula.textContent = "";
        celula.classList.remove("cross");
    });
    começarJogo = true;
}
