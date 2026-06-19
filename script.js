const spielfeld = document.querySelector(".game-board");
const zuege = document.getElementById("moves");
const neuStart = document.getElementById("restart-btn");

const bilder = [
    "https://th.bing.com/th/id/R.0bfdddd3e566064db484e3d951f51920?rik=0ULzHjxatyK9eg&riu=http%3a%2f%2fwww.globalsherpa.org%2fwp-content%2fuploads%2f2011%2f08%2ftokyo-aerial-view-night-skyline.jpg&ehk=2wafmYo%2fF5Mw1iPYogCAAiBrdUciA83%2fzoINEaODkhc%3d&risl=&pid=ImgRaw&r=0",
    "https://www.worldatlas.com/r/w1200/upload/14/f7/35/shutterstock-259954391.jpg",
    "https://cdn.worlddata.info/pics/og/megacity-hongkong.jpg",
    "https://www.bioenergyconsult.com/wp-content/uploads/2022/06/sustainable-megacities.jpg",
    "https://scwcontent.affino.com/AcuCustom/Sitename/DAM/017/Megacity_AdobeStock_187332287.jpg",
    "https://tse3.mm.bing.net/th/id/OIP.ZE1CTX3lEi8ccD5Qxk9ZBgHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://media.istockphoto.com/photos/aerial-view-of-mega-city-skyline-picture-id174215815?k=20&m=174215815&s=612x612&w=0&h=rJWrHyAadTZjBusoo3JnuQZ-Yfp0S8mUV-VTrjtczs0=",
    "https://idsb.tmgrup.com.tr/ly/uploads/images/2022/07/30/221537.jpg"
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
