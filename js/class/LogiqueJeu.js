// Input range 
const rangeNb = document.querySelector("#nbCard");
// Span qui affiche le prix
let printNb = document.querySelector(".printNb");

export class LogiqueJeu {

    /**
     * Constructeur de la classe LogiqueJeu
     * @param {HTMLElement} nbCard : range nb card
     * @param {HTMLElement} btnReset : Bouton initaliser
     * @param {HTMLElement} monkeys : Liste des images
     */
    constructor(nbCard, btnReset, monkeys) {
        this.nbCard = nbCard;
        this.btnReset = btnReset;
        this.monkeys = monkeys;
    }

    /**
     * Fonction utiliser dans l'écouteur (cf Play) sur l'input de
     * type range qui met a jour le nombre sélectionné dans le span 
     * @param {Number} nbChoisi 
     */
    majNbCard(nbChoisi) {
        printNb.innerHTML = nbChoisi;            
    }

    // randomPictures() {
    //     let pictures = _shuffle(this.listePictures);
        
    // }
}