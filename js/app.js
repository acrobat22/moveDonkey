import { Play } from "./class/Play.js";

const nbCard = document.querySelector("#nbCard");
const btnReset = document.querySelector("#btnReset");
const btnGo = document.querySelector("#btnGo");

let play = new Play(nbCard, btnReset, btnGo);

play.initialiser();
console.log(play);


