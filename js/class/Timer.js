export class Timer {
  #countDown;
  #timeLeft;

  constructor() {
    this.timerDisplay = document.querySelector("#timer");
    this.#countDown = 0;
    this.#timeLeft = 70; // en seconde
  }


  /**
   * Cette méthode convertit une durée en secondes en un format de minutes 
   * avec deux chiffres, en ajoutant un zéro à gauche si nécessaire. 
   * @param {Number} seconds 
   * @returns 
   */
  formatTime(seconds) {
    // .padStart(2, "0") : Ajoute un zéro à gauche si la chaîne 
    // fait moins de 2 caractères
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }

  /**
   * Méthode qui met à jour le timer
   */
  updateTimer() {
    this.timerDisplay.textContent = this.formatTime(this.timeLeft);
    if(this.#timeLeft === 60) {
      this.timerDisplay.style.color = "orange";
    }
    if (this.timeLeft <= 0) {
      clearInterval(this.countDown);
      this.timerDisplay.style.color = "red";
    } else {
      this.timeLeft--;
    }
  }

  /**
   * Méthode qui permet le demarrage du timer
   */
  startTimer() {
    clearInterval(this.countDown);
    this.timeLeft;
    this.updateTimer();
    // Il faut utiliser une fonction fléchée () => this.updateTimer() 
    // pour s'assurer que this dans updateTimer fait référence 
    // à l'instance de Timer, et non pas :
    // this.countDown = setInterval(this.updateTimer, 1000);
    this.countDown = setInterval(() => this.updateTimer(), 1000);
  }

  /**
   * Méthode qui stoppe le timer
   */
  stopTimer() {
    clearInterval(this.countDown);
  }

  // ********************** //
  //   Getters et Setters   //
  // ********************** //
  get countDown() {
    return this.#countDown;
  }

  set countDown(value) {
    this.#countDown = value;
  }

  get timeLeft() {
    return this.#timeLeft;
  }

  set timeLeft(value) {
    this.#timeLeft = value;
  }
}


