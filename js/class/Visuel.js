import { Timer } from "./Timer.js";

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
        this.timer = new Timer();
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
        let pictures = this.findImages(nbCardInInput, this.monkeys);
        for (let index = 0; index < nbCardInInput; index++) {
            const galerie = document.querySelector(".galerie");
            let flipCard = document.createElement("div");
            flipCard.classList.add("flip-card", `metallic${index + 1}`, `dropzone`);
            // flipCard.draggable = "true";
            // Card Front
            // Card inner 
            let flipCardInner = document.createElement("div");
            flipCardInner.classList.add("flip-card-inner");
            flipCardInner.draggable = "true";
            flipCardInner.setAttribute("id", `parent${index + 1}`);
            // 
            let flipCardFront = document.createElement("div");
            flipCardFront.classList.add("flip-card-front", "metallic");
            //flipCardFront.draggable = "true";
            let imgFront = document.createElement("img");
            imgFront.src = "./images/card-monkey.png";
            // imgFront.src = "./images/logo-220x220.svg"; // image du dos
            imgFront.alt = "Avatar";
            // imgFront.draggable = "true";
            // Card Back
            let flipCardBack = document.createElement("div");
            flipCardBack.classList.add("flip-card-back");
            let imgBack = document.createElement("img");
            imgBack.src = `./images/monkeys/${pictures[index]}` // aléatoire
            imgBack.alt = "carte";
            imgBack.dataset.card = `singe-${pictures[index]}`; // nom image aléatoire

            flipCardFront.appendChild(imgFront);
            flipCardBack.appendChild(imgBack);
            flipCardInner.appendChild(flipCardFront);
            flipCardInner.appendChild(flipCardBack);
            flipCard.appendChild(flipCardInner);
            galerie.appendChild(flipCard);
        }
        this.findImages();
    }
    
    /**
     * Méthode qui réinitialise le visuel au click sur le bouton initaliser
    */
   reinitialiser() {
       window.location.reload();
    }
    
    rotateCardShow() {
        this.dragAndDrop();
        //this.timer.startTimer();
        this.timer.startCountdown();
        //console.log("show");
        let flipCards = document.querySelectorAll(".flip-card .flip-card-inner");
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

    findImages(inputCard, images) {
        const btnGo = document.querySelector("#btnGo");
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
    }

    dragAndDrop() {
        console.log("cc");

        const draggableDivCards = document.querySelectorAll(".flip-card-inner");

        draggableDivCards.forEach(divCard => {
            divCard.addEventListener("dragstart", e => {
                divCard.style.opacity = "0.2";
                const ghostCard = divCard.cloneNode(true);
                document.body.appendChild(ghostCard);
                e.dataTransfer.setData("text", ghostCard.id);
                // e.target.classList.add("effect");
                setTimeout(() => document.body.removeChild(ghostCard), 0);
            })

            divCard.addEventListener("dragend", (e) => {
                // e.target.classList.remove("effect");
            })
        });

        for (const dropZone of document.querySelectorAll(".dropzone")) {
            dropZone.addEventListener("dragover", e => {
                e.preventDefault();
                // dropZone.classList.add("effect");
            })

            dropZone.addEventListener("dragleave", e => {
                // dropZone.classList.remove("effect");
            })

            dropZone.addEventListener("drop", e => {
                e.preventDefault();
                const droppedElementId = e.dataTransfer.getData("text/plain");
                const droppedElement = document.querySelector(`#${droppedElementId}`);
                dropZone.appendChild(droppedElement);
                console.log(droppedElement);
                // dropZone.classList.add("effect");
                droppedElement.style.opacity = "1.0";

                setTimeout(() => {
                    droppedElement.style.transform = 'rotateY(180deg)';
                }, 1000);

                const firstCard = document.querySelector(".first-card .flip-card-back img");
                const secondCard = document.querySelector(".second-card .flip-card-back img");
                if (firstCard !== null && secondCard !== null) {
                    this.checkWin(firstCard, secondCard);
                } else {
                    console.log("Il y a un null", secondCard, firstCard);
                    return
                }

                console.log("======================================");
            })
        }
    }
    checkWin(firstCard, secondCard) {

        const childCard1 = document.querySelector(".first-card .flip-card-inner");
        const childCard2 = document.querySelector(".second-card .flip-card-inner");
        const restCards = document.querySelectorAll(".flip-card-inner");

        if (restCards.length > 2) {
            if (firstCard.dataset.card === secondCard.dataset.card) {
                setTimeout(() => childCard1.parentNode.removeChild(childCard1), 3000);
                setTimeout(() => childCard2.parentNode.removeChild(childCard2), 3000);
                console.log("cc winner");
            } else {
                const parentGalerie = document.querySelectorAll(".flip-card");
                for (let i = 0; i < parentGalerie.length; i++) {
                    if (parentGalerie[i].childNodes.length === 0) {
                        setTimeout(() => document.querySelector(`.metallic${childCard1.id.substring(6)}`).appendChild(childCard1), 4000);
                        setTimeout(() => document.querySelector(`.metallic${childCard2.id.substring(6)}`).appendChild(childCard2), 4000);
                    }
                    setTimeout(() => {
                        childCard2.style.transform = 'rotateY(0deg)';
                        childCard1.style.transform = 'rotateY(0deg)';
                    }, 4000);
                }
                console.log("cc LOOSE");
            }

        } else {
            setTimeout(() => childCard1.parentNode.removeChild(childCard1), 3000);
            setTimeout(() => childCard2.parentNode.removeChild(childCard2), 3000);
            this.timer.stopCountdown();
            console.log("YOU WIN")
        }
    }

}