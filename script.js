const spielfeld = document.querySelector(".game-board");
const zuege = document.getElementById("moves");
const neuStart = document.getElementById("restart-btn");

const bilder = [
    "https://pixabay.com/images/download/gruendercoach-the-sheep-7089786_1920.jpg",
    "https://pixabay.com/images/download/pexels-red-panda-1851661_1920.jpg",
    "https://pixabay.com/images/download/kathy_buscher-adler-2386314_1920.jpg",
    "https://pixabay.com/images/download/pexels-adorable-1852815_1920.jpg",
    "https://pixabay.com/images/download/11417994-chipmunk-3959206_1920.jpg",
    "https://pixabay.com/images/download/12019-iceland-1979445_1920.jpg",
    "https://pixabay.com/images/download/katrinbechtel-dog-7956828_1920.jpg",
    "https://pixabay.com/images/download/pexels-lemur-1851671_1920.jpg"
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
