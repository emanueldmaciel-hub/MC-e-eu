const cartas = document.querySelectorAll(".carta");

cartas.forEach((carta, index) => {
    carta.addEventListener("click", () => {
        console.log(`Botao Carta ${index + 1}`);
    });
});