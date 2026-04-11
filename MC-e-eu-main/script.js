const cartas = document.querySelectorAll(".carta");
let primeira = null;
let segunda = null;
let travar = false;
let jogadas = 0;
let pares = 0;

// tempo
let tempo = 0;
let intervalo;

const imagens = [
  "01","01","02","02","03","03","04","04","05","05",
  "06","06","07","07","08","08","09","09","10","10"
];

// cronômetro
function iniciarTempo() {
  intervalo = setInterval(() => {
    tempo++;
    let min = String(Math.floor(tempo / 60)).padStart(2, "0");
    let seg = String(tempo % 60).padStart(2, "0");
    document.querySelector(".painel span:first-child").textContent = `${min}:${seg}`;
  }, 1000);
}

// embaralhar
function embaralhar() {
  imagens.sort(() => Math.random() - 0.5);
}

// iniciar jogo
function iniciar() {
  embaralhar();

  cartas.forEach((carta, i) => {
    const nome = imagens[i];

    carta.dataset.valor = nome;
    carta.classList.remove("virada", "acertou");

    const frente = carta.querySelector(".frente");
    frente.style.backgroundImage = `url('assets/${nome}.png')`;
  });

  jogadas = 0;
  pares = 0;
  tempo = 0;

  document.querySelector(".painel span:last-child").textContent = jogadas;
  document.querySelector(".painel span:first-child").textContent = "00:00";

  clearInterval(intervalo);
  iniciarTempo();

  primeira = null;
  segunda = null;
  travar = false;
}

iniciar();

// clique
cartas.forEach(carta => {
  carta.addEventListener("click", () => {

    if (travar || carta.classList.contains("virada")) return;

    carta.classList.add("virada");

    if (!primeira) {
      primeira = carta;
    } else {
      segunda = carta;
      travar = true;
      jogadas++;

      document.querySelector(".painel span:last-child").textContent = jogadas;

      verificar();
    }
  });
});

// verificar
function verificar() {
  if (primeira.dataset.valor === segunda.dataset.valor) {

    document.getElementById("som-acerto").play();

    primeira.classList.add("acertou");
    segunda.classList.add("acertou");

    pares++;

    if (pares === 10) {
      finalizar();
    }

    resetar();
  } else {
    setTimeout(() => {
      primeira.classList.remove("virada");
      segunda.classList.remove("virada");
      resetar();
    }, 800);
  }
}

// fim de jogo
function finalizar() {
  clearInterval(intervalo);

  document.getElementById("tempo-final").textContent =
    document.querySelector(".painel span:first-child").textContent;

  document.getElementById("jogadas-final").textContent = jogadas;

  document.getElementById("vitoria").classList.remove("hidden");
}

// reset
function resetar() {
  primeira = null;
  segunda = null;
  travar = false;
}

// botão reiniciar
document.querySelector(".painel button").addEventListener("click", iniciar);