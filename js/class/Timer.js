import { openGameOver } from "../popup.js"

export class Timer {
    #flipCards;
    #duration;
    #minutes;
    #seconds;
    #intervalId

    constructor() {
        this.#flipCards = document.querySelectorAll('.flip-card-timer');
        this.#duration = []
        // getComputedStyle pour accéder aux propriétés CSS de la première carte. 
        // C'est une fonction moderne qui permet de lire les valeurs CSS 
        // appliquées à un élément
        const styles = getComputedStyle(this.#flipCards[0]);
        this.#minutes = parseInt(styles.getPropertyValue('--minutes'));
        this.seconds = parseInt(styles.getPropertyValue('--seconds'));
    }

    /**
     * Cette méthode met à jour l'affichage visuel en définissant
     * Elle utilise la méthode setProperty pour modifier dynamiquement 
     * les variables CSS.
     */
    #updateDisplay() {
        this.#flipCards[0].style.setProperty('--minutes', this.minutes);
        this.#flipCards[1].style.setProperty('--seconds', this.seconds);
    }

    /**
     * Cette méthode gère le compte à rebours
     * @returns : "gameOver" si le décompte arrive à zéro
     */
    #countdown() {
        this.#updateDisplay();
        // La fonction principale de compte à rebours commence 
        // par vérifier si nous sommes arrivés à zéro sur toutes 
        // les unités de temps. Si c'est le cas, elle arrête le compte à rebours.
        if (this.minutes === 0 && this.seconds === 0) {
            this.stopCountdown(); 
            openGameOver();
            // Réactivation bouton reset
            document.querySelector("#btnReset").disabled = false ;
            return; // Ne pas enlever => permet de stopper le code à 0
        }

        if (this.seconds === 0) {
            this.seconds = 59;
            if (this.minutes > 0) {
                setTimeout(() => {
                    this.#startAnimation(0); // Animation des minutes
                }, 500);
                this.minutes--;
            }
        } else {
            setTimeout(() => {
                this.#startAnimation(1); // Animation des secondes
            }, 500);
            this.seconds--;
        }
        this.#updateDisplay();
    }

    /**
     * Cette méthode gére l'animation du flip
     * @param {Number} n 
     */
    #startAnimation(n) {
        const flip = this.#flipCards[n].querySelectorAll('[data-flip]');
        const top = flip[0];
        const bottom = flip[1];

        // Mettez à jour les attributs de données
        top.dataset.flip = 'true';
        bottom.dataset.flip = 'true'

        // Gestion animation du flip
        top.addEventListener("animationend", () => {
            bottom.dataset.flip = 'true';
            bottom.addEventListener("animationend", () => {
                top.dataset.flip = 'false';
                bottom.dataset.flip = 'false';
            }, { once: true });
        }, { once: true });
    }

    /**
     * Méthode qui calcul la durée de la partie en secondes
     * @returns : durée de jeu en secondes
     */
    calcDuration() {
        // Récupération dans le DOM du nombre de cartes choisis par le user
        const nbCards = document.querySelector(".printNb").textContent;
        switch (nbCards) {
            case "24":
            case "22":
            case "20":
                this.minutes = 5;
                this.seconds = 0;
                break;
            case "18":
            case "16":
            case "14":
                this.minutes = 4;
                this.seconds = 0;
                break;
            case "12":
            case "10":
            case "8":
                this.minutes = 2;
                this.seconds = 0;
                break;
        }
        return this.#duration = [this.minutes, this.seconds];
    }


    /**
     * Cette méthode lance le compte à rebours
     */
    startCountdown() {
        document.querySelector(".content-grid-timer").classList.remove("hidden");
        this.calcDuration();
        this.#countdown();
        // Il faut utiliser une fonction fléchée () => this.countdown() 
        // pour s'assurer que this dans updateTimer fait référence 
        // à l'instance de Timer
        this.#intervalId = setInterval(() => this.#countdown(), 1000);
    }

    /**
     * Méthode qui stoppe le timer
     */
    stopCountdown() {
        clearInterval(this.#intervalId);
    }

    // ********************** //
    //   Getters et Setters   //
    // ********************** //

    get minutes() {
        return this.#minutes;
    }

    set minutes(value) {
        this.#minutes = value;
    }

    get seconds() {
        return this.#seconds;
    }

    set seconds(value) {
        this.#seconds = value;
    }
}