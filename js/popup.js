// Elements popup game over
const gameOver = document.querySelector("#gameOver");
const closeBtnGameOVer = document.querySelector(".button-close-gameOver");
// Fond de la popup
const overlay = document.querySelector(".popup-overlay");

// Au départ
gameOver.style.display = "none"; // pour afficher => flex

// Fond quand popup ouverte => si on click sur le fond ferme la popup
overlay.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target === overlay) {
        overlay.style.display = "none";
        document.body.classList.remove("no-scroll");
    }
});

// Ouverture popup gameOver
export function openGameOver() {
    gameOver.style.display = "flex";
    overlay.style.display = "flex";
    document.body.classList.add("no-scroll");
}
