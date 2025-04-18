import { monkeyGrimp, monkeyWalkG, monkeyWalkD } from "./data.js";

let monkey = document.querySelector(".monkey");
const largeurEcran = screen.width;
const largeurFenetre = window.innerWidth;
const ping = false;

playPictures();

function playPictures() {
    let currentIndex = 0;
    let pixel = 20;
    const intervalId = setInterval(() => {
        pixel += 10;
        monkey.style.backgroundImage = `url('images/monkeys/arbres/arbre-${currentIndex + 1}.svg')`;
        currentIndex = (currentIndex + 1) % monkeyGrimp.length;
    }, 1000);
    
    // Pour arrêter plus tard :
    // clearInterval(intervalId);
    // ou
    //setTimeout(() => {
    //    clearInterval(intervalId);
    //}, 10000);
}