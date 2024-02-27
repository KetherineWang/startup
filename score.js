function getPlayerUsername() {
    console.log("Entered getPlayerUSername function")

    return localStorage.getItem('username') || 'Unknown Player'
}

function getPlayerScore() {
    console.log("Entered getPlayerName function")

    let currentPlayer = getPlayerUsername();
    let scores = JSON.parse(localStorage.getItem('scores')) || {}

    if (scores[currentPlayer]) {
        return scores[currentPlayer].score;
    } else {
        return 0;}
}

function displayPlayerScore() {
    const playerScoreEl = document.querySelector('#playerScore');
    playerScoreEl.textContent = getPlayerScore();
}

function initScore() {
    displayPlayerScore();
}

document.addEventListener('DOMContentLoaded', initScore);