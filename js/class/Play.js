import { Visuel } from "./Visuel.js";
import { LogiqueJeu } from "./LogiqueJeu.js";
import { monkeys } from "../data.js";
import { Timer } from "./Timer.js";

export class Play {
    #monkeys = [];
    /**
     * Constructeur de la classe LogiqueJeu
     * @param {HTMLElement} nbCard : range nb card
     * @param {HTMLElement} btnReset : Bouton initaliser
     * @param {HTMLElement} btnGo : Bouton lancement jeu
     */
    constructor(nbCard, btnReset, btnGo) {
        this.nbCard = nbCard;
        this.btnReset = btnReset;
        this.#monkeys = monkeys;
        this.btnGo = btnGo;
        // Instanciation de la logique du jeu et de l'interface
        this.logiqueJeu = new LogiqueJeu(nbCard, btnReset, this.#monkeys);
        this.interface = new Visuel(nbCard, btnReset, this.#monkeys);
        this.timer = new Timer();
    }

    /**
     * Initialisation du jeu
     */
    initialiser() {
        this.interface.makeCard(12); // 12 cards au départ du jeu
        this.configurerEcouteurs();
        this.timer.startTimer();
        // setTimeout(() => {
        //     this.timer.stopTimer()
        // }, "100000");  // milliseconde

    }

    /**
     * Mise en place des écouteurs sur les boutons et le select
     */
    configurerEcouteurs() {
        this.btnReset.addEventListener("click", () => { this.interface.reinitialiser() });
        this.nbCard.addEventListener("input", (event) => this.logiqueJeu.majNbCard(event.target.value));
        this.nbCard.addEventListener("input", (event) => this.interface.makeCard(event.target.value));
        this.btnGo.addEventListener("click", () => this.interface.rotateCardShow());
        this.nbCard.addEventListener("input", (event) => this.interface.findImages(event.target.value, monkeys));
    }
}