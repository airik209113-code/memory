const spielfeld = document.querySelector(".game-board");
const zuege = document.getElementById("moves");
const neuStart = document.getElementById("restart-btn");

const bilder = [
    "https://pngimg.com/uploads/flags/flags_PNG14615.png",
    "https://img.freepik.com/premium-vector/austria-flag_1109882-6558.jpg",
    "images/234327986859035320.jpg",
    "images/11047961582700970.jpg",
    "images/5207355814894851.jpg",
    "images/1618549864562566.jpg",
    "images/492649954934903.jpg",
    "images/422281212092771.jpg"
];

let cards = [];
let flipped = [];
let anzahlZuege = 0;
let gesperrt = false;

function startGame() {

    spielfeld.innerHTML = "";
    anzahlZuege = 0;
    zuege.textContent = 0;

    cards = bilder.concat(bilder);
    cards.sort(() => Math.random() - 0.5);

    flipped = [];
    gesperrt = false;

    for (let bild of cards) {

        const cards = document.createElement("div");
        cards.classList.add("card");

        cards.dataset.bild = bild;

        cards.addEventListener("click", karteKlicken);

        spielfeld.appendChild(cards);
    }
}

function karteKlicken() {

    if (gesperrt) return;
    if (this.classList.contains("matched")) return;
    if (this.classList.contains("open")) return;

    this.classList.add("open");
    this.innerHTML = `<img src="${this.dataset.bild}" class="card-image">`;

    flipped.push(this);

    if (flipped.length === 2) {

        anzahlZuege++;
        zuege.textContent = anzahlZuege;

        vergleichen();
    }
}

function vergleichen() {

    const erste = flipped[0];
    const zweite = flipped[1];

    if (erste.dataset.bild === zweite.dataset.bild) {
        erste.classList.add("matched");
        zweite.classList.add("matched");
        flipped = [];
        let gefunden = document.querySelectorAll(".matched");
        if (gefunden.length === cards.length) {
            alert("Gewonnen in " + anzahlZuege + " Zügen!");
        }
    } else {
        gesperrt = true;
        setTimeout(() => {
            erste.classList.remove("open");
            zweite.classList.remove("open");
            erste.innerHTML = "";
            zweite.innerHTML = "";
            flipped = [];
            gesperrt = false;
        }, 1000);
    }
}

neuStart.addEventListener("click", startGame);

startGame();
