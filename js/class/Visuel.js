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
        let allCards = document.querySelectorAll(".flip-card");
        for (const card of allCards) {
            card.remove();
        }

        for (let index = 0; index < nbCardInInput; index++) {
            const galerie = document.querySelector(".galerie");
            let flipCard = document.createElement("div");
            flipCard.classList.add("flip-card", `metallic${index + 1}`, "dropzone");
            let flipCardInner = document.createElement("div");
            flipCardInner.classList.add("flip-card-inner");
            flipCardInner.draggable = "true";
            flipCardInner.setAttribute("id", `parent${index + 1}`); 
            let flipCardFront = document.createElement("div");
            flipCardFront.classList.add("flip-card-front", "metallic");
            let imgFront = document.createElement("img");
            imgFront.src = "./images/logo-220x220.svg"; // image du dos
            imgFront.alt = "Avatar";
            let flipCardBack = document.createElement("div");
            flipCardBack.classList.add("flip-card-back");

            flipCardFront.appendChild(imgFront);
            flipCardInner.appendChild(flipCardFront);
            flipCardInner.appendChild(flipCardBack);
            flipCard.appendChild(flipCardInner);
            galerie.appendChild(flipCard);
            flipCard.style.pointerEvents = 'none';
        }

        this.dragAndDrop();
        // this.makeImages();
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
    //         let name = makeImages();
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

    static makeImages(inputCard, images) {
        console.log("absence ", inputCard);
        let flipCards = document.querySelectorAll(".flip-card div");
        const btnGo = document.querySelector("#btnGo");

        btnGo.addEventListener("click", () => {
            flipCards.forEach(card => {
                card.style.pointerEvents = 'auto';
            });

            let memoryCard = [];
            while (memoryCard.length < inputCard / 2) {
                let newNumber = Math.ceil(Math.random() * images.length) - 1;
                console.log(newNumber);
                if (memoryCard.indexOf(images[newNumber]) == -1) {
                    memoryCard.push(images[newNumber]);
                }
            }

            memoryCard = [...memoryCard, ...memoryCard];
            let shuffleCards = _.shuffle(memoryCard);

            for (let indexOfNameOfImage = 0; indexOfNameOfImage < inputCard; indexOfNameOfImage++) {
                let imgBack = document.createElement("img");
                imgBack.src = `./images/monkeys/${shuffleCards[indexOfNameOfImage]}` // aléatoire
                imgBack.alt = "carte";
                imgBack.dataset.card = `singe-${shuffleCards[indexOfNameOfImage]}`; // nom image aléatoire
                document.querySelectorAll(".flip-card-back")[indexOfNameOfImage].appendChild(imgBack);
            }
        })

    }

    static dragAndDrop() {
        const draggableDivCards = document.querySelectorAll(".flip-card-inner");

        draggableDivCards.forEach(divCard => {
            divCard.addEventListener("dragstart", e => {
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
                // dropZone.classList.add("effect");
                console.log(dropZone);
                setTimeout(() => {
                    droppedElement.style.transform = 'rotateY(180deg)';
                }, 1000);

                this.checkWin();
                console.log("======================================");
            })
        }

    }

    static checkWin() {
        
        const parentFirst = document.querySelector(".first-card");
        const childCard1 = document.querySelector(".first-card .flip-card-inner");
        const firstCard = document.querySelector(".first-card .flip-card-back img");
        const ParentSecond = document.querySelector(".second-card");
        const childCard2 = document.querySelector(".second-card .flip-card-inner");
        const secondCard = document.querySelector(".second-card .flip-card-back img");
        const restCards = document.querySelectorAll(".flip-card-inner");
    console.log(firstCard, secondCard);
        if (firstCard === null || secondCard === null) {
            return
        }
        
        if (restCards.length > 2) {
            if (firstCard.dataset.card === secondCard.dataset.card) {
                console.log("cc winner");
                console.log(firstCard.dataset.card);
                 
                setTimeout(() => {
                   console.log(childCard1);
                    childCard1.parentNode.removeChild(childCard1)
                }, 3000);
                setTimeout(() => childCard2.parentNode.removeChild(childCard2), 3000);
                // console.log(childCard1.parentNode, childCard2.parentNode);
                // console.log(childCard1, childCard2)

            } else {
                console.log("cc LOOSE");
                const parentGalerie = document.querySelectorAll(".flip-card");
                console.log(parentGalerie);
                // console.log("Taille", parentGalerie[0].childNodes.length);
                // console.log("class parent", parentGalerie[2].classList[1]);
                for (let i = 0; i < parentGalerie.length; i++) {
                    if (parentGalerie[i].childNodes.length === 0) {
                        console.log("class parent", parentGalerie[i].classList[1]);
                        console.log(childCard1.id.substring(6));
                        console.log(childCard2.id.substring(6));
                        setTimeout(() => document.querySelector(`.metallic${childCard1.id.substring(6)}`).appendChild(childCard1), 4000);
                        setTimeout(() => document.querySelector(`.metallic${childCard2.id.substring(6)}`).appendChild(childCard2), 4000);



                    }
                    setTimeout(() => {
                        console.log("Rotation")
                        childCard2.style.transform = 'rotateY(0deg)';
                        childCard1.style.transform = 'rotateY(0deg)';
                    }, 4000);
                }
            }
        } else {
            setTimeout(() => parentFirst.removeChild(childCard1), 3000);
            setTimeout(() => ParentSecond.removeChild(childCard2), 3000);
            console.log("YOU WIN")
        }


    }
}

