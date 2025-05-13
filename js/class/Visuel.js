export class Visuel {

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
        this.container = document.getElementById('sizer');
    }


    static makeCard(nbCardInInput) {
        console.log(nbCardInInput);
        let allCards = document.querySelectorAll(".flip-card");
        for (const card of allCards) {
            card.remove();
        }


        for (let index = 0; index < nbCardInInput; index++) {
            const galerie = document.querySelector(".galerie");
            let flipCard = document.createElement("div");
            flipCard.classList.add("flip-card", "metallic");
            // Card Front
            // Card inner 
            let flipCardInner = document.createElement("div");
            flipCardInner.classList.add("flip-card-inner");
            // 
            let flipCardFront = document.createElement("div");
            flipCardFront.classList.add("flip-card-front", "metallic");
            let imgFront = document.createElement("img");
            imgFront.src = "./images/logo-220x220.svg"; // image du dos
            imgFront.alt = "Avatar";
            // Card Back
            let flipCardBack = document.createElement("div");
            flipCardBack.classList.add("flip-card-back");
            let imgBack = document.createElement("img");
            imgBack.src = './images/monkeys/' // aléatoire
            imgBack.alt = "carte";
            imgBack.dataset.card = `toto`; // nom image aléatoire

            flipCardFront.appendChild(imgFront);
            flipCardBack.appendChild(imgBack);
            flipCardInner.appendChild(flipCardFront);
            flipCardInner.appendChild(flipCardBack);
            flipCard.appendChild(flipCardInner);
            galerie.appendChild(flipCard);
        }
    }

    /**
     * Méthode qui réinitialise le visuel au click sur le bouton initaliser
     */
    static reinitialiser() {
        // for (let j = 0; j < this.monkeys.length; j++) {
        //     document.querySelector("#place-" + j).classList.toggle('flip');
        // }
        // this.btnReset.disabled = true;
        // setTimeout(() => {
        //     //this.boutonPlacer.disabled = false;
        //     //this.numberSelect.disabled = false;
        // }, 500);
    }

    static rotateCardShow() {
        console.log("show");
        let flipCards = document.querySelectorAll(".flip-card .flip-card-inner");
        flipCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'rotateY(180deg)';
            }, 100 * index);
            //select.disabled = true;
        });
        flipCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'rotateY(180deg)';
            }, 100 * index);
            //select.disabled = true;
        });
        btnReset.disabled = true;
        btnGo.disabled = true;
        nbCard.disabled = true;
        setTimeout(this.rotateCardNoShow, 2000);
        ;
    }

    static rotateCardNoShow() {
        console.log("no show");
        let flipCards = document.querySelectorAll(".flip-card .flip-card-inner");
        flipCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'rotateY(0deg)';
            }, 100 * index);
            //select.disabled = true;
        });
    }
}

