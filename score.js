function getPlayerUsername() {
    console.log("Entered getPlayerUsername function")

    return localStorage.getItem('username') || 'Unknown Player'
}

function getPlayerScore() {
    console.log("Entered getPlayerScore function")

    let currentPlayer = getPlayerUsername();
    let scores = JSON.parse(localStorage.getItem('scores')) || {}

    if (scores[currentPlayer]) {
        return scores[currentPlayer].score;
    } else {
        return 0;}
}

function displayPlayerScore() {
    console.log("Entered displayPlayerScore function")

    const playerScoreEl = document.querySelector('#playerScore');
    playerScoreEl.textContent = getPlayerScore();
}

function resetScoreZero() {
    console.log("Entered resetScoreZero function")

    let currentPlayer = getPlayerUsername();
    let scores = JSON.parse(localStorage.getItem('scores')) || {}

    if (scores[currentPlayer]) {
        scores[currentPlayer].score = 0;
    } else {
        scores[currentPlayer] = { 
            score: 0, 
            date: new Date().toLocaleString() 
        };
    }

    localStorage.setItem('scores', JSON.stringify(scores));
}

function initScore() {
    displayPlayerScore();
}

document.addEventListener('DOMContentLoaded', initScore);