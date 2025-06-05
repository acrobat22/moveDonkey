export class Timer {

    constructor() {
        this.timerDisplay = document.getElementById("timer");
        //const startButton = document.getElementById("start");
        this.#countdown = 0;
        this.timeLeft = 300; // 5 minutes in seconds
        
    }

    
    formatTime(seconds) {
      const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");
      return `${mins}:${secs}`;
    }
    
    function updateTimer() {
      timerDisplay.textContent = formatTime(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(countdown);
      } else {
        timeLeft--;
      }
    }
}


startButton.addEventListener("click", () => {
  clearInterval(countdown);
  timeLeft = 300;
  updateTimer();
  countdown = setInterval(updateTimer, 1000);
});