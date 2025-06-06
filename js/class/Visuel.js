
export class Visuel {

    /**
     * Constructeur de la classe LogiqueJeu
     * @param {HTMLElement} nbCard : range nb card
     * @param {HTMLElement} btnReset : Bouton initaliser
     * @param {Array} monkeys : Liste des images
     */
    constructor(nbCard, btnReset, monkeys) {
        this.nbCard = nbCard;
        this.btnReset = btnReset;
        this.monkeys = monkeys
        this.container = document.getElementById('sizer');
        //console.log(this.monkeys[3]);
    }

    //********************************************* */
    // Si static impossible de récupèrer les monkeys
    //********************************************* */
    makeCard(nbCardInInput) {
        let allCards = document.querySelectorAll(".flip-card");
        for (const card of allCards) {
            card.remove();
        }
        let pictures = this.findImages(12, this.monkeys);
        for (let index = 0; index < nbCardInInput; index++) {
            const galerie = document.querySelector(".galerie");
            let flipCard = document.createElement("div");
            flipCard.classList.add("flip-card", "metallic");
            flipCard.draggable = "true";
            // Card Front
            // Card inner 
            let flipCardInner = document.createElement("div");
            flipCardInner.classList.add("flip-card-inner");
            // flipCardInner.draggable = "true";
            // 
            let flipCardFront = document.createElement("div");
            flipCardFront.classList.add("flip-card-front", "metallic");
            flipCardFront.draggable = "true";
            let imgFront = document.createElement("img");
            imgFront.src = "./images/logo-220x220.svg"; // image du dos
            imgFront.alt = "Avatar";
            // imgFront.draggable = "true";
            // Card Back
            let flipCardBack = document.createElement("div");
            flipCardBack.classList.add("flip-card-back");
            let imgBack = document.createElement("img");
            imgBack.src = `./images/monkeys/${pictures[index]}` // aléatoire
            imgBack.alt = "carte";
            imgBack.dataset.card = `toto`; // nom image aléatoire

            flipCardFront.appendChild(imgFront);
            flipCardBack.appendChild(imgBack);
            flipCardInner.appendChild(flipCardFront);
            flipCardInner.appendChild(flipCardBack);
            flipCard.appendChild(flipCardInner);
            galerie.appendChild(flipCard);
        }
        this.dragAndDrop();
        this.findImages();
    }

    /**
     * Méthode qui réinitialise le visuel au click sur le bouton initaliser
     */
    reinitialiser() {
        window.location.reload();
    }

    rotateCardShow() {
        
        console.log("show");
        let flipCards = document.querySelectorAll(".flip-card .flip-card-inner");
        /**
         * Deux forEach sur flipsCards; est-ce nécessaire???
         */
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

    rotateCardNoShow() {
        console.log("no show");
        let flipCards = document.querySelectorAll(".flip-card .flip-card-inner");
        flipCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'rotateY(0deg)';
            }, 100 * index);
            //select.disabled = true;
        });
    }

    /**
    * Méthode qui détermine un ordre aléatoire des apprenants
    * et des smileys associés
    */
    // placerMonkeys(imgBack) {
    //     numberSelect.disabled = true;

    //     for (let i = 0; i < XXX/2; i++) {
    //         let name = findImages();
    //         this.smiley[i].style.backgroundImage = `url('images/monkeys/ ${name}`;
    //             setTimeout(() => {
    //                 document.querySelector("#place-" + i).classList.toggle('flip');
    //             }, 100 * i);
    //     }
    //     this.boutonPlacer.disabled = true;
    //     setTimeout(() => {
    //         this.boutonReinit.disabled = false;
    //     }, 500);
    // }

    findImages(inputCard, images) {
        const btnGo = document.querySelector("#btnGo");
        //btnGo.addEventListener("click", () => {
        let memoryCard = [];
        while (memoryCard.length < inputCard / 2) {
            let newNumber = Math.ceil(Math.random() * images.length) - 1;
            if (memoryCard.indexOf(images[newNumber]) == -1) {
                memoryCard.push(images[newNumber]);
            }
        }

        memoryCard = [...memoryCard, ...memoryCard];
        let shuffleCards = _.shuffle(memoryCard);
        return shuffleCards;
        //}) 

    }

    dragAndDrop() {
        console.log("cc");
    }


}

