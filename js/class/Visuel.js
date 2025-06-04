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
        console.log(this.monkeys[3]);
    }

    static makeCard(nbCardInInput) {
        // console.log(nbCardInInput);
        let allCards = document.querySelectorAll(".flip-card");
        for (const card of allCards) {
            card.remove();
        }
        let pictures = this.findImages();
        console.log(pictures);
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

    static findImages(inputCard, images) {
        console.log(typeof images);
        const btnGo = document.querySelector("#btnGo");
        btnGo.addEventListener("click", () => {
            let memoryCard = [];
            while (memoryCard.length < inputCard / 2) {
                let newNumber = Math.ceil(Math.random() * images.length) - 1;
                console.log(newNumber);
                // console.log(images[newNumber]);
                if (memoryCard.indexOf(images[newNumber]) == -1) {
                    memoryCard.push(images[newNumber]);
                    // console.log(images[newNumber]);
                }
            }
            console.log(memoryCard);

            memoryCard = [...memoryCard, ...memoryCard];
            console.log(memoryCard);
            let shuffleCards = _.shuffle(memoryCard);
             console.log(shuffleCards);
            return shuffleCards;
           
            // let memoryCard = [];
            // for (let indexOfNameOfImage = 0; indexOfNameOfImage < inputCard / 2; indexOfNameOfImage++) {



            // while (memoryCard.length < inputCard / 2 ) {
            //     let indexOfNameOfImage = (Math.floor(Math.random() * images.length) + 1);

            //     console.log(indexOfNameOfImage);
            //     console.log(inputCard);
            //     console.log(images[indexOfNameOfImage]);
            //     (memoryCard.indexOf(indexOfNameOfImage) == -1) ? memoryCard.push(images[indexOfNameOfImage]) : null;
            //     console.log(memoryCard);
            // }

            // }

            // let name = images[indexOfNameOfImage];
            // // imgBack.style.backgroundImage = `url('./images/monkeys/ ${name}`;
        })

    }

    static dragAndDrop() {
        console.log("cc");

    }
}

