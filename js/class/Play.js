import { Visuel } from "./Visuel.js";
import { LogiqueJeu } from "./LogiqueJeu.js";
import { monkeys } from "../data.js";

export class Play {
    /**
     * Constructeur de la classe LogiqueJeu
     * @param {HTMLElement} nbCard : range nb card
     * @param {HTMLElement} btnReset : Bouton initaliser
     */
    constructor(nbCard, btnReset, btnGo) {
        this.nbCard = nbCard;
        this.btnReset = btnReset;
        this.monkeys = monkeys;
        this.btnGo = btnGo;
        // Instanciation de la logique du jeu et de l'interface
        this.logiqueJeu = new LogiqueJeu(nbCard, btnReset, this.monkeys);
        this.interface = new Visuel(nbCard, btnReset, this.monkeys);
    }

    /**
     * Initialisation du jeu
     */
    initialiser() {
        Visuel.makeCard(12); // 12 cards au départ du jeu
        this.configurerEcouteurs();
    }

    /**
     * Mise en place des écouteurs sur les boutons et le select
     */
    configurerEcouteurs() {
        this.btnReset.addEventListener("click", () => {Visuel.reinitialiser()});
        this.nbCard.addEventListener("input", (event) => this.logiqueJeu.majNbCard(event.target.value));
        this.nbCard.addEventListener("input", (event) => Visuel.makeCard(event.target.value));       
        this.btnGo.addEventListener("click", () => Visuel.rotateCardShow());
        this.nbCard.addEventListener("input", (event) => Visuel.findImages(event.target.value, this.monkeys));
    }
}