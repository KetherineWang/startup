function getPlayerUsername() {
  console.log("Entered getPlayerUsername function");

  return localStorage.getItem("username") || "Unknown Player";
}

function getPlayerScore() {
  console.log("Entered getPlayerScore function");

  const currentPlayerUsername = getPlayerUsername();

  fetch("/api/score/" + currentPlayerUsername)
    .then((response) => response.json())
    .then((data) => {
      const currentPlayerScore = data.score ? data.score : 0;
      displayPlayerScore(currentPlayerScore);
    })
    .catch((error) => console.error("Failed to fetch player score:", error));
}

function displayPlayerScore(score) {
  console.log("Entered displayPlayerScore function");
  console.log(score);

  const playerScoreEl = document.querySelector("#playerScore");
  playerScoreEl.textContent = score;
}

function resetScoreZero() {
  console.log("Entered resetScoreZero function");

  const currentPlayer = getPlayerUsername();

  localStorage.setItem(`${currentPlayer}_score`, 0);

  fetch("/api/score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: currentPlayer, score: 0 }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Score updated successfully", data);
    })
    .catch((error) => {
      console.error("Error updating score:", error);
    });
}

function initScore() {
  getPlayerScore();
}

document.addEventListener("DOMContentLoaded", initScore);
